import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  // This will be called by Vercel Cron
  const words = ['ROCKET', 'LAUNCH', 'BUILD', 'SCALE', 'HUSTLE', 'GRIND', 'SHIP', 'CODE']
  const word = words[Math.floor(Math.random() * words.length)]
  const num = Math.floor(Math.random() * 100)
  const newCode = `${word}-${num}`
  
  // Deactivate old codes
  await supabase
    .from('challenge_codes')
    .update({ active: false })
    .eq('active', true)
  
  // Create new code
  const { data, error } = await supabase
    .from('challenge_codes')
    .insert({ code: newCode, active: true })
    
  if (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
  
  return NextResponse.json({ code: newCode })
}