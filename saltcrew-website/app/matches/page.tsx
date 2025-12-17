import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Match Results - Saltcrew',
  description: 'View Saltcrew match results and performance history',
};

interface Match {
  id: string;
  date: string;
  tournament: string;
  opponent: string;
  opponentLogo?: string;
  saltcrewScore: number;
  opponentScore: number;
  map?: string;
  result: 'win' | 'loss';
  hasRecap?: boolean;
}

// Sample matches - replace with your actual data
const matches: Match[] = [
  {
    id: '1',
    date: '2024-12-15',
    tournament: 'ESEA Season 54',
    opponent: 'Team Alpha',
    saltcrewScore: 16,
    opponentScore: 12,
    map: 'de_dust2',
    result: 'win',
    hasRecap: true,
  },
  {
    id: '2',
    date: '2024-12-12',
    tournament: 'ESEA Season 54',
    opponent: 'Beta Squad',
    saltcrewScore: 13,
    opponentScore: 16,
    map: 'de_mirage',
    result: 'loss',
    hasRecap: true,
  },
  {
    id: '3',
    date: '2024-12-08',
    tournament: 'ESEA Season 54',
    opponent: 'Gamma Gaming',
    saltcrewScore: 16,
    opponentScore: 9,
    map: 'de_inferno',
    result: 'win',
    hasRecap: false,
  },
  {
    id: '4',
    date: '2024-12-05',
    tournament: 'ESEA Season 54',
    opponent: 'Delta Force',
    saltcrewScore: 14,
    opponentScore: 16,
    map: 'de_nuke',
    result: 'loss',
    hasRecap: false,
  },
  {
    id: '5',
    date: '2024-12-01',
    tournament: 'ESEA Season 54',
    opponent: 'Epsilon Elite',
    saltcrewScore: 16,
    opponentScore: 11,
    map: 'de_ancient',
    result: 'win',
    hasRecap: false,
  },
];

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function MatchesPage() {
  const wins = matches.filter(m => m.result === 'win').length;
  const losses = matches.filter(m => m.result === 'loss').length;
  const winRate = matches.length > 0 ? ((wins / matches.length) * 100).toFixed(1) : '0.0';

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-accent mb-4 uppercase">Matches & Results</h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            Track our journey through ESEA competition
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <div className="text-3xl md:text-4xl font-bold text-accent mb-2">{wins}</div>
            <div className="text-foreground/60 uppercase text-sm tracking-wider">Wins</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <div className="text-3xl md:text-4xl font-bold text-accent mb-2">{losses}</div>
            <div className="text-foreground/60 uppercase text-sm tracking-wider">Losses</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <div className="text-3xl md:text-4xl font-bold text-accent mb-2">{winRate}%</div>
            <div className="text-foreground/60 uppercase text-sm tracking-wider">Win Rate</div>
          </div>
        </div>

        {/* Matches List */}
        <div className="space-y-4">
          {matches.map((match) => (
            <div
              key={match.id}
              className={`bg-card border rounded-lg overflow-hidden transition-all hover:shadow-lg ${
                match.result === 'win'
                  ? 'border-accent/30 hover:border-accent'
                  : 'border-border hover:border-accent/50'
              }`}
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left: Date & Tournament */}
                  <div className="flex-shrink-0">
                    <div className="text-foreground/60 text-sm mb-1">{formatDate(match.date)}</div>
                    <div className="text-foreground font-medium">{match.tournament}</div>
                    {match.map && (
                      <div className="text-foreground/60 text-sm mt-1">{match.map}</div>
                    )}
                  </div>

                  {/* Center: Match Result */}
                  <div className="flex items-center gap-6 flex-1 justify-center">
                    <div className="text-right">
                      <div className="font-bold text-foreground text-lg">Saltcrew</div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div
                        className={`text-3xl font-bold ${
                          match.result === 'win' ? 'text-accent' : 'text-foreground'
                        }`}
                      >
                        {match.saltcrewScore}
                      </div>
                      <div className="text-foreground/40 text-xl">:</div>
                      <div
                        className={`text-3xl font-bold ${
                          match.result === 'loss' ? 'text-accent' : 'text-foreground'
                        }`}
                      >
                        {match.opponentScore}
                      </div>
                    </div>

                    <div className="text-left">
                      <div className="font-bold text-foreground text-lg">{match.opponent}</div>
                    </div>
                  </div>

                  {/* Right: Result Badge & Recap Link */}
                  <div className="flex-shrink-0 flex items-center gap-4">
                    <div
                      className={`px-4 py-2 rounded-full text-sm font-bold uppercase ${
                        match.result === 'win'
                          ? 'bg-accent/20 text-accent'
                          : 'bg-foreground/10 text-foreground/60'
                      }`}
                    >
                      {match.result}
                    </div>

                    <Link
                      href={`/matches/${match.id}`}
                      className="px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {matches.length === 0 && (
          <div className="text-center py-20">
            <p className="text-foreground/60 text-lg">No matches recorded yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
