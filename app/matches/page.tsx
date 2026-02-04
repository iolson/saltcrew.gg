'use client';

import type { Metadata } from 'next';
import Link from 'next/link';
import { matches, formatDate } from '@/data/matches';
import { useEffect, useState } from 'react';

// Animated counter
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const duration = 1000;
    const steps = 20;
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
    
    return () => clearTimeout(timer);
  }, [value]);
  
  return <span>{count}{suffix}</span>;
}

export default function MatchesPage() {
  // Sort matches by date (newest first)
  const sortedMatches = [...matches].sort((a, b) => {
    const dateComparison = new Date(b.date).getTime() - new Date(a.date).getTime();
    if (dateComparison !== 0) return dateComparison;
    return b.id.localeCompare(a.id);
  });

  const wins = matches.filter(m => m.result === 'win').length;
  const losses = matches.filter(m => m.result === 'loss').length;
  const winRate = matches.length > 0 ? Math.round((wins / matches.length) * 100) : 0;

  // Group matches by tournament
  const groupedMatches: { [key: string]: typeof matches } = {};
  sortedMatches.forEach(match => {
    const tournament = match.tournament;
    if (!groupedMatches[tournament]) {
      groupedMatches[tournament] = [];
    }
    groupedMatches[tournament].push(match);
  });

  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <section className="relative py-24 bg-background-secondary overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-accent/5 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold uppercase mb-6">
              Match <span className="text-accent">Results</span>
            </h1>
            <div className="w-24 h-1 bg-accent mx-auto mb-6" />
            <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
              Track our competitive journey through ESEA leagues
            </p>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-12 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="glass-card rounded-xl p-6 text-center">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                <AnimatedCounter value={matches.length} />
              </div>
              <div className="text-foreground-muted uppercase text-sm tracking-wider">Total Matches</div>
            </div>
            <div className="glass-card rounded-xl p-6 text-center">
              <div className="text-4xl md:text-5xl font-bold text-success mb-2">
                <AnimatedCounter value={wins} />
              </div>
              <div className="text-foreground-muted uppercase text-sm tracking-wider">Wins</div>
            </div>
            <div className="glass-card rounded-xl p-6 text-center">
              <div className="text-4xl md:text-5xl font-bold text-error mb-2">
                <AnimatedCounter value={losses} />
              </div>
              <div className="text-foreground-muted uppercase text-sm tracking-wider">Losses</div>
            </div>
            <div className="glass-card rounded-xl p-6 text-center">
              <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                <AnimatedCounter value={winRate} suffix="%" />
              </div>
              <div className="text-foreground-muted uppercase text-sm tracking-wider">Win Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Matches List */}
      <section className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3">
            {sortedMatches.map((match, index) => (
              <div
                key={match.id}
                className={`glass-card rounded-lg overflow-hidden group transition-all duration-300 animate-fade-in-up ${
                  match.result === 'win' 
                    ? 'hover:border-success/50 border-l-4 border-l-success' 
                    : 'hover:border-error/50 border-l-4 border-l-error'
                }`}
                style={{ animationDelay: `${Math.min(index * 30, 300)}ms` }}
              >
                <div className="p-5">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Left: Date & Tournament */}
                    <div className="flex-shrink-0 lg:w-48">
                      <div className="text-accent text-xs font-semibold uppercase tracking-wider mb-1">
                        {formatDate(match.date)}
                      </div>
                      <div className="text-foreground text-sm font-medium truncate">
                        {match.tournament}
                      </div>
                      {match.format === 'bo1' && match.map && (
                        <div className="text-foreground-muted text-xs mt-1">
                          {match.map}
                        </div>
                      )}
                      {(match.format === 'bo3' || match.format === 'bo5') && (
                        <div className="text-foreground-muted text-xs mt-1">
                          Best of {match.format === 'bo3' ? '3' : '5'}
                        </div>
                      )}
                    </div>

                    {/* Center: Match Result */}
                    <div className="flex items-center gap-4 flex-1 justify-center">
                      <div className="text-right flex-1 lg:flex-none">
                        <div className="font-bold text-foreground">Saltcrew</div>
                      </div>

                      <div className="flex items-center gap-3 bg-background px-5 py-2 rounded-lg min-w-[120px] justify-center">
                        {match.format === 'bo1' ? (
                          <>
                            <span className={`text-2xl font-bold font-mono ${match.result === 'win' ? 'text-success' : 'text-foreground'}`}>
                              {match.saltcrewScore}
                            </span>
                            <span className="text-foreground-muted text-lg">-</span>
                            <span className={`text-2xl font-bold font-mono ${match.result === 'loss' ? 'text-error' : 'text-foreground'}`}>
                              {match.opponentScore}
                            </span>
                          </>
                        ) : (
                          <span className={`text-2xl font-bold font-mono ${match.result === 'win' ? 'text-success' : 'text-error'}`}>
                            {match.seriesScore}
                          </span>
                        )}
                      </div>

                      <div className="text-left flex-1 lg:flex-none">
                        <div className="font-bold text-foreground">{match.opponent}</div>
                      </div>
                    </div>

                    {/* Right: Result & Actions */}
                    <div className="flex-shrink-0 flex items-center gap-3 justify-end lg:w-48">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                        match.result === 'win' ? 'badge-win' : 'badge-loss'
                      }`}>
                        {match.result}
                      </span>

                      <Link
                        href={`/matches/${match.id}`}
                        className="px-4 py-1.5 bg-border hover:bg-accent hover:text-white rounded-lg text-xs font-semibold transition-all duration-300 uppercase tracking-wider"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                  
                  {/* BO3/BO5 Map Details */}
                  {match.maps && match.maps.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="flex flex-wrap gap-2">
                        {match.maps.map((map, i) => (
                          <div 
                            key={i} 
                            className={`px-3 py-1.5 rounded text-xs font-medium ${
                              map.saltcrewScore > map.opponentScore 
                                ? 'bg-success/10 text-success border border-success/20' 
                                : 'bg-error/10 text-error border border-error/20'
                            }`}
                          >
                            {map.map}: {map.saltcrewScore}-{map.opponentScore}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {matches.length === 0 && (
            <div className="text-center py-20 glass-card rounded-xl">
              <div className="text-6xl mb-4">🎮</div>
              <p className="text-foreground-muted text-lg">No matches recorded yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
