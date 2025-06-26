import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { userId, type, value, date } = body
  
  const { data, error } = await supabase
    .from('stats')
    .insert({
      user_id: userId,
      type,
      value,
      date: date || new Date().toISOString().split('T')[0]
    })
    
  if (error) {
    return NextResponse.json({ error }, { status: 400 })
  }
  
  return NextResponse.json({ data })
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')
  const date = searchParams.get('date')
  
  let query = supabase.from('stats').select('*')
  
  if (userId) {
    query = query.eq('user_id', userId)
  }
  
  if (date) {
    query = query.eq('date', date)
  }
  
  const { data, error } = await query
  
  if (error) {
    return NextResponse.json({ error }, { status: 400 })
  }
  
  return NextResponse.json({ data })
}