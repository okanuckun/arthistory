import altareDellaConfessioneImage from '@/assets/artworks/altare-della-confessione.jpeg';
import arnolfiniPortraitImage from '@/assets/artworks/arnolfini-portrait.jpg';
import birthOfVenusImage from '@/assets/artworks/birth-of-venus.jpg';
import davidImage from '@/assets/artworks/david.jpg';
import vitruvianManImage from '@/assets/artworks/vitruvian-man.jpg';
import ecstasyOfSaintTeresaImage from '@/assets/artworks/ecstasy-of-saint-teresa.jpg';
import girlWithPearlEarringImage from '@/assets/artworks/girl-with-pearl-earring.jpg';
import lasMeninasImage from '@/assets/artworks/las-meninas.jpg';
import palaceOfVersaillesImage from '@/assets/artworks/palace-of-versailles.webp';
import apolloAndDaphneImage from '@/assets/artworks/apollo-and-daphne.webp';
import descentFromCrossImage from '@/assets/artworks/descent-from-the-cross.webp';
import rembrandtSelfPortraitImage from '@/assets/artworks/rembrandt-self-portrait.jpg';
import callingOfSaintMatthewImage from '@/assets/artworks/calling-of-saint-matthew.webp';
import judithSlayingHolofernesImage from '@/assets/artworks/judith-slaying-holofernes.jpg';
import rococoSwingImage from '@/assets/rococo/the-swing.jpg';
import rococoCytheraImage from '@/assets/rococo/pilgrimage-to-cythera.jpg';
import rococoBirthOfVenusImage from '@/assets/rococo/birth-of-venus.jpg';
import rococoWurzburgImage from '@/assets/rococo/wurzburg-fresco.webp';
import rococoAndrewsImage from '@/assets/rococo/mr-mrs-andrews.jpg';
import rococoMotherhoodImage from '@/assets/rococo/joys-of-motherhood.jpg';
import rococoEuropaImage from '@/assets/rococo/rape-of-europa.jpg';
import rococoSoapBubblesImage from '@/assets/rococo/soap-bubbles.jpg';
import rococoAmalienImage from '@/assets/rococo/amalienburg.jpg';
import rococoDianaImage from '@/assets/rococo/diana-leaving-bath.jpg';

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

export interface TattooTips {
  intro: string;
  design: string[];
  technical: string[];
  inspiration: string;
}

export interface Artwork {
  title: string;
  artist: string;
  year: string;
  type: 'painting' | 'sculpture' | 'architecture' | 'drawing' | 'fresco';
  medium: string;
  location: string;
  imageUrl: string;
  description: string;
}

export interface MovementOrigin {
  type: 'reaction' | 'evolution' | 'parallel';
  targetId: string;
  targetName: string;
  explanation: string;
}

export interface MovementContent {
  origin: MovementOrigin | null;
  summary: string;
  characteristics: string[];
  artists: Artist[];
  artworks: Artwork[];
  tattooTips: TattooTips;
  quiz: QuizQuestion[];
}

export interface ArtMovement {
  id: string;
  number: number;
  name: string;
  period: string;
  colorPalette: string[];
  status: 'completed' | 'active' | 'locked';
  releaseDate?: string;
  content?: MovementContent;
}

export const artMovements: ArtMovement[] = [
  {
    id: 'renaissance',
    number: 1,
    name: 'Renaissance',
    period: '1400 – 1600',
    colorPalette: ['#8B6914', '#5C4033', '#6B7F3B', '#D4A76A', '#3E5F8A'],
    status: 'active',
    content: {
      origin: null,
      summary: `The Renaissance — meaning "rebirth" in French — was one of the most transformative cultural revolutions in human history. Born in the city-states of 14th-century Italy, particularly Florence, it represented a sweeping rediscovery of Classical Antiquity and a radical reimagining of what art could be. After nearly a millennium in which medieval art had prioritized spiritual symbolism over physical reality, Renaissance artists turned their gaze toward the observable world with a passion that bordered on the scientific.

At its core, the Renaissance was driven by Humanism — a philosophical movement that placed human beings, rather than divine authority, at the center of intellectual life. Artists and thinkers studied ancient Greek and Roman texts, sculptures, and architecture not merely as historical relics, but as living models for a new civilization. This shift had profound consequences for visual art: figures became anatomically believable, landscapes receded convincingly into the distance, and emotions were rendered with psychological depth.

The movement unfolded in distinct phases. The Early Renaissance (roughly 1400–1490) was centered in Florence, where artists like Botticelli and Masaccio laid the groundwork. The High Renaissance (1490–1527), dominated by Leonardo, Michelangelo, and Raphael, represented the peak of technical achievement and idealized beauty. The Late Renaissance, or Mannerism (post-1527), saw artists deliberately distorting Renaissance ideals — elongating figures, intensifying colors, and introducing emotional unease — as a response to political and religious turmoil.

Two technical inventions defined the era's visual language above all else: linear perspective, which created the mathematical illusion of three-dimensional space on a flat surface, and chiaroscuro, the mastery of light and shadow to model three-dimensional form. Together they gave Renaissance paintings a sense of weight, depth, and drama never seen before. Oil paint, gradually replacing tempera, allowed artists to build up translucent layers of color, achieving a luminous realism that still astonishes viewers today.`,

      characteristics: [
        'Linear perspective — mathematical system for creating the illusion of depth on a flat surface',
        'Chiaroscuro — dramatic contrasts of light and shadow to model three-dimensional form',
        'Sfumato — Leonardo\'s technique of blurring outlines with soft, smoky transitions',
        'Anatomical accuracy — figures based on direct observation and dissection of the human body',
        'Humanism — philosophy placing human experience, reason, and beauty at the center of art',
        'Classical revival — direct study and reinterpretation of Ancient Greek and Roman models',
        'Idealized naturalism — beauty rooted in observation but elevated toward an ideal form',
        'Oil painting — layered glazes enabling luminous color depth and subtle texture',
        'Fresco technique — large-scale wall painting in wet plaster, mastered for architectural spaces',
        'Triangular composition — figures arranged in stable pyramid structures for visual harmony',
        'Psychological portraiture — faces and gestures conveying inner emotional states',
        'Patronage culture — wealthy families like the Medici funding art as political and spiritual prestige',
        'Secular subjects alongside religious — mythology, portraiture, and allegory gaining prominence',
        'Architectural integration — paintings and sculptures designed in dialogue with their spaces',
      ],

      artists: [
        {
          name: 'Leonardo da Vinci',
          years: '1452 – 1519',
          description: 'The archetypal "Renaissance man," Leonardo was simultaneously a painter, anatomist, engineer, musician, and theorist. His notebooks — filled with dissections, mechanical inventions, and studies of water, light, and botany — reveal a mind driven by insatiable curiosity. In painting, he developed the sfumato technique to its peak: the edges of forms dissolve into atmospheric haze, giving figures like the Mona Lisa an ineffable presence. His The Last Supper revolutionized narrative painting by using architecture, gesture, and psychological tension to dramatize a single frozen moment. Leonardo completed relatively few paintings, yet each one fundamentally altered the course of art history.',
        },
        {
          name: 'Michelangelo Buonarroti',
          years: '1475 – 1564',
          description: 'Michelangelo approached every medium with the ferocity of a man who believed art was an act of spiritual release. As a sculptor, his concept of "non-finito" — leaving parts of the marble uncarved — suggested figures struggling to emerge from raw stone. His David stands as the supreme Renaissance statement on the heroic human body: every muscle, vein, and tendon rendered with anatomical precision and charged with psychological tension. On the Sistine Chapel ceiling, painted almost entirely alone over four years, he compressed an entire theological universe into some 500 figures, each a masterwork of foreshortening and dramatic gesture. In his late career, his style grew increasingly tormented and spiritual, anticipating the emotional intensity of Mannerism and Baroque.',
        },
        {
          name: 'Raphael Sanzio',
          years: '1483 – 1520',
          description: 'Where Leonardo probed and Michelangelo struggled, Raphael made everything look effortless. His paintings radiate a serene, luminous harmony that represents perhaps the purest expression of Renaissance ideals. His Madonnas elevated the sacred feminine through perfect compositional balance and tender psychological warmth. The School of Athens — a vast fresco in the Vatican\'s Stanza della Segnatura — organized the great philosophers of antiquity into a theatrical, architecturally convincing space, effectively writing a visual encyclopedia of human knowledge. Raphael died at 37, yet his influence on Western painting\'s sense of grace and beauty persisted for centuries.',
        },
        {
          name: 'Sandro Botticelli',
          years: '1445 – 1510',
          description: 'Botticelli\'s work occupies a unique place in the Renaissance: deeply personal, richly symbolic, and visually unlike anyone else. His figures have an otherworldly elongation and a melancholy grace that sets them apart from the more grounded naturalism of his contemporaries. The Birth of Venus and Primavera are among the first large-scale mythological paintings in Western art — commissioned by the Medici and saturated with Neoplatonic philosophy about love, beauty, and the soul. His lines are exquisite: contours flow like music, drapery cascades in elegant arcs, and faces carry a haunting introspective quality. In later life, under the influence of the preacher Savonarola, he reportedly destroyed many of his secular works and his style grew stark and spiritual.',
        },
        {
          name: 'Titian (Tiziano Vecellio)',
          years: 'c. 1488 – 1576',
          description: 'The undisputed master of Venetian painting, Titian transformed oil paint into something almost magical. His loose, gestural brushwork — applied in dozens of translucent layers — created surfaces that seemed to glow from within, capturing the texture of skin, silk, armor, and foliage with equal virtuosity. Where Florentine Renaissance prized line and disegno (drawing), the Venetian tradition championed colore (color), and Titian was its supreme exponent. His late works, painted when he was in his eighties, are among the most proto-Impressionist paintings in art history — dissolving form into pure light and pigment. His portraits of popes, emperors, and noblemen defined the visual language of power for a century.',
        },
        {
          name: 'Albrecht Dürer',
          years: '1471 – 1528',
          description: 'The Northern Renaissance found its greatest voice in Dürer, a German artist who made multiple trips to Italy and synthesized Italian spatial and anatomical knowledge with the Northern European tradition of meticulous observation and intense naturalism. His self-portraits — confident, almost Christ-like — were radical statements of artistic identity and dignity. As a printmaker, he elevated woodcut and engraving to the level of fine art, achieving a tonal range and detail in black-and-white that rivals painting. His Melencolia I is one of the most analyzed images in Western art, dense with symbolism about creativity, knowledge, and melancholy. Dürer essentially brought the Renaissance to Northern Europe single-handedly.',
        },
      ],

      artworks: [
        {
          title: 'Mona Lisa',
          artist: 'Leonardo da Vinci',
          year: '1503 – 1519',
          type: 'painting',
          medium: 'Oil on poplar panel',
          location: 'Musée du Louvre, Paris',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/402px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
          description: 'The most recognized painting in the world. Leonardo\'s mastery of sfumato gives the figure an ethereal, atmospheric presence. The ambiguous smile and direct gaze have fascinated viewers for five centuries.',
        },
        {
          title: 'The Creation of Adam',
          artist: 'Michelangelo',
          year: '1508 – 1512',
          type: 'fresco',
          medium: 'Fresco on plaster',
          location: 'Sistine Chapel, Vatican City',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg/1280px-Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg',
          description: 'The iconic image of God reaching toward Adam represents the pinnacle of Renaissance figure painting. The composition\'s tension between two outstretched hands — almost but not quite touching — is one of the most powerful gestures in art history.',
        },
        {
          title: 'The Birth of Venus',
          artist: 'Sandro Botticelli',
          year: 'c. 1484 – 1486',
          type: 'painting',
          medium: 'Tempera on canvas',
          location: 'Uffizi Gallery, Florence',
          imageUrl: birthOfVenusImage,
          description: 'One of the first large-scale mythological paintings of the Renaissance. Botticelli\'s Venus embodies the Neoplatonic ideal of divine beauty — her elegant, elongated form rising from the sea in a swirl of wind, flowers, and drapery.',
        },
        {
          title: 'The School of Athens',
          artist: 'Raphael',
          year: '1509 – 1511',
          type: 'fresco',
          medium: 'Fresco',
          location: 'Apostolic Palace, Vatican City',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg/1280px-%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg',
          description: 'Raphael\'s supreme achievement in composition. All the great philosophers of antiquity gather beneath a vast classical arch — Plato and Aristotle at center, surrounded by Socrates, Pythagoras, Euclid, and Diogenes. A visual encyclopedia of human knowledge.',
        },
        {
          title: 'David',
          artist: 'Michelangelo',
          year: '1501 – 1504',
          type: 'sculpture',
          medium: 'White Carrara marble',
          location: 'Galleria dell\'Accademia, Florence',
          imageUrl: davidImage,
          description: 'The definitive statement on the Renaissance ideal of the heroic human body. Michelangelo captured David in the moment before battle — coiled with tension, every muscle and vein rendered with anatomical precision. At 5.17 meters, it dominates any room it inhabits.',
        },
        {
          title: 'The Last Supper',
          artist: 'Leonardo da Vinci',
          year: '1495 – 1498',
          type: 'painting',
          medium: 'Tempera and oil on plaster',
          location: 'Santa Maria delle Grazie, Milan',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/%C3%9Altima_Cena_-_Da_Vinci_5.jpg/1280px-%C3%9Altima_Cena_-_Da_Vinci_5.jpg',
          description: 'Leonardo revolutionized narrative painting by freezing the precise moment Christ announces his betrayal. Each apostle\'s reaction is psychologically distinct. The architectural perspective draws the eye directly to Christ\'s face, making him the calm center of an emotional storm.',
        },
        {
          title: 'Primavera',
          artist: 'Sandro Botticelli',
          year: 'c. 1477 – 1482',
          type: 'painting',
          medium: 'Tempera on panel',
          location: 'Uffizi Gallery, Florence',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Botticelli-primavera.jpg/1280px-Botticelli-primavera.jpg',
          description: 'A dense allegorical work saturated with Neoplatonic symbolism. Nine mythological figures inhabit an orange grove — Venus, the Three Graces, Mercury, Flora, Zephyr, and Chloris. The flowing lines and interlocking gestures create a visual tapestry of extraordinary elegance.',
        },
        {
          title: 'Vitruvian Man',
          artist: 'Leonardo da Vinci',
          year: 'c. 1490',
          type: 'drawing',
          medium: 'Pen, ink, and watercolor on paper',
          location: 'Gallerie dell\'Accademia, Venice',
          imageUrl: vitruvianManImage,
          description: 'The ultimate Renaissance image of human proportion. Based on the writings of the Roman architect Vitruvius, Leonardo inscribed the ideal male figure within both a circle and a square — demonstrating the relationship between human geometry and the geometry of the cosmos.',
        },
        {
          title: 'The Arnolfini Portrait',
          artist: 'Jan van Eyck',
          year: '1434',
          type: 'painting',
          medium: 'Oil on oak panel',
          location: 'National Gallery, London',
          imageUrl: arnolfiniPortraitImage,
          description: 'A landmark of Northern Renaissance painting. Van Eyck\'s mastery of oil paint created a surface of jewel-like detail — every texture from velvet to brass to fur rendered with breathtaking precision. The convex mirror in the background reflects the entire room, including two mysterious witnesses.',
        },
        {
          title: 'St. Peter\'s Basilica',
          artist: 'Bramante, Michelangelo, della Porta',
          year: '1506 – 1626',
          type: 'architecture',
          medium: 'Travertine marble, brick, concrete',
          location: 'Vatican City',
          imageUrl: altareDellaConfessioneImage,
          description: 'The greatest architectural achievement of the Renaissance. Michelangelo\'s dome — designed when he was 72 — became the model for dome architecture worldwide. The basilica synthesizes a century of Renaissance architectural thought into a single overwhelming monument to human ambition and faith.',
        },
      ],

      tattooTips: {
        intro: `The Renaissance is one of the richest sources a tattoo artist can draw from — not just for its iconic imagery, but for its underlying technical philosophy. The masters of this period solved exactly the problems that every tattooist faces: how to create the illusion of volume on a flat surface, how to make a figure feel alive, how to organize complex compositions into something visually harmonious. Understanding how they worked is directly applicable to the needle.`,
        design: [
          'Study triangular composition: Renaissance masters organized figures into pyramid or triangle structures to create visual stability and guide the eye. This principle translates perfectly to body placement — wrap a composition around the natural triangular forms of the shoulder, chest, or knee.',
          'Use architectural framing: Raphael and Leonardo frequently placed figures within arches, columns, or window frames. For sleeve or back pieces, consider creating an architectural "stage" that gives the scene a sense of place and grandeur.',
          'Master the contrapposto pose: figures in Renaissance art stand in contrapposto — weight on one leg, hips and shoulders tilting in opposite directions — giving the body a natural, living S-curve. When designing figures, avoid static symmetry; use this S-tension to bring energy to the composition.',
          'Reference drapery studies: Renaissance artists obsessed over the way fabric falls and folds. Drapery creates rhythm, frames the figure, and adds visual complexity without competing with the face or focal point. Incorporate flowing fabric into portraits or figurative work to add movement.',
          'Incorporate atmospheric perspective: backgrounds were painted progressively lighter and bluer in the distance to suggest depth. In black-and-grey tattooing, use progressively lighter values and softer edges for background elements to push them back and make the foreground pop.',
          'Draw from mythological subjects: scenes like The Birth of Venus, Perseus, or the Three Graces offer timeless narrative content with universal emotional resonance — ideal for large-scale pieces where the client wants meaning as well as beauty.',
          'Explore portrait conventions: Renaissance portraiture used three-quarter angle views (neither full frontal nor profile) to capture personality and dimension simultaneously. This is still the most flattering and dynamic angle for portrait tattoos.',
          'Use hands deliberately: Renaissance masters considered the hands as expressive as the face. Study the hands in works by Leonardo and Raphael — outstretched, pointing, clasped — and incorporate expressive hands into figurative tattoos to amplify emotional storytelling.',
        ],
        technical: [
          'Chiaroscuro is your most important tool: the entire Renaissance model of form is built on the transition from light to shadow. In tattooing, this means understanding how to build a full value range from bright highlight whites through midtones into deep, saturated blacks — with smooth, controlled gradation throughout.',
          'Think in layers, not lines: Renaissance painters built form through transparent glazes, each layer modifying the one beneath. Similarly, approach shading in multiple passes — establish your darkest darks first, then build midtones, then work back up toward highlights with lighter passes and needle pressure.',
          'Softness of edge is as important as darkness of shadow: sfumato means "smoked" — boundaries between light and dark are blurred, not hard. Practice achieving seamless whip shading and long feathered transitions. A hard edge where there should be a soft one instantly flattens form.',
          'Study muscle anatomy directly: Michelangelo dissected cadavers to understand the body. If you tattoo figurative work, invest time in anatomy — understand how muscles layer over each other, how skin stretches over bone, how fat deposits change contour. A figure tattooed without anatomical understanding will always look unconvincing.',
          'Replicate the luminosity of oil glazes with ink layering: Titian achieved glowing skin tones through dozens of transparent color layers. In color realism tattooing, build skin tones similarly — warm undertones first, cooler glazes over the top, highlights last. Avoid mixing everything into a flat opaque layer.',
          'Handle negative space deliberately: Renaissance compositions used background darks to make light figures emerge dramatically. In tattooing, push backgrounds dark enough that the subject genuinely "lifts" off the skin — a common mistake is leaving backgrounds too light, which flattens the whole piece.',
          'Use a restricted value structure for large pieces: Renaissance paintings achieve harmony partly because they limit their tonal extremes — the darkest dark and the brightest light are reserved for the most important focal area. In large tattoo compositions, resist putting maximum contrast everywhere; save your white highlights and deepest blacks for the intended focal point.',
          'Study Dürer\'s engravings specifically for black-and-grey technique: Dürer achieved extraordinary tonal range in pure black ink through systematic crosshatching and stippling. His prints are essentially advanced manuals for building form with a single pigment — directly applicable to black-and-grey realism and illustrative tattoo styles.',
        ],
        inspiration: `Contemporary tattooers working in Renaissance aesthetics tend to fall into two camps: those pursuing hyper-realistic recreations of specific masterworks (the Sistine Chapel ceiling, Botticelli\'s Venus) as full back pieces or sleeves, and those abstracting the era\'s visual principles into their own figurative style. The latter approach — internalizing chiaroscuro, contrapposto, and classical composition without literally copying paintings — tends to produce the most lasting and personal work. Artists like Chucho Ochoa and Nikko Hurtado demonstrate how Renaissance light-modeling principles can be applied to contemporary portraiture. For sleeve concepts, consider organizing the progression of human figures from Early to High Renaissance across the arm — from Botticelli\'s ethereal linearity through Leonardo\'s atmospheric depth to Michelangelo\'s muscular dynamism — as a visual timeline of the Renaissance itself.`,
      },

      quiz: [
        {
          question: 'Which Renaissance architect was the first to systematically codify and use linear perspective?',
          options: ['Filippo Brunelleschi', 'Leon Battista Alberti', 'Donato Bramante', 'Andrea Palladio'],
          correctIndex: 0,
        },
        {
          question: 'What is the name of Leonardo da Vinci\'s technique for creating soft, smoky transitions between light and shadow?',
          options: ['Chiaroscuro', 'Sfumato', 'Impasto', 'Fresco'],
          correctIndex: 1,
        },
        {
          question: 'Which philosophical movement placed human beings at the center of Renaissance intellectual and artistic life?',
          options: ['Nihilism', 'Humanism', 'Scholasticism', 'Positivism'],
          correctIndex: 1,
        },
        {
          question: 'Who painted the ceiling frescoes of the Sistine Chapel in the Vatican?',
          options: ['Raphael', 'Leonardo da Vinci', 'Michelangelo', 'Titian'],
          correctIndex: 2,
        },
        {
          question: 'In which Italian city was the Renaissance born?',
          options: ['Rome', 'Venice', 'Florence', 'Milan'],
          correctIndex: 2,
        },
        {
          question: 'What does "contrapposto" refer to in Renaissance figure drawing?',
          options: [
            'A technique for painting on wet plaster',
            'A pose where weight shifts to one leg, creating opposing tilts in hips and shoulders',
            'The use of gold leaf in panel paintings',
            'A method of grinding pigments for oil paint',
          ],
          correctIndex: 1,
        },
        {
          question: 'Which Renaissance master is primarily associated with the Venetian tradition of colore — prioritizing color over line?',
          options: ['Michelangelo', 'Raphael', 'Dürer', 'Titian'],
          correctIndex: 3,
        },
        {
          question: 'What does the term "Renaissance" literally mean?',
          options: ['New Beginning', 'Rebirth', 'Enlightenment', 'Revolution'],
          correctIndex: 1,
        },
        {
          question: 'Which wealthy Florentine family is most associated with patronage of the Renaissance arts?',
          options: ['The Borgia', 'The Sforza', 'The Medici', 'The Visconti'],
          correctIndex: 2,
        },
        {
          question: 'Albrecht Dürer is significant primarily because he brought Renaissance ideas to which region?',
          options: ['Spain', 'France', 'England', 'Northern Europe'],
          correctIndex: 3,
        },
      ],
    },
  },
  {
    id: 'baroque',
    number: 2,
    name: 'Baroque',
    period: '1600 – 1750',
    colorPalette: ['#4A3728', '#8B7355', '#2F1B14', '#C4956A', '#1A1A2E'],
    status: 'active',
    content: {
      origin: {
        type: 'reaction',
        targetId: 'renaissance',
        targetName: 'Renaissance',
        explanation: 'The Baroque emerged as a deliberate rupture with Renaissance ideals of calm, balance, and rational harmony. Driven partly by the Catholic Church\'s Counter-Reformation — a campaign to reclaim souls lost to Protestantism through overwhelming emotional and sensory experience — Baroque artists abandoned the serene idealization of the Renaissance and replaced it with raw drama, intense chiaroscuro, dynamic movement, and psychological intensity. Where Renaissance sought to elevate, Baroque sought to overwhelm.',
      },
      summary: `The Baroque period — spanning roughly 1600 to 1750 — represents one of the most emotionally powerful chapters in Western art history. Born in Rome at the height of the Counter-Reformation, it spread rapidly across Catholic Europe and then into the Protestant north, adapting its visual language to each culture it encountered. At its core, the Baroque was an art of persuasion: designed to move viewers, to sweep them up in torrents of feeling, to make the spiritual tangible and the abstract visceral.

The word "baroque" itself may derive from the Portuguese "barroco" — an irregularly shaped pearl — originally used as a term of derision by critics who found the style excessive. History reversed that judgment. The Baroque gave us some of the most psychologically penetrating paintings ever made, some of the most structurally innovative sculpture in history, and an approach to light and shadow that has never been surpassed.

Two great traditions defined the Baroque. In the Catholic south — Italy, Spain, Flanders — the style embraced theatricality, grandeur, and overt religious emotion. Caravaggio's knife-sharp tenebrism, Bernini's impossibly dynamic marble, Rubens's cascading flesh and color — all served to make faith felt rather than merely understood. In the Protestant north — the Netherlands above all — the Baroque turned inward: away from altarpieces and toward domestic scenes, portraits, and landscapes, rendered with a quiet intensity and optical precision that represents a different but equally profound achievement.

The Baroque also coincided with the Scientific Revolution, the Age of Exploration, and the consolidation of absolute monarchies — all of which shaped its art. The result was a style of staggering diversity: from Caravaggio's menacing saints in Roman tavern settings to Vermeer's silent, luminous Dutch interiors; from Bernini's ecstatic Saint Teresa to Rembrandt's unflinching self-portraits in old age. The Baroque encompasses multitudes, but every corner of it is driven by an intense engagement with the experience of being alive.`,

      characteristics: [
        'Tenebrism — extreme contrast of light and shadow, often with a single dramatic light source piercing near-total darkness',
        'Dynamic movement — figures caught in motion, drapery swirling, compositions built on diagonal rather than vertical axes',
        'Emotional intensity — faces and gestures conveying ecstasy, anguish, terror, rapture, and grief with psychological directness',
        'Theatrical staging — scenes composed like frozen moments from a drama, inviting the viewer into the narrative',
        'Illusionistic ceiling painting — trompe-l\'oeil architecture and figures appearing to burst through the ceiling into heaven',
        'Counter-Reformation iconography — saints, martyrdoms, and ecstatic visions designed to inspire Catholic devotion',
        'Portraiture of power — monarchs and nobles portrayed with grandeur, authority, and symbolic props',
        'Genre painting (Dutch) — scenes of everyday domestic life elevated to the level of high art',
        'Still life as moral meditation — vanitas imagery using objects to contemplate mortality and the fleeting nature of life',
        'Architectural drama — curved facades, oval spaces, and theatrical interiors designed to create awe and disorientation',
        'Tactile realism — surfaces rendered with extraordinary attention to texture (skin, velvet, metal, water)',
        'Foreshortening mastery — extreme perspective effects, especially in ceiling frescoes and figure groups',
        'Choral and orchestral parallels — visual counterpart to the era\'s great musical developments (Bach, Handel, Vivaldi)',
        'Expanded secular subjects — mythology, history painting, and portraiture gaining equal status alongside religious themes',
      ],

      artists: [
        {
          name: 'Caravaggio (Michelangelo Merisi)',
          years: '1571 – 1610',
          description: 'The most radical and influential painter of the Baroque, Caravaggio invented tenebrism — plunging his compositions into near-total darkness and illuminating figures with a single, ruthless shaft of light that seems almost violent in its precision. His saints are street people; his Madonnas are models from Roman taverns. He refused all idealization, painting sacred subjects with confrontational physical immediacy that shocked contemporaries and electrified generations of painters who followed. His own life was as dramatic as his canvases — he killed a man in a brawl and spent his final years as a fugitive, dying at 38. His influence on Rubens, Rembrandt, Velázquez, and virtually every major painter of the 17th century is incalculable.',
        },
        {
          name: 'Gian Lorenzo Bernini',
          years: '1598 – 1680',
          description: 'The supreme genius of Baroque sculpture and architecture, Bernini made marble behave like fabric, flesh, and cloud. His Apollo and Daphne captures the exact instant of metamorphosis — bark forming over living skin — with a virtuosity that seems to defy the nature of stone. His Ecstasy of Saint Teresa is simultaneously a theological statement and a psychological portrait of transcendent experience. As architect of St. Peter\'s Square, he created the greatest ceremonial urban space in the Western world. Bernini essentially defined what Rome looked like for three centuries, and his conception of sculpture as theatrical event changed the medium permanently.',
        },
        {
          name: 'Rembrandt van Rijn',
          years: '1606 – 1669',
          description: 'The greatest Dutch master and arguably the most psychologically penetrating portraitist in Western art history. Rembrandt\'s use of light was unlike anyone before or since — warm, golden, emerging from undefined darkness, falling on faces with the gentleness of revelation. His late self-portraits, painted through financial ruin and personal loss, are among the most honest and moving images of human aging ever made. The Night Watch transformed group portraiture into dramatic narrative. His etchings — over 300 survive — demonstrate equal mastery in a completely different medium, with a freedom of line that anticipates Expressionism.',
        },
        {
          name: 'Peter Paul Rubens',
          years: '1577 – 1640',
          description: 'The defining painter of Flemish Baroque, Rubens operated on an industrial scale — running a studio that produced hundreds of major works while he himself served as diplomat, scholar, and one of the most educated men of his age. His paintings are explosions of energy: cascading bodies, rearing horses, swirling compositions that seem barely able to contain their own vitality. His color — warm, luminous, built up in translucent layers from cool shadow to warm highlight — influenced Delacroix, Renoir, and virtually every painter interested in flesh and life. He elevated the female nude to a new standard of voluptuous reality that broke decisively with Renaissance idealization.',
        },
        {
          name: 'Diego Velázquez',
          years: '1599 – 1660',
          description: 'Court painter to Philip IV of Spain and one of the most technically extraordinary painters in history. Las Meninas — his enigmatic masterpiece of spatial complexity — has been called the greatest painting ever made. Velázquez painted with a freedom and economy of brushwork that anticipates Impressionism by two centuries; close up, his surfaces dissolve into abstract strokes, yet at distance they cohere into figures of perfect reality. His portraits of the Spanish royal family, dwarfs, and jesters alike were painted with absolute psychological equality — each face observed with the same penetrating, non-judgmental gaze.',
        },
        {
          name: 'Johannes Vermeer',
          years: '1632 – 1675',
          description: 'Vermeer painted only about 34 known works, yet each one is a world entire. His domestic scenes — women reading letters, pouring milk, playing music in rooms suffused with cool northern light — achieve a stillness and optical perfection that has never been equaled. He is believed to have used a camera obscura to achieve his extraordinary spatial accuracy and tonal subtlety. His light is almost impossibly precise: the way it falls on a white wall, catches the rim of a ceramic jug, or models the folds of a satin jacket constitutes the most refined optical achievement in the history of painting.',
        },
      ],

      artworks: [
        {
          title: 'The Calling of Saint Matthew',
          artist: 'Caravaggio',
          year: '1599 – 1600',
          type: 'painting',
          medium: 'Oil on canvas',
          location: 'Contarelli Chapel, San Luigi dei Francesi, Rome',
          imageUrl: callingOfSaintMatthewImage,
          description: 'A defining Baroque masterpiece. Christ enters a dark tavern, arm outstretched like God\'s in the Sistine Chapel, while Matthew — a tax collector mid-count — looks up in disbelief. The diagonal light cuts through darkness with the force of divine intervention.',
        },
        {
          title: 'The Night Watch',
          artist: 'Rembrandt van Rijn',
          year: '1642',
          type: 'painting',
          medium: 'Oil on canvas',
          location: 'Rijksmuseum, Amsterdam',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/The_Night_Watch_-_HD.jpg/1280px-The_Night_Watch_-_HD.jpg',
          description: 'The most famous Dutch Golden Age painting. Rembrandt transformed the conventional group portrait into a dynamic scene of motion and drama. Light falls unevenly — some figures brilliantly lit, others in shadow — creating a sense of a frozen dramatic moment rather than a posed composition.',
        },
        {
          title: 'Ecstasy of Saint Teresa',
          artist: 'Gian Lorenzo Bernini',
          year: '1647 – 1652',
          type: 'sculpture',
          medium: 'White marble, gilded bronze',
          location: 'Santa Maria della Vittoria, Rome',
          imageUrl: ecstasyOfSaintTeresaImage,
          description: 'Bernini\'s supreme achievement in marble. Teresa floats on a cloud, pierced by a divine arrow, her face in a state of spiritual ecstasy. The impossibly soft drapery, the weightless cloud, and the gilded rays of divine light make this one of the most psychologically complex sculptures ever carved.',
        },
        {
          title: 'Girl with a Pearl Earring',
          artist: 'Johannes Vermeer',
          year: 'c. 1665',
          type: 'painting',
          medium: 'Oil on canvas',
          location: 'Mauritshuis, The Hague',
          imageUrl: girlWithPearlEarringImage,
          description: 'Often called the "Mona Lisa of the North." An unknown young woman turns to glance over her shoulder, her gaze direct and arrestingly alive. The luminous pearl, the cool blue and yellow turban, and Vermeer\'s extraordinary rendering of light on skin make this one of the most recognizable portraits in history.',
        },
        {
          title: 'Las Meninas',
          artist: 'Diego Velázquez',
          year: '1656',
          type: 'painting',
          medium: 'Oil on canvas',
          location: 'Museo del Prado, Madrid',
          imageUrl: lasMeninasImage,
          description: 'Possibly the greatest painting in Western art. Velázquez depicts himself at work on a large canvas while the Infanta Margarita stands surrounded by her ladies-in-waiting. The viewer\'s position and the mirror in the background create a labyrinth of spatial and conceptual complexity that has fascinated painters and philosophers for centuries.',
        },
        {
          title: 'Judith Slaying Holofernes',
          artist: 'Artemisia Gentileschi',
          year: '1614 – 1620',
          type: 'painting',
          medium: 'Oil on canvas',
          location: 'Uffizi Gallery, Florence',
          imageUrl: judithSlayingHolofernesImage,
          description: 'Artemisia Gentileschi\'s definitive masterpiece. Her Judith is not the delicate heroine of earlier depictions — she and her maidservant wrestle a massive general to the ground with fierce physical determination. The tenebrism, the crimson blood, and the women\'s expressions of concentrated effort make this one of the most viscerally powerful paintings of the Baroque.',
        },
        {
          title: 'The Descent from the Cross',
          artist: 'Peter Paul Rubens',
          year: '1612 – 1614',
          type: 'painting',
          medium: 'Oil on panel',
          location: 'Cathedral of Our Lady, Antwerp',
          imageUrl: descentFromCrossImage,
          description: 'The central panel of Rubens\'s famous triptych. Christ\'s body — rendered with breathtaking anatomical mastery — is lowered from the cross in a cascade of white linen and human hands. The composition\'s diagonal energy and emotional intensity represent Flemish Baroque at its absolute peak.',
        },
        {
          title: 'Apollo and Daphne',
          artist: 'Gian Lorenzo Bernini',
          year: '1622 – 1625',
          type: 'sculpture',
          medium: 'Marble',
          location: 'Borghese Gallery, Rome',
          imageUrl: apolloAndDaphneImage,
          description: 'Bernini captures the exact instant Daphne transforms into a laurel tree to escape Apollo — bark forming over skin, fingers becoming leaves, hair dissolving into branches. The fact that this impossible moment is rendered in marble is itself part of the meaning: art triumphing over the limits of matter.',
        },
        {
          title: 'Self-Portrait with Two Circles',
          artist: 'Rembrandt van Rijn',
          year: 'c. 1665 – 1669',
          type: 'painting',
          medium: 'Oil on canvas',
          location: 'Kenwood House, London',
          imageUrl: rembrandtSelfPortraitImage,
          description: 'One of Rembrandt\'s final self-portraits, painted in old age after financial ruin and personal loss. The aged face — painted with extraordinary freedom and psychological honesty — stares outward with an expression of deep, unsentimental self-knowledge. The mysterious circles in the background have never been fully explained.',
        },
        {
          title: 'Palace of Versailles',
          artist: 'Louis Le Vau, Jules Hardouin-Mansart',
          year: '1661 – 1710',
          type: 'architecture',
          medium: 'Stone, marble, gilded bronze',
          location: 'Versailles, France',
          imageUrl: palaceOfVersaillesImage,
          description: 'The ultimate expression of Baroque architecture as political power. Louis XIV\'s palace — with its Hall of Mirrors, formal gardens, and seemingly infinite facades — was designed to make every visitor feel the absolute supremacy of the French crown. It became the template for royal architecture across Europe for a century.',
        },
      ],

      tattooTips: {
        intro: `The Baroque is perhaps the richest single source for tattooing in all of Western art history. Its preoccupations — drama, light emerging from darkness, the human body under extreme emotional and physical stress, the texture of skin and fabric rendered with obsessive realism — map directly onto the challenges and opportunities of tattooing. Every serious tattoo artist who works in black-and-grey realism, neo-traditional portraiture, or religious iconography is working in the shadow of the Baroque whether they know it or not.`,
        design: [
          'Build compositions on diagonals: Renaissance used stable triangles and vertical axes; Baroque deliberately destabilized these with diagonal lines of force. A figure reaching upward at an angle, a beam of light cutting across a dark background — diagonal composition creates dynamism and urgency that reads powerfully on skin.',
          'Use dramatic cropping: Caravaggio frequently cut figures at unexpected angles — a hand emerging from darkness, a face half in shadow. Tight, dramatic cropping on a tattoo creates the same cinematic tension and forces the viewer\'s eye to complete what it cannot see.',
          'Design with a single light source: Tenebrism means one light, one shadow, no ambient fill. Pick your imaginary light source before you begin and maintain it ruthlessly throughout the piece. Every surface, every fold of fabric, every plane of the face should be consistent with that single source.',
          'Reference martyrdom and ecstasy imagery: Saints Sebastian, Bartholomew, and Teresa offer iconic compositional archetypes — the upward-gazing face, the vulnerable exposed body, the contrast between violence and transcendence — that translate powerfully into tattoo imagery with universal emotional resonance.',
          'Exploit the contrast between flesh and darkness: Baroque painters built their compositions around the emergence of skin from shadow. In tattooing, this means treating the background not as empty space but as active darkness that the figure pushes against. The darkest areas of a tattoo should feel like consuming shadow, not just fill.',
          'Use fabric as compositional rhythm: Rubens and Bernini were obsessed with drapery — the way cloth twists, bunches, and flows creates rhythm and movement throughout a composition. Incorporating fabric, clothing, or robes into figurative tattoos adds visual complexity and allows the eye to travel through the piece.',
          'Study Bernini for three-dimensional tattooing: His sculptures are essentially studies in how form reads from every angle. For tattoos that wrap around limbs or the body, think about how the design behaves in three dimensions — Bernini\'s compositional principles are directly applicable.',
          'Mine the Dutch Golden Age for still life and portrait tattoos: Vanitas still lifes — skulls alongside flowers, hourglasses, musical instruments — offer iconographically rich imagery for meaningful tattoos. Vermeer\'s interior scenes offer intimate compositional models for sleeve backgrounds.',
        ],
        technical: [
          'Master the transition from absolute black to white: Baroque tenebrism demands a full value range. In tattooing, this means being willing to pack true blacks — not grey — into shadow areas, and reserving clean skin or white ink for the brightest highlights. The contrast between these extremes is the source of the style\'s power.',
          'Study Caravaggio specifically for light logic: His light is not naturalistic — it is theatrical, focused, almost interrogatory. Understanding how he constructed his light sources (always from above, often from the left, always raking across form rather than flooding it) will transform how you think about shadow placement.',
          'Layer skin tones for Baroque warmth: Baroque painters built warm, luminous skin by layering warm reds and yellows under cooler surface glazes. In color tattooing, lay in warm undertones first, then cool the surface — this replicates the subsurface warmth that makes Baroque flesh feel alive.',
          'Use scattered highlights sparingly: In tenebrism, highlights are rare and precious — a rim of light on a cheekbone, the gleam of an eye, the shine on a lip. Resist the temptation to over-highlight; reserve your brightest points for the single most important area of the face or figure.',
          'Render fabric with structural logic: When tattooing robes, cloaks, or drapery in the Baroque style, understand the underlying form the fabric covers. Folds follow gravity and the shape beneath — cloth over a raised knee creates different folds than cloth hanging freely. Study Rubens\'s drapery drawings for this logic.',
          'Exploit the needle\'s capacity for texture: The Baroque obsession with tactile surfaces — velvet, fur, metal armor, wet skin — translates directly to tattooing. Different needle configurations and techniques (mag shaders, liners, stippling) can create distinct textural qualities. Build a vocabulary of textures and deploy them consistently.',
          'Don\'t fear asymmetry: Baroque compositions are rarely symmetrical — they are balanced through tension rather than mirroring. A heavy dark mass on one side is counterbalanced by a bright figure on the other. Apply this principle to sleeve layouts and back pieces for a more dynamic result than simple bilateral symmetry.',
          'Study Rembrandt\'s etchings for line quality: His etched lines range from razor-fine to deeply bitten, building form through crosshatch, parallel line, and open space with extraordinary control. These techniques translate directly to black-and-grey shading approaches and to the illustrative tattoo style.',
        ],
        inspiration: `Contemporary tattooing has a deep and largely unacknowledged debt to the Baroque. The entire black-and-grey realism tradition — with its tenebristic light, its dramatic portraits, its religious iconography — is essentially Baroque painting translated onto skin. Artists like Robert Hernandez, Nikko Hurtado, and Paul Booth all work in a visual language that traces directly to Caravaggio and Rembrandt. For sleeve concepts, consider organizing a Baroque sleeve around a single dramatic light source — as if a lantern illuminates the entire composition from one end of the arm. Religious scenes, martyrdom imagery, and Vanitas still lifes offer powerful thematic material. For black-and-grey portraiture, study Rembrandt's late self-portraits: the way he built a face from darkness using the minimum number of deliberate marks is the most advanced lesson in tonal economy available to any artist working in a single pigment.`,
      },

      quiz: [
        {
          question: 'What technique did Caravaggio pioneer, characterized by extreme contrast between light and near-total darkness?',
          options: ['Sfumato', 'Impasto', 'Tenebrism', 'Pointillism'],
          correctIndex: 2,
        },
        {
          question: 'Which religious and political movement was a major driving force behind the development of Baroque art?',
          options: ['The Reformation', 'The Counter-Reformation', 'The Enlightenment', 'The Crusades'],
          correctIndex: 1,
        },
        {
          question: 'Which Baroque artist is considered the supreme master of marble sculpture, responsible for the Ecstasy of Saint Teresa?',
          options: ['Michelangelo', 'Donatello', 'Gian Lorenzo Bernini', 'Antonio Canova'],
          correctIndex: 2,
        },
        {
          question: 'Las Meninas — widely considered one of the greatest paintings ever made — was created by which artist?',
          options: ['Francisco Goya', 'El Greco', 'Diego Velázquez', 'Bartolomé Murillo'],
          correctIndex: 2,
        },
        {
          question: 'The Dutch Golden Age, which produced Rembrandt and Vermeer, differed from Italian Baroque primarily in its focus on what?',
          options: ['Religious altarpieces', 'Royal portraiture', 'Everyday domestic subjects', 'Mythological scenes'],
          correctIndex: 2,
        },
        {
          question: 'Which Baroque palace, built for Louis XIV of France, became the template for royal architecture across Europe?',
          options: ['Buckingham Palace', 'Palace of Versailles', 'Schönbrunn Palace', 'The Louvre'],
          correctIndex: 1,
        },
        {
          question: 'Artemisia Gentileschi was significant in Baroque art for which reason?',
          options: [
            'She invented tenebrism',
            'She was one of the first women to achieve recognition as a major painter',
            'She designed St. Peter\'s Square',
            'She founded the Dutch Golden Age tradition',
          ],
          correctIndex: 1,
        },
        {
          question: 'Rembrandt\'s The Night Watch was revolutionary because it transformed what type of traditional painting?',
          options: ['Landscape painting', 'Still life painting', 'Group portrait painting', 'Religious altarpiece painting'],
          correctIndex: 2,
        },
        {
          question: 'What does the word "baroque" originally refer to?',
          options: ['A type of ornate palace', 'An irregularly shaped pearl', 'A dramatic lighting technique', 'A type of theatrical performance'],
          correctIndex: 1,
        },
        {
          question: 'In Baroque tattooing and art, what is the primary function of deep, saturated black areas in a composition?',
          options: [
            'To indicate background distance',
            'To create active darkness that figures dramatically emerge from',
            'To suggest nighttime settings',
            'To save ink and reduce complexity',
          ],
          correctIndex: 1,
        },
      ],
    },
  },
  {
    id: 'rococo',
    number: 3,
    name: 'Rococo',
    period: '1720 – 1780',
    colorPalette: ['#B5D4C7', '#E8D5B7', '#F5E6CC', '#A8C4B8', '#D4B896'],
    status: 'active',
    content: {
      origin: {
        type: 'reaction',
        targetId: 'baroque',
        targetName: 'Baroque',
        explanation: 'Rococo was a direct reaction to the grandeur, weight, and religious solemnity of the Baroque. As the French court moved from Versailles back to Paris after Louis XIV\'s death in 1715, aristocratic taste shifted from overwhelming public spectacle toward intimate, playful, and sensually delightful spaces. Where Baroque was dark, Rococo was pastel; where Baroque was monumental and morally serious, Rococo was small-scale, witty, and devoted to pleasure. It was the art of a ruling class that wanted to enjoy its privilege rather than justify it.',
      },
      summary: `Rococo — from the French "rocaille," meaning shell-work or pebble decoration — was the dominant visual style of European aristocratic culture from approximately 1720 to 1780. Originating in the Parisian salons and private apartments of the French nobility following the death of Louis XIV, it represented a decisive turn away from public grandeur toward private pleasure: an art of intimacy, elegance, wit, and unabashed sensuality.

If the Baroque was the art of the church and the absolute monarchy, Rococo was the art of the salon and the boudoir. Its scale was deliberately reduced — from vast cathedral ceilings to the walls of intimate drawing rooms, from heroic marble groups to delicate porcelain figurines. Its palette was transformed: the dark, dramatic tones of Caravaggio and Rembrandt gave way to champagne, rose, sky blue, seafoam green, and ivory. Its subjects shifted from martyrdom and divine ecstasy to garden parties, flirtatious encounters, music-making, and the rituals of aristocratic leisure — what the French called "fêtes galantes."

Rococo also embraced decorative arts with unprecedented seriousness. Furniture, porcelain, tapestry, silverware, and interior design were elevated to the same level as painting and sculpture, and the boundaries between them deliberately blurred. The period produced the finest porcelain in European history (Meissen, Sèvres), tapestry series of extraordinary refinement, and interiors — like the Amalienburg pavilion in Munich or the Hôtel de Soubise in Paris — where every surface seemed to dissolve into an interlocking system of curves, gilding, mirrors, and painted panels.

Rococo eventually collapsed under the weight of its own frivolity. By the 1760s, Enlightenment critics like Diderot were condemning its moral emptiness, and the stern civic virtues of Neoclassicism were already waiting to replace it. Yet at its best — in the greatest canvases of Watteau, Fragonard, and Boucher, and in the spectacular painted interiors of German and Austrian Baroque-Rococo churches — it achieved a kind of perfection that is easy to underestimate: an art devoted entirely to the cultivation of delight is harder to make than it looks.`,

      characteristics: [
        'Pastel palette — champagne, rose, sky blue, seafoam, ivory replacing the dark dramatic tones of the Baroque',
        'Asymmetrical ornamentation — the "S" and "C" curve as the fundamental decorative unit, applied to frames, furniture, and architecture',
        'Fêtes galantes — outdoor garden party scenes depicting aristocratic leisure, music, dancing, and flirtation',
        'Intimacy of scale — smaller canvases, smaller rooms, smaller sculptures designed for private pleasure rather than public awe',
        'Erotic and amorous subjects — flirtation, seduction, and playful love as legitimate and dominant artistic themes',
        'Total interior design — painting, sculpture, furniture, and decorative arts unified into integrated visual environments',
        'Porcelain and the decorative arts elevated to fine art status — Meissen, Sèvres, Capodimonte',
        'Theatrical and operatic subjects — commedia dell\'arte figures, masked balls, theatrical scenes',
        'Chinese and Turkish exoticism — chinoiserie and turquerie as fashionable decorative vocabularies',
        'Light, feathery brushwork — visible, delicate, almost caressing — replacing Baroque solidity',
        'Curved architecture — oval rooms, shell-encrusted grottoes, serpentine facades rejecting Baroque\'s straight axes',
        'Soft, diffused lighting — no dramatic tenebrism; light seems to come from everywhere and nowhere, bathing scenes in a gentle glow',
        'Mythological fantasy — Venus, Cupid, and the Graces in idealized pastoral settings',
        'Self-conscious artifice — Rococo acknowledged and celebrated its own theatrical unreality',
      ],

      artists: [
        {
          name: 'Jean-Antoine Watteau',
          years: '1684 – 1721',
          description: 'The inventor and greatest practitioner of the fête galante, Watteau created an entirely new genre of painting — elegantly dressed figures in dreamlike garden settings, suffused with a melancholy that contradicts their apparent pleasures. He was accepted into the French Academy with a new category invented specifically for his work. Despite dying of tuberculosis at 36, he produced paintings of extraordinary poetic delicacy, particularly his late masterpiece Gersaint\'s Shopsign — a full-scale painting depicting his art dealer\'s shop, painted reportedly in just eight days, combining the social observation of Vermeer with the atmospheric grace that only Watteau possessed.',
        },
        {
          name: 'François Boucher',
          years: '1703 – 1770',
          description: 'The official painter of Rococo pleasure, Boucher was the favorite artist of Madame de Pompadour and the dominant figure of the French court\'s visual culture for three decades. His mythological scenes — Venus reclining, nymphs bathing, Cupid disarmed — are painted with a technical brilliance that is easy to overlook because the subjects seem so decorative. His understanding of how to render soft, warm flesh against silks and cloud-like linens was unparalleled. Diderot hated him ("this man has everything except truth") but Renoir and Fragonard adored him.',
        },
        {
          name: 'Jean-Honoré Fragonard',
          years: '1732 – 1806',
          description: 'The last great master of Rococo and one of the most technically brilliant painters of the 18th century. The Swing — a young woman on a garden swing, her pink dress billowing, a young man watching from below — distills Rococo\'s entire sensibility into a single image. But Fragonard was also capable of extraordinary seriousness: his decorative panels for Madame du Barry and the erotic series now in the Frick Collection demonstrate a command of narrative, atmosphere, and brushwork that would place him among the greats of any era. He survived the Revolution by reinventing himself and died almost forgotten — one of art history\'s crueler ironies.',
        },
        {
          name: 'Giovanni Battista Tiepolo',
          years: '1696 – 1770',
          description: 'The last great master of the Italian fresco tradition and the supreme decorator of the 18th century. Working across Venice, Würzburg, and Madrid, Tiepolo filled ceilings with visions of impossible lightness — heavens populated by gods, angels, and allegorical figures that seem to float effortlessly in an infinity of blue air. Where Baroque ceiling painting was overwhelming, Tiepolo\'s was exhilarating. His color — cool silvers, pale blues, warm creams — transformed the tradition he inherited into something entirely his own. The Würzburg Residence staircase ceiling is perhaps the greatest single Rococo commission ever executed.',
        },
        {
          name: 'Jean-Baptiste-Siméon Chardin',
          years: '1699 – 1779',
          description: 'The counter-voice of French Rococo and one of the greatest still life and genre painters in history. While Boucher painted goddesses and aristocrats, Chardin painted kitchen maids, copper pots, dead fish, and children blowing soap bubbles — with a gravity, stillness, and material sensitivity that Diderot recognized as the true soul of painting. His still lifes have a weight and presence that recalls Zurbarán; his domestic scenes anticipate the quiet realism of the 19th century. He represents the tradition within Rococo that valued observation over fantasy.',
        },
        {
          name: 'Thomas Gainsborough',
          years: '1727 – 1788',
          description: 'The greatest British portraitist of the 18th century and an artist of remarkable range who excelled equally in portrait and landscape — unusual for the era. His society portraits — Mr and Mrs Andrews, The Blue Boy, Mrs. Siddons — combine a gift for likeness with extraordinary painterly elegance, particularly in his rendering of fabrics and atmospheric landscape backgrounds. His technique was genuinely radical: he reportedly painted with brushes three feet long, standing back from the canvas, building form through a web of feathery strokes that dissolve on close inspection. He secretly considered himself a landscape painter trapped in the portrait business.',
        },
      ],

      artworks: [
        {
          title: 'The Swing',
          artist: 'Jean-Honoré Fragonard',
          year: '1767',
          type: 'painting',
          medium: 'Oil on canvas',
          location: 'The Wallace Collection, London',
          imageUrl: rococoSwingImage,
          description: 'The definitive Rococo image. A young woman swings in a garden while a hidden admirer watches from below. Her pink dress, the flying slipper, the garden\'s theatrical artifice — every element distills the period\'s sensibility of playful, elegant pleasure into a single perfect composition.',
        },
        {
          title: 'Pilgrimage to Cythera',
          artist: 'Jean-Antoine Watteau',
          year: '1717',
          type: 'painting',
          medium: 'Oil on canvas',
          location: 'Musée du Louvre, Paris',
          imageUrl: rococoCytheraImage,
          description: 'The painting that defined the fête galante genre and earned Watteau his place in the French Academy. Elegant couples prepare to depart — or have just arrived — on the island of love. The painting\'s genius lies in its ambiguity: are they coming or going? The melancholy undertone beneath the gaiety is Watteau\'s personal signature.',
        },
        {
          title: 'The Birth of Venus (Boucher)',
          artist: 'François Boucher',
          year: '1740',
          type: 'painting',
          medium: 'Oil on canvas',
          location: 'National Museum of Sweden, Stockholm',
          imageUrl: rococoBirthOfVenusImage,
          description: 'Boucher\'s Venus is the Rococo\'s ideal of feminine beauty — soft, warm, utterly confident in her own desirability. The pearlescent skin, cascading draperies, and jubilant attendant figures create a visual celebration of sensual pleasure that represents the period at its most unabashedly hedonistic.',
        },
        {
          title: 'Würzburg Residence Ceiling Fresco',
          artist: 'Giovanni Battista Tiepolo',
          year: '1752 – 1753',
          type: 'fresco',
          medium: 'Fresco',
          location: 'Würzburg Residence, Germany',
          imageUrl: rococoWurzburgImage,
          description: 'The largest ceiling fresco in the world, covering the entire staircase hall of the Würzburg Residence. Tiepolo populated this vast sky with allegorical figures representing the four continents, deities, and a self-portrait. Its luminous color and weightless figures represent the absolute peak of Rococo decorative achievement.',
        },
        {
          title: 'Mr and Mrs Andrews',
          artist: 'Thomas Gainsborough',
          year: 'c. 1750',
          type: 'painting',
          medium: 'Oil on canvas',
          location: 'National Gallery, London',
          imageUrl: rococoAndrewsImage,
          description: 'A revolutionary rethinking of the society portrait, combining full-length figures with a genuinely observed Suffolk landscape. The Andrews stand before their estate with proprietorial ease. Gainsborough\'s feathery handling of the foliage and sky marks him as one of the great painters of atmosphere in any era.',
        },
        {
          title: 'The Joys of Motherhood',
          artist: 'François Boucher',
          year: '1752',
          type: 'painting',
          medium: 'Oil on canvas',
          location: 'Musée du Louvre, Paris',
          imageUrl: rococoMotherhoodImage,
          description: 'A masterwork of Rococo mythological painting. Venus at her toilet, surrounded by putti and the instruments of beauty, embodies the period\'s conviction that the cultivation of beauty is itself a meaningful activity. Boucher\'s rendering of silk, pearls, and luminous skin is virtuoso painting by any standard.',
        },
        {
          title: 'The Rape of Europa',
          artist: 'Jean-François de Troy',
          year: '1716',
          type: 'painting',
          medium: 'Oil on canvas',
          location: 'Private Collection',
          imageUrl: rococoEuropaImage,
          description: 'A characteristic Rococo mythological scene where a classical subject is treated with sensual lightness rather than heroic gravity. The soft palette, dynamic composition, and theatrical gesture typify how Rococo artists transformed classical mythology into occasions for visual delight.',
        },
        {
          title: 'Soap Bubbles',
          artist: 'Jean-Baptiste-Siméon Chardin',
          year: 'c. 1733 – 1734',
          type: 'painting',
          medium: 'Oil on canvas',
          location: 'Metropolitan Museum of Art, New York',
          imageUrl: rococoSoapBubblesImage,
          description: 'Chardin\'s quietly radical counter-vision to Rococo opulence. A boy blows a soap bubble — a traditional vanitas symbol of life\'s fragility — with absorbed concentration. The painting\'s domestic simplicity and genuine psychological observation stand apart from the period\'s prevailing taste for fantasy.',
        },
        {
          title: 'Amalienburg Pavilion Interior',
          artist: 'François de Cuvilliés',
          year: '1734 – 1739',
          type: 'architecture',
          medium: 'Silver and pale blue stucco, mirrors, gilded wood',
          location: 'Nymphenburg Palace, Munich',
          imageUrl: rococoAmalienImage,
          description: 'The Hall of Mirrors at the Amalienburg is perhaps the most perfect Rococo interior in existence. Silver stucco chinoiserie decoration, pale blue walls, and continuous mirrors create an environment where every surface dissolves into reflected light and ornament. It represents the total integration of all decorative arts that Rococo aspired to.',
        },
        {
          title: 'Diana Leaving Her Bath',
          artist: 'François Boucher',
          year: '1742',
          type: 'painting',
          medium: 'Oil on canvas',
          location: 'Musée du Louvre, Paris',
          imageUrl: rococoDianaImage,
          description: 'One of Boucher\'s most celebrated mythological paintings. Diana and a nymph rest after hunting — their porcelain-white skin gleaming against the warm landscape. The painting\'s frank celebration of feminine beauty, rendered with extraordinary technical refinement, epitomizes Rococo\'s conviction that beauty itself is a sufficient subject for art.',
        },
      ],

      tattooTips: {
        intro: `Rococo is the most underused art historical source in tattooing, and for no good reason. Its visual vocabulary — pastel gradients, flowing curves, botanical ornament, decorative cartouches, intimate figurative scenes — offers enormous untapped potential for tattoers working in fine-line, ornamental, and decorative styles. Understanding Rococo is essentially a masterclass in how to make something visually light feel substantial, and how to organize complex decorative elements without losing elegance.`,
        design: [
          'Study the S-curve and C-curve as compositional DNA: Rococo rejected straight lines in favor of continuous curves. The "S" curve — used in figure poses, frame edges, and compositional flow — creates a sense of natural movement and feminine grace. For ornamental and fine-line work, build your layouts around these curves rather than geometric axes.',
          'Use asymmetry as a design principle: Rococo frames, cartouches, and decorative panels are almost never symmetrical. One side grows in a different direction from the other, creating visual interest through imbalance. Apply this to ornamental tattoo borders, frames, and filler elements for a more organic, sophisticated result.',
          'Incorporate botanical elements with precision: Rococo decoration is saturated with roses, garlands, ribbons, and garden flowers — rendered with delicate specificity rather than generic stylization. For fine-line botanical work, study Rococo engravings and textile designs for compositional ideas that are already designed to wrap around and fill complex shapes.',
          'Mine chinoiserie for design inspiration: The Rococo fascination with Chinese motifs — pagodas, birds, flowering branches, figures in exotic landscapes — produced a rich visual language that blends Eastern and Western sensibilities. These elements offer fresh compositional options for ornamental tattooing that avoid clichéd Western iconography.',
          'Design intimate narrative scenes for inner arm and thigh placements: Rococo\'s small-scale, domestic, and intimate subjects — lovers in gardens, women at their toilette, musicians in conversation — are ideally scaled for the intimate body placements that fine-line portraiture requires. Study Watteau\'s drawings specifically for figural scale and gesture.',
          'Use cartouches and frames as active design elements: Rococo cartouches — the ornate frames around inscriptions, mirrors, and panels — are themselves beautifully designed objects. Incorporating an elegant cartouche frame around a fine-line portrait or botanical scene elevates the whole composition and gives it a period elegance.',
          'Consider the palette for color work: Rococo pastels — blush rose, sage green, powder blue, champagne, lavender — are not simply diluted versions of stronger colors. They are a coherent aesthetic system. For color tattoos drawing on this tradition, resist the urge to punch up the saturation; the muted, almost powdery quality is essential to the aesthetic.',
          'Study Fragonard\'s brushwork for loose figurative style: His feathery, almost impressionistic brushwork dissolves form at the edges while maintaining clarity at the focal center. This approach translates to a loose, gestural fine-line figurative style that feels fresh and non-literal.',
        ],
        technical: [
          'Achieve pastel gradients through layering, not dilution: Rococo\'s soft palette comes from the careful layering of translucent color, not from simply adding white. In color tattooing, build pastel areas through thin, repeated passes — this creates a depth and luminosity that flat diluted color cannot achieve.',
          'Prioritize line quality for ornamental work: Rococo decorative art is fundamentally linear — the grace of a cartouche depends entirely on the quality of its curves. In fine-line ornamental tattooing, invest in perfect line execution. A slightly wavering curve in a Rococo-inspired frame immediately destroys the aesthetic.',
          'Understand negative space as a design element: Rococo interiors used the space between ornamental elements as carefully as the elements themselves — the "breathing room" between curves and motifs is what gives the style its airiness. Do not fill every corner of an ornamental tattoo; let the skin show.',
          'Study how Rococo handled transitions between decorative and figurative elements: In integrated Rococo panels, figures dissolve into ornament and ornament grows into figures without abrupt transitions. This skill — blending figurative and decorative elements seamlessly — is one of the most valuable in large-scale tattooing.',
          'Use white ink selectively for highlights in color work: The Rococo porcelain aesthetic — that gleaming, almost glassy quality of highlighted skin and silk — requires precise, selective white ink application. In color realism, reserve white for the single brightest specular highlight on pearls, eyes, or silk fabric.',
          'Build volume with softer contrast than Baroque: Rococo figures are modeled with much less tonal contrast than Baroque — the shadow areas are lighter, the highlights less extreme. For tattooing inspired by this period, work in the middle third of the value scale, reserving your deepest darks for small accent areas only.',
          'Execute fine botanical detail with technical precision: Rococo flower and leaf rendering is not impressionistic — individual petals, stamens, and leaf serrations are precisely observed. For botanical fine-line work inspired by this period, observe real flowers and draw them with specificity before stylizing.',
          'Consider aged patina as an aesthetic: Actual Rococo interiors have aged to a warm, slightly desaturated tonality — gold has mellowed, blues have faded slightly, creams have warmed. For tattoos in this style, a slightly desaturated, warm-toned palette can feel more authentically Rococo than a bright, fresh interpretation.',
        ],
        inspiration: `Rococo is experiencing a quiet renaissance in contemporary tattooing, particularly in the fine-line and ornamental traditions. Artists working in lace-pattern tattooing, decorative sleeve compositions, and fine-line portraiture are increasingly drawing on Rococo visual language — its curves, its botanical ornament, its cartouches — as an alternative to the heavily worked Neo-Traditional and Japanese traditions. The Rococo tradition also offers a rich vocabulary for feminine-coded tattooing that escapes both generic florals and the darkness of black-and-grey realism. For large-scale decorative back pieces or thigh compositions, a Rococo-inspired garden scene — figures in an architectural garden setting, surrounded by botanical ornament and ornate framing devices — offers a compositional architecture that can be worked up over multiple sessions while maintaining visual coherence from the beginning.`,
      },

      quiz: [
        {
          question: 'What does the word "Rococo" derive from?',
          options: ['An Italian word for ornament', 'The French word for shell-work or pebble decoration', 'The name of a French château', 'A type of porcelain glaze'],
          correctIndex: 1,
        },
        {
          question: 'Which painter invented the "fête galante" — the genre of aristocratic outdoor garden party scenes?',
          options: ['François Boucher', 'Jean-Honoré Fragonard', 'Jean-Antoine Watteau', 'Giovanni Tiepolo'],
          correctIndex: 2,
        },
        {
          question: 'Which painting is considered the defining image of Rococo sensibility?',
          options: ['The Birth of Venus', 'The Swing', 'Pilgrimage to Cythera', 'Diana Leaving Her Bath'],
          correctIndex: 1,
        },
        {
          question: 'Rococo style emerged primarily in which country before spreading across Europe?',
          options: ['Italy', 'Germany', 'England', 'France'],
          correctIndex: 3,
        },
        {
          question: 'Which Enlightenment thinker famously criticized Rococo for its moral emptiness and lack of truth?',
          options: ['Voltaire', 'Rousseau', 'Diderot', 'Montesquieu'],
          correctIndex: 2,
        },
        {
          question: 'What characteristic distinguishes Rococo lighting from Baroque lighting?',
          options: [
            'Rococo used tenebrism while Baroque used soft light',
            'Rococo used soft, diffused light from all directions rather than Baroque\'s dramatic single light source',
            'Rococo used candlelight while Baroque used daylight',
            'There is no meaningful difference in their approaches to light',
          ],
          correctIndex: 1,
        },
        {
          question: 'Which Rococo artist represented a counter-current to the period\'s fantasy, painting ordinary domestic subjects with quiet gravity?',
          options: ['Boucher', 'Fragonard', 'Tiepolo', 'Chardin'],
          correctIndex: 3,
        },
        {
          question: 'What is a "chinoiserie" in the context of Rococo decorative arts?',
          options: [
            'A type of Rococo porcelain glaze technique',
            'European decorative art incorporating Chinese or East Asian motifs',
            'A specific type of Rococo architectural ornament',
            'A French term for floral wallpaper',
          ],
          correctIndex: 1,
        },
        {
          question: 'Giovanni Battista Tiepolo\'s most famous commission was the ceiling fresco of which building?',
          options: ['Versailles Palace', 'The Louvre', 'Würzburg Residence', 'St. Peter\'s Basilica'],
          correctIndex: 2,
        },
        {
          question: 'In Rococo-inspired tattoo design, what is the primary function of negative space (unpainted skin)?',
          options: [
            'To indicate areas to be completed later',
            'To reduce cost and tattooing time',
            'To create the airiness and visual breathing room essential to the Rococo aesthetic',
            'To show the border between decorative elements',
          ],
          correctIndex: 2,
        },
      ],
    },
  },
  {
    id: 'neoclassicism',
    number: 4,
    name: 'Neoclassicism',
    period: '1750 – 1850',
    colorPalette: ['#B8A88A', '#8E7F6D', '#C4B196', '#6B5B4A', '#D4C4A8'],
    status: 'locked',
    releaseDate: '20 Nisan Pazar',
    content: {
      origin: {
        type: 'reaction',
        targetId: 'rococo',
        targetName: 'Rococo',
        explanation: 'Neoclassicism was a direct and deliberate rejection of Rococo\'s frivolity, moral emptiness, and decorative excess. Fueled by Enlightenment philosophy, the rediscovery of Pompeii and Herculaneum (excavated from 1738), and a new moral seriousness in political thought that would culminate in the French and American Revolutions, Neoclassicism demanded an art of civic virtue, rational clarity, and historical gravitas. Where Rococo was curved, soft, and private, Neoclassicism was angular, austere, and public — an art that aspired to teach rather than merely please.',
      },
      summary: `Neoclassicism — the revival and reinterpretation of ancient Greek and Roman art — emerged in the mid-18th century as one of Western civilization's most self-conscious artistic programs. It was not merely a stylistic preference but a moral and political manifesto: a conviction that the arts could — and should — teach citizens the virtues of the ancient republics: stoic self-sacrifice, civic duty, rational order, and heroic resolve. In an age when revolutions were being planned in Paris and Philadelphia, Neoclassical art provided the visual language of republican virtue.

The intellectual foundations were laid by the German art historian Johann Joachim Winckelmann, whose 1755 essay "Thoughts on the Imitation of Greek Works in Painting and Sculpture" argued that the ideal beauty of Greek sculpture — its "noble simplicity and quiet grandeur" — represented the highest possible standard for art. The archaeological excavations at Pompeii and Herculaneum provided actual Roman objects to study, while the newly founded museums of Europe made ancient casts and artifacts accessible to a generation of artists determined to recreate antiquity.

In painting, Neoclassicism meant clear outlines, planar compositions, stoic facial expressions, and subjects drawn from Roman history that could be read as political allegories for contemporary struggles. Jacques-Louis David was the movement's supreme practitioner and propagandist — his Oath of the Horatii became virtually the manifesto of French Revolutionary art, and his later portraits of Napoleon transformed a Corsican general into a Roman emperor. In sculpture, Antonio Canova and Bertel Thorvaldsen created marble figures of such technical perfection and icy beauty that they seemed to fulfill Winckelmann's ideal literally.

Neoclassicism was deeply connected to politics in a way few art movements have been. It provided the visual identity of the French Revolution, the Napoleonic Empire, the American Republic, and the reform movements across Europe. The Capitol building in Washington, DC; the Arc de Triomphe in Paris; the Parthenon in Nashville — all speak the visual language developed in the 1750s–1850s. Its legacy is literally written into the architecture of democracy.`,

      characteristics: [
        'Clear, precise outlines — forms defined by line rather than the soft blurring of Rococo or the atmospheric dissolution of Baroque',
        'Planar composition — figures arranged in shallow, frieze-like space parallel to the picture surface, recalling ancient relief sculpture',
        'Stoic emotional restraint — faces conveying dignity, resolve, and moral seriousness rather than Baroque passion or Rococo gaiety',
        'Roman and Greek historical subjects — scenes from Livy, Plutarch, and Homer used as moral allegories for contemporary politics',
        'Heroic nudity and draped figures — the male nude as symbol of republican virtue and civic courage',
        'Cool, even lighting — rational, diffuse light replacing the dramatic chiaroscuro of the Baroque',
        'Archaeological accuracy — period-correct furniture, architecture, and dress reflecting serious antiquarian research',
        'Architectural use of the Classical orders — Doric, Ionic, and Corinthian columns applied to public buildings as symbols of civic values',
        'Portrait painting as civic statement — subjects depicted with dignity, simplicity, and moral seriousness',
        'The Grand Tour as artistic education — young aristocrats traveling to Rome to study ancient monuments and Renaissance masters',
        'Engraving and print culture — Neoclassical images disseminated across Europe through high-quality reproductive engravings',
        'Moral subject matter — painting as a vehicle for civic education rather than sensory pleasure',
        'Winckelmann\'s "noble simplicity and quiet grandeur" as the explicit aesthetic ideal',
        'Rejection of color as morally suspect — line and form privileged over color, which was associated with feminine Rococo sensuality',
      ],

      artists: [
        {
          name: 'Jacques-Louis David',
          years: '1748 – 1825',
          description: 'The supreme painter of Neoclassicism and one of the most politically engaged artists in history. His Oath of the Horatii arrived in Paris in 1785 — four years before the Revolution — and was immediately read as a manifesto of republican sacrifice over private sentiment. He became the official painter of the French Revolution, organizing its public ceremonies and painting its martyrs. Under Napoleon, he became the regime\'s visual architect, transforming the General into a Roman emperor across a series of monumental history paintings. His portraits — cold, precise, psychologically penetrating — are as compelling as his history paintings. He died in Brussels exile, never allowed to return to France.',
        },
        {
          name: 'Antonio Canova',
          years: '1757 – 1822',
          description: 'The greatest sculptor of Neoclassicism and arguably the most technically accomplished marble worker since Bernini — though in almost every other way his opposite. Where Bernini\'s marble was warm, dynamic, and emotionally turbulent, Canova\'s was cool, still, and ideally perfect. His figures — Psyche Revived by Cupid\'s Kiss, the Three Graces, his reclining portraits of Napoleon\'s family — achieve a smooth, polished beauty that seems to transcend material reality. He was, in Stendhal\'s words, "the man who makes you feel the most acutely that marble can express everything." His international reputation was unprecedented — even Britain\'s enemies admired him.',
        },
        {
          name: 'Jean-Auguste-Dominique Ingres',
          years: '1780 – 1867',
          description: 'David\'s greatest student and the last major practitioner of the Neoclassical tradition, Ingres extended it into the mid-19th century while also complicating and transforming it. His obsession with line — described as "the probity of art" — produced figures of almost hallucinatory precision and cool sensuality. His female nudes (La Grande Odalisque, The Turkish Bath) are anatomically impossible — vertebrae added, proportions distorted — yet feel perfectly convincing because the line is so authoritative. His portraits are among the finest of any era. He fought a famous public battle against Delacroix (who represented color, movement, and Romanticism) that organized French artistic opinion for decades.',
        },
        {
          name: 'Bertel Thorvaldsen',
          years: '1770 – 1844',
          description: 'The Danish sculptor who rivaled Canova for the title of greatest Neoclassical sculptor. Working in Rome for most of his career, Thorvaldsen produced monumental friezes, portrait busts, and mythological groups that were installed across Europe in the palaces, museums, and public squares of patrons who collected him like rare coins. His Alexander Frieze for the Quirinal Palace and his Christ and the Apostles for Copenhagen Cathedral represent Neoclassicism at its most serene and architecturally integrated. Unlike Canova, who retained a degree of sensual warmth, Thorvaldsen pushed toward an almost abstract purity of form.',
        },
        {
          name: 'Angelica Kauffman',
          years: '1741 – 1807',
          description: 'One of the most successful painters of the Neoclassical era and one of the two female founding members of the Royal Academy of Arts in London. Swiss-born, she worked across London, Rome, and Naples, producing history paintings, portraits, and allegorical works that demonstrated complete command of the Neoclassical program. Her history paintings — Cornelia, Mother of the Gracchi; Penelope at Her Loom — were popular, widely engraved, and genuinely ambitious. She was a central figure of the international Neoclassical network, a close friend of Winckelmann, Goethe, and Reynolds, and one of the most celebrated artists of her generation.',
        },
        {
          name: 'John Flaxman',
          years: '1755 – 1826',
          description: 'A sculptor and draughtsman whose outline illustrations to Homer, Aeschylus, and Dante became among the most influential images of the Neoclassical era. Flaxman\'s line drawings — pure, unshaded contour lines on white paper, derived from Greek vase painting — were reproduced and disseminated across Europe, influencing everything from Wedgwood pottery to William Blake\'s visual style. As a sculptor, his funerary monuments in English cathedrals set the standard for memorial sculpture for a generation. His work represents the extreme Neoclassical commitment to line as the foundation of all art.',
        },
      ],

      artworks: [
        {
          title: 'Oath of the Horatii',
          artist: 'Jacques-Louis David',
          year: '1784 – 1785',
          type: 'painting',
          medium: 'Oil on canvas',
          location: 'Musée du Louvre, Paris',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Jacques-Louis_David_-_Oath_of_the_Horatii_-_Google_Art_Project.jpg/1280px-Jacques-Louis_David_-_Oath_of_the_Horatii_-_Google_Art_Project.jpg',
          description: 'The manifesto of Neoclassicism. Three brothers swear to fight to the death for Rome while their female relatives weep. The frieze-like composition, stoic male resolve contrasted with female grief, and archaeological precision of the Roman setting made this painting the visual language of the coming Revolution.',
        },
        {
          title: 'Psyche Revived by Cupid\'s Kiss',
          artist: 'Antonio Canova',
          year: '1787 – 1793',
          type: 'sculpture',
          medium: 'Marble',
          location: 'Musée du Louvre, Paris',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Psyche_Revived_by_Cupid%27s_Kiss.jpg/640px-Psyche_Revived_by_Cupid%27s_Kiss.jpg',
          description: 'Canova\'s most beloved work. Cupid leans down to revive the unconscious Psyche, their faces nearly touching in a moment of exquisite tenderness. The technical challenge — marble rendered as soft flesh, floating drapery, intertwined limbs — is solved with such apparent ease that the difficulty becomes invisible.',
        },
        {
          title: 'Napoleon Crossing the Alps',
          artist: 'Jacques-Louis David',
          year: '1801 – 1805',
          type: 'painting',
          medium: 'Oil on canvas',
          location: 'Château de Malmaison, France',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/David_-_Napoleon_crossing_the_Alps_-_Malmaison2.jpg/800px-David_-_Napoleon_crossing_the_Alps_-_Malmaison2.jpg',
          description: 'Political propaganda elevated to art. Napoleon gestures forward on a rearing horse against a dramatic sky — the image of imperial command. In reality Napoleon crossed the Alps on a mule. David\'s transformation of the prosaic into the heroic is Neoclassicism functioning precisely as intended: history painting as political myth-making.',
        },
        {
          title: 'La Grande Odalisque',
          artist: 'Jean-Auguste-Dominique Ingres',
          year: '1814',
          type: 'painting',
          medium: 'Oil on canvas',
          location: 'Musée du Louvre, Paris',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/La_Grande_Odalisque.jpg/1280px-La_Grande_Odalisque.jpg',
          description: 'Ingres\'s most controversial and celebrated work. A reclining harem concubine turns to regard the viewer with cool detachment. Her spine has too many vertebrae, her proportions are anatomically impossible — yet the authority of Ingres\'s line makes every distortion feel like a necessity. It represents Neoclassicism\'s cool sensuality at its most paradoxical.',
        },
        {
          title: 'The Death of Marat',
          artist: 'Jacques-Louis David',
          year: '1793',
          type: 'painting',
          medium: 'Oil on canvas',
          location: 'Royal Museums of Fine Arts, Brussels',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Death_of_Marat_by_David.jpg/640px-Death_of_Marat_by_David.jpg',
          description: 'Revolutionary propaganda and genuine masterpiece simultaneously. The murdered journalist Marat lies in his medicinal bath, a letter in his hand, his wound visible. David stripped the composition to absolute essentials — no background, no theatrical excess — creating an image of revolutionary martyrdom as austere and powerful as any Pietà.',
        },
        {
          title: 'The Three Graces',
          artist: 'Antonio Canova',
          year: '1814 – 1817',
          type: 'sculpture',
          medium: 'Marble',
          location: 'Victoria and Albert Museum, London / Hermitage, St. Petersburg',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Canova-three-graces-2.jpg/640px-Canova-three-graces-2.jpg',
          description: 'Three mythological goddesses of charm — Euphrosyne, Aglaea, and Thalia — stand intertwined in mutual embrace. Canova carved two versions, each exploring the challenge of three interlinked figures from every angle. The work represents his absolute technical peak: the surfaces have a warmth and translucency that seems to deny the marble\'s nature.',
        },
        {
          title: 'Portrait of Madame Récamier',
          artist: 'Jacques-Louis David',
          year: '1800',
          type: 'painting',
          medium: 'Oil on canvas',
          location: 'Musée du Louvre, Paris',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Jacques-Louis_David_-_Portrait_of_Madame_R%C3%A9camier_-_Louvre.jpg/1280px-Jacques-Louis_David_-_Portrait_of_Madame_R%C3%A9camier_-_Louvre.jpg',
          description: 'The most elegant Neoclassical portrait. Juliette Récamier reclines on a Roman couch in a white Empire-style dress, barefoot, her gaze turned toward the viewer with cool self-possession. The stark empty background and classical furnishings create an image of feminine authority that is simultaneously intimate and monumental.',
        },
        {
          title: 'Leonidas at Thermopylae',
          artist: 'Jacques-Louis David',
          year: '1814',
          type: 'painting',
          medium: 'Oil on canvas',
          location: 'Musée du Louvre, Paris',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Jacques-Louis_David_-_Leonidas_at_Thermopylae_-_WGA06079.jpg/1280px-Jacques-Louis_David_-_Leonidas_at_Thermopylae_-_WGA06079.jpg',
          description: 'David\'s meditation on heroic sacrifice. Leonidas and his 300 Spartans prepare to meet their death defending Greece against the Persian army. The frieze of idealized male bodies — stoic, accepting, magnificent — represents the Neoclassical ideal of civic virtue elevated to its most pure expression.',
        },
        {
          title: 'Panthéon',
          artist: 'Jacques-Germain Soufflot',
          year: '1758 – 1790',
          type: 'architecture',
          medium: 'Stone',
          location: 'Paris, France',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Pantheon_of_Paris_007.JPG/1280px-Pantheon_of_Paris_007.JPG',
          description: 'The defining monument of French Neoclassical architecture. Soufflot\'s design synthesized ancient Roman (the Pantheon\'s portico and dome) with Gothic structural principles to create a building of extraordinary lightness and clarity. Originally a church, it was secularized during the Revolution as the resting place for France\'s national heroes.',
        },
        {
          title: 'Cornelia, Mother of the Gracchi',
          artist: 'Angelica Kauffman',
          year: '1785',
          type: 'painting',
          medium: 'Oil on canvas',
          location: 'Virginia Museum of Fine Arts, Richmond',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Angelica_Kauffmann_-_Cornelia%2C_Mother_of_the_Gracchi%2C_Pointing_to_Her_Children_as_Her_Treasures_-_WGA12158.jpg/800px-Angelica_Kauffmann_-_Cornelia%2C_Mother_of_the_Gracchi%2C_Pointing_to_Her_Children_as_Her_Treasures_-_WGA12158.jpg',
          description: 'Kauffman depicts the Roman matron Cornelia, who when asked to display her jewels, points to her children saying "These are my jewels." A paradigmatic Neoclassical subject — Roman virtue illustrated for contemporary moral instruction — rendered with compositional clarity and emotional dignity.',
        },
      ],

      tattooTips: {
        intro: `Neoclassicism offers tattoo artists a vocabulary of extraordinary formal clarity — precise line, planar composition, idealized form, and a visual language with deep roots in both Western art history and contemporary culture. The movement's emphasis on outline over shadow, on the figure as the primary vehicle of meaning, and on restrained emotional expression maps naturally onto several contemporary tattoo aesthetics, from fine-line figurative work to the neo-classical revival in illustrative tattooing.`,
        design: [
          'Embrace the frieze format for horizontal placements: Neoclassical painting arranged figures in a shallow band parallel to the picture surface — like figures on a Greek frieze. This format translates perfectly to forearm, shin, or chest band placements, creating a sense of monumental grandeur at a small scale.',
          'Use stoic, frontally composed portraiture: Neoclassical portraits position subjects with quiet dignity and direct engagement rather than the three-quarter Baroque turn. For portrait tattoos where solemnity and psychological weight are the goal, the frontal or near-frontal composition creates a presence that the oblique angle does not.',
          'Study Greco-Roman sculptural poses for figure work: The contrapposto of Greek sculpture, the relaxed authority of Roman portraiture, the heroic nude — these are among the most compositionally powerful figure archetypes in Western art. They carry cultural weight that enriches figurative tattoos beyond what a purely invented pose can achieve.',
          'Use architectural elements as compositional structure: Columns, arches, pediments, and classical moldings were used in Neoclassical painting as both setting and compositional framework. For sleeve or back compositions, a classical architectural structure — even suggested rather than literally rendered — gives the design a monumental, permanent quality.',
          'Reference cameo and intaglio design: Neoclassical jewelry and decorative arts produced extraordinary profile portraits and mythological scenes in the cameo format — white relief against a dark ground. This is essentially a tattoo-native format: consider designing profile portraits and classical scenes in a cameo-inspired visual language.',
          'Use drapery to describe the body beneath: Neoclassical sculptors used thin, clinging drapery (the "wet drapery" technique) to simultaneously clothe and reveal the body underneath. This creates a more sophisticated and classical result than either nudity or opaque clothing alone — applicable to any figurative tattoo.',
          'Choose subjects with civic or philosophical resonance: Neoclassical subjects — Oath scenes, sacrificial moments, mythological allegories — carry layers of meaning that purely decorative tattoos cannot. For clients who want meaning as well as beauty, the Neoclassical subject repertoire offers tested, culturally resonant imagery.',
          'Study Flaxman\'s outline drawings for pure line work: His silhouette-style illustrations, derived from Greek vase painting, represent the extreme of Neoclassical linear thinking. For fine-line blackwork or outline tattoos, Flaxman\'s drawings offer a masterclass in how to build a convincing figurative scene with the minimum number of lines.',
        ],
        technical: [
          'Prioritize line precision above all else: Neoclassicism is fundamentally a linear art — it privileges the clarity of the outline over the atmosphere of shadow. This means that in Neoclassical-inspired tattooing, the quality of your lines — their consistency, confidence, and precision — is more important than the sophistication of your shading.',
          'Use restrained, even shading: Neoclassical painting used cool, diffuse light that modeled form gently without deep shadows. In tattooing, this translates to smooth, even shading that describes volume without creating dramatic tonal contrast. Think of marble illuminated by diffuse daylight rather than a spotlight.',
          'Study the sculptural quality of light on marble: Canova and Thorvaldsen worked in white marble under controlled lighting — the surfaces show a characteristic cool, polished highlight and a warm, slightly translucent shadow. Reproducing this quality in a black-and-grey tattoo requires understanding how light behaves differently on polished versus matte surfaces.',
          'Use minimal background: Neoclassical compositions frequently placed figures against empty, unpainted backgrounds or simple architectural planes. The same principle applies to tattoos — resist the urge to fill every space. An isolated, precisely rendered classical figure needs no background to command attention.',
          'Render fabric with structural logic and archaeological accuracy: Neoclassical drapery is based on actual Roman garments — the toga, the chiton, the himation — and their folds are structurally consistent with the garment type and the underlying body. For period-accurate Neoclassical imagery, understand how these garments actually worked before tattooing them.',
          'Execute profile portraits with geometric precision: The classical profile was understood as a precise geometric construction — the relationship between brow, nose, lips, and chin measured and calculated. Profile portrait tattoos in the Neoclassical tradition require the same geometric precision; the slightest distortion of proportion undermines the entire aesthetic.',
          'Build white highlights conservatively: The cool, polished surfaces of Neoclassical marble and the even illumination of Neoclassical painting both produce restrained, limited highlights. In tattooing, white ink should be used sparingly — the brightest point in a Neoclassical piece should feel like refined elegance, not a spotlight.',
          'Consider the longevity of fine-line neoclassical work: Neoclassical imagery — profile portraits, mythological scenes, architectural elements — is typically executed in a fine, precise style. Plan for the long-term readability of your work; use sufficient needle size and ink density to ensure the design remains legible as it ages.',
        ],
        inspiration: `Neoclassicism is currently experiencing a major revival in tattooing, driven by the broader cultural re-engagement with classical antiquity in art, fashion, and architecture. Fine-line artists working in profile portrait, cameo-inspired, and Greco-Roman figurative styles are finding a growing audience that wants the cultural weight of classical imagery with contemporary refinement of execution. Artists like Dr. Woo and certain European fine-line practitioners bring a Neoclassical sensibility — precision of line, restraint of shadow, clarity of form — to contemporary subject matter. For large-scale pieces, consider a composition based explicitly on a David painting or Canova sculpture, translated directly onto skin with careful adaptation for the body's three-dimensional surface. The Oath of the Horatii composition, in particular, translates extraordinarily well to the inner forearm or the upper arm.`,
      },

      quiz: [
        {
          question: 'Which German art historian\'s writings helped launch the Neoclassical movement with his concept of "noble simplicity and quiet grandeur"?',
          options: ['Immanuel Kant', 'Johann Joachim Winckelmann', 'Friedrich Schiller', 'Georg Hegel'],
          correctIndex: 1,
        },
        {
          question: 'The rediscovery of which two ancient Roman cities, buried by Vesuvius in 79 AD, greatly inspired Neoclassical artists?',
          options: ['Rome and Carthage', 'Athens and Sparta', 'Pompeii and Herculaneum', 'Troy and Ephesus'],
          correctIndex: 2,
        },
        {
          question: 'Jacques-Louis David\'s Oath of the Horatii was painted in which year, just before the French Revolution?',
          options: ['1776', '1785', '1793', '1799'],
          correctIndex: 1,
        },
        {
          question: 'What is the term for the thin, body-revealing drapery technique used in Neoclassical sculpture that simultaneously clothes and reveals the figure?',
          options: ['Contrapposto drapery', 'Wet drapery', 'Fallen drapery', 'Clinging drapery'],
          correctIndex: 1,
        },
        {
          question: 'Antonio Canova was the supreme sculptor of Neoclassicism. Which nationality was he?',
          options: ['French', 'German', 'Greek', 'Italian'],
          correctIndex: 3,
        },
        {
          question: 'In Neoclassical painting, what did the arrangement of figures in a shallow, frieze-like band derive from?',
          options: ['Medieval tapestry design', 'Ancient Greek and Roman relief sculpture', 'Renaissance altarpiece composition', 'Baroque ceiling painting'],
          correctIndex: 1,
        },
        {
          question: 'Which Neoclassical painter famously declared that "line is the probity of art" and fought a public artistic battle against Delacroix?',
          options: ['Jacques-Louis David', 'Angelica Kauffman', 'Jean-Auguste-Dominique Ingres', 'John Flaxman'],
          correctIndex: 2,
        },
        {
          question: 'Which Neoclassical building in Paris was originally a church before being secularized as a mausoleum for national heroes?',
          options: ['Notre-Dame de Paris', 'Sacré-Cœur', 'The Panthéon', 'The Madeleine'],
          correctIndex: 2,
        },
        {
          question: 'What was the "Grand Tour" in relation to Neoclassical art education?',
          options: [
            'A traveling exhibition of plaster casts from antiquity',
            'A formal journey by young aristocrats to Italy to study ancient monuments and Renaissance masters',
            'A government-sponsored program to teach classical art in schools',
            'A series of lectures by Winckelmann in major European capitals',
          ],
          correctIndex: 1,
        },
        {
          question: 'In the context of Neoclassical tattooing, why is the cameo format particularly appropriate?',
          options: [
            'Because cameos were invented during the Neoclassical period',
            'Because the profile portrait against a plain ground is essentially a tattoo-native format with classical roots',
            'Because cameo colors match standard tattoo ink palettes',
            'Because cameos are the only jewelry form that depicts mythological subjects',
          ],
          correctIndex: 1,
        },
      ],
    },
  },
  {
    id: 'romanticism',
    number: 5,
    name: 'Romanticism',
    period: '1780 – 1850',
    colorPalette: ['#6B4423', '#8B6914', '#3E5F8A', '#5C4033', '#A0522D'],
    status: 'locked',
    releaseDate: '27 Nisan Pazar',
    content: {
      origin: {
        type: 'reaction',
        targetId: 'neoclassicism',
        targetName: 'Neoclassicism',
        explanation: 'Romanticism erupted as a profound reaction against Neoclassicism\'s cold rationalism, civic restraint, and worship of ancient models. Where Neoclassicism trusted reason, clear outlines, and historical precedent, Romanticism trusted feeling, emotion, imagination, and individual experience. The Romantic movement was also a response to the Industrial Revolution\'s mechanization of life and the disillusionment that followed the French Revolution\'s turn to Terror and Napoleon\'s imperial ambitions — both of which had been partly justified in Neoclassical terms. Romanticism declared that the inner life — passion, longing, terror, sublimity, the confrontation with nature\'s overwhelming power — was the proper subject of art.',
      },
      summary: `Romanticism — spanning roughly 1780 to 1850 — was one of the most culturally comprehensive movements in Western history, transforming not just visual art but literature, music, philosophy, and politics simultaneously. It was both a reaction against the Enlightenment's faith in rational progress and an emotional response to the upheavals of revolution, war, and industrialization that reshaped European society in the late 18th and early 19th centuries.

At the heart of Romanticism was a new understanding of what art was for. Where Neoclassicism believed art should teach civic virtue through rational clarity, Romanticism believed art should express the depths of individual feeling and transport the viewer into experiences beyond the reach of reason — terror, ecstasy, the sublime encounter with overwhelming natural forces, the anguish of thwarted love, the longing for an irrecoverable past. The Romantic artist was not a craftsman transmitting received wisdom but a solitary genius expressing a unique inner vision.

This shift had profound consequences for how artists thought about their subjects and their methods. Nature — particularly its most violent and overwhelming aspects (storms, mountains, shipwrecks, volcanic eruptions) — became a primary subject, understood not as background scenery but as a participant in human drama and a mirror of inner states. History was embraced not for its moral lessons (as in Neoclassicism) but for its atmosphere — the Middle Ages, the Orient, and the exotic became screens onto which Romantic fantasies of passion, freedom, and spiritual intensity could be projected.

Romanticism produced a remarkable diversity of national schools — German landscape philosophy, French dramatic history painting, English visionary poetry-painting, Spanish psychological horror, American wilderness celebration — each inflected by local culture and political circumstance. Its legacy extends far beyond the visual arts: Beethoven, Chopin, Schubert, and Wagner were its musical equivalents; Goethe, Byron, Shelley, Keats, and Pushkin its literary voice. No single movement has more comprehensively shaped our modern understanding of what it means to feel, to create, and to experience the world as a subjective, emotionally saturated individual.`,

      characteristics: [
        'Emotional intensity — the primacy of feeling over reason as both subject matter and artistic method',
        'The Sublime — awe before overwhelming natural forces: storms, mountains, volcanoes, the infinite',
        'Nature as protagonist — landscapes expressing psychological states and spiritual meaning rather than serving as mere backgrounds',
        'Individual genius — the Romantic artist as solitary visionary expressing a unique inner world',
        'Medieval revival and Gothic atmosphere — the Middle Ages celebrated for mystery, spirituality, and emotional intensity',
        'Orientalism — the "exotic" East as a fantasy space of intense color, sensuality, and freedom from Western rationalism',
        'Political engagement — Romanticism aligned with nationalist movements, revolutions, and the struggle for liberty',
        'Nocturnal and twilight imagery — night, moonlight, and dusk as emotional and spiritual settings',
        'Dynamic, turbulent composition — diagonal lines, stormy skies, and violent movement replacing Neoclassical stability',
        'Rich, saturated color — especially in the French tradition — as the primary vehicle of emotional expression',
        'Shipwrecks, disasters, and extreme situations — the human figure tested against and overwhelmed by natural or historical forces',
        'Folk culture and national mythology — peasants, ballads, and national epics as sources of authentic cultural identity',
        'Melancholy and longing (Sehnsucht) — the beauty of unattainable ideals and irrecoverable pasts',
        'Visionary and supernatural subjects — dreams, hallucinations, spirits, and the boundary between waking and otherworldly experience',
      ],

      artists: [
        {
          name: 'Francisco Goya',
          years: '1746 – 1828',
          description: 'The most complex and disturbing painter of the Romantic era — and arguably of any era. Goya began as a court painter in the Rococo tradition and ended, after witnessing the Napoleonic invasion of Spain, by painting the darkest images in Western art history. His Third of May, 1808 transformed massacre into one of the most powerful anti-war paintings ever made; his Black Paintings — painted on the walls of his private house in what may have been a state of psychological crisis — descend into visions of collective madness, violence, and the dissolution of reason. He was also the greatest printmaker of his generation. Goya has no clear successor; he stands alone.',
        },
        {
          name: 'Caspar David Friedrich',
          years: '1774 – 1840',
          description: 'The supreme painter of the German Romantic tradition and the artist who most completely realized the Romantic ideal of landscape as spiritual experience. His characteristic motif — a solitary figure standing with their back to the viewer, contemplating a vast, misty, sublime landscape — became one of the defining images of modernity: the individual confronting an indifferent and overwhelming universe. His Wanderer above the Sea of Fog remains the single most iconic image of Romantic philosophy. The technical restraint of his painting — cool, precise, almost otherworldly — creates a quality of silent immensity that no other landscape artist has achieved.',
        },
        {
          name: 'Eugène Delacroix',
          years: '1798 – 1863',
          description: 'The greatest French Romantic painter and the leading opponent of Ingres\'s Neoclassical line in the famous "Poussinistes vs. Rubenistes" controversy that polarized French artistic opinion. Delacroix championed color over line, movement over stillness, and emotional intensity over rational calm. His Liberty Leading the People fused allegory and eyewitness journalism into one image of revolutionary power; his Massacre at Chios was called "a massacre of painting" by critics who couldn\'t accept its deliberate coloristic chaos. His journal — published after his death — is one of the greatest documents on painting ever written. He was also an extraordinary colorist who directly influenced the Impressionists.',
        },
        {
          name: 'J.M.W. Turner',
          years: '1775 – 1851',
          description: 'The most radical painter of his generation and one of the most innovative in history, Turner pushed landscape painting to the edge of abstraction. His late works — swirling vortices of light, color, and atmosphere in which ships, mountains, and sunsets dissolve into pure sensation — anticipate Impressionism and Abstract Expressionism simultaneously. He was fascinated by the new industrial world (Rain, Steam and Speed depicts a locomotive) but rendered it with the same sublime emotional charge he applied to ancient myth and Alpine storms. His technique — building paint in translucent glazes over a white ground to achieve extraordinary luminosity — was completely personal and almost impossible to teach.',
        },
        {
          name: 'Théodore Géricault',
          years: '1791 – 1824',
          description: 'A meteor of the French Romantic movement who died at 32 from injuries sustained in a riding accident, leaving behind a body of work of extraordinary power. The Raft of the Medusa — a painting 16 feet tall depicting the survivors of a famous shipwreck disaster — was one of the most ambitious and disturbing paintings ever shown at the Paris Salon. To prepare it, Géricault visited hospitals, studied corpses, and interviewed survivors; the result has a physical and psychological weight that borders on the unbearable. His lithographs of military subjects and his series of portraits of the insane (made in collaboration with a psychiatrist) demonstrate a range and technical command remarkable for such a short career.',
        },
        {
          name: 'William Blake',
          years: '1757 – 1827',
          description: 'The most visionary and intellectually complex artist of the Romantic era — a poet, engraver, painter, and prophet who inhabited a world entirely his own. Blake rejected both Neoclassical rationalism and the Church of England\'s conventional Christianity, developing an elaborate private mythology of good and evil, imagination and reason, body and spirit, that he expressed through illustrated books combining text and image in unprecedented ways. His figures — muscular, flame-like, bursting with energy — are unlike anything in academic painting. His Ancient of Days, Newton, and illustrations to Dante and the Book of Job are among the most powerful images in the English visual tradition.',
        },
      ],

      artworks: [
        {
          title: 'Wanderer above the Sea of Fog',
          artist: 'Caspar David Friedrich',
          year: 'c. 1818',
          type: 'painting',
          medium: 'Oil on canvas',
          location: 'Hamburger Kunsthalle, Hamburg',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg/800px-Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg',
          description: 'The defining image of Romantic philosophy. A man stands on a rocky summit, his back to us, contemplating a vast fog-filled valley. We see what he sees; we share his solitude. The painting captures the modern experience of the individual confronting an infinite, indifferent universe — lonely, sublime, and achingly beautiful.',
        },
        {
          title: 'The Raft of the Medusa',
          artist: 'Théodore Géricault',
          year: '1818 – 1819',
          type: 'painting',
          medium: 'Oil on canvas',
          location: 'Musée du Louvre, Paris',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/JEAN_LOUIS_TH%C3%89ODORE_G%C3%89RICAULT_-_La_Balsa_de_la_Medusa_%28Museo_del_Louvre%2C_1818-19%29.jpg/1280px-JEAN_LOUIS_TH%C3%89ODORE_G%C3%89RICAULT_-_La_Balsa_de_la_Medusa_%28Museo_del_Louvre%2C_1818-19%29.jpg',
          description: 'The most ambitious and disturbing painting of French Romanticism. Survivors of a government-caused shipwreck — some dying, some mad, some desperately signaling a distant ship — are arranged in a massive diagonal wave of bodies. Géricault studied actual corpses to paint it. The result is overwhelming in its physical and moral weight.',
        },
        {
          title: 'Liberty Leading the People',
          artist: 'Eugène Delacroix',
          year: '1830',
          type: 'painting',
          medium: 'Oil on canvas',
          location: 'Musée du Louvre, Paris',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Eug%C3%A8ne_Delacroix_-_La_libert%C3%A9_guidant_le_peuple.jpg/1280px-Eug%C3%A8ne_Delacroix_-_La_libert%C3%A9_guidant_le_peuple.jpg',
          description: 'One of the most politically powerful paintings in history. An allegorical Liberty — bare-breasted, tricolor flag raised — leads citizens over the bodies of the fallen. Delacroix fused classical allegory with journalistic immediacy to create an image of revolutionary energy that became the visual identity of modern France.',
        },
        {
          title: 'The Third of May 1808',
          artist: 'Francisco Goya',
          year: '1814',
          type: 'painting',
          medium: 'Oil on canvas',
          location: 'Museo del Prado, Madrid',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/El_Tres_de_Mayo%2C_by_Francisco_de_Goya%2C_from_Prado_thin_black_margin.jpg/1280px-El_Tres_de_Mayo%2C_by_Francisco_de_Goya%2C_from_Prado_thin_black_margin.jpg',
          description: 'The greatest anti-war painting ever made. A Spanish civilian, arms spread in a Christ-like gesture, faces a line of French soldiers in the moment before execution. Goya\'s masterstroke was making the soldiers anonymous, mechanical, faceless — while the victim\'s face blazes with terror and defiance. Every great anti-war image since owes something to this painting.',
        },
        {
          title: 'The Fighting Temeraire',
          artist: 'J.M.W. Turner',
          year: '1839',
          type: 'painting',
          medium: 'Oil on canvas',
          location: 'National Gallery, London',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/The_Fighting_Temeraire%2C_JMW_Turner%2C_National_Gallery.jpg/1280px-The_Fighting_Temeraire%2C_JMW_Turner%2C_National_Gallery.jpg',
          description: 'Turner\'s elegy for the age of sail, repeatedly voted the greatest painting in Britain. The Temeraire — a veteran of Trafalgar — is towed to the breakers\' yard by a steam tugboat at sunset. The ghostly white ship and the blazing industrial sun create a meditation on time, progress, and loss that is also one of the most visually spectacular paintings in history.',
        },
        {
          title: 'Saturn Devouring His Son',
          artist: 'Francisco Goya',
          year: '1819 – 1823',
          type: 'painting',
          medium: 'Oil mural transferred to canvas',
          location: 'Museo del Prado, Madrid',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Francisco_de_Goya%2C_Saturno_devorando_a_su_hijo_%281819-1823%29.jpg/640px-Francisco_de_Goya%2C_Saturno_devorando_a_su_hijo_%281819-1823%29.jpg',
          description: 'The most terrifying of Goya\'s Black Paintings, painted on the walls of his private home. Saturn — wild-eyed, manic — devours a human figure. The painting has no clear interpretation, only a visceral impact of absolute dread. It stands outside any artistic tradition and anticipates Expressionism and psychological horror art by a century.',
        },
        {
          title: 'The Ancient of Days',
          artist: 'William Blake',
          year: '1794',
          type: 'painting',
          medium: 'Watercolor etching',
          location: 'British Museum, London',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Blake_ancient_of_days.jpg/480px-Blake_ancient_of_days.jpg',
          description: 'Blake\'s most iconic image: a divine figure — Urizen, Blake\'s god of reason and limitation — crouches in a circle of fiery light, compass in hand, imposing geometric order on chaos below. The visual power of the image — the muscular god, the radiating light, the downward-reaching arm — is immediately captivating even without knowledge of Blake\'s mythology.',
        },
        {
          title: 'The Nightmare',
          artist: 'Henry Fuseli',
          year: '1781',
          type: 'painting',
          medium: 'Oil on canvas',
          location: 'Detroit Institute of Arts, Michigan',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/John_Henry_Fuseli_-_The_Nightmare.JPG/800px-John_Henry_Fuseli_-_The_Nightmare.JPG',
          description: 'One of the most influential Romantic paintings ever made. A sleeping woman lies across a bed while a grotesque incubus crouches on her chest and a wild-eyed horse peers through dark curtains. Fuseli painted the unconscious — dreams, nightmares, erotic terror — decades before Freud named these experiences. Its influence on horror, fantasy, and Surrealism is incalculable.',
        },
        {
          title: 'Snow Storm — Steam-Boat off a Harbour\'s Mouth',
          artist: 'J.M.W. Turner',
          year: '1842',
          type: 'painting',
          medium: 'Oil on canvas',
          location: 'Tate Britain, London',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Joseph_Mallord_William_Turner_-_Snow_Storm_-_Steam-Boat_off_a_Harbour%27s_Mouth.jpg/1280px-Joseph_Mallord_William_Turner_-_Snow_Storm_-_Steam-Boat_off_a_Harbour%27s_Mouth.jpg',
          description: 'Turner\'s supreme statement on the Sublime. A steamship struggles in a vortex of snow, water, and wind that virtually dissolves the vessel into pure atmospheric sensation. Turner reportedly had himself lashed to the mast to experience the storm directly. When critics called it "soapsuds and whitewash," he replied he did not paint for such people.',
        },
        {
          title: 'Ophelia',
          artist: 'John Everett Millais',
          year: '1851 – 1852',
          type: 'painting',
          medium: 'Oil on canvas',
          location: 'Tate Britain, London',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/John_Everett_Millais_-_Ophelia_-_Google_Art_Project.jpg/1280px-John_Everett_Millais_-_Ophelia_-_Google_Art_Project.jpg',
          description: 'The Pre-Raphaelite masterwork of Romantic sensibility. Ophelia drifts in a flower-studded stream, her face serene in the moment of drowning. Millais\'s botanically precise rendering of every plant and flower (the model Elizabeth Siddal reportedly caught pneumonia posing in a bath for months) creates an image of beauty and death of haunting power.',
        },
      ],

      tattooTips: {
        intro: `Romanticism is the art historical movement most naturally aligned with contemporary tattoo culture. Its celebration of the individual, its embrace of darkness and the supernatural, its preference for emotional intensity over rational order, its love of nature's overwhelming power, its engagement with death, transformation, and the spiritual — all of these preoccupations map directly onto the most enduring themes in serious tattooing. Understanding Romanticism is not just useful for tattooers; it is almost a description of what meaningful tattooing already is.`,
        design: [
          'Embrace the Rückenfigur (back-turned figure) for mystery and scale: Friedrich\'s signature motif — the figure seen from behind, facing a vast landscape — creates a powerful compositional strategy for tattoos. It places the viewer in the position of the subject, creates a sense of scale, and leaves the emotional interpretation open. Use it for landscape sleeves or back pieces where a human figure is needed to anchor the composition.',
          'Use nature as psychological extension: In Romantic landscape painting, the weather, light, and atmospheric conditions are never neutral — they mirror the emotional state of the subject or the intended feeling of the piece. When designing nature-based tattoos, make deliberate choices about light (stormy, golden, misty) that reinforce the emotional intention of the work.',
          'Mine disaster and extremity for compositional power: Géricault\'s Raft of the Medusa demonstrates how to organize a complex group of figures in extreme physical and psychological states into a coherent, powerful composition. The diagonal rising wave of bodies — from prostrate despair at the bottom to desperate hope at the top — is a compositional template applicable to any multi-figure tattoo.',
          'Use the diagonal as the primary line of force: Romantic compositions rejected Neoclassical horizontal stability for dynamic diagonal axes. For any piece intending emotional urgency — a storm scene, a figure in motion, an action composition — organize the primary lines of the design along a strong diagonal rather than a vertical or horizontal.',
          'Incorporate atmospheric perspective aggressively: Romantic landscape paintings use atmospheric perspective more dramatically than any previous tradition — foreground elements are dark and crisp, while the middle and far distance dissolve into luminous haze. In sleeve and back piece landscapes, push this atmospheric dissolution as far as possible to create depth and mystery.',
          'Consider the storm as a compositional subject: The storm — waves, lightning, swirling clouds, wind-bent trees — is one of the most powerful compositional subjects available for tattooing. Study Turner\'s vortex compositions for how to organize chaotic natural forces into a dynamic, readable design. The key is finding a single strong spiral or diagonal within the apparent chaos.',
          'Use nocturnal settings for emotional depth: Night, moonlight, and the boundary between visible and invisible are quintessentially Romantic. For tattoos where mystery, introspection, or the supernatural are the intended mood, a nocturnal setting achieves effects that daytime compositions cannot.',
          'Reference Fuseli and Blake for supernatural and visionary subjects: Both artists worked extensively with dream imagery, supernatural beings, and the visual representation of psychological states — an almost exactly parallel project to what tattooers working with personal symbolism and spiritual imagery do today. Their figure types (muscular, ecstatic, windswept) are directly applicable.',
        ],
        technical: [
          'Develop a vocabulary for atmospheric effects: Turner\'s achievement was rendering atmosphere — fog, spray, smoke, blizzard — as a primary subject rather than a background condition. In tattooing, the ability to create soft, luminous, atmospheric areas requires mastery of whip shading, feathering, and the gradual dissolution of form into white or open skin.',
          'Use color temperature to create emotional atmosphere: Romantic painters were highly sophisticated users of color temperature — warm firelight against cold moonlight, warm skin against icy snow, golden sunsets bleeding into blue-grey dusk. In color tattooing, manipulating the temperature of adjacent areas (warm vs. cool) creates emotional atmosphere more effectively than increasing saturation.',
          'Study how Delacroix built his color: He applied color in small, separate strokes of adjacent hues that mix optically rather than physically — directly anticipating Impressionist technique. In color tattooing, particularly for loose, expressive pieces, similar approaches (adjacent strokes of warm and cool, light and dark) create vibration and energy that blended color cannot.',
          'Handle darkness differently from Baroque: Romantic darkness is not tenebristic — it is atmospheric. The shadows in Friedrich or Turner are not black voids; they are dark blue-grey, slightly luminous, hinting at detail. Achieving Romantic darkness in tattooing requires working with dark blues and cool greys rather than pure black, and maintaining slight value differentiation within the shadow areas.',
          'Build figurative work with expressive freedom: Unlike Neoclassical precision, Romantic figure painting was allowed — even encouraged — to show the marks of making: Delacroix\'s figures have a loose, slightly rough energy that is part of their expressiveness. In figurative tattoo work with a Romantic sensibility, allow for slightly less clinical precision in favor of expressiveness at the edges of forms.',
          'Capture movement and wind: One of Romanticism\'s primary subjects — figures, trees, and fabric caught in storm-force movement — requires understanding how forms behave under directional force. Hair, drapery, and leaves all follow the same wind logic. Rendering believable movement is a key technical skill for Romantic-themed tattoos.',
          'Develop skills in landscape shading: Romantic landscape painting — particularly in the German and English traditions — demands the ability to create subtle variations in a limited tonal range: the difference between a misty valley and a clear sky is a matter of extremely controlled, graduated shading in the lightest areas of the value scale.',
          'Study Goya\'s technical economy: The Black Paintings are some of the most technically economical paintings in history — vast areas of tone with minimal marks, achieving maximum psychological impact through simplification. For dark, psychologically intense imagery, Goya\'s approach suggests that less is often more: a face emerging from minimal darkness is more disturbing than one embedded in elaborate detail.',
        ],
        inspiration: `Romanticism is so thoroughly woven into contemporary tattoo culture that most tattoers are working in its tradition without knowing it. The entire tradition of neo-traditional tattooing — with its romantic imagery of wolves, storms, skulls, ravens, and solitary figures in landscapes — is essentially Romantic art. The psychological portrait tradition that engages with trauma, memory, and inner states is directly Romantic. The prevalence of nature themes (forests, oceans, mountains) as vehicles for emotional expression rather than mere decoration is Romantic. For tattoers who want to deepen their engagement with this tradition, spending time with Friedrich's landscapes, Géricault's figural compositions, Turner's atmospheric vortices, and Goya's dark psychology will clarify and deepen what is already present in their work. For specific compositional models: Friedrich's Wanderer is one of the most transferable single compositions in art history for back pieces and sleeve-ending shoulder compositions. The Raft of the Medusa diagonal is unsurpassed for multi-figure compositions on the back or thigh. Turner's vortex compositions work extraordinary well wrapped around a forearm or upper arm.`,
      },

      quiz: [
        {
          question: 'Which Romantic painter\'s "Black Paintings" — created on the walls of his private home — are considered among the darkest and most psychologically disturbing images in Western art history?',
          options: ['Eugène Delacroix', 'Caspar David Friedrich', 'Francisco Goya', 'Henry Fuseli'],
          correctIndex: 2,
        },
        {
          question: 'Caspar David Friedrich\'s recurring motif of a solitary figure seen from behind, facing a vast landscape, is called what in German?',
          options: ['Weltschmerz', 'Rückenfigur', 'Sehnsucht', 'Wanderlust'],
          correctIndex: 1,
        },
        {
          question: 'What is the "Sublime" in Romantic art theory?',
          options: [
            'The highest achievement of technical skill in painting',
            'A sense of awe and overwhelm before vast, powerful natural forces that transcend rational comprehension',
            'The ideal of beauty inherited from ancient Greece',
            'The moral virtue expressed through classical subject matter',
          ],
          correctIndex: 1,
        },
        {
          question: 'Géricault\'s The Raft of the Medusa depicts which type of event?',
          options: ['A mythological battle at sea', 'A naval battle during the Napoleonic Wars', 'The aftermath of a real shipwreck caused by government incompetence', 'A storm at sea during the voyages of discovery'],
          correctIndex: 2,
        },
        {
          question: 'J.M.W. Turner\'s late paintings are significant partly because they anticipate which later movement?',
          options: ['Surrealism and Dada', 'Impressionism and Abstract Expressionism', 'Pop Art and Minimalism', 'Realism and Naturalism'],
          correctIndex: 1,
        },
        {
          question: 'Delacroix and Ingres famously represented opposing sides of which artistic debate in 19th-century France?',
          options: [
            'Classicism vs. Romanticism (line vs. color)',
            'Religious vs. secular subject matter',
            'French vs. Italian influence',
            'Oil painting vs. watercolor',
          ],
          correctIndex: 0,
        },
        {
          question: 'Henry Fuseli\'s The Nightmare (1781) is significant because it was among the first artworks to depict what?',
          options: [
            'Industrial subjects in oil painting',
            'Non-Western subjects in European painting',
            'The unconscious mind, dreams, and psychological terror',
            'Working-class subjects in history painting',
          ],
          correctIndex: 2,
        },
        {
          question: 'Which Romantic work by Delacroix fused allegorical and journalistic imagery to become the visual identity of modern France?',
          options: ['The Massacre at Chios', 'Death of Sardanapalus', 'Liberty Leading the People', 'Women of Algiers'],
          correctIndex: 2,
        },
        {
          question: 'William Blake was unique among Romantic artists because he combined visual art with what other creative practice?',
          options: ['Music composition', 'Poetry and mythological writing, integrated in illustrated books', 'Scientific illustration and natural history', 'Architecture and urban planning'],
          correctIndex: 1,
        },
        {
          question: 'In Romantic landscape painting, what is "atmospheric perspective" used to achieve?',
          options: [
            'To indicate the time of day in outdoor scenes',
            'To create depth by dissolving distant forms into luminous haze and cooler tones',
            'To demonstrate the painter\'s technical skill with gradients',
            'To indicate weather conditions relevant to the narrative',
          ],
          correctIndex: 1,
        },
      ],
    },
  },
  {
    id: 'realism',
    number: 6,
    name: 'Realism',
    period: '1840 – 1880',
    colorPalette: ['#8B7D6B', '#A0926B', '#6B6348', '#C4A882', '#4A4A3A'],
    status: 'locked',
    releaseDate: '4 Mayıs Pazar',
  },
  {
    id: 'impressionism',
    number: 7,
    name: 'Impressionism',
    period: '1860 – 1890',
    colorPalette: ['#6B8FAD', '#A2C4D9', '#7BA3BD', '#4A7FA5', '#89B3CC'],
    status: 'locked',
    releaseDate: '11 Mayıs Pazar',
  },
  {
    id: 'post-impressionism',
    number: 8,
    name: 'Post-Impressionism',
    period: '1880 – 1910',
    colorPalette: ['#2E4057', '#4A6FA5', '#1B3A5C', '#6B8FAD', '#0F2744'],
    status: 'locked',
    releaseDate: '18 Mayıs Pazar',
  },
  {
    id: 'symbolism',
    number: 9,
    name: 'Symbolism',
    period: '1880 – 1910',
    colorPalette: ['#C4A832', '#8B7D2A', '#D4B83C', '#6B6320', '#E8D264'],
    status: 'locked',
    releaseDate: '25 Mayıs Pazar',
  },
  {
    id: 'art-nouveau',
    number: 10,
    name: 'Art Nouveau',
    period: '1890 – 1910',
    colorPalette: ['#E8D5B7', '#C4A882', '#F5E6CC', '#A08060', '#D4C4A8'],
    status: 'locked',
    releaseDate: '1 Haziran Pazar',
  },
  {
    id: 'fauvism',
    number: 11,
    name: 'Fauvism',
    period: '1904 – 1908',
    colorPalette: ['#E84430', '#FF5733', '#C23616', '#FF6B4A', '#A52714'],
    status: 'locked',
    releaseDate: '8 Haziran Pazar',
  },
  {
    id: 'expressionism',
    number: 12,
    name: 'Expressionism',
    period: '1905 – 1933',
    colorPalette: ['#8B6914', '#A07828', '#6B5210', '#C4A832', '#4A3A0A'],
    status: 'locked',
    releaseDate: '15 Haziran Pazar',
  },
  {
    id: 'cubism',
    number: 13,
    name: 'Cubism',
    period: '1907 – 1922',
    colorPalette: ['#B8A88A', '#8E7F6D', '#6B5B4A', '#C4B196', '#4A4035'],
    status: 'locked',
    releaseDate: '22 Haziran Pazar',
  },
  {
    id: 'futurism',
    number: 14,
    name: 'Futurism',
    period: '1909 – 1944',
    colorPalette: ['#6B8FAD', '#4A6FA5', '#8B7D6B', '#A0926B', '#3E5F8A'],
    status: 'locked',
    releaseDate: '29 Haziran Pazar',
  },
  {
    id: 'dadaism',
    number: 15,
    name: 'Dadaism',
    period: '1916 – 1924',
    colorPalette: ['#1A1A1A', '#E8E8E8', '#FF0000', '#FFD700', '#0000FF'],
    status: 'locked',
    releaseDate: '6 Temmuz Pazar',
  },
  {
    id: 'bauhaus',
    number: 16,
    name: 'Bauhaus',
    period: '1919 – 1933',
    colorPalette: ['#E84430', '#1B5AA5', '#F5C518', '#1A1A1A', '#E8E8E8'],
    status: 'locked',
    releaseDate: '13 Temmuz Pazar',
  },
  {
    id: 'surrealism',
    number: 17,
    name: 'Surrealism',
    period: '1924 – 1966',
    colorPalette: ['#C4A832', '#6B4423', '#3E5F8A', '#8B6914', '#2E4057'],
    status: 'locked',
    releaseDate: '20 Temmuz Pazar',
  },
  {
    id: 'abstract-expressionism',
    number: 18,
    name: 'Abstract Expressionism',
    period: '1943 – 1965',
    colorPalette: ['#1A1A1A', '#8B0000', '#FFD700', '#FFFFFF', '#4A4A4A'],
    status: 'locked',
    releaseDate: '27 Temmuz Pazar',
  },
  {
    id: 'pop-art',
    number: 19,
    name: 'Pop Art',
    period: '1955 – 1970',
    colorPalette: ['#FF1493', '#00BFFF', '#FFD700', '#FF4500', '#32CD32'],
    status: 'locked',
    releaseDate: '3 Ağustos Pazar',
  },
  {
    id: 'minimalism',
    number: 20,
    name: 'Minimalism',
    period: '1960 – 1975',
    colorPalette: ['#E8E8E8', '#B0B0B0', '#1A1A1A', '#FFFFFF', '#808080'],
    status: 'locked',
    releaseDate: '10 Ağustos Pazar',
  },
  {
    id: 'conceptual-art',
    number: 21,
    name: 'Conceptual Art',
    period: '1960 – Present',
    colorPalette: ['#4A4A4A', '#808080', '#FFFFFF', '#1A1A1A', '#C0C0C0'],
    status: 'locked',
    releaseDate: '17 Ağustos Pazar',
  },
  {
    id: 'contemporary-art',
    number: 22,
    name: 'Contemporary Art',
    period: '1970 – Present',
    colorPalette: ['#FF6B4A', '#4A6FA5', '#FFD700', '#32CD32', '#8B008B'],
    status: 'locked',
    releaseDate: '24 Ağustos Pazar',
  },
];

