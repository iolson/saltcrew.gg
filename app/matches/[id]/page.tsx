import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getRecapBySlug } from '@/lib/markdown';

interface Match {
  id: string;
  date: string;
  tournament: string;
  opponent: string;
  saltcrewScore: number;
  opponentScore: number;
  map?: string;
  result: 'win' | 'loss';
}

// This would normally come from a database or API
// For now, we'll use the same data as the matches page
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
  },
];

interface MatchPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return matches.map((match) => ({
    id: match.id,
  }));
}

export async function generateMetadata({ params }: MatchPageProps): Promise<Metadata> {
  const { id } = await params;
  const match = matches.find((m) => m.id === id);

  if (!match) {
    return {
      title: 'Match Not Found - Saltcrew',
    };
  }

  return {
    title: `${match.opponent} (${match.saltcrewScore}-${match.opponentScore}) - Saltcrew`,
    description: `Match details: Saltcrew vs ${match.opponent} - ${match.result}`,
  };
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export default async function MatchDetailPage({ params }: MatchPageProps) {
  const { id } = await params;
  const match = matches.find((m) => m.id === id);

  if (!match) {
    notFound();
  }

  // Try to load a recap for this match
  const recap = await getRecapBySlug(id);

  return (
    <div className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/matches"
          className="inline-flex items-center text-accent hover:text-accent-hover mb-8 transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M15 19l-7-7 7-7"></path>
          </svg>
          Back to Matches
        </Link>

        {/* Match Header */}
        <div className="bg-card border border-border rounded-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div>
              <div className="text-foreground/60 text-sm mb-1">{formatDate(match.date)}</div>
              <div className="text-foreground font-medium">{match.tournament}</div>
              {match.map && (
                <div className="text-foreground/60 text-sm mt-1">{match.map}</div>
              )}
            </div>
            <div
              className={`px-6 py-3 rounded-full text-lg font-bold uppercase ${
                match.result === 'win'
                  ? 'bg-accent/20 text-accent'
                  : 'bg-foreground/10 text-foreground/60'
              }`}
            >
              {match.result}
            </div>
          </div>

          {/* Score Display */}
          <div className="flex items-center justify-center gap-8 py-8">
            <div className="text-center">
              <div className="text-foreground font-bold text-2xl mb-2">Saltcrew</div>
              <div
                className={`text-6xl font-bold ${
                  match.result === 'win' ? 'text-accent' : 'text-foreground'
                }`}
              >
                {match.saltcrewScore}
              </div>
            </div>

            <div className="text-foreground/40 text-4xl">-</div>

            <div className="text-center">
              <div className="text-foreground font-bold text-2xl mb-2">{match.opponent}</div>
              <div
                className={`text-6xl font-bold ${
                  match.result === 'loss' ? 'text-accent' : 'text-foreground'
                }`}
              >
                {match.opponentScore}
              </div>
            </div>
          </div>
        </div>

        {/* Match Recap */}
        {recap ? (
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-3xl font-bold text-accent mb-6">Match Recap</h2>
            <article className="prose prose-invert prose-lg max-w-none">
              <div
                className="text-foreground/90 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: recap.content }}
                style={{
                  fontSize: '1.125rem',
                  lineHeight: '1.75',
                }}
              />
            </article>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-lg p-12 text-center">
            <div className="text-4xl mb-4">📝</div>
            <p className="text-foreground/60">
              No detailed recap available for this match yet.
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8">
          <Link
            href="/matches"
            className="inline-flex items-center justify-center w-full md:w-auto px-8 py-3 bg-accent hover:bg-accent-hover text-white font-bold rounded-lg transition-colors"
          >
            View All Matches
          </Link>
        </div>
      </div>
    </div>
  );
}
