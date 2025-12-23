# Data Directory

This directory contains centralized data files for managing website content. Instead of editing page components directly, you can update these files to manage matches, players, and other content.

## Files

### `matches.ts`
Manages all match data displayed on the Matches page and individual match detail pages.

Supports three match formats:
- **BO1** (Best of 1) - Regular season matches (single map)
- **BO3** (Best of 3) - Playoffs/tournaments (up to 3 maps)
- **BO5** (Best of 5) - Finals/championships (up to 5 maps)

**To add a Best of 1 match (Regular Season):**
1. Open `data/matches.ts`
2. Add a new object to the `matches` array:
```typescript
{
  id: '6',                          // Unique ID (increment from last)
  date: '2024-12-20',              // Match date (YYYY-MM-DD)
  tournament: 'ESEA Season 54',    // Tournament name
  opponent: 'Team Name',           // Opponent team name
  format: 'bo1',                   // Best of 1
  saltcrewScore: 16,               // Saltcrew's score
  opponentScore: 13,               // Opponent's score
  map: 'de_dust2',                 // Map name
  result: 'win',                   // 'win' or 'loss'
  hasRecap: true,                  // true if you have a recap markdown file
}
```

**To add a Best of 3 match (Playoffs):**
```typescript
{
  id: '7',
  date: '2024-12-22',
  tournament: 'ESEA Playoffs',
  opponent: 'Top Team',
  format: 'bo3',                   // Best of 3
  result: 'win',                   // Overall series result
  seriesScore: '2-1',             // Series score (maps won)
  maps: [                          // Individual map results
    { map: 'de_dust2', saltcrewScore: 16, opponentScore: 12 },
    { map: 'de_mirage', saltcrewScore: 13, opponentScore: 16 },
    { map: 'de_inferno', saltcrewScore: 16, opponentScore: 9 },
  ],
  hasRecap: true,
}
```

**To add a Best of 5 match (Finals):**
```typescript
{
  id: '8',
  date: '2024-12-25',
  tournament: 'Championship Final',
  opponent: 'Elite Team',
  format: 'bo5',                   // Best of 5
  result: 'loss',
  seriesScore: '2-3',             // Series score
  maps: [
    { map: 'de_dust2', saltcrewScore: 16, opponentScore: 14 },
    { map: 'de_mirage', saltcrewScore: 12, opponentScore: 16 },
    { map: 'de_inferno', saltcrewScore: 16, opponentScore: 13 },
    { map: 'de_nuke', saltcrewScore: 10, opponentScore: 16 },
    { map: 'de_ancient', saltcrewScore: 14, opponentScore: 16 },
  ],
  hasRecap: true,
}
```

3. Save the file - changes will appear automatically on both pages

**To add a match recap:**
1. Create a markdown file in `content/recaps/` named `{id}.md` (e.g., `6.md`)
2. Add frontmatter and content (see existing recap files for examples)
3. Set `hasRecap: true` for that match in `matches.ts`

### `players.ts`
Manages the team roster displayed on the Team page.

**To add a new player:**
1. Open `data/players.ts`
2. Add a new object to the `players` array:
```typescript
{
  name: 'PlayerName',                                    // Display name
  role: 'Player',                                        // Role (Player, Captain & IGL, etc.)
  steamId: '76561198000000000',                         // Steam ID
  image: '/images/players/playername.png',              // Path to player image (optional)
  statsUrl: 'https://csstats.gg/player/76561198000000000', // Stats page URL
}
```
3. If adding a player image, place it in `public/images/players/`
4. Save the file - changes will appear automatically

**To update player information:**
- Edit the corresponding player object in `data/players.ts`
- Changes apply to all pages using player data

## Benefits of This Approach

✅ **Single source of truth** - Edit data in one place, updates everywhere
✅ **Type safety** - TypeScript ensures data matches expected format
✅ **Easy to manage** - No need to edit React components
✅ **Version controlled** - Track changes to matches and roster over time
✅ **Cleaner code** - Separates data from presentation logic

## Notes

- Both files use TypeScript (`.ts`) instead of JSON for better type checking
- The files export both types and data, ensuring consistency across the app
- Helper functions are included (e.g., `getMatchById`, `formatDate`)
- All data is statically generated at build time for optimal performance
