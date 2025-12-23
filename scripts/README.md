# Scripts Directory

## CSV to Matches Converter

This script helps you bulk import match data from a CSV file.

### Setup

1. **Create your CSV file**: Copy `matches-template.csv` to `matches.csv` and fill in your data
2. **Run the converter**: `node scripts/csv-to-matches.js`
3. **Copy the output**: The script will output TypeScript code
4. **Paste into data file**: Replace the matches array in `data/matches.ts`

### CSV Format

```csv
id,date,tournament,opponent,format,saltcrewScore,opponentScore,map,result,hasRecap
```

**Field Details:**
- `id`: Unique identifier (e.g., `s48-001` for Season 48, Match 1)
- `date`: YYYY-MM-DD format
- `tournament`: Tournament name (e.g., "ESEA Season 48")
- `opponent`: Opponent team name
- `format`: `bo1`, `bo3`, or `bo5`
- `saltcrewScore`: Your rounds won (BO1 only, leave blank for BO3/BO5)
- `opponentScore`: Opponent rounds won (BO1 only, leave blank for BO3/BO5)
- `map`: Map name (BO1 only, e.g., "de_dust2", leave blank for BO3/BO5)
- `result`: `win` or `loss`
- `hasRecap`: `true` or `false`

### Example

```csv
id,date,tournament,opponent,format,saltcrewScore,opponentScore,map,result,hasRecap
s48-001,2023-01-15,ESEA Season 48,Team Alpha,bo1,16,12,de_dust2,win,false
s48-002,2023-01-18,ESEA Season 48,Beta Squad,bo1,13,16,de_mirage,loss,false
```

### For BO3/BO5 Matches

For playoff matches (BO3/BO5), include the row with format set but leave score/map fields blank:

```csv
s48-playoff,2023-03-15,ESEA Season 48 Playoffs,Elite Team,bo3,,,loss,false
```

Then manually add the map details in `data/matches.ts`:

```typescript
{
  id: 's48-playoff',
  date: '2023-03-15',
  tournament: 'ESEA Season 48 Playoffs',
  opponent: 'Elite Team',
  format: 'bo3',
  result: 'loss',
  seriesScore: '1-2',
  maps: [
    { map: 'de_dust2', saltcrewScore: 16, opponentScore: 12 },
    { map: 'de_mirage', saltcrewScore: 13, opponentScore: 16 },
    { map: 'de_inferno', saltcrewScore: 9, opponentScore: 16 },
  ],
  hasRecap: false,
}
```

### Tips

- Use consistent naming for IDs (e.g., `s48-001`, `s48-002`, etc.)
- Keep tournament names consistent within a season
- Double-check win/loss results match your scores
- Most regular season matches will have `hasRecap: false`
- Sort matches by date (oldest first) for best display
