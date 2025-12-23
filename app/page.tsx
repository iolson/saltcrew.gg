import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-card to-background py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full filter blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
              WELCOME TO <span className="text-accent">SALTCREW</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-3xl mx-auto">
              North American Counter-Strike team
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/team"
                className="px-8 py-4 bg-accent hover:bg-accent-hover text-white font-bold rounded-lg transition-colors uppercase tracking-wider"
              >
                Meet the Team
              </Link>
              <Link
                href="/matches"
                className="px-8 py-4 border-2 border-accent text-accent hover:bg-accent hover:text-white font-bold rounded-lg transition-colors uppercase tracking-wider"
              >
                View Results
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Updates Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-accent mb-4 uppercase">Latest Updates</h2>
            <div className="w-24 h-1 bg-accent mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">

            {/* Team Roster */}
            <Link href="/team" className="group bg-card rounded-lg overflow-hidden border border-border hover:border-accent transition-colors">
              <div className="h-48 bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                <span className="text-6xl">👥</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                  Team Roster
                </h3>
                <p className="text-foreground/70">
                  Meet the players making it happen
                </p>
              </div>
            </Link>
            
            {/* Results */}
            <Link href="/matches" className="group bg-card rounded-lg overflow-hidden border border-border hover:border-accent transition-colors">
              <div className="h-48 bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                <span className="text-6xl">🎮</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                  Results
                </h3>
                <p className="text-foreground/70">
                  Check out our latest results and standings
                </p>
              </div>
            </Link>

          </div>
        </div>
      </section>
    </>
  );
}
