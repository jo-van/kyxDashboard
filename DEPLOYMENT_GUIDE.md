# 🚀 Complete Deployment Guide for KY Combinator Dashboard

## Table of Contents
1. [Quick Start (15 minutes)](#quick-start)
2. [Setting Up Supabase](#setting-up-supabase)
3. [Deploying to Vercel](#deploying-to-vercel)
4. [TV Dashboard Setup](#tv-dashboard-setup)
5. [Daily User Flow](#daily-user-flow)
6. [Troubleshooting](#troubleshooting)

---

## Quick Start

### Prerequisites
- GitHub account (you have this ✓)
- Computer with internet access
- TV/Monitor for dashboard display
- Smartphones for user check-ins

### Overview
1. **Supabase** → Database & Authentication (5 min)
2. **Vercel** → Web hosting & deployment (5 min)
3. **Configuration** → Customize for your space (5 min)

---

## Setting Up Supabase

### Step 1: Create Supabase Account
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with GitHub (easiest) or email

### Step 2: Create New Project
1. Click "New project"
2. Fill in:
   - **Project name**: `ky-combinator-dashboard`
   - **Database Password**: Generate a strong password (save this!)
   - **Region**: Choose closest to Louisville (likely US East)
3. Click "Create new project" (takes ~2 minutes to provision)

### Step 3: Set Up Database Schema
1. Once project is ready, click "SQL Editor" in left sidebar
2. Click "New query"
3. Copy ALL contents from `supabase/schema.sql` in your repo
4. Paste into SQL editor
5. Click "Run" (bottom right)
6. You should see "Success. No rows returned"

### Step 4: Add Test Data
1. Still in SQL Editor, click "New query" again
2. Copy ALL contents from `supabase/seed.sql`
3. Paste and click "Run"
4. You should see "Success. No rows returned"

### Step 5: Get Your API Keys
1. Click "Settings" (gear icon) in left sidebar
2. Click "API"
3. You'll need:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **Anon/Public Key**: `eyJhbGc...` (long string)
4. Keep this tab open - you'll need these for Vercel

---

## Deploying to Vercel

### Step 1: Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel

### Step 2: Import Your Project
1. Click "Add New..." → "Project"
2. You'll see your GitHub repos
3. Find `kyxDashboard` and click "Import"

### Step 3: Configure Environment Variables
1. Before deploying, you'll see "Configure Project"
2. Open "Environment Variables" section
3. Add these variables:

```
NEXT_PUBLIC_SUPABASE_URL = [Your Supabase Project URL]
NEXT_PUBLIC_SUPABASE_ANON_KEY = [Your Supabase Anon Key]
NEXT_PUBLIC_GEOFENCE_LAT = 38.2527
NEXT_PUBLIC_GEOFENCE_LNG = -85.7585
NEXT_PUBLIC_GEOFENCE_RADIUS = 50
```

**Important**: Replace the lat/lng with your actual coworking space coordinates!
- To find coordinates: Go to Google Maps, right-click your location, click the coordinates

### Step 4: Deploy
1. Click "Deploy"
2. Wait 2-3 minutes for build
3. You'll get a URL like `ky-combinator-dashboard.vercel.app`
4. Click "Visit" to see your live site!

---

## TV Dashboard Setup

### Hardware Requirements
- Smart TV with web browser OR
- Regular TV/Monitor + Computer (Raspberry Pi, old laptop, Chromecast, etc.)
- Stable WiFi connection

### Option 1: Smart TV with Browser
1. Open TV's web browser
2. Navigate to: `https://your-app.vercel.app`
3. The dashboard will display automatically
4. Set as homepage or bookmark

### Option 2: Computer + TV/Monitor
1. Connect computer to TV via HDMI
2. Open Chrome/Firefox in fullscreen (F11)
3. Navigate to: `https://your-app.vercel.app`
4. Disable screen timeout:
   - **Windows**: Settings → System → Power & Sleep → Set "Screen" to Never
   - **Mac**: System Preferences → Energy Saver → Prevent display sleep
   - **Linux**: Varies by distro, usually in Power settings

### Option 3: Raspberry Pi (Recommended for 24/7)
```bash
# After setting up Raspbian
sudo apt-get update
sudo apt-get install chromium-browser unclutter

# Create autostart script
nano ~/kiosk.sh
```

Add this content:
```bash
#!/bin/bash
unclutter -idle 1 &
chromium-browser --noerrdialogs --kiosk https://your-app.vercel.app --incognito
```

Then:
```bash
chmod +x ~/kiosk.sh
# Add to autostart
```

### Dashboard Features
- **Auto-refresh**: Updates every 30 seconds
- **Challenge Code**: Rotates every 30 minutes automatically
- **Real-time**: Shows current people in space
- **Daily Awards**: Updates at midnight

---

## Daily User Flow

### For Users (Founders)

#### First Time Setup (2 minutes)
1. **On their phone**, navigate to: `https://your-app.vercel.app/checkin`
2. Bookmark the page (Add to Home Screen on iPhone/Android)
3. They'll see a welcome screen with "John Davis" (temporary - auth coming later)

#### Daily Check-In Process
1. **Arrive at coworking space**
2. Open bookmarked check-in page on phone
3. **Two options to check in**:
   - **Option A**: Allow location (easiest)
     - Click "Check In"
     - Allow location access when prompted
     - System verifies they're in the building
   - **Option B**: Use challenge code
     - Look at TV dashboard for current code (e.g., "ROCKET-42")
     - Type code in the input field
     - Click "Check In"

4. **Timer starts** showing their session time
5. **Throughout the day** they can:
   - Update Zyn pack count (+ or - buttons)
   - Update Git commits (+ or - buttons)
   - Enter poker buy-in/cash-out amounts

6. **When leaving**: Click "Check Out" button

### What Users See

#### On Their Phone:
- Personal dashboard with weekly hours
- Current session timer
- Quick stat entry buttons
- Simple check in/out interface

#### On the TV:
- Who's currently in the space
- Today's Early Bird 🥕 (first arrival)
- Today's Night Owl 🧅 (last to leave)
- Weekly hour leaderboard
- Fun community stats
- Current challenge code

### For Administrators

#### Admin Panel Access
1. Navigate to: `https://your-app.vercel.app/admin`
2. Current features:
   - View/edit check-ins
   - Manage users
   - View stats
   - Generate new challenge codes
   - Update geofence settings

**Note**: Authentication isn't implemented yet, so protect this URL!

---

## Troubleshooting

### Common Issues

#### "Invalid location or challenge code"
- **Cause**: User is outside geofence or entered wrong code
- **Fix**: Check TV for current code, or verify geofence coordinates in Vercel env vars

#### Dashboard not updating
- **Cause**: Browser cache or connection issue
- **Fix**: Refresh page (Ctrl+R or Cmd+R)

#### Can't check out
- **Cause**: No active check-in found
- **Fix**: Admin can manually edit in admin panel

#### Times are wrong
- **Cause**: Timezone mismatch
- **Fix**: Supabase uses UTC; times are converted in the app

### Quick Fixes

#### Reset Challenge Code
1. Go to `/admin`
2. Click "Settings" tab
3. Click "Generate New" next to challenge code

#### Fix Stuck Check-in
1. Go to `/admin`
2. Click "Check-ins" tab
3. Find the stuck entry
4. Click edit icon
5. Add check-out time
6. Save

#### Update Geofence
1. Go to Vercel dashboard
2. Settings → Environment Variables
3. Update `NEXT_PUBLIC_GEOFENCE_LAT` and `NEXT_PUBLIC_GEOFENCE_LNG`
4. Redeploy (happens automatically)

---

## Next Steps

### Immediate Improvements
1. **Add Authentication**: Supabase Auth for real user accounts
2. **Mobile App**: PWA for better mobile experience
3. **GitHub Integration**: Auto-pull commit counts
4. **Slack Integration**: Daily summaries

### Future Features
- Badge/achievement system
- Meeting room booking
- Coffee consumption tracking
- Team challenges
- Monthly reports

---

## Support

- **Issues**: Create issue on GitHub repo
- **Updates**: Pull latest changes and redeploy
- **Database**: Supabase dashboard for direct data access

---

## Quick Reference

### URLs
- **TV Dashboard**: `https://your-app.vercel.app`
- **User Check-in**: `https://your-app.vercel.app/checkin`
- **Admin Panel**: `https://your-app.vercel.app/admin`

### Default Test Users
- Dalton (dalton@kyxcombinator.com)
- Gobin (gobin@startup.com)
- Dan (dan@betalabs.com)
- Rachel (rachel@gamma.tech)
- Annie (annie@delta.vc)

### Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL = your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY = your-anon-key
NEXT_PUBLIC_GEOFENCE_LAT = your-latitude
NEXT_PUBLIC_GEOFENCE_LNG = your-longitude
NEXT_PUBLIC_GEOFENCE_RADIUS = 50
```

---

**Congratulations! Your KY Combinator Dashboard is ready to track hours and create friendly competition in your coworking space!** 🚀