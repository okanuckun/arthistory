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
  colorPalette: string[];
  status: 'completed' | 'active' | 'locked';
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
      summary: 'The Renaissance was a profound cultural and artistic rebirth that began in 14th-century Italy and spread across Europe through the 17th century. Marked by a return to the ideals of Ancient Greece and Rome, a human-centered worldview (humanism), scientific observation, and the discovery of perspective, this era fundamentally transformed art. For the first time, paintings featured realistic human anatomy, the illusion of depth, and masterful play of light and shadow.',
      characteristics: [
        'Discovery and application of linear perspective',
        'Scientific study of human anatomy',
        'Chiaroscuro technique — dramatic light and shadow',
        'Sfumato technique — soft, smoky transitions',
        'Humanism philosophy — human-centered worldview',
        'Renewed interest in Ancient Greek and Roman art',
        'Widespread adoption of oil painting',
        'Patronage system — supporters like the Medici family',
      ],
      artists: [
        {
          name: 'Leonardo da Vinci',
          years: '1452 – 1519',
          description: 'Creator of the Mona Lisa and The Last Supper. Painter, engineer, scientist, and inventor who earned the title of "universal genius." Master of the sfumato technique.',
        },
        {
          name: 'Michelangelo Buonarroti',
          years: '1475 – 1564',
          description: 'Known for the Sistine Chapel ceiling and the statue of David. One of the rare artists who reached the pinnacle in painting, sculpture, and architecture alike.',
        },
        {
          name: 'Raphael Sanzio',
          years: '1483 – 1520',
          description: 'Famous for The School of Athens fresco. Represents the Renaissance ideal of beauty in its purest form. A master of composition and harmony.',
        },
        {
          name: 'Sandro Botticelli',
          years: '1445 – 1510',
          description: 'Known for The Birth of Venus and Primavera. With his elegant lines and mythological subjects, he is a key figure of the Early Renaissance.',
        },
      ],
      quiz: [
        {
          question: 'Which Renaissance architect was the first to systematically use perspective?',
          options: ['Filippo Brunelleschi', 'Leon Battista Alberti', 'Donato Bramante', 'Andrea Palladio'],
          correctIndex: 0,
        },
        {
          question: 'What is the name of the technique developed by Leonardo da Vinci for soft color transitions?',
          options: ['Chiaroscuro', 'Sfumato', 'Impasto', 'Fresco'],
          correctIndex: 1,
        },
        {
          question: 'Which of the following is the fundamental philosophy of the Renaissance?',
          options: ['Nihilism', 'Humanism', 'Romanticism', 'Positivism'],
          correctIndex: 1,
        },
        {
          question: 'Who painted the ceiling frescoes of the Sistine Chapel?',
          options: ['Raphael', 'Leonardo da Vinci', 'Michelangelo', 'Titian'],
          correctIndex: 2,
        },
        {
          question: 'In which city was the Renaissance born?',
          options: ['Rome', 'Venice', 'Florence', 'Milan'],
          correctIndex: 2,
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
    status: 'locked',
  },
  {
    id: 'rococo',
    number: 3,
    name: 'Rococo',
    period: '1720 – 1780',
    colorPalette: ['#B5D4C7', '#E8D5B7', '#F5E6CC', '#A8C4B8', '#D4B896'],
    status: 'locked',
  },
  {
    id: 'neoclassicism',
    number: 4,
    name: 'Neoclassicism',
    period: '1750 – 1850',
    colorPalette: ['#B8A88A', '#8E7F6D', '#C4B196', '#6B5B4A', '#D4C4A8'],
    status: 'locked',
  },
  {
    id: 'romanticism',
    number: 5,
    name: 'Romanticism',
    period: '1780 – 1850',
    colorPalette: ['#6B4423', '#8B6914', '#3E5F8A', '#5C4033', '#A0522D'],
    status: 'locked',
  },
  {
    id: 'realism',
    number: 6,
    name: 'Realism',
    period: '1840 – 1880',
    colorPalette: ['#8B7D6B', '#A0926B', '#6B6348', '#C4A882', '#4A4A3A'],
    status: 'locked',
  },
  {
    id: 'impressionism',
    number: 7,
    name: 'Impressionism',
    period: '1860 – 1890',
    colorPalette: ['#6B8FAD', '#A2C4D9', '#7BA3BD', '#4A7FA5', '#89B3CC'],
    status: 'locked',
  },
  {
    id: 'post-impressionism',
    number: 8,
    name: 'Post-Impressionism',
    period: '1880 – 1910',
    colorPalette: ['#2E4057', '#4A6FA5', '#1B3A5C', '#6B8FAD', '#0F2744'],
    status: 'locked',
  },
  {
    id: 'symbolism',
    number: 9,
    name: 'Symbolism',
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
    id: 'fauvism',
    number: 11,
    name: 'Fauvism',
    period: '1904 – 1908',
    colorPalette: ['#E84430', '#FF5733', '#C23616', '#FF6B4A', '#A52714'],
    status: 'locked',
  },
  {
    id: 'expressionism',
    number: 12,
    name: 'Expressionism',
    period: '1905 – 1933',
    colorPalette: ['#8B6914', '#A07828', '#6B5210', '#C4A832', '#4A3A0A'],
    status: 'locked',
  },
  {
    id: 'cubism',
    number: 13,
    name: 'Cubism',
    period: '1907 – 1922',
    colorPalette: ['#B8A88A', '#8E7F6D', '#6B5B4A', '#C4B196', '#4A4035'],
    status: 'locked',
  },
  {
    id: 'futurism',
    number: 14,
    name: 'Futurism',
    period: '1909 – 1944',
    colorPalette: ['#6B8FAD', '#4A6FA5', '#8B7D6B', '#A0926B', '#3E5F8A'],
    status: 'locked',
  },
  {
    id: 'dadaism',
    number: 15,
    name: 'Dadaism',
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
    id: 'surrealism',
    number: 17,
    name: 'Surrealism',
    period: '1924 – 1966',
    colorPalette: ['#C4A832', '#6B4423', '#3E5F8A', '#8B6914', '#2E4057'],
    status: 'locked',
  },
  {
    id: 'abstract-expressionism',
    number: 18,
    name: 'Abstract Expressionism',
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
    id: 'minimalism',
    number: 20,
    name: 'Minimalism',
    period: '1960 – 1975',
    colorPalette: ['#E8E8E8', '#B0B0B0', '#1A1A1A', '#FFFFFF', '#808080'],
    status: 'locked',
  },
  {
    id: 'conceptual-art',
    number: 21,
    name: 'Conceptual Art',
    period: '1960 – Present',
    colorPalette: ['#4A4A4A', '#808080', '#FFFFFF', '#1A1A1A', '#C0C0C0'],
    status: 'locked',
  },
  {
    id: 'contemporary-art',
    number: 22,
    name: 'Contemporary Art',
    period: '1970 – Present',
    colorPalette: ['#FF6B4A', '#4A6FA5', '#FFD700', '#32CD32', '#8B008B'],
    status: 'locked',
  },
];
