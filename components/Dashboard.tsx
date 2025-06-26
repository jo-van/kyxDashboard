import React, { useState, useEffect } from 'react'
import { Clock, Users, Trophy, Target, TrendingUp, Code, DollarSign, Package } from 'lucide-react'
import { DashboardData } from '@/lib/types'

interface DashboardProps {
  data: DashboardData
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit' 
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            KY COMBINATOR COWORKING
          </h1>
          <p className="text-xl text-purple-200 mt-2">{formatDate(currentTime)}</p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-mono font-bold">{formatTime(currentTime)}</div>
          <div className="flex items-center gap-2 mt-2 text-lg">
            <Users className="w-5 h-5" />
            <span className="text-purple-200">Currently in space:</span>
            <span className="font-bold text-2xl text-green-400">{data.activeUsers}</span>
          </div>
        </div>
      </div>

      {/* Challenge Code */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 mb-8 text-center shadow-2xl">
        <p className="text-lg mb-2">Today's Challenge Code</p>
        <div className="text-6xl font-mono font-bold tracking-wider animate-pulse">
          {data.challengeCode}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Today's Heroes */}
        <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-purple-500/20">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-400" />
            Today's Heroes
          </h2>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-xl p-4 border border-orange-500/30">
              <div className="text-3xl mb-2">🥕 Early Bird</div>
              <div className="text-xl font-semibold">{data.todayHeroes.earlyBird.name}</div>
              <div className="text-lg text-orange-300">Arrived at {data.todayHeroes.earlyBird.time}</div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-xl p-4 border border-purple-500/30">
              <div className="text-3xl mb-2">🧅 Night Owl</div>
              <div className="text-xl font-semibold">{data.todayHeroes.nightOwl.name}</div>
              <div className="text-lg text-purple-300">Left at {data.todayHeroes.nightOwl.time}</div>
            </div>
          </div>
        </div>

        {/* Weekly Leaderboard */}
        <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-purple-500/20">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-green-400" />
            Weekly Leaderboard
          </h2>
          
          <div className="space-y-3">
            {data.weeklyLeaderboard.map((user, index) => (
              <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
                index === 0 ? 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30' :
                index === 1 ? 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border border-gray-400/30' :
                index === 2 ? 'bg-gradient-to-r from-orange-600/20 to-orange-700/20 border border-orange-600/30' :
                'bg-slate-700/50'
              }`}>
                <div className="flex items-center gap-3">
                  <div className="text-2xl font-bold">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}
                  </div>
                  <div>
                    <div className="font-semibold">{user.name}</div>
                    <div className="text-sm text-gray-400">{user.team}</div>
                  </div>
                </div>
                <div className="text-xl font-bold">{user.hours}h</div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-purple-500/20">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-semibold text-purple-300">Team Leader</div>
                <div className="text-2xl font-bold">{data.teamLeader.name}</div>
              </div>
              <div className="text-3xl font-bold text-green-400">{data.teamLeader.hours}h</div>
            </div>
          </div>
        </div>

        {/* Fun Stats */}
        <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-purple-500/20">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-pink-400" />
            Community Stats
          </h2>
          
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-xl p-4 border border-blue-500/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Package className="w-8 h-8 text-blue-400" />
                  <div>
                    <div className="text-lg font-semibold">Zyn Packs Today</div>
                    <div className="text-sm text-blue-300">Keep it fresh! 🌿</div>
                  </div>
                </div>
                <div className="text-4xl font-bold text-blue-400">{data.funStats.zynPacks}</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-xl p-4 border border-green-500/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Code className="w-8 h-8 text-green-400" />
                  <div>
                    <div className="text-lg font-semibold">Git Commits</div>
                    <div className="text-sm text-green-300">Ship it! 🚀</div>
                  </div>
                </div>
                <div className="text-4xl font-bold text-green-400">{data.funStats.githubCommits}</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-xl p-4 border border-red-500/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-8 h-8 text-red-400" />
                  <div>
                    <div className="text-lg font-semibold">Poker P&L</div>
                    <div className="text-sm text-red-300">Know when to fold 'em 🎲</div>
                  </div>
                </div>
                <div className={`text-4xl font-bold ${data.funStats.pokerNet >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  ${data.funStats.pokerNet >= 0 ? '+' : ''}{data.funStats.pokerNet}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-purple-300">
        <p className="text-lg">Building the future, one commit at a time 🚀</p>
      </div>
    </div>
  )
}

export default Dashboard