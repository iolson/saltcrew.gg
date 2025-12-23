# How to Add Player Images

## Adding Player Photos to the Team Page

1. **Prepare your images:**
   - Recommended size: 400x400 pixels or larger (square ratio preferred)
   - Format: JPG, PNG, or WebP
   - Name them clearly (e.g., `fuzzyhat.jpg`, `h0t_s0up.png`)

2. **Add images to the project:**
   - Place player images in: `public/images/players/`
   - Example: `public/images/players/fuzzyhat.jpg`

3. **Update the team page:**
   - Open `app/team/page.tsx`
   - Find the `players` array
   - Add the `image` property to each player:

   ```typescript
   {
     name: 'FuzzyHat',
     role: 'Player',
     steamId: '76561197971721260',
     image: '/images/players/fuzzyhat.jpg',  // Add this line
     season53Stats: '...',
     season54Stats: '...',
   }
   ```

4. **Save and test:**
   - Run `npm run dev` to see the changes locally
   - Images will automatically appear in the player cards

## Image Tips

- **Consistent styling**: Use images with similar backgrounds for a cohesive look
- **File size**: Optimize images to keep them under 500KB for faster loading
- **Fallback**: If no image is provided, the player's initial will display in a circle

## Example Full Player Entry

```typescript
{
  name: 'FuzzyHat',
  role: 'Player',
  steamId: '76561197971721260',
  image: '/images/players/fuzzyhat.jpg',
  season53Stats: 'https://csstats.gg/player/76561197971721260?modes=ESEA&groups=ESEA%20S53',
  season54Stats: 'https://csstats.gg/player/76561197971721260?modes=ESEA&groups=ESEA%20S54',
}
```

Just provide me with the player images and I can add them for you!
