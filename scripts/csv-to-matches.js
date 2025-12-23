/**
 * CSV to Matches Converter
 *
 * Usage:
 * 1. Create a matches.csv file in the scripts/ directory
 * 2. Run: node scripts/csv-to-matches.js
 * 3. Copy the output and paste into data/matches.ts
 */

const fs = require('fs');
const path = require('path');

const csvFilePath = path.join(__dirname, 'matches.csv');

if (!fs.existsSync(csvFilePath)) {
  console.error('Error: matches.csv not found in scripts/ directory');
  console.error('Please create a matches.csv file first');
  process.exit(1);
}

const csvContent = fs.readFileSync(csvFilePath, 'utf-8');
const lines = csvContent.trim().split('\n');
const headers = lines[0].split(',');

// Parse CSV
const matches = [];
for (let i = 1; i < lines.length; i++) {
  const values = lines[i].split(',');
  const match = {};

  headers.forEach((header, index) => {
    const value = values[index]?.trim();
    match[header.trim()] = value;
  });

  matches.push(match);
}

// Convert to TypeScript format
console.log('// Generated matches - copy and paste into data/matches.ts');
console.log('export const matches: Match[] = [');

matches.forEach((match, index) => {
  const isBO1 = match.format === 'bo1';

  console.log('  {');
  console.log(`    id: '${match.id}',`);
  console.log(`    date: '${match.date}',`);
  console.log(`    tournament: '${match.tournament}',`);
  console.log(`    opponent: '${match.opponent}',`);
  console.log(`    format: '${match.format}',`);
  console.log(`    result: '${match.result}',`);

  if (isBO1) {
    console.log(`    saltcrewScore: ${match.saltcrewScore},`);
    console.log(`    opponentScore: ${match.opponentScore},`);
    console.log(`    map: '${match.map}',`);
  } else {
    console.log(`    seriesScore: 'TBD', // TODO: Add series score`);
    console.log(`    maps: [], // TODO: Add map results`);
  }

  const hasRecap = match.hasRecap === 'true';
  console.log(`    hasRecap: ${hasRecap},`);

  console.log(`  }${index < matches.length - 1 ? ',' : ''}`);
});

console.log('];');

console.log('\n// Summary:');
console.log(`// Total matches: ${matches.length}`);
console.log(`// Wins: ${matches.filter(m => m.result === 'win').length}`);
console.log(`// Losses: ${matches.filter(m => m.result === 'loss').length}`);
