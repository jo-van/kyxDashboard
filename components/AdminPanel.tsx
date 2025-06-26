import React, { useState } from 'react'
import { Users, Clock, Edit2, Save, X, RefreshCw, Settings, Trophy, Calendar } from 'lucide-react'

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('checkins')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [users, setUsers] = useState([
    { id: 1, name: 'John Davis', email: 'john@startup.com', team: 'Startup Alpha', isAdmin: false, weeklyHours: 42.5 },
    { id: 2, name: 'Sarah Mitchell', email: 'sarah@beta.com', team: 'Beta Labs', isAdmin: false, weeklyHours: 38.2 },
    { id: 3, name: 'Mike Thompson', email: 'mike@gamma.com', team: 'Gamma Tech', isAdmin: false, weeklyHours: 35.1 },
  ])
  
  const [checkins, setCheckins] = useState([
    { id: 1, user: 'John Davis', checkIn: '2024-01-15 08:30', checkOut: '2024-01-15 18:45', duration: '10h 15m' },
    { id: 2, user: 'Sarah Mitchell', checkIn: '2024-01-15 06:32', checkOut: '2024-01-15 17:20', duration: '10h 48m' },
    { id: 3, user: 'Mike Thompson', checkIn: '2024-01-15 09:15', checkOut: '2024-01-15 23:45', duration: '14h 30m' },
  ])

  const [stats, setStats] = useState([
    { id: 1, user: 'John Davis', date: '2024-01-15', type: 'zyn', value: 3 },
    { id: 2, user: 'John Davis', date: '2024-01-15', type: 'commits', value: 23 },
    { id: 3, user: 'Sarah Mitchell', date: '2024-01-15', type: 'poker_buy', value: 100 },
    { id: 4, user: 'Sarah Mitchell', date: '2024-01-15', type: 'poker_cash', value: 75 },
  ])

  const [challengeCode, setChallengeCode] = useState('ROCKET-42')

  const generateNewCode = () => {
    const words = ['ROCKET', 'LAUNCH', 'BUILD', 'SCALE', 'HUSTLE', 'GRIND', 'SHIP', 'CODE']
    const word = words[Math.floor(Math.random() * words.length)]
    const num = Math.floor(Math.random() * 100)
    setChallengeCode(`${word}-${num}`)
  }

  const handleEdit = (id: number) => {
    setEditingId(id)
  }

  const handleSave = () => {
    setEditingId(null)
  }

  const handleCancel = () => {
    setEditingId(null)
  }

  const tabs = [
    { id: 'checkins', label: 'Check-ins', icon: Clock },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'stats', label: 'Stats', icon: Trophy },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
            KY Combinator Admin Panel
          </h1>
          <p className="text-purple-200">Manage users, check-ins, and stats</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-800/50 text-purple-300 hover:bg-slate-700/50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-purple-500/20">
          {/* Check-ins Tab */}
          {activeTab === 'checkins' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Recent Check-ins</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-purple-500/20">
                      <th className="text-left py-3 px-4">User</th>
                      <th className="text-left py-3 px-4">Check In</th>
                      <th className="text-left py-3 px-4">Check Out</th>
                      <th className="text-left py-3 px-4">Duration</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {checkins.map(checkin => (
                      <tr key={checkin.id} className="border-b border-purple-500/10">
                        <td className="py-3 px-4">{checkin.user}</td>
                        <td className="py-3 px-4">
                          {editingId === checkin.id ? (
                            <input
                              type="text"
                              defaultValue={checkin.checkIn}
                              className="bg-slate-700 border border-purple-500/30 rounded px-2 py-1"
                            />
                          ) : (
                            checkin.checkIn
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {editingId === checkin.id ? (
                            <input
                              type="text"
                              defaultValue={checkin.checkOut}
                              className="bg-slate-700 border border-purple-500/30 rounded px-2 py-1"
                            />
                          ) : (
                            checkin.checkOut
                          )}
                        </td>
                        <td className="py-3 px-4">{checkin.duration}</td>
                        <td className="py-3 px-4">
                          {editingId === checkin.id ? (
                            <div className="flex gap-2">
                              <button
                                onClick={handleSave}
                                className="p-1 bg-green-600 hover:bg-green-700 rounded"
                              >
                                <Save className="w-4 h-4" />
                              </button>
                              <button
                                onClick={handleCancel}
                                className="p-1 bg-red-600 hover:bg-red-700 rounded"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleEdit(checkin.id)}
                              className="p-1 bg-purple-600 hover:bg-purple-700 rounded"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Manage Users</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-purple-500/20">
                      <th className="text-left py-3 px-4">Name</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Team</th>
                      <th className="text-left py-3 px-4">Weekly Hours</th>
                      <th className="text-left py-3 px-4">Admin</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id} className="border-b border-purple-500/10">
                        <td className="py-3 px-4">{user.name}</td>
                        <td className="py-3 px-4">{user.email}</td>
                        <td className="py-3 px-4">{user.team}</td>
                        <td className="py-3 px-4">{user.weeklyHours}h</td>
                        <td className="py-3 px-4">
                          <input
                            type="checkbox"
                            checked={user.isAdmin}
                            onChange={() => {}}
                            className="rounded"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <button className="p-1 bg-purple-600 hover:bg-purple-700 rounded">
                            <Edit2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Stats Tab */}
          {activeTab === 'stats' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Stats Overview</h2>
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="bg-slate-700/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-2">Total Hours This Week</h3>
                  <p className="text-4xl font-bold text-green-400">247.3h</p>
                </div>
                <div className="bg-slate-700/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-2">Active Users Today</h3>
                  <p className="text-4xl font-bold text-blue-400">12</p>
                </div>
                <div className="bg-slate-700/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-2">Average Session</h3>
                  <p className="text-4xl font-bold text-purple-400">8.7h</p>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-4">Recent Stat Entries</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-purple-500/20">
                      <th className="text-left py-3 px-4">User</th>
                      <th className="text-left py-3 px-4">Date</th>
                      <th className="text-left py-3 px-4">Type</th>
                      <th className="text-left py-3 px-4">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.map(stat => (
                      <tr key={stat.id} className="border-b border-purple-500/10">
                        <td className="py-3 px-4">{stat.user}</td>
                        <td className="py-3 px-4">{stat.date}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-sm ${
                            stat.type === 'zyn' ? 'bg-blue-600' :
                            stat.type === 'commits' ? 'bg-green-600' :
                            'bg-red-600'
                          }`}>
                            {stat.type}
                          </span>
                        </td>
                        <td className="py-3 px-4">{stat.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">System Settings</h2>
              
              <div className="space-y-6">
                {/* Challenge Code */}
                <div className="bg-slate-700/50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">Challenge Code</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <p className="text-sm text-purple-300 mb-2">Current Code</p>
                      <p className="text-3xl font-mono font-bold">{challengeCode}</p>
                    </div>
                    <button
                      onClick={generateNewCode}
                      className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Generate New
                    </button>
                  </div>
                </div>

                {/* Geofence Settings */}
                <div className="bg-slate-700/50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">Geofence Settings</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-purple-300 mb-2">Latitude</label>
                      <input
                        type="text"
                        defaultValue="38.2527"
                        className="w-full bg-slate-600 border border-purple-500/30 rounded-lg px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-purple-300 mb-2">Longitude</label>
                      <input
                        type="text"
                        defaultValue="-85.7585"
                        className="w-full bg-slate-600 border border-purple-500/30 rounded-lg px-3 py-2"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm text-purple-300 mb-2">Radius (meters)</label>
                    <input
                      type="number"
                      defaultValue="50"
                      className="w-full bg-slate-600 border border-purple-500/30 rounded-lg px-3 py-2"
                    />
                  </div>
                </div>

                {/* Save Button */}
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-3 rounded-lg font-semibold transition-all">
                  Save Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminPanel