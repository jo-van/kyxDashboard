import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper functions
export async function getCurrentCheckIns() {
  const { data, error } = await supabase
    .from('checkins')
    .select(`
      *,
      user:users(name, company)
    `)
    .is('check_out', null)
    
  return { data, error }
}

export async function getWeeklyLeaderboard() {
  const weekStart = new Date()
  weekStart.setDate(weekStart.getDate() - weekStart.getDay())
  weekStart.setHours(0, 0, 0, 0)
  
  // This would need a proper SQL function or view in Supabase
  // For now, returning mock data
  const mockData = [
    { name: 'John Davis', hours: 42.5, team: 'Startup Alpha' },
    { name: 'Alice Kim', hours: 38.2, team: 'Beta Labs' },
    { name: 'Bob Smith', hours: 35.1, team: 'Startup Alpha' },
    { name: 'Emma Wilson', hours: 32.7, team: 'Gamma Tech' },
    { name: 'Chris Lee', hours: 30.5, team: 'Beta Labs' }
  ]
  
  return { data: mockData, error: null }
}

export async function verifyLocation(lat: number, lng: number): boolean {
  const spaceLat = parseFloat(process.env.NEXT_PUBLIC_GEOFENCE_LAT!)
  const spaceLng = parseFloat(process.env.NEXT_PUBLIC_GEOFENCE_LNG!)
  const radius = parseFloat(process.env.NEXT_PUBLIC_GEOFENCE_RADIUS!) / 1000 // Convert to km
  
  // Haversine formula for distance
  const R = 6371 // Earth's radius in km
  const dLat = (lat - spaceLat) * Math.PI / 180
  const dLng = (lng - spaceLng) * Math.PI / 180
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(spaceLat * Math.PI / 180) * Math.cos(lat * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  const distance = R * c
  
  return distance <= radius
}

export async function getCurrentChallengeCode() {
  const { data } = await supabase
    .from('challenge_codes')
    .select('code')
    .eq('active', true)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()
    
  return data?.code || 'LOADING'
}