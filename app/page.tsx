'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { matches } from '@/data/matches';
import { players } from '@/data/players';

// Animated counter component
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const duration = 1500;
    const steps = 30;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [value]);
  
  return <span>{count}{suffix}</span>;
}

export default function Home() {
  const wins = matches.filter(m => m.result === 'win').length;
  const losses = matches.filter(m => m.result === 'loss').length;
  const winRate = matches.length > 0 ? Math.round((wins / matches.length) * 100) : 0;
  
  // Get recent matches (last 3)
  const recentMatches = [...matches]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center hero-gradient noise-overlay overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full filter blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/3 rounded-full filter blur-3xl animate-float delay-500" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/3 rounded-full filter blur-3xl" />
        </div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 grid-pattern opacity-50" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Logo/Brand */}
            <div className="mb-8 animate-fade-in">
              <div className="inline-block relative">
                <div className="absolute -inset-4 bg-accent/20 rounded-full filter blur-xl animate-glow-pulse" />
                <Image
                  src="/images/saltcrew.png"
                  alt="Saltcrew"
                  width={300}
                  height={75}
                  className="h-16 md:h-20 w-auto relative z-10"
                  priority
                />
              </div>
            </div>
            
            {/* Main headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in-up delay-100">
              <span className="text-foreground">NORTH AMERICAN</span>
              <br />
              <span className="gradient-text">COUNTER-STRIKE</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-foreground-muted mb-12 max-w-2xl mx-auto animate-fade-in-up delay-200">
              Competing in ESEA leagues. Building champions. Creating legends.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up delay-300">
              <Link href="/team" className="btn-primary">
                Meet the Team
              </Link>
              <Link href="/matches" className="btn-secondary">
                View Results
              </Link>
            </div>
            
            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-in-up delay-400">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                  <AnimatedCounter value={wins} />
                </div>
                <div className="text-sm text-foreground-muted uppercase tracking-wider">Wins</div>
              </div>
              <div className="text-center border-x border-border">
                <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                  <AnimatedCounter value={winRate} suffix="%" />
                </div>
                <div className="text-sm text-foreground-muted uppercase tracking-wider">Win Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                  <AnimatedCounter value={players.length} />
                </div>
                <div className="text-sm text-foreground-muted uppercase tracking-wider">Players</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-foreground-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Recent Results Section */}
      <section className="py-24 bg-background-secondary relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold uppercase section-header mb-6">
              Recent Matches
            </h2>
            <p className="text-foreground-muted text-lg max-w-2xl mx-auto">
              Latest results from our competitive journey
            </p>
          </div>
          
          {/* Match Cards */}
          <div className="space-y-4 max-w-4xl mx-auto mb-12">
            {recentMatches.map((match, index) => (
              <div
                key={match.id}
                className="glass-card rounded-lg p-6 group animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Tournament Info */}
                  <div className="flex-shrink-0">
                    <div className="text-accent text-sm font-medium uppercase tracking-wider mb-1">
                      {match.tournament}
                    </div>
                    <div className="text-foreground-muted text-sm">
                      {new Date(match.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </div>
                  </div>
                  
                  {/* Match Score */}
                  <div className="flex items-center gap-6 flex-1 justify-center">
                    <div className="text-right">
                      <div className="font-bold text-foreground text-lg">Saltcrew</div>
                    </div>
                    
                    <div className="flex items-center gap-3 bg-background px-4 py-2 rounded-lg">
                      {match.format === 'bo1' ? (
                        <>
                          <span className={`text-2xl font-bold ${match.result === 'win' ? 'text-success' : 'text-foreground'}`}>
                            {match.saltcrewScore}
                          </span>
                          <span className="text-foreground-muted">:</span>
                          <span className={`text-2xl font-bold ${match.result === 'loss' ? 'text-error' : 'text-foreground'}`}>
                            {match.opponentScore}
                          </span>
                        </>
                      ) : (
                        <span className={`text-2xl font-bold ${match.result === 'win' ? 'text-success' : 'text-error'}`}>
                          {match.seriesScore}
                        </span>
                      )}
                    </div>
                    
                    <div className="text-left">
                      <div className="font-bold text-foreground text-lg">{match.opponent}</div>
                    </div>
                  </div>
                  
                  {/* Result Badge */}
                  <div className="flex-shrink-0">
                    <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider ${
                      match.result === 'win' ? 'badge-win' : 'badge-loss'
                    }`}>
                      {match.result}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* View All Button */}
          <div className="text-center">
            <Link href="/matches" className="btn-secondary inline-block">
              View All Results
            </Link>
          </div>
        </div>
      </section>

      {/* Team Preview Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/5 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold uppercase mb-6">
                Meet the <span className="text-accent">Crew</span>
              </h2>
              <p className="text-foreground-muted text-lg mb-8 leading-relaxed">
                A dedicated group of competitors pushing the limits of North American Counter-Strike. 
                From Open to Intermediate and beyond, we&apos;re building something special.
              </p>
              
              {/* Player avatars */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex -space-x-3">
                  {players.slice(0, 5).map((player, i) => (
                    <div
                      key={player.steamId}
                      className="w-12 h-12 rounded-full border-2 border-background bg-background-card flex items-center justify-center overflow-hidden"
                      style={{ zIndex: 5 - i }}
                    >
                      {player.image ? (
                        <Image
                          src={player.image}
                          alt={player.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover object-top"
                        />
                      ) : (
                        <span className="text-accent font-bold">{player.name[0]}</span>
                      )}
                    </div>
                  ))}
                </div>
                <span className="text-foreground-muted text-sm">
                  +{players.length - 5} more players
                </span>
              </div>
              
              <Link href="/team" className="btn-primary inline-block">
                Full Roster
              </Link>
            </div>
            
            {/* Right: Featured Players Grid */}
            <div className="grid grid-cols-2 gap-4">
              {players.slice(0, 4).map((player, index) => (
                <div
                  key={player.steamId}
                  className="glass-card rounded-lg overflow-hidden group animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="h-32 bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center relative overflow-hidden">
                    {player.image ? (
                      <Image
                        src={player.image}
                        alt={player.name}
                        fill
                        className="object-cover object-top img-zoom"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center border-2 border-accent/50">
                        <span className="text-2xl font-bold text-accent">{player.name[0]}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-foreground group-hover:text-accent transition-colors">
                      {player.name}
                    </h3>
                    <p className="text-foreground-muted text-xs uppercase tracking-wider">
                      {player.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-background to-accent/10" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold uppercase mb-6">
            Join the <span className="text-accent">Movement</span>
          </h2>
          <p className="text-foreground-muted text-lg mb-8 max-w-2xl mx-auto">
            Follow our journey, support the team, and be part of the Saltcrew community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://arma.gg/collections/saltcrew" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Shop Merch
            </a>
            <Link href="/about" className="btn-secondary">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
