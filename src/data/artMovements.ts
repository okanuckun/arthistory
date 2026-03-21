export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Artist {
  name: string;
  years: string;
  description: string;
}

export interface MovementContent {
  summary: string;
  characteristics: string[];
  artists: Artist[];
  quiz: QuizQuestion[];
}

export interface ArtMovement {
  id: string;
  number: number;
  name: string;
  period: string;
  colorPalette: string[]; // hex colors representing the era
  status: 'completed' | 'active' | 'locked';
  quizScore?: number; // out of total quiz questions
  quizTotal?: number;
  content?: MovementContent;
}

export const artMovements: ArtMovement[] = [
  {
    id: 'ronesans',
    number: 1,
    name: 'Rönesans',
    period: '1400 – 1600',
    colorPalette: ['#8B6914', '#5C4033', '#6B7F3B', '#D4A76A', '#3E5F8A'],
    status: 'active',
    content: {
      summary: 'Rönesans, 14. yüzyılda İtalya\'da başlayıp 17. yüzyıla kadar Avrupa\'ya yayılan büyük bir kültürel ve sanatsal yeniden doğuş hareketidir. Antik Yunan ve Roma ideallerine dönüş, insan merkezli dünya görüşü (hümanizm), bilimsel gözlem ve perspektifin keşfi bu dönemin temel taşlarını oluşturur. Sanat, ilk kez gerçekçi insan anatomisi, derinlik yanılsaması ve ışık-gölge oyunlarıyla tanışmıştır.',
      characteristics: [
        'Perspektif tekniğinin keşfi ve uygulanması',
        'İnsan anatomisinin bilimsel olarak incelenmesi',
        'Chiaroscuro (ışık-gölge) tekniği',
        'Sfumato tekniği — yumuşak geçişler',
        'Hümanizm felsefesi — insan merkezli dünya görüşü',
        'Antik Yunan ve Roma sanatına yeniden ilgi',
        'Yağlı boya tekniğinin yaygınlaşması',
        'Patron (hamil) sistemi — Medici ailesi gibi destekçiler',
      ],
      artists: [
        {
          name: 'Leonardo da Vinci',
          years: '1452 – 1519',
          description: 'Mona Lisa ve Son Akşam Yemeği tablolarının yaratıcısı. Ressam, mühendis, bilim insanı ve mucit olarak "evrensel dahi" unvanını taşır. Sfumato tekniğinin ustasıdır.',
        },
        {
          name: 'Michelangelo Buonarroti',
          years: '1475 – 1564',
          description: 'Sistine Şapeli tavanı ve Davut heykeli ile tanınır. Hem resim hem heykel hem de mimarlıkta zirveye ulaşmış nadir sanatçılardandır.',
        },
        {
          name: 'Raffaello Sanzio',
          years: '1483 – 1520',
          description: 'Atina Okulu freski ile ünlüdür. Rönesans\'ın ideal güzellik anlayışını en saf haliyle temsil eder. Kompozisyon ve harmoni ustasıdır.',
        },
        {
          name: 'Sandro Botticelli',
          years: '1445 – 1510',
          description: 'Venüs\'ün Doğuşu ve İlkbahar tabloları ile tanınır. Zarif çizgileri ve mitolojik konuları ile Erken Rönesans\'ın önemli temsilcisidir.',
        },
      ],
      quiz: [
        {
          question: 'Perspektif tekniğini ilk sistematik olarak kullanan Rönesans mimarı kimdir?',
          options: ['Filippo Brunelleschi', 'Leon Battista Alberti', 'Donato Bramante', 'Andrea Palladio'],
          correctIndex: 0,
        },
        {
          question: 'Leonardo da Vinci\'nin geliştirdiği, yumuşak renk geçişleri sağlayan tekniğin adı nedir?',
          options: ['Chiaroscuro', 'Sfumato', 'Impasto', 'Fresco'],
          correctIndex: 1,
        },
        {
          question: 'Aşağıdakilerden hangisi Rönesans döneminin temel felsefesidir?',
          options: ['Nihilizm', 'Hümanizm', 'Romantizm', 'Pozitivizm'],
          correctIndex: 1,
        },
        {
          question: 'Sistine Şapeli\'nin tavan fresklerini hangi sanatçı yapmıştır?',
          options: ['Raffaello', 'Leonardo da Vinci', 'Michelangelo', 'Tiziano'],
          correctIndex: 2,
        },
        {
          question: 'Rönesans hangi şehirde doğmuştur?',
          options: ['Roma', 'Venedik', 'Floransa', 'Milano'],
          correctIndex: 2,
        },
      ],
    },
  },
  {
    id: 'barok',
    number: 2,
    name: 'Barok',
    period: '1600 – 1750',
    colorPalette: ['#4A3728', '#8B7355', '#2F1B14', '#C4956A', '#1A1A2E'],
    status: 'locked',
  },
  {
    id: 'rokoko',
    number: 3,
    name: 'Rokoko',
    period: '1720 – 1780',
    colorPalette: ['#B5D4C7', '#E8D5B7', '#F5E6CC', '#A8C4B8', '#D4B896'],
    status: 'locked',
  },
  {
    id: 'neoklasisizm',
    number: 4,
    name: 'Neoklasisizm',
    period: '1750 – 1850',
    colorPalette: ['#B8A88A', '#8E7F6D', '#C4B196', '#6B5B4A', '#D4C4A8'],
    status: 'locked',
  },
  {
    id: 'romantizm',
    number: 5,
    name: 'Romantizm',
    period: '1780 – 1850',
    colorPalette: ['#6B4423', '#8B6914', '#3E5F8A', '#5C4033', '#A0522D'],
    status: 'locked',
  },
  {
    id: 'realizm',
    number: 6,
    name: 'Realizm',
    period: '1840 – 1880',
    colorPalette: ['#8B7D6B', '#A0926B', '#6B6348', '#C4A882', '#4A4A3A'],
    status: 'locked',
  },
  {
    id: 'empresyonizm',
    number: 7,
    name: 'Empresyonizm',
    period: '1860 – 1890',
    colorPalette: ['#6B8FAD', '#A2C4D9', '#7BA3BD', '#4A7FA5', '#89B3CC'],
    status: 'locked',
  },
  {
    id: 'post-empresyonizm',
    number: 8,
    name: 'Post-Empresyonizm',
    period: '1880 – 1910',
    colorPalette: ['#2E4057', '#4A6FA5', '#1B3A5C', '#6B8FAD', '#0F2744'],
    status: 'locked',
  },
  {
    id: 'sembolizm',
    number: 9,
    name: 'Sembolizm',
    period: '1880 – 1910',
    colorPalette: ['#C4A832', '#8B7D2A', '#D4B83C', '#6B6320', '#E8D264'],
    status: 'locked',
  },
  {
    id: 'art-nouveau',
    number: 10,
    name: 'Art Nouveau',
    period: '1890 – 1910',
    colorPalette: ['#E8D5B7', '#C4A882', '#F5E6CC', '#A08060', '#D4C4A8'],
    status: 'locked',
  },
  {
    id: 'fovizm',
    number: 11,
    name: 'Fovizm',
    period: '1904 – 1908',
    colorPalette: ['#E84430', '#FF5733', '#C23616', '#FF6B4A', '#A52714'],
    status: 'locked',
  },
  {
    id: 'ekspresyonizm',
    number: 12,
    name: 'Ekspresyonizm',
    period: '1905 – 1933',
    colorPalette: ['#8B6914', '#A07828', '#6B5210', '#C4A832', '#4A3A0A'],
    status: 'locked',
  },
  {
    id: 'kubizm',
    number: 13,
    name: 'Kübizm',
    period: '1907 – 1922',
    colorPalette: ['#B8A88A', '#8E7F6D', '#6B5B4A', '#C4B196', '#4A4035'],
    status: 'locked',
  },
  {
    id: 'futurizm',
    number: 14,
    name: 'Fütürizm',
    period: '1909 – 1944',
    colorPalette: ['#6B8FAD', '#4A6FA5', '#8B7D6B', '#A0926B', '#3E5F8A'],
    status: 'locked',
  },
  {
    id: 'dadaizm',
    number: 15,
    name: 'Dadaizm',
    period: '1916 – 1924',
    colorPalette: ['#1A1A1A', '#E8E8E8', '#FF0000', '#FFD700', '#0000FF'],
    status: 'locked',
  },
  {
    id: 'bauhaus',
    number: 16,
    name: 'Bauhaus',
    period: '1919 – 1933',
    colorPalette: ['#E84430', '#1B5AA5', '#F5C518', '#1A1A1A', '#E8E8E8'],
    status: 'locked',
  },
  {
    id: 'surrealizm',
    number: 17,
    name: 'Sürrealizm',
    period: '1924 – 1966',
    colorPalette: ['#C4A832', '#6B4423', '#3E5F8A', '#8B6914', '#2E4057'],
    status: 'locked',
  },
  {
    id: 'soyut-ekspresyonizm',
    number: 18,
    name: 'Soyut Ekspresyonizm',
    period: '1943 – 1965',
    colorPalette: ['#1A1A1A', '#8B0000', '#FFD700', '#FFFFFF', '#4A4A4A'],
    status: 'locked',
  },
  {
    id: 'pop-art',
    number: 19,
    name: 'Pop Art',
    period: '1955 – 1970',
    colorPalette: ['#FF1493', '#00BFFF', '#FFD700', '#FF4500', '#32CD32'],
    status: 'locked',
  },
  {
    id: 'minimalizm',
    number: 20,
    name: 'Minimalizm',
    period: '1960 – 1975',
    colorPalette: ['#E8E8E8', '#B0B0B0', '#1A1A1A', '#FFFFFF', '#808080'],
    status: 'locked',
  },
  {
    id: 'kavramsal-sanat',
    number: 21,
    name: 'Kavramsal Sanat',
    period: '1960 – Günümüz',
    colorPalette: ['#4A4A4A', '#808080', '#FFFFFF', '#1A1A1A', '#C0C0C0'],
    status: 'locked',
  },
  {
    id: 'cagdas-sanat',
    number: 22,
    name: 'Çağdaş Sanat',
    period: '1970 – Günümüz',
    colorPalette: ['#FF6B4A', '#4A6FA5', '#FFD700', '#32CD32', '#8B008B'],
    status: 'locked',
  },
];
