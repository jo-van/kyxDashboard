# KY Combinator Dashboard 🚀

A real-time dashboard system for tracking work hours, stats, and achievements in the KY Combinator coworking space. Features geofenced check-ins, leaderboards, and fun metric tracking.

## Features

### 🖥️ TV Dashboard
- Real-time clock and active user count
- Rotating challenge code (changes every 30 minutes)
- Daily awards (Early Bird 🥕 and Night Owl 🧅)
- Weekly hour leaderboard
- Community stats tracking (Zyn packs, Git commits, Poker P&L)

### 📱 Mobile Check-in App
- Geolocation-based check-in with challenge code fallback
- Real-time session timer
- Personal weekly hours tracking
- Daily stat tracking with quick counters
- Poker session P&L tracker

### 🛠️ Admin Panel
- Manage check-ins and edit times
- User and team management
- Stats overview and history
- System settings and challenge code generation

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes (Serverless)
- **Database**: Supabase (PostgreSQL)
- **Real-time**: Supabase Realtime
- **Authentication**: Supabase Auth
- **Hosting**: Vercel (Free tier)

## Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/jo-van/kyxDashboard.git
cd kyxDashboard
npm install
```

### 2. Set up Supabase
1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Run the schema in `supabase/schema.sql` in the SQL Editor
4. Get your API keys from Settings > API

### 3. Configure environment variables
```bash
cp .env.example .env.local
```

Then edit `.env.local` with your Supabase credentials and geofence coordinates.

### 4. Run locally
```bash
npm run dev
```

Visit http://localhost:3000

### 5. Deploy to Vercel
1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy!

## Project Structure

```
├── app/
│   ├── page.tsx           # TV Dashboard
│   ├── checkin/
│   │   └── page.tsx       # Mobile check-in
│   ├── admin/
│   │   └── page.tsx       # Admin panel
│   └── api/
│       ├── checkin/       # Check-in/out endpoints
│       ├── stats/         # Stats tracking
│       └── rotate-code/   # Challenge code rotation
├── components/
│   ├── Dashboard.tsx
│   ├── CheckIn.tsx
│   └── AdminPanel.tsx
├── lib/
│   ├── supabase.ts        # Supabase client & helpers
│   └── types.ts           # TypeScript types
└── supabase/
    └── schema.sql         # Database schema
```

## Cost: $0/month 🎉

This entire system runs on free tiers:
- Vercel: 100GB bandwidth/month
- Supabase: 500MB database, 2GB bandwidth
- Real-time updates included
- Authentication included

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT