import type { Metadata } from 'next';
import Link from 'next/link';
import { matches, formatDate } from '@/data/matches';

export const metadata: Metadata = {
  title: 'Results - Saltcrew',
  description: 'View Saltcrew results and performance history',
};

export default function MatchesPage() {
  // Sort matches by date (newest first), with ID as tiebreaker
  const sortedMatches = [...matches].sort((a, b) => {
    const dateComparison = new Date(b.date).getTime() - new Date(a.date).getTime();
    if (dateComparison !== 0) {
      return dateComparison;
    }
    // If dates are equal, sort by ID (assuming IDs are chronological)
    return b.id.localeCompare(a.id);
  });

  const wins = matches.filter(m => m.result === 'win').length;
  const losses = matches.filter(m => m.result === 'loss').length;
  const winRate = matches.length > 0 ? ((wins / matches.length) * 100).toFixed(1) : '0.0';

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-accent mb-4 uppercase">Results</h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            Track our journey
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
          {sortedMatches.map((match) => (
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
                    <div className="text-foreground/60 text-sm mt-1">
                      {match.format === 'bo1' && match.map && match.map}
                      {match.format === 'bo3' && 'Best of 3'}
                      {match.format === 'bo5' && 'Best of 5'}
                    </div>
                  </div>

                  {/* Center: Match Result */}
                  <div className="flex items-center gap-6 flex-1 justify-center">
                    <div className="text-right">
                      <div className="font-bold text-foreground text-lg">Saltcrew</div>
                    </div>

                    <div className="flex items-center gap-4">
                      {match.format === 'bo1' ? (
                        <>
                          <div
                            className={`text-3xl font-bold ${
                              match.result === 'win' ? 'text-green-500' : 'text-foreground'
                            }`}
                          >
                            {match.saltcrewScore}
                          </div>
                          <div className="text-foreground/40 text-xl">:</div>
                          <div
                            className={`text-3xl font-bold ${
                              match.result === 'loss' ? 'text-red-500' : 'text-foreground'
                            }`}
                          >
                            {match.opponentScore}
                          </div>
                        </>
                      ) : (
                        <div
                          className={`text-3xl font-bold ${
                            match.result === 'win' ? 'text-green-500' : 'text-red-500'
                          }`}
                        >
                          {match.seriesScore}
                        </div>
                      )}
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
                          ? 'bg-green-500/20 text-green-500'
                          : 'bg-red-500/20 text-red-500'
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
            <p className="text-foreground/60 text-lg">No results recorded yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
