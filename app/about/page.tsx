import type { Metadata } from 'next';
import { accolades } from '@/data/accolades';

export const metadata: Metadata = {
  title: 'About - Saltcrew',
  description: 'About Saltcrew - Our achievements and accolades in Counter-Strike',
};

export default function AboutPage() {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-accent mb-4 uppercase">About</h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            North American Counter-Strike team competing at the highest level
          </p>
        </div>

        {/* Accolades Section */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center uppercase">
            Accolades
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accolades.map((accolade) => (
              <div
                key={accolade.id}
                className="bg-card border border-border rounded-lg p-6 hover:border-accent transition-all duration-300 group relative overflow-hidden"
              >
                {/* Background glow for 1st place */}
                {accolade.placement === '1st' && (
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent pointer-events-none" />
                )}
                
                <div className="relative">
                  {/* Icon and Placement */}
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-5xl">{accolade.icon}</span>
                    <div>
                      <span className={`text-3xl font-bold ${
                        accolade.placement === '1st' 
                          ? 'text-yellow-400' 
                          : accolade.placement === '2nd'
                          ? 'text-gray-300'
                          : 'text-amber-600'
                      }`}>
                        {accolade.placement}
                      </span>
                      <span className="text-foreground/60 text-lg ml-2">Place</span>
                    </div>
                  </div>

                  {/* Tournament Name */}
                  <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors mb-2">
                    {accolade.tournament}
                  </h3>

                  {/* Event/Date Details */}
                  <div className="text-foreground/60 text-sm">
                    {accolade.event && <p>{accolade.event}</p>}
                    {accolade.date && <p>{accolade.date}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Story Section */}
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 uppercase">
            Our Story
          </h2>
          <p className="text-foreground/70 text-lg leading-relaxed">
            Saltcrew is a North American Counter-Strike team dedicated to competitive excellence. 
            We bring together passionate players who share a love for the game and a drive to compete 
            at the highest level. From local LANs to national championships, we&apos;re always pushing 
            to improve and make our mark on the CS scene.
          </p>
        </div>
      </div>
    </div>
  );
}
