import { supabase } from './supabase'
import type { DrivingScore, DrivingScoreData } from './database'
import { userService } from './userService'

export type MonthlyScoreSummary = {
  averageScore: number
  records: DrivingScore[]
  lastUpdated: string | null
  totalEvents: {
    speeding: number
    braking: number
    phoneUse: number
    distraction: number
  }
}

export const drivingScoreService = {
  // Get user's monthly driving score
  async getMonthlyScore(userId: string): Promise<MonthlyScoreSummary> {
    const now = new Date()
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    
    const { data, error } = await supabase
      .from('driving_scores')
      .select('*')
      .eq('user_id', userId)
      .gte('date', firstDayOfMonth.toISOString())
      .order('date', { ascending: false })
    
    if (error) {
      console.error('Error fetching monthly score:', error)
      return {
        averageScore: 0,
        records: [],
        lastUpdated: null,
        totalEvents: {
          speeding: 0,
          braking: 0,
          phoneUse: 0,
          distraction: 0
        }
      }
    }
    
    // Calculate average score and total events for the month
    if (data && data.length > 0) {
      const sum = data.reduce((acc, record) => acc + record.score, 0)
      const totalEvents = data.reduce((acc, record) => ({
        speeding: acc.speeding + record.speeding_events,
        braking: acc.braking + record.braking_events,
        phoneUse: acc.phoneUse + record.phone_use_events,
        distraction: acc.distraction + record.distraction_events
      }), {
        speeding: 0,
        braking: 0,
        phoneUse: 0,
        distraction: 0
      })

      return {
        averageScore: Math.round(sum / data.length),
        records: data,
        lastUpdated: data[0].date,
        totalEvents
      }
    }
    
    return {
      averageScore: 0,
      records: [],
      lastUpdated: null,
      totalEvents: {
        speeding: 0,
        braking: 0,
        phoneUse: 0,
        distraction: 0
      }
    }
  },
  
  // Add a new driving score entry and update user tier
  async addDrivingScore(userId: string, scoreData: DrivingScoreData): Promise<DrivingScore | null> {
    const { data, error } = await supabase
      .from('driving_scores')
      .insert([
        {
          user_id: userId,
          score: scoreData.score,
          date: new Date().toISOString(),
          speeding_events: scoreData.speeding || 0,
          braking_events: scoreData.braking || 0,
          phone_use_events: scoreData.phoneUse || 0,
          distraction_events: scoreData.distraction || 0
        }
      ])
      .select()
      .single()
    
    if (error) {
      console.error('Error adding driving score:', error)
      return null
    }

    // Update user's tier based on the new score
    await userService.updateUserTier(userId, scoreData.score)

    // Award credits based on score
    const creditsToAward = this.calculateCreditsForScore(scoreData.score)
    if (creditsToAward > 0) {
      await userService.addCredits(userId, creditsToAward)
    }
    
    return data
  },

  // Calculate credits to award based on driving score
  calculateCreditsForScore(score: number): number {
    if (score >= 95) return 100 // Exceptional driving
    if (score >= 90) return 75  // Excellent driving
    if (score >= 85) return 50  // Very good driving
    if (score >= 80) return 25  // Good driving
    return 0                    // No credits for scores below 80
  },

  // Get driving score trends
  async getDrivingTrends(userId: string, days: number = 30) {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)
    
    const { data, error } = await supabase
      .from('driving_scores')
      .select('*')
      .eq('user_id', userId)
      .gte('date', startDate.toISOString())
      .order('date', { ascending: true })
    
    if (error) {
      console.error('Error fetching driving trends:', error)
      return null
    }

    // Group scores by date and calculate daily averages
    const dailyAverages = data.reduce((acc, record) => {
      const date = record.date.split('T')[0]
      if (!acc[date]) {
        acc[date] = {
          scores: [],
          events: {
            speeding: 0,
            braking: 0,
            phoneUse: 0,
            distraction: 0
          }
        }
      }
      acc[date].scores.push(record.score)
      acc[date].events.speeding += record.speeding_events
      acc[date].events.braking += record.braking_events
      acc[date].events.phoneUse += record.phone_use_events
      acc[date].events.distraction += record.distraction_events
      return acc
    }, {})

    // Calculate averages and format for visualization
    return Object.entries(dailyAverages).map(([date, data]) => ({
      date,
      averageScore: Math.round(data.scores.reduce((a, b) => a + b, 0) / data.scores.length),
      events: data.events
    }))
  }
} 