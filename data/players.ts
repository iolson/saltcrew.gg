export interface Player {
  name: string;
  role: string;
  steamId: string;
  image?: string;
  statsUrl: string;
}

// Centralized player roster data - update this array to add/edit players
export const players: Player[] = [
  {
    name: 'FuzzyHat',
    role: 'Captain & IGL',
    steamId: '76561197971721260',
    image: '/images/players/fuzzyhat.png',
    statsUrl: 'https://csstats.gg/player/76561197971721260',
  },
  {
    name: 'GUNK',
    role: 'Player',
    steamId: '76561198116416032',
    image: '/images/players/gunk.png',
    statsUrl: 'https://csstats.gg/player/76561198116416032',
  },
  {
    name: 'kiwi',
    role: 'Player',
    steamId: '76561198073450718',
    image: '/images/players/kiwi.png',
    statsUrl: 'https://csstats.gg/player/76561198073450718',
  },
  {
    name: 'shaake',
    role: 'Player',
    steamId: '76561197970360996',
    image: '/images/players/shaake.png',
    statsUrl: 'https://csstats.gg/player/76561197970360996',
  },
  {
    name: 'h0t_s0up',
    role: 'Player',
    steamId: '76561197975195707',
    image: '/images/players/soup.png',
    statsUrl: 'https://csstats.gg/player/76561197975195707',
  },
  {
    name: 'suff3r',
    role: 'Player',
    steamId: '76561197987190748',
    image: '/images/players/suff3r.png',
    statsUrl: 'https://csstats.gg/player/76561197987190748',
  },
  {
    name: 'BOOMER_WITH_P90',
    role: 'Player',
    steamId: '76561197969380246',
    image: '/images/players/badgamer.png',
    statsUrl: 'https://csstats.gg/player/76561197969380246',
  },
  {
    name: 'AlexBG',
    role: 'Player',
    steamId: '76561198049545387',
    image: '/images/players/nopicture.png',
    statsUrl: 'https://csstats.gg/player/76561198049545387',
  },
];
