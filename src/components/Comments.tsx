import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { MessageCircle, Send, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  display_name?: string;
}

const Comments = ({ movementId }: { movementId: string }) => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState('');
  const [posting, setPosting] = useState(false);

  const fetchComments = async () => {
    const { data } = await supabase
      .from('movement_comments')
      .select('id, content, created_at, user_id')
      .eq('movement_id', movementId)
      .order('created_at', { ascending: false });

    if (!data) return;

    // Fetch display names
    const userIds = [...new Set(data.map(c => c.user_id))];
    const { data: profiles } = await supabase
      .from('profiles')
      .select('user_id, display_name')
      .in('user_id', userIds);

    const nameMap = new Map(profiles?.map(p => [p.user_id, p.display_name]) || []);

    setComments(data.map(c => ({
      ...c,
      display_name: nameMap.get(c.user_id) || 'Anonymous',
    })));
  };

  useEffect(() => {
    fetchComments();

    const channel = supabase
      .channel(`comments-${movementId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'movement_comments',
        filter: `movement_id=eq.${movementId}`,
      }, () => {
        fetchComments();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [movementId]);

  const handlePost = async () => {
    if (!text.trim() || !user) return;
    setPosting(true);

    const { error } = await supabase
      .from('movement_comments')
      .insert({
        movement_id: movementId,
        user_id: user.id,
        content: text.trim(),
      });

    setPosting(false);
    if (error) {
      toast.error('Failed to post comment');
    } else {
      setText('');
    }
  };

  const handleDelete = async (id: string) => {
    await supabase.from('movement_comments').delete().eq('id', id);
  };

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'now';
    if (mins < 60) return `${mins}m`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h`;
    const days = Math.floor(hrs / 24);
    return `${days}d`;
  };

  return (
    <section className="mt-8">
      <h3 className="flex items-center gap-2 font-display text-lg text-foreground mb-4">
        <MessageCircle className="w-5 h-5 text-gold" />
        {t('comments.title')}
        {comments.length > 0 && (
          <span className="text-xs font-body text-muted-foreground">({comments.length})</span>
        )}
      </h3>

      {/* Input */}
      <div className="flex gap-2 mb-5">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handlePost()}
          maxLength={500}
          placeholder={t('comments.placeholder')}
          className="flex-1 bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
        />
        <button
          onClick={handlePost}
          disabled={!text.trim() || posting}
          className="px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-body font-medium transition-all hover:bg-primary/90 active:scale-[0.95] disabled:opacity-40"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

      {/* Comments list */}
      {comments.length === 0 ? (
        <p className="text-sm font-body text-muted-foreground text-center py-6">{t('comments.empty')}</p>
      ) : (
        <div className="space-y-3">
          {comments.map(c => (
            <div key={c.id} className="bg-secondary/50 border border-border/50 rounded-lg px-4 py-3">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-body font-medium text-foreground">{c.display_name}</span>
                  <span className="text-[10px] font-body text-muted-foreground">{timeAgo(c.created_at)}</span>
                </div>
                {user?.id === c.user_id && (
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors p-1"
                    title={t('comments.delete')}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <p className="text-sm font-body text-foreground/90 leading-relaxed">{c.content}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Comments;
