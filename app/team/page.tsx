import type { Metadata } from 'next';
import Image from 'next/image';
import { players } from '@/data/players';

export const metadata: Metadata = {
  title: 'Team Roster - Saltcrew',
  description: 'Meet the Saltcrew Counter-Strike team roster and players',
};

export default function TeamPage() {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-accent mb-4 uppercase">The Crew</h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            Meet the players who represent Saltcrew
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
                    className="object-cover object-top"
                    priority={false}
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

                {/* Stats Link */}
                <a
                  href={player.statsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-4 py-2 bg-background hover:bg-accent hover:text-white text-foreground/80 text-center rounded transition-colors text-sm font-medium"
                >
                  View Stats
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
