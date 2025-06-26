export interface User {
  id: string
  email: string
  name: string
  company?: string
  team_id?: string
  is_admin: boolean
  created_at: string
}

export interface Team {
  id: string
  name: string
  created_at: string
}

export interface CheckIn {
  id: string
  user_id: string
  check_in: string
  check_out?: string
  location?: {
    lat: number
    lng: number
  }
  created_at: string
  user?: User
}

export interface Stat {
  id: string
  user_id: string
  type: 'zyn' | 'commits' | 'poker_buy' | 'poker_cash'
  value: number
  date: string
  metadata?: any
  created_at: string
}

export interface ChallengeCode {
  id: string
  code: string
  active: boolean
  created_at: string
}

export interface DashboardData {
  activeUsers: number
  challengeCode: string
  weeklyLeaderboard: any[]
  todayHeroes: {
    earlyBird: { name: string; time: string }
    nightOwl: { name: string; time: string }
  }
  teamLeader: { name: string; hours: number }
  funStats: {
    zynPacks: number
    githubCommits: number
    pokerNet: number
  }
}