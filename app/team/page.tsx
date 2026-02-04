'use client';

import type { Metadata } from 'next';
import Image from 'next/image';
import { players } from '@/data/players';
import { useEffect, useState } from 'react';

// Animated section wrapper
function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      {children}
    </div>
  );
}

export default function TeamPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <section className="relative py-24 bg-background-secondary overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-accent/5 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection>
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-bold uppercase mb-6">
                The <span className="text-accent">Crew</span>
              </h1>
              <div className="w-24 h-1 bg-accent mx-auto mb-6" />
              <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
                Meet the players who represent Saltcrew on the server
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Players Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {players.map((player, index) => (
              <AnimatedSection key={player.steamId} delay={index * 100}>
                <div className="glass-card rounded-xl overflow-hidden group h-full flex flex-col">
                  {/* Player Image */}
                  <div className="h-72 bg-gradient-to-br from-accent/20 via-accent/5 to-background flex items-end justify-center relative overflow-hidden">
                    {/* Background glow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
                    
                    {/* Image or placeholder */}
                    {player.image ? (
                      <Image
                        src={player.image}
                        alt={player.name}
                        fill
                        className="object-cover object-top img-zoom"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 rounded-full bg-accent/10 flex items-center justify-center border-4 border-accent/30 group-hover:border-accent/60 transition-colors">
                          <span className="text-6xl font-bold text-accent">{player.name[0]}</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Role badge */}
                    <div className="absolute top-4 right-4 z-20">
                      <span className="px-3 py-1 bg-background/80 backdrop-blur-sm rounded-full text-xs font-medium text-accent border border-accent/20 uppercase tracking-wider">
                        {player.role}
                      </span>
                    </div>
                  </div>

                  {/* Player Info */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-2xl font-bold text-foreground mb-1 group-hover:text-accent transition-colors">
                      {player.name}
                    </h3>
                    <p className="text-foreground-muted text-sm uppercase tracking-wider mb-4">
                      {player.role}
                    </p>

                    {/* Stats Link */}
                    <a
                      href={player.statsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto block w-full px-4 py-3 bg-background border border-border hover:border-accent hover:bg-accent hover:text-white text-foreground text-center rounded-lg transition-all duration-300 text-sm font-semibold uppercase tracking-wider group/link"
                    >
                      <span className="flex items-center justify-center gap-2">
                        View Stats
                        <svg className="w-4 h-4 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </span>
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team Stats Section */}
      <section className="py-20 bg-background-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold uppercase mb-4">
                Team <span className="text-accent">Identity</span>
              </h2>
              <p className="text-foreground-muted max-w-2xl mx-auto">
                Built on dedication, teamwork, and the pursuit of excellence
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🎯', title: 'Competitive', desc: 'ESEA Intermediate competitors striving for greatness' },
              { icon: '🤝', title: 'United', desc: 'A tight-knit group with shared goals and chemistry' },
              { icon: '📈', title: 'Growing', desc: 'Constantly improving and climbing the ranks' },
            ].map((item, index) => (
              <AnimatedSection key={item.title} delay={200 + index * 100}>
                <div className="glass-card rounded-xl p-8 text-center group hover:border-accent/50 transition-colors">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-foreground-muted">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
