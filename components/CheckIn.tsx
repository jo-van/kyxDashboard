import React, { useState, useEffect } from 'react'
import { MapPin, Clock, Plus, Minus, Code, Github, DollarSign, Package, LogIn, LogOut, Trophy } from 'lucide-react'
import { supabase, verifyLocation } from '@/lib/supabase'

const CheckIn = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false)
  const [checkInTime, setCheckInTime] = useState<Date | null>(null)
  const [elapsedTime, setElapsedTime] = useState('00:00:00')
  const [challengeCode, setChallengeCode] = useState('')
  const [locationEnabled, setLocationEnabled] = useState(false)
  const [todayStats, setTodayStats] = useState({
    zyn: 0,
    commits: 0,
    pokerBuyIn: 0,
    pokerCashOut: 0
  })
  const [weeklyHours, setWeeklyHours] = useState(23.5)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Update elapsed time
  useEffect(() => {
    if (isCheckedIn && checkInTime) {
      const timer = setInterval(() => {
        const now = new Date()
        const diff = now.getTime() - checkInTime.getTime()
        const hours = Math.floor(diff / 3600000)
        const minutes = Math.floor((diff % 3600000) / 60000)
        const seconds = Math.floor((diff % 60000) / 1000)
        setElapsedTime(
          `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        )
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [isCheckedIn, checkInTime])

  const checkLocation = () => {
    return new Promise<boolean>((resolve) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocationEnabled(true)
            resolve(verifyLocation(position.coords.latitude, position.coords.longitude))
          },
          () => {
            setLocationEnabled(false)
            resolve(false)
          }
        )
      } else {
        resolve(false)
      }
    })
  }

  const handleCheckIn = async () => {
    setLoading(true)
    setError('')
    
    const inSpace = await checkLocation()
    
    if (!inSpace && !challengeCode) {
      setError('Please enter the challenge code from the dashboard or enable location services')
      setLoading(false)
      return
    }

    // In production, this would make an API call
    // For now, just simulate success
    setIsCheckedIn(true)
    setCheckInTime(new Date())
    setLoading(false)
  }

  const handleCheckOut = () => {
    setIsCheckedIn(false)
    setCheckInTime(null)
    setElapsedTime('00:00:00')
    setChallengeCode('')
  }

  const updateStat = (stat: string, delta: number) => {
    setTodayStats(prev => ({
      ...prev,
      [stat]: Math.max(0, prev[stat as keyof typeof prev] + delta)
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
            KY Combinator
          </h1>
          <p className="text-purple-200">Coworking Check-in</p>
        </div>

        {/* User Info */}
        <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 mb-6 border border-purple-500/20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold">Welcome back!</h2>
              <p className="text-purple-300">John Davis</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-purple-300">This week</p>
              <p className="text-2xl font-bold">{weeklyHours}h</p>
            </div>
          </div>

          {/* Check-in Status */}
          <div className={`rounded-xl p-4 text-center ${
            isCheckedIn ? 'bg-green-500/20 border border-green-500/30' : 'bg-slate-700/50'
          }`}>
            {isCheckedIn ? (
              <>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-semibold">Currently Working</span>
                </div>
                <div className="text-3xl font-mono font-bold">{elapsedTime}</div>
              </>
            ) : (
              <p className="text-gray-400">Not checked in</p>
            )}
          </div>
        </div>

        {/* Check-in/out Controls */}
        {!isCheckedIn ? (
          <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 mb-6 border border-purple-500/20">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Check In Options
            </h3>
            
            {!locationEnabled && (
              <div className="mb-4">
                <label className="block text-sm text-purple-300 mb-2">
                  Challenge Code (from dashboard)
                </label>
                <input
                  type="text"
                  value={challengeCode}
                  onChange={(e) => setChallengeCode(e.target.value)}
                  placeholder="XXXXX-XX"
                  className="w-full bg-slate-700/50 border border-purple-500/30 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                />
              </div>
            )}

            {error && (
              <p className="text-red-400 text-sm mb-4">{error}</p>
            )}

            <button
              onClick={handleCheckIn}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg py-3 font-semibold flex items-center justify-center gap-2 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LogIn className="w-5 h-5" />
              {loading ? 'Checking in...' : 'Check In'}
            </button>

            {locationEnabled && (
              <p className="text-sm text-green-400 mt-2 text-center">
                ✓ Location verified
              </p>
            )}
          </div>
        ) : (
          <button
            onClick={handleCheckOut}
            className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 rounded-lg py-3 font-semibold flex items-center justify-center gap-2 transition-all transform hover:scale-105 mb-6"
          >
            <LogOut className="w-5 h-5" />
            Check Out
          </button>
        )}

        {/* Today's Stats */}
        <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-purple-500/20">
          <h3 className="text-lg font-semibold mb-4">Today's Stats</h3>
          
          <div className="space-y-4">
            {/* Zyn Counter */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-blue-400" />
                <span>Zyn Packs</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateStat('zyn', -1)}
                  className="w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded flex items-center justify-center"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-bold text-xl">{todayStats.zyn}</span>
                <button
                  onClick={() => updateStat('zyn', 1)}
                  className="w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded flex items-center justify-center"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Git Commits */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Github className="w-5 h-5 text-green-400" />
                <span>Git Commits</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateStat('commits', -1)}
                  className="w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded flex items-center justify-center"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-bold text-xl">{todayStats.commits}</span>
                <button
                  onClick={() => updateStat('commits', 1)}
                  className="w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded flex items-center justify-center"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Poker */}
            <div className="border-t border-purple-500/20 pt-4">
              <div className="flex items-center gap-3 mb-3">
                <DollarSign className="w-5 h-5 text-red-400" />
                <span>Poker Session</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-purple-300">Buy-in</label>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-gray-400">$</span>
                    <input
                      type="number"
                      value={todayStats.pokerBuyIn}
                      onChange={(e) => setTodayStats(prev => ({ ...prev, pokerBuyIn: parseInt(e.target.value) || 0 }))}
                      className="w-full bg-slate-700/50 border border-purple-500/30 rounded px-2 py-1 text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-purple-300">Cash-out</label>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-gray-400">$</span>
                    <input
                      type="number"
                      value={todayStats.pokerCashOut}
                      onChange={(e) => setTodayStats(prev => ({ ...prev, pokerCashOut: parseInt(e.target.value) || 0 }))}
                      className="w-full bg-slate-700/50 border border-purple-500/30 rounded px-2 py-1 text-white"
                    />
                  </div>
                </div>
              </div>
              {(todayStats.pokerBuyIn > 0 || todayStats.pokerCashOut > 0) && (
                <div className="mt-2 text-center">
                  <span className="text-sm text-gray-400">P&L: </span>
                  <span className={`font-bold ${todayStats.pokerCashOut - todayStats.pokerBuyIn >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    ${todayStats.pokerCashOut - todayStats.pokerBuyIn >= 0 ? '+' : ''}{todayStats.pokerCashOut - todayStats.pokerBuyIn}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckIn