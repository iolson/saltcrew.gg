import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Team Roster - Saltcrew',
  description: 'Meet the Saltcrew Counter-Strike team roster and players',
};

interface Player {
  name: string;
  role: string;
  steamId: string;
  image?: string;
  season53Stats: string;
  season54Stats: string;
}

const players: Player[] = [
  {
    name: 'FuzzyHat',
    role: 'Player',
    steamId: '76561197971721260',
    season53Stats: 'https://csstats.gg/player/76561197971721260?modes=ESEA&groups=ESEA%20S53',
    season54Stats: 'https://csstats.gg/player/76561197971721260?modes=ESEA&groups=ESEA%20S54',
  },
  {
    name: 'h0t_s0up',
    role: 'Player',
    steamId: '76561197975195707',
    season53Stats: 'https://csstats.gg/player/76561197975195707?modes=ESEA&groups=ESEA%20S53',
    season54Stats: 'https://csstats.gg/player/76561197975195707?modes=ESEA&groups=ESEA%20S54',
  },
  {
    name: 'GUNK',
    role: 'Player',
    steamId: '76561198116416032',
    season53Stats: 'https://csstats.gg/player/76561198116416032?modes=ESEA&groups=ESEA%20S53',
    season54Stats: 'https://csstats.gg/player/76561198116416032?modes=ESEA&groups=ESEA%20S54',
  },
  {
    name: 'kiwi',
    role: 'Player',
    steamId: '76561198073450718',
    season53Stats: 'https://csstats.gg/player/76561198073450718?modes=ESEA&groups=ESEA%20S53',
    season54Stats: 'https://csstats.gg/player/76561198073450718?modes=ESEA&groups=ESEA%20S54',
  },
  {
    name: 'AlexBG',
    role: 'Player',
    steamId: '76561198049545387',
    season53Stats: 'https://csstats.gg/player/76561198049545387?modes=ESEA&groups=ESEA%20S53',
    season54Stats: 'https://csstats.gg/player/76561198049545387?modes=ESEA&groups=ESEA%20S54',
  },
  {
    name: 'suff3r',
    role: 'Player',
    steamId: '76561197987190748',
    season53Stats: 'https://csstats.gg/player/76561197987190748?modes=ESEA&groups=ESEA%20S53',
    season54Stats: 'https://csstats.gg/player/76561197987190748?modes=ESEA&groups=ESEA%20S54',
  },
];

export default function TeamPage() {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-accent mb-4 uppercase">The Squad</h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            Meet the dedicated players who represent Saltcrew in competitive Counter-Strike
          </p>
        </div>

        {/* Player Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {players.map((player) => (
            <div
              key={player.steamId}
              className="bg-card border border-border rounded-lg overflow-hidden hover:border-accent transition-all duration-300 group"
            >
              {/* Player Image */}
              <div className="h-64 bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center group-hover:from-accent/40 group-hover:to-accent/20 transition-all relative overflow-hidden">
                {player.image ? (
                  <Image
                    src={player.image}
                    alt={player.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-accent/20 flex items-center justify-center border-4 border-accent/50">
                    <span className="text-5xl font-bold text-accent">{player.name[0]}</span>
                  </div>
                )}
              </div>

              {/* Player Info */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                  {player.name}
                </h3>
                <p className="text-foreground/60 mb-4 uppercase tracking-wider text-sm">
                  {player.role}
                </p>

                {/* Stats Links */}
                <div className="space-y-2">
                  <a
                    href={player.season53Stats}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-4 py-2 bg-background hover:bg-accent hover:text-white text-foreground/80 text-center rounded transition-colors text-sm font-medium"
                  >
                    Season 53 Stats
                  </a>
                  <a
                    href={player.season54Stats}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-4 py-2 bg-background hover:bg-accent hover:text-white text-foreground/80 text-center rounded transition-colors text-sm font-medium"
                  >
                    Season 54 Stats
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Team Expectations Section */}
        <div className="bg-card rounded-lg border border-border p-8 md:p-12">
          <h2 className="text-3xl font-bold text-accent mb-6 uppercase">Team Expectations</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-3">Practice Schedule</h3>
              <p className="text-foreground/80 leading-relaxed">
                Starters practice <strong className="text-accent">4 days a week</strong>: Sunday, Monday,
                and twice before match days. Each session lasts 2-3 hours.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-foreground mb-3">Individual Playtime</h3>
              <p className="text-foreground/80 leading-relaxed">
                Players maintain skill through <strong className="text-accent">3-5 competitive matches per week</strong> in
                FACEIT, Premier, or Matchmaking.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-foreground mb-3">Performance Tracking</h3>
              <p className="text-foreground/80 leading-relaxed">
                We track ESEA match performance using{' '}
                <a
                  href="https://csstats.gg/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  CSStats.gg
                </a>
                , focusing on HLTV ratings for individual insights.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-foreground mb-3">Team Communication</h3>
              <p className="text-foreground/80 leading-relaxed">
                Clear and concise voice comms in Discord. Players provide{' '}
                <strong className="text-accent">honest, proactive feedback</strong> during matches and practice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
