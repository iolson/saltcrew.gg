export interface Accolade {
  id: string;
  placement: string;
  tournament: string;
  event?: string;
  date?: string;
  icon: '🏆' | '🥈' | '🥉' | '🏅';
}

// Centralized accolades data - update this array to add achievements
export const accolades: Accolade[] = [
  {
    id: '1',
    placement: '1st',
    tournament: 'National Championship',
    event: 'Late Night Ancient',
    icon: '🏆',
  },
  {
    id: '2',
    placement: '3rd',
    tournament: 'BHOP',
    date: 'September 2024',
    icon: '🥉',
  },
  {
    id: '3',
    placement: '3rd - 4th',
    tournament: 'Scrims Local LAN II',
    icon: '🥉',
  },
];
