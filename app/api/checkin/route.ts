import { NextRequest, NextResponse } from 'next/server'
import { supabase, verifyLocation, getCurrentChallengeCode } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { userId, location, challengeCode, action } = body
  
  if (action === 'in') {
    // Verify location or challenge code
    let valid = false
    
    if (location) {
      valid = await verifyLocation(location.lat, location.lng)
    }
    
    if (!valid && challengeCode) {
      const currentCode = await getCurrentChallengeCode()
      valid = challengeCode.toUpperCase() === currentCode
    }
    
    if (!valid) {
      return NextResponse.json(
        { error: 'Invalid location or challenge code' },
        { status: 403 }
      )
    }
    
    // Create check-in
    const { data, error } = await supabase
      .from('checkins')
      .insert({
        user_id: userId,
        check_in: new Date().toISOString(),
        location: location || null
      })
      
    if (error) {
      return NextResponse.json({ error }, { status: 400 })
    }
    
    return NextResponse.json({ data })
  } else {
    // Check out
    const { data: activeCheckin } = await supabase
      .from('checkins')
      .select('id')
      .eq('user_id', userId)
      .is('check_out', null)
      .single()
      
    if (!activeCheckin) {
      return NextResponse.json(
        { error: 'No active check-in found' },
        { status: 404 }
      )
    }
    
    const { data, error } = await supabase
      .from('checkins')
      .update({ check_out: new Date().toISOString() })
      .eq('id', activeCheckin.id)
      
    if (error) {
      return NextResponse.json({ error }, { status: 400 })
    }
    
    return NextResponse.json({ data })
  }
}