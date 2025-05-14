import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/AuthContext'
import { supabase } from '@/lib/supabase'
import type { DrivingScore } from '@/lib/supabase'
import { Loader2, AlertCircle, Trophy, CreditCard, TrendingUp, Car } from 'lucide-react'

export default function Dashboard() {
  const { user, profile } = useAuth()
  const [scores, setScores] = useState<DrivingScore[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    console.log('Dashboard: Component mounted, user:', user?.email)
    if (user) {
      fetchScores()
    }
  }, [user])

  const fetchScores = async () => {
    try {
      console.log('Dashboard: Fetching scores for user:', user?.id)
      const { data, error } = await supabase
        .from('driving_scores')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Dashboard: Error fetching scores:', error)
        throw error
      }

      console.log('Dashboard: Scores fetched:', data)
      setScores(data || [])
    } catch (err: any) {
      console.error('Dashboard: Error in fetchScores:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    console.log('Dashboard: No user found, redirecting to login')
    return <div>Please log in to view your dashboard.</div>
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h2 className="text-2xl font-bold mb-4">Welcome, {profile?.full_name || user.email}</h2>
                
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-2">Your Profile</h3>
                  <p>Email: {user.email}</p>
                  <p>Name: {profile?.full_name || 'Not set'}</p>
                  <p>Points: {profile?.points || 0}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Recent Driving Scores</h3>
                  {scores.length > 0 ? (
                    <div className="space-y-4">
                      {scores.map((score) => (
                        <div key={score.id} className="border p-4 rounded-lg">
                          <p>Score: {score.score}</p>
                          <p>Date: {new Date(score.created_at).toLocaleDateString()}</p>
                          <p>Details: {score.details}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No driving scores recorded yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 