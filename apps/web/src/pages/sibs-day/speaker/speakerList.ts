import { SpeakerProps } from './index';

const speakers: Array<SpeakerProps> = [
  {
    direction: 'row-reverse',
    image:
      'https://pbs.twimg.com/profile_images/1494329046678659072/RprvW5s4_400x400.jpg',
    name: 'Sibelius',
    handler: 'sseraphini',
    backgroundColor: '#1a04a8',
    talk: 'Who/What is sseraphini?',
  },
  {
    direction: 'row',
    image:
      'https://pbs.twimg.com/profile_images/1523447097114169346/Uh7xVsh6_400x400.jpg',
    name: 'Nicoly Cypriano',
    handler: 'nicolycypriano',
    backgroundColor: '#c20000',
    talk: 'Por que processos não funcionam?',
  },
  {
    direction: 'row-reverse',
    image:
      'https://pbs.twimg.com/profile_images/1548858425555156992/Dicm8lt2_400x400.jpg',
    name: 'Victória Rose',
    handler: 'victoriaquasar',
    backgroundColor: '#2b1123',
    talk: 'Criando um Runtime JavaScript usando csharp',
  },
  {
    direction: 'row',
    image:
      'https://pbs.twimg.com/profile_images/1521224256323047426/d9KGR6N4_400x400.jpg',
    name: 'Alecell',
    handler: 'alecell_',
    backgroundColor: '#323b8f',
    talk: 'Writing better React code with bad code',
  },
  {
    direction: 'row-reverse',
    image:
      'https://pbs.twimg.com/profile_images/1513813856795115520/Qfrr7QiH_400x400.jpg',
    name: 'Emanuel Ferreira',
    handler: 'manelferreira_',
    backgroundColor: '#2c2c2c',
    talk: 'A demonstration of how decentralized governance works in practice, showing contracts, proposals, votes, execution of proposals, and token weight.',
  },
];

export default speakers;
