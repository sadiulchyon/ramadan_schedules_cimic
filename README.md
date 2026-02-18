# Ramadan 2026 Prayer Times

A simple, mobile-friendly web app for your community to easily view Ramadan prayer times, Sehri end times, and Iftar times.

![Ramadan 2026](https://img.shields.io/badge/Ramadan-1447%20AH%20%2F%2026%20CE-emerald)

## Features

- **Today's View** - Automatically shows the current Ramadan day
- **Sehri & Iftar Times** - Prominently displayed for quick reference
- **All 5 Daily Prayers** - Complete schedule with Adhan and Iqamah times
- **Tarawih Prayer** - Night prayer times included
- **Easy Navigation** - Jump to any day (1-30) with one click
- **Eid al-Fitr Info** - Three Eid prayer times
- **Tarawih-Only Day Notice** - Shows Tuesday Feb 17 (no fasting, Tarawih only)

## Prayer Schedule

| Event | Date |
|-------|------|
| Tarawih Only (No Fasting) | Tuesday, Feb 17, 2026 |
| Ramadan 1 (First Fast) | Wednesday, Feb 18, 2026 |
| Ramadan 30 (Last Fast) | Thursday, Mar 19, 2026 |
| Eid al-Fitr | Friday, Mar 20, 2026 |

**Calculation Method:** Based on moonsighting.com

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- Lucide icons

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ramadan-2026-prayer-times.git
cd ramadan-2026-prayer-times
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open http://localhost:5173 in your browser

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Deployment

### Netlify (Recommended)

1. Push this repo to GitHub
2. Connect your GitHub repo to Netlify
3. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Deploy!

Netlify will auto-deploy whenever you push to your main branch.

### Other Platforms

This is a standard static React app. You can deploy to:
- Vercel
- GitHub Pages
- Cloudflare Pages
- Any static hosting

## Customization

### Prayer Times Data

Edit `src/data/prayerTimes.ts` to update prayer times for your location.

### Colors/Theme

Edit `tailwind.config.js` to customize the emerald color scheme.

### Adding Visitor Counter

To add a visitor counter, you can:
1. Use Plausible Analytics (privacy-friendly, free tier)
2. Use Firebase for a simple counter
3. Use Vercel Analytics (if deploying to Vercel)

## License

MIT License - Feel free to use and modify for your community!

## Credits

- Prayer times based on [moonsighting.com](https://moonsighting.com)
- Built with [shadcn/ui](https://ui.shadcn.com) components

---

**Ramadan Mubarak!** 🌙
