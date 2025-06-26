'use client'

import { useEffect, useState } from 'react'
import Dashboard from '@/components/Dashboard'
import { supabase, getCurrentCheckIns, getWeeklyLeaderboard, getCurrentChallengeCode } from '@/lib/supabase'

export default function DashboardPage() {
  const [data, setData] = useState({
    activeUsers: 0,
    challengeCode: 'LOADING',
    weeklyLeaderboard: [],
    todayHeroes: {
      earlyBird: { name: 'No check-ins yet', time: '--:--' },
      nightOwl: { name: 'No check-ins yet', time: '--:--' }
    },
    teamLeader: { name: 'No data', hours: 0 },
    funStats: {
      zynPacks: 0,
      githubCommits: 0,
      pokerNet: 0
    }
  })

  useEffect(() => {
    // Initial load
    loadDashboardData()
    
    // Set up real-time subscriptions
    const channel = supabase
      .channel('dashboard-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'checkins' },
        () => loadDashboardData()
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'stats' },
        () => loadDashboardData()
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'challenge_codes' },
        () => loadDashboardData()
      )
      .subscribe()
      
    // Refresh every 30 seconds for time updates
    const interval = setInterval(loadDashboardData, 30000)
    
    return () => {
      channel.unsubscribe()
      clearInterval(interval)
    }
  }, [])
  
  async function loadDashboardData() {
    // Get active users
    const { data: activeCheckIns } = await getCurrentCheckIns()
    
    // Get challenge code
    const challengeCode = await getCurrentChallengeCode()
    
    // Get weekly leaderboard
    const { data: leaderboard } = await getWeeklyLeaderboard()
    
    // Get today's heroes (this would need actual implementation)
    // For now, using mock data
    
    setData({
      activeUsers: activeCheckIns?.length || 0,
      challengeCode: challengeCode || 'ROCKET-42',
      weeklyLeaderboard: leaderboard || [],
      todayHeroes: {
        earlyBird: { name: 'Sarah Mitchell', time: '6:32 AM' },
        nightOwl: { name: 'Mike Thompson', time: '11:45 PM' }
      },
      teamLeader: { name: 'Startup Alpha', hours: 156.3 },
      funStats: {
        zynPacks: 23,
        githubCommits: 487,
        pokerNet: -125
      }
    })
  }
  
  return <Dashboard data={data} />
}