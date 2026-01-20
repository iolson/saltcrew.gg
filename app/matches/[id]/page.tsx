import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getRecapBySlug } from '@/lib/markdown';
import { matches, getMatchById } from '@/data/matches';

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
  const match = getMatchById(id);

  if (!match) {
    return {
      title: 'Result Not Found - Saltcrew',
    };
  }

  const scoreDisplay = match.format === 'bo1'
    ? `${match.saltcrewScore}-${match.opponentScore}`
    : match.seriesScore;

  return {
    title: `${match.opponent} (${scoreDisplay}) - Saltcrew`,
    description: `Result: Saltcrew vs ${match.opponent} - ${match.result}`,
  };
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function getYouTubeVideoId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  return match ? match[1] : null;
}

export default async function MatchDetailPage({ params }: MatchPageProps) {
  const { id } = await params;
  const match = getMatchById(id);

  if (!match) {
    notFound();
  }

  // Try to load a recap for this match
  const recap = await getRecapBySlug(id);

  // Get YouTube video ID if VOD URL exists
  const youtubeVideoId = match.vodUrl ? getYouTubeVideoId(match.vodUrl) : null;

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
          Back to Results
        </Link>

        {/* Match Header */}
        <div className="bg-card border border-border rounded-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div>
              <div className="text-foreground/60 text-sm mb-1">{formatDate(match.date)}</div>
              <div className="text-foreground font-medium">{match.tournament}</div>
              <div className="text-foreground/60 text-sm mt-1">
                {match.format === 'bo1' && match.map}
                {match.format === 'bo3' && 'Best of 3'}
                {match.format === 'bo5' && 'Best of 5'}
              </div>
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

          {match.format === 'bo1' ? (
            /* BO1 Score Display */
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
          ) : (
            /* BO3/BO5 Series Display */
            <div>
              {/* Series Score */}
              <div className="py-6 mb-6 border-b border-border">
                <div className="text-center mb-6">
                  <div className="text-foreground/60 text-sm uppercase tracking-wider mb-4">Series Score</div>
                  <div className={`text-6xl font-bold ${match.result === 'win' ? 'text-accent' : 'text-foreground'}`}>
                    {match.seriesScore}
                  </div>
                </div>
                <div className="flex items-center justify-between max-w-2xl mx-auto">
                  <div className="text-foreground font-bold text-2xl">Saltcrew</div>
                  <div className="text-foreground font-bold text-2xl">{match.opponent}</div>
                </div>
              </div>

              {/* Map Breakdown */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-accent mb-3">Map Results</h3>
                {match.maps?.map((mapResult, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-background rounded border border-border"
                  >
                    <div className="text-foreground/80 font-medium">{mapResult.map}</div>
                    <div className="flex items-center gap-4">
                      <div className="text-foreground font-bold">{mapResult.saltcrewScore}</div>
                      <div className="text-foreground/40">-</div>
                      <div className="text-foreground font-bold">{mapResult.opponentScore}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* VOD Embed */}
        {youtubeVideoId && (
          <div className="bg-card border border-border rounded-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-accent mb-6">Watch VOD</h2>
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                title="Match VOD"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Match Recap */}
        {recap ? (
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-3xl font-bold text-accent mb-6">Recap</h2>
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
              No detailed recap available yet.
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8">
          <Link
            href="/matches"
            className="inline-flex items-center justify-center w-full md:w-auto px-8 py-3 bg-accent hover:bg-accent-hover text-white font-bold rounded-lg transition-colors"
          >
            View All Results
          </Link>
        </div>
      </div>
    </div>
  );
}
