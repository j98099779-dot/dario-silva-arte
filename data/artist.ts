import { getProvidedImage } from './artworks';

export type ArtistImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  source: string;
  permission: string;
};

export type ArtistTraining = {
  master: string;
  study: string;
};

export type ArtistBiography = {
  title: string;
  introduction: string[];
  trainingIntro: string;
  trainingClosing: string;
  languages: string[];
  summary: string;
  sourceNote: string;
  status: 'provisional' | 'reviewed';
};

// Texto fornecido pela família. A transcrição permanece provisória:
// parte da imagem de origem estava cortada e palavras foram reconstruídas.
export const artistBiography: ArtistBiography = {
  title: 'A arte como expressão de uma vida',
  introduction: [
    'Dário Silva nasceu no Rio de Janeiro. Formado pela Escola de Belas Artes e licenciado em Desenho e Educação pela Faculdade de Educação do Rio de Janeiro, sempre procurou aprimorar-se.',
  ],
  trainingIntro: 'Foi discípulo dos melhores mestres da época, no início dos anos 60.',
  trainingClosing: 'Estes são apenas alguns dos grandes nomes que concorreram para a excelência de sua formação e o alto nível de seu trabalho.',
  languages: [
    'Desenhista e retratista, eclético por opção, não tem limitações.',
    'É criativo, tanto na representação clássica ou acadêmica, quanto nas linhas modernas do expressionismo, do cubismo e de outras escolas contemporâneas.',
  ],
  summary: 'Nascido no Rio de Janeiro, Dário Silva é desenhista e retratista, eclético por opção. Sua biografia descreve uma formação dedicada ao estudo e uma expressão que percorre a representação clássica e as linguagens modernas.',
  sourceNote: 'Biografia fornecida pela família, transcrita de uma imagem com parte da lateral cortada. Algumas palavras foram reconstruídas pelo contexto. Conteúdo provisório, sujeito à revisão da família.',
  status: 'provisional',
};

export const artistTraining: ArtistTraining[] = [
  { master: 'Jordão de Oliveira', study: 'Modelo Vivo e Pintura' },
  { master: 'Carlos Del Negro', study: 'Desenho à Mão Livre e Análise Histórica da Composição' },
  { master: 'Edson Motta', study: 'Restauração e Conservação da Pintura' },
  { master: 'Abelardo Zaluar', study: 'Desenho Moderno' },
  { master: 'Quirino Campofiorito', study: 'Arte Decorativa' },
  { master: 'Mário Barata', study: 'História da Arte Estética' },
];

export const artist = {
  name: 'Dário Silva',
  subtitle: 'Artista Plástico Brasileiro',
  biography: [
    ...artistBiography.introduction,
    artistBiography.trainingIntro,
    ...artistTraining.map(({ master, study }) => `Com ${master}, estudou ${study}.`),
    artistBiography.trainingClosing,
    ...artistBiography.languages,
  ].join('\n\n') as string | null,
  biographyNote: artistBiography.sourceNote,
  // Retrato de camisa branca primeiro; retrato formal com óculos em seguida.
  // Integre somente fotografias disponíveis, com procedência e autorização.
  portraits: [
    getProvidedImage('dario-silva-camisa-branca.png', 'Fotografia de Dário Silva sorrindo, vestindo camisa branca.'),
    getProvidedImage('dario-silva-retrato-formal.png', 'Fotografia formal de Dário Silva com óculos e vestimenta escura.'),
    getProvidedImage('dario-silva-sorrindo-boina-oculos.png', 'Dário Silva sorrindo, com boina e óculos, diante de uma pintura.'),
  ] as ArtistImage[],
  homePortrait: getProvidedImage('dario-silva-sorrindo-boina-oculos.png', 'Dário Silva sorrindo, com boina e óculos, diante de uma pintura.') as ArtistImage | null,
  studio: getProvidedImage('atelie-dario-silva.png', 'Ateliê de Dário Silva com pinturas, esculturas, pincéis e objetos artísticos próximos às janelas.') as ArtistImage | null,
  archiveImage: getProvidedImage('dario-silva-camisa-branca.png', 'Registro fotográfico original de Dário Silva sorrindo e vestindo camisa branca.'),
  training: artistTraining,
  milestones: [
    {
      year: 'Formação',
      description: 'Segundo a biografia fornecida pela família, formou-se pela Escola de Belas Artes e licenciou-se em Desenho e Educação pela Faculdade de Educação do Rio de Janeiro.',
    },
    {
      year: 'Início dos anos 60',
      description: 'A biografia familiar situa nesse período os estudos com os mestres apresentados nesta página.',
    },
  ] as { year: string; description: string }[],
  email: null as string | null,
  instagram: 'https://www.instagram.com/dario_solarte/',
  facebook: 'https://www.facebook.com/dario.silva.54/',
};
