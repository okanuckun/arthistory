import stPetersBasilica from '@/assets/st-peters-basilica.jpeg';

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

export interface MovementContent {
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
  content?: MovementContent;
}

export const artMovements: ArtMovement[] = [
  {
    id: 'renaissance',
    number: 1,
    name: 'Renaissance',
    period: '1400 - 1600',
    colorPalette: ['#8B6914', '#5C4033', '#6B7F3B', '#D4A76A', '#3E5F8A'],
    status: 'active',
    content: {
      summary: `The Renaissance -- meaning "rebirth" in French -- was one of the most transformative cultural revolutions in human history. Born in the city-states of 14th-century Italy, particularly Florence, it represented a sweeping rediscovery of Classical Antiquity and a radical reimagining of what art could be. After nearly a millennium in which medieval art had prioritized spiritual symbolism over physical reality, Renaissance artists turned their gaze toward the observable world with a passion that bordered on the scientific.

At its core, the Renaissance was driven by Humanism -- a philosophical movement that placed human beings, rather than divine authority, at the center of intellectual life. Artists and thinkers studied ancient Greek and Roman texts, sculptures, and architecture not merely as historical relics, but as living models for a new civilization. This shift had profound consequences for visual art: figures became anatomically believable, landscapes receded convincingly into the distance, and emotions were rendered with psychological depth.

The movement unfolded in distinct phases. The Early Renaissance (roughly 1400-1490) was centered in Florence, where artists like Botticelli and Masaccio laid the groundwork. The High Renaissance (1490-1527), dominated by Leonardo, Michelangelo, and Raphael, represented the peak of technical achievement and idealized beauty. The Late Renaissance, or Mannerism (post-1527), saw artists deliberately distorting Renaissance ideals -- elongating figures, intensifying colors, and introducing emotional unease -- as a response to political and religious turmoil.

Two technical inventions defined the era's visual language above all else: linear perspective, which created the mathematical illusion of three-dimensional space on a flat surface, and chiaroscuro, the mastery of light and shadow to model three-dimensional form. Together they gave Renaissance paintings a sense of weight, depth, and drama never seen before. Oil paint, gradually replacing tempera, allowed artists to build up translucent layers of color, achieving a luminous realism that still astonishes viewers today.`,

      characteristics: [
        'Linear perspective -- mathematical system for creating the illusion of depth on a flat surface',
        'Chiaroscuro -- dramatic contrasts of light and shadow to model three-dimensional form',
        'Sfumato -- Leonardo\'s technique of blurring outlines with soft, smoky transitions',
        'Anatomical accuracy -- figures based on direct observation and dissection of the human body',
        'Humanism -- philosophy placing human experience, reason, and beauty at the center of art',
        'Classical revival -- direct study and reinterpretation of Ancient Greek and Roman models',
        'Idealized naturalism -- beauty rooted in observation but elevated toward an ideal form',
        'Oil painting -- layered glazes enabling luminous color depth and subtle texture',
        'Fresco technique -- large-scale wall painting in wet plaster, mastered for architectural spaces',
        'Triangular composition -- figures arranged in stable pyramid structures for visual harmony',
        'Psychological portraiture -- faces and gestures conveying inner emotional states',
        'Patronage culture -- wealthy families like the Medici funding art as political and spiritual prestige',
        'Secular subjects alongside religious -- mythology, portraiture, and allegory gaining prominence',
        'Architectural integration -- paintings and sculptures designed in dialogue with their spaces',
      ],

      artists: [
        {
          name: 'Leonardo da Vinci',
          years: '1452 - 1519',
          description: 'The archetypal "Renaissance man," Leonardo was simultaneously a painter, anatomist, engineer, musician, and theorist. His notebooks -- filled with dissections, mechanical inventions, and studies of water, light, and botany -- reveal a mind driven by insatiable curiosity. In painting, he developed the sfumato technique to its peak: the edges of forms dissolve into atmospheric haze, giving figures like the Mona Lisa an ineffable presence. His The Last Supper revolutionized narrative painting by using architecture, gesture, and psychological tension to dramatize a single frozen moment. Leonardo completed relatively few paintings, yet each one fundamentally altered the course of art history.',
        },
        {
          name: 'Michelangelo Buonarroti',
          years: '1475 - 1564',
          description: 'Michelangelo approached every medium with the ferocity of a man who believed art was an act of spiritual release. As a sculptor, his concept of "non-finito" -- leaving parts of the marble uncarved -- suggested figures struggling to emerge from raw stone. His David stands as the supreme Renaissance statement on the heroic human body: every muscle, vein, and tendon rendered with anatomical precision and charged with psychological tension. On the Sistine Chapel ceiling, painted almost entirely alone over four years, he compressed an entire theological universe into some 500 figures, each a masterwork of foreshortening and dramatic gesture. In his late career, his style grew increasingly tormented and spiritual, anticipating the emotional intensity of Mannerism and Baroque.',
        },
        {
          name: 'Raphael Sanzio',
          years: '1483 - 1520',
          description: `Where Leonardo probed and Michelangelo struggled, Raphael made everything look effortless. His paintings radiate a serene, luminous harmony that represents perhaps the purest expression of Renaissance ideals. His Madonnas elevated the sacred feminine through perfect compositional balance and tender psychological warmth. The School of Athens -- a vast fresco in the Vatican's Stanza della Segnatura -- organized the great philosophers of antiquity into a theatrical, architecturally convincing space, effectively writing a visual encyclopedia of human knowledge. Raphael died at 37, yet his influence on Western painting's sense of grace and beauty persisted for centuries.`,
        },
        {
          name: 'Sandro Botticelli',
          years: '1445 - 1510',
          description: `Botticelli's work occupies a unique place in the Renaissance: deeply personal, richly symbolic, and visually unlike anyone else. His figures have an otherworldly elongation and a melancholy grace that sets them apart from the more grounded naturalism of his contemporaries. The Birth of Venus and Primavera are among the first large-scale mythological paintings in Western art -- commissioned by the Medici and saturated with Neoplatonic philosophy about love, beauty, and the soul. His lines are exquisite: contours flow like music, drapery cascades in elegant arcs, and faces carry a haunting introspective quality. In later life, under the influence of the preacher Savonarola, he reportedly destroyed many of his secular works and his style grew stark and spiritual.`,
        },
        {
          name: 'Titian (Tiziano Vecellio)',
          years: 'c. 1488 - 1576',
          description: 'The undisputed master of Venetian painting, Titian transformed oil paint into something almost magical. His loose, gestural brushwork -- applied in dozens of translucent layers -- created surfaces that seemed to glow from within, capturing the texture of skin, silk, armor, and foliage with equal virtuosity. Where Florentine Renaissance prized line and disegno (drawing), the Venetian tradition championed colore (color), and Titian was its supreme exponent. His late works, painted when he was in his eighties, are among the most proto-Impressionist paintings in art history -- dissolving form into pure light and pigment. His portraits of popes, emperors, and noblemen defined the visual language of power for a century.',
        },
        {
          name: 'Albrecht Durer',
          years: '1471 - 1528',
          description: 'The Northern Renaissance found its greatest voice in Durer, a German artist who made multiple trips to Italy and synthesized Italian spatial and anatomical knowledge with the Northern European tradition of meticulous observation and intense naturalism. His self-portraits -- confident, almost Christ-like -- were radical statements of artistic identity and dignity. As a printmaker, he elevated woodcut and engraving to the level of fine art, achieving a tonal range and detail in black-and-white that rivals painting. His Melencolia I is one of the most analyzed images in Western art, dense with symbolism about creativity, knowledge, and melancholy. Durer essentially brought the Renaissance to Northern Europe single-handedly.',
        },
      ],

      artworks: [
        {
          title: 'Mona Lisa',
          artist: 'Leonardo da Vinci',
          year: '1503 - 1519',
          type: 'painting',
          medium: 'Oil on poplar panel',
          location: 'Musee du Louvre, Paris',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/402px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
          description: `The most recognized painting in the world. Leonardo's mastery of sfumato gives the figure an ethereal, atmospheric presence. The ambiguous smile and direct gaze have fascinated viewers for five centuries.`,
        },
        {
          title: 'The Creation of Adam',
          artist: 'Michelangelo',
          year: '1508 - 1512',
          type: 'fresco',
          medium: 'Fresco on plaster',
          location: 'Sistine Chapel, Vatican City',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg/1280px-Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg',
          description: `The iconic image of God reaching toward Adam represents the pinnacle of Renaissance figure painting. The composition's tension between two outstretched hands -- almost but not quite touching -- is one of the most powerful gestures in art history.`,
        },
        {
          title: 'The Birth of Venus',
          artist: 'Sandro Botticelli',
          year: 'c. 1484 - 1486',
          type: 'painting',
          medium: 'Tempera on canvas',
          location: 'Uffizi Gallery, Florence',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/1280px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg',
          description: `One of the first large-scale mythological paintings of the Renaissance. Botticelli's Venus embodies the Neoplatonic ideal of divine beauty -- her elegant, elongated form rising from the sea in a swirl of wind, flowers, and drapery.`,
        },
        {
          title: 'The School of Athens',
          artist: 'Raphael',
          year: '1509 - 1511',
          type: 'fresco',
          medium: 'Fresco',
          location: 'Apostolic Palace, Vatican City',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg/1280px-%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg',
          description: `Raphael's supreme achievement in composition. All the great philosophers of antiquity gather beneath a vast classical arch -- Plato and Aristotle at center, surrounded by Socrates, Pythagoras, Euclid, and Diogenes. A visual encyclopedia of human knowledge.`,
        },
        {
          title: 'David',
          artist: 'Michelangelo',
          year: '1501 - 1504',
          type: 'sculpture',
          medium: 'White Carrara marble',
          location: `Galleria dell'Accademia, Florence`,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Michelangelo%27s_David_-_right_view_2.jpg/480px-Michelangelo%27s_David_-_right_view_2.jpg',
          description: 'The definitive statement on the Renaissance ideal of the heroic human body. Michelangelo captured David in the moment before battle -- coiled with tension, every muscle and vein rendered with anatomical precision. At 5.17 meters, it dominates any room it inhabits.',
        },
        {
          title: 'The Last Supper',
          artist: 'Leonardo da Vinci',
          year: '1495 - 1498',
          type: 'painting',
          medium: 'Tempera and oil on plaster',
          location: 'Santa Maria delle Grazie, Milan',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/%C3%9Altima_Cena_-_Da_Vinci_5.jpg/1280px-%C3%9Altima_Cena_-_Da_Vinci_5.jpg',
          description: `Leonardo revolutionized narrative painting by freezing the precise moment Christ announces his betrayal. Each apostle's reaction is psychologically distinct. The architectural perspective draws the eye directly to Christ's face, making him the calm center of an emotional storm.`,
        },
        {
          title: 'Primavera',
          artist: 'Sandro Botticelli',
          year: 'c. 1477 - 1482',
          type: 'painting',
          medium: 'Tempera on panel',
          location: 'Uffizi Gallery, Florence',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Botticelli-primavera.jpg/1280px-Botticelli-primavera.jpg',
          description: 'A dense allegorical work saturated with Neoplatonic symbolism. Nine mythological figures inhabit an orange grove -- Venus, the Three Graces, Mercury, Flora, Zephyr, and Chloris. The flowing lines and interlocking gestures create a visual tapestry of extraordinary elegance.',
        },
        {
          title: 'Vitruvian Man',
          artist: 'Leonardo da Vinci',
          year: 'c. 1490',
          type: 'drawing',
          medium: 'Pen, ink, and watercolor on paper',
          location: `Gallerie dell'Accademia, Venice`,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Da_Vinci_Vitruve_Luc_Viatour.jpg/506px-Da_Vinci_Vitruve_Luc_Viatour.jpg',
          description: 'The ultimate Renaissance image of human proportion. Based on the writings of the Roman architect Vitruvius, Leonardo inscribed the ideal male figure within both a circle and a square -- demonstrating the relationship between human geometry and the geometry of the cosmos.',
        },
        {
          title: 'The Arnolfini Portrait',
          artist: 'Jan van Eyck',
          year: '1434',
          type: 'painting',
          medium: 'Oil on oak panel',
          location: 'National Gallery, London',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Van_Eyck_-_Arnolfini_Portrait.jpg/470px-Van_Eyck_-_Arnolfini_Portrait.jpg',
          description: `A landmark of Northern Renaissance painting. Van Eyck's mastery of oil paint created a surface of jewel-like detail -- every texture from velvet to brass to fur rendered with breathtaking precision. The convex mirror in the background reflects the entire room, including two mysterious witnesses.`,
        },
        {
          title: `St. Peter's Basilica`,
          artist: 'Bramante, Michelangelo, della Porta',
          year: '1506 - 1626',
          type: 'architecture',
          medium: 'Travertine marble, brick, concrete',
          location: 'Vatican City',
          imageUrl: stPetersBasilica,
          description: `The greatest architectural achievement of the Renaissance. Michelangelo's dome -- designed when he was 72 -- became the model for dome architecture worldwide. The basilica synthesizes a century of Renaissance architectural thought into a single overwhelming monument to human ambition and faith.`,
        },
      ],

      tattooTips: {
        intro: `The Renaissance is one of the richest sources a tattoo artist can draw from -- not just for its iconic imagery, but for its underlying technical philosophy. The masters of this period solved exactly the problems that every tattooist faces: how to create the illusion of volume on a flat surface, how to make a figure feel alive, how to organize complex compositions into something visually harmonious. Understanding how they worked is directly applicable to the needle.`,
        design: [
          'Study triangular composition: Renaissance masters organized figures into pyramid or triangle structures to create visual stability and guide the eye. This principle translates perfectly to body placement -- wrap a composition around the natural triangular forms of the shoulder, chest, or knee.',
          'Use architectural framing: Raphael and Leonardo frequently placed figures within arches, columns, or window frames. For sleeve or back pieces, consider creating an architectural "stage" that gives the scene a sense of place and grandeur.',
          'Master the contrapposto pose: figures in Renaissance art stand in contrapposto -- weight on one leg, hips and shoulders tilting in opposite directions -- giving the body a natural, living S-curve. When designing figures, avoid static symmetry; use this S-tension to bring energy to the composition.',
          'Reference drapery studies: Renaissance artists obsessed over the way fabric falls and folds. Drapery creates rhythm, frames the figure, and adds visual complexity without competing with the face or focal point. Incorporate flowing fabric into portraits or figurative work to add movement.',
          'Incorporate atmospheric perspective: backgrounds were painted progressively lighter and bluer in the distance to suggest depth. In black-and-grey tattooing, use progressively lighter values and softer edges for background elements to push them back and make the foreground pop.',
          'Draw from mythological subjects: scenes like The Birth of Venus, Perseus, or the Three Graces offer timeless narrative content with universal emotional resonance -- ideal for large-scale pieces where the client wants meaning as well as beauty.',
          'Explore portrait conventions: Renaissance portraiture used three-quarter angle views (neither full frontal nor profile) to capture personality and dimension simultaneously. This is still the most flattering and dynamic angle for portrait tattoos.',
          'Use hands deliberately: Renaissance masters considered the hands as expressive as the face. Study the hands in works by Leonardo and Raphael -- outstretched, pointing, clasped -- and incorporate expressive hands into figurative tattoos to amplify emotional storytelling.',
        ],
        technical: [
          'Chiaroscuro is your most important tool: the entire Renaissance model of form is built on the transition from light to shadow. In tattooing, this means understanding how to build a full value range from bright highlight whites through midtones into deep, saturated blacks -- with smooth, controlled gradation throughout.',
          'Think in layers, not lines: Renaissance painters built form through transparent glazes, each layer modifying the one beneath. Similarly, approach shading in multiple passes -- establish your darkest darks first, then build midtones, then work back up toward highlights with lighter passes and needle pressure.',
          'Softness of edge is as important as darkness of shadow: sfumato means "smoked" -- boundaries between light and dark are blurred, not hard. Practice achieving seamless whip shading and long feathered transitions. A hard edge where there should be a soft one instantly flattens form.',
          'Study muscle anatomy directly: Michelangelo dissected cadavers to understand the body. If you tattoo figurative work, invest time in anatomy -- understand how muscles layer over each other, how skin stretches over bone, how fat deposits change contour. A figure tattooed without anatomical understanding will always look unconvincing.',
          'Replicate the luminosity of oil glazes with ink layering: Titian achieved glowing skin tones through dozens of transparent color layers. In color realism tattooing, build skin tones similarly -- warm undertones first, cooler glazes over the top, highlights last. Avoid mixing everything into a flat opaque layer.',
          'Handle negative space deliberately: Renaissance compositions used background darks to make light figures emerge dramatically. In tattooing, push backgrounds dark enough that the subject genuinely "lifts" off the skin -- a common mistake is leaving backgrounds too light, which flattens the whole piece.',
          'Use a restricted value structure for large pieces: Renaissance paintings achieve harmony partly because they limit their tonal extremes -- the darkest dark and the brightest light are reserved for the most important focal area. In large tattoo compositions, resist putting maximum contrast everywhere; save your white highlights and deepest blacks for the intended focal point.',
          'Study Durer\'s engravings specifically for black-and-grey technique: Durer achieved extraordinary tonal range in pure black ink through systematic crosshatching and stippling. His prints are essentially advanced manuals for building form with a single pigment -- directly applicable to black-and-grey realism and illustrative tattoo styles.',
        ],
        inspiration: `Contemporary tattooers working in Renaissance aesthetics tend to fall into two camps: those pursuing hyper-realistic recreations of specific masterworks (the Sistine Chapel ceiling, Botticelli\'s Venus) as full back pieces or sleeves, and those abstracting the era\'s visual principles into their own figurative style. The latter approach -- internalizing chiaroscuro, contrapposto, and classical composition without literally copying paintings -- tends to produce the most lasting and personal work. Artists like Chucho Ochoa and Nikko Hurtado demonstrate how Renaissance light-modeling principles can be applied to contemporary portraiture. For sleeve concepts, consider organizing the progression of human figures from Early to High Renaissance across the arm -- from Botticelli\'s ethereal linearity through Leonardo\'s atmospheric depth to Michelangelo\'s muscular dynamism -- as a visual timeline of the Renaissance itself.`,
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
          question: 'Which Renaissance master is primarily associated with the Venetian tradition of colore -- prioritizing color over line?',
          options: ['Michelangelo', 'Raphael', 'Durer', 'Titian'],
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
          question: 'Albrecht Durer is significant primarily because he brought Renaissance ideas to which region?',
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
    period: '1600 - 1750',
    colorPalette: ['#4A3728', '#8B7355', '#2F1B14', '#C4956A', '#1A1A2E'],
    status: 'locked',
  },
  {
    id: 'rococo',
    number: 3,
    name: 'Rococo',
    period: '1720 - 1780',
    colorPalette: ['#B5D4C7', '#E8D5B7', '#F5E6CC', '#A8C4B8', '#D4B896'],
    status: 'locked',
  },
  {
    id: 'neoclassicism',
    number: 4,
    name: 'Neoclassicism',
    period: '1750 - 1850',
    colorPalette: ['#B8A88A', '#8E7F6D', '#C4B196', '#6B5B4A', '#D4C4A8'],
    status: 'locked',
  },
  {
    id: 'romanticism',
    number: 5,
    name: 'Romanticism',
    period: '1780 - 1850',
    colorPalette: ['#6B4423', '#8B6914', '#3E5F8A', '#5C4033', '#A0522D'],
    status: 'locked',
  },
  {
    id: 'realism',
    number: 6,
    name: 'Realism',
    period: '1840 - 1880',
    colorPalette: ['#8B7D6B', '#A0926B', '#6B6348', '#C4A882', '#4A4A3A'],
    status: 'locked',
  },
  {
    id: 'impressionism',
    number: 7,
    name: 'Impressionism',
    period: '1860 - 1890',
    colorPalette: ['#6B8FAD', '#A2C4D9', '#7BA3BD', '#4A7FA5', '#89B3CC'],
    status: 'locked',
  },
  {
    id: 'post-impressionism',
    number: 8,
    name: 'Post-Impressionism',
    period: '1880 - 1910',
    colorPalette: ['#2E4057', '#4A6FA5', '#1B3A5C', '#6B8FAD', '#0F2744'],
    status: 'locked',
  },
  {
    id: 'symbolism',
    number: 9,
    name: 'Symbolism',
    period: '1880 - 1910',
    colorPalette: ['#C4A832', '#8B7D2A', '#D4B83C', '#6B6320', '#E8D264'],
    status: 'locked',
  },
  {
    id: 'art-nouveau',
    number: 10,
    name: 'Art Nouveau',
    period: '1890 - 1910',
    colorPalette: ['#E8D5B7', '#C4A882', '#F5E6CC', '#A08060', '#D4C4A8'],
    status: 'locked',
  },
  {
    id: 'fauvism',
    number: 11,
    name: 'Fauvism',
    period: '1904 - 1908',
    colorPalette: ['#E84430', '#FF5733', '#C23616', '#FF6B4A', '#A52714'],
    status: 'locked',
  },
  {
    id: 'expressionism',
    number: 12,
    name: 'Expressionism',
    period: '1905 - 1933',
    colorPalette: ['#8B6914', '#A07828', '#6B5210', '#C4A832', '#4A3A0A'],
    status: 'locked',
  },
  {
    id: 'cubism',
    number: 13,
    name: 'Cubism',
    period: '1907 - 1922',
    colorPalette: ['#B8A88A', '#8E7F6D', '#6B5B4A', '#C4B196', '#4A4035'],
    status: 'locked',
  },
  {
    id: 'futurism',
    number: 14,
    name: 'Futurism',
    period: '1909 - 1944',
    colorPalette: ['#6B8FAD', '#4A6FA5', '#8B7D6B', '#A0926B', '#3E5F8A'],
    status: 'locked',
  },
  {
    id: 'dadaism',
    number: 15,
    name: 'Dadaism',
    period: '1916 - 1924',
    colorPalette: ['#1A1A1A', '#E8E8E8', '#FF0000', '#FFD700', '#0000FF'],
    status: 'locked',
  },
  {
    id: 'bauhaus',
    number: 16,
    name: 'Bauhaus',
    period: '1919 - 1933',
    colorPalette: ['#E84430', '#1B5AA5', '#F5C518', '#1A1A1A', '#E8E8E8'],
    status: 'locked',
  },
  {
    id: 'surrealism',
    number: 17,
    name: 'Surrealism',
    period: '1924 - 1966',
    colorPalette: ['#C4A832', '#6B4423', '#3E5F8A', '#8B6914', '#2E4057'],
    status: 'locked',
  },
  {
    id: 'abstract-expressionism',
    number: 18,
    name: 'Abstract Expressionism',
    period: '1943 - 1965',
    colorPalette: ['#1A1A1A', '#8B0000', '#FFD700', '#FFFFFF', '#4A4A4A'],
    status: 'locked',
  },
  {
    id: 'pop-art',
    number: 19,
    name: 'Pop Art',
    period: '1955 - 1970',
    colorPalette: ['#FF1493', '#00BFFF', '#FFD700', '#FF4500', '#32CD32'],
    status: 'locked',
  },
  {
    id: 'minimalism',
    number: 20,
    name: 'Minimalism',
    period: '1960 - 1975',
    colorPalette: ['#E8E8E8', '#B0B0B0', '#1A1A1A', '#FFFFFF', '#808080'],
    status: 'locked',
  },
  {
    id: 'conceptual-art',
    number: 21,
    name: 'Conceptual Art',
    period: '1960 - Present',
    colorPalette: ['#4A4A4A', '#808080', '#FFFFFF', '#1A1A1A', '#C0C0C0'],
    status: 'locked',
  },
  {
    id: 'contemporary-art',
    number: 22,
    name: 'Contemporary Art',
    period: '1970 - Present',
    colorPalette: ['#FF6B4A', '#4A6FA5', '#FFD700', '#32CD32', '#8B008B'],
    status: 'locked',
  },
];
