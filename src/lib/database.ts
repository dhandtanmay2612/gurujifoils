import { supabase } from './supabase'
import type { User } from '@supabase/supabase-js'

export type UserProfile = {
  id: string
  email: string
  created_at: Date
  current_score: number
  tier: 'bronze' | 'silver' | 'gold' | 'platinum'
  credits: number
  strikes: number
}

export type DrivingScoreData = {
  score: number
  speeding?: number
  braking?: number
  phoneUse?: number
  distraction?: number
}

export type DrivingScore = {
  id: string
  user_id: string
  score: number
  date: Date
  speeding_events: number
  braking_events: number
  phone_use_events: number
  distraction_events: number
}

export type WarningStrikeData = {
  type: 'warning' | 'strike'
  reason: string
}

export type WarningStrike = {
  id: string
  user_id: string
  type: 'warning' | 'strike'
  reason: string
  date: Date
  expires_at: Date
}

export async function setupUsersTable(user: User) {
  // Check if the user already exists in our custom users table
  const { data: existingUser, error: fetchError } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()
  
  if (fetchError && fetchError.code !== 'PGRST116') {
    console.error('Error fetching user:', fetchError)
    return
  }
  
  // If user doesn't exist, create a new record
  if (!existingUser) {
    const { error: insertError } = await supabase
      .from('users')
      .insert([
        { 
          id: user.id, 
          email: user.email,
          created_at: new Date(),
          current_score: 75, // Default starting score
          tier: 'bronze', // Default starting tier
          credits: 0,
          strikes: 0
        }
      ])
    
    if (insertError) {
      console.error('Error creating user profile:', insertError)
    }
  }
}

// Function to create a new driving score record
export async function createDrivingScoreRecord(userId: string, scoreData: DrivingScoreData) {
  const { data, error } = await supabase
    .from('driving_scores')
    .insert([
      {
        user_id: userId,
        score: scoreData.score,
        date: new Date(),
        speeding_events: scoreData.speeding || 0,
        braking_events: scoreData.braking || 0,
        phone_use_events: scoreData.phoneUse || 0,
        distraction_events: scoreData.distraction || 0
      }
    ])
  
  if (error) {
    console.error('Error creating driving score record:', error)
    return null
  }
  
  return data
}

// Function to fetch user's driving scores
export async function getUserDrivingScores(userId: string): Promise<DrivingScore[]> {
  const { data, error } = await supabase
    .from('driving_scores')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false })
  
  if (error) {
    console.error('Error fetching driving scores:', error)
    return []
  }
  
  return data || []
}

// Function to get the latest driving score for a user
export async function getLatestDrivingScore(userId: string): Promise<DrivingScore | null> {
  const { data, error } = await supabase
    .from('driving_scores')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false })
    .limit(1)
    .single()
  
  if (error) {
    console.error('Error fetching latest driving score:', error)
    return null
  }
  
  return data
}

// Function to add a warning or strike
export async function addWarningOrStrike(userId: string, warningData: WarningStrikeData) {
  const { data, error } = await supabase
    .from('warnings_strikes')
    .insert([
      {
        user_id: userId,
        type: warningData.type,
        reason: warningData.reason,
        date: new Date(),
        expires_at: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) // 90 days from now
      }
    ])
  
  if (error) {
    console.error('Error adding warning/strike:', error)
    return null
  }
  
  // Update user's strike count if it's a strike
  if (warningData.type === 'strike') {
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('strikes')
      .eq('id', userId)
      .single()
    
    if (!userError) {
      const newStrikeCount = (userData.strikes || 0) + 1
      
      const { error: updateError } = await supabase
        .from('users')
        .update({ strikes: newStrikeCount })
        .eq('id', userId)
      
      if (updateError) {
        console.error('Error updating user strike count:', updateError)
      }
    }
  }
  
  return data
}

// Function to fetch user's warnings and strikes
export async function getUserWarningsAndStrikes(userId: string): Promise<WarningStrike[]> {
  const { data, error } = await supabase
    .from('warnings_strikes')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false })
  
  if (error) {
    console.error('Error fetching warnings/strikes:', error)
    return []
  }
  
  return data || []
}

// Function to get active (non-expired) warnings and strikes
export async function getActiveWarningsAndStrikes(userId: string): Promise<WarningStrike[]> {
  const { data, error } = await supabase
    .from('warnings_strikes')
    .select('*')
    .eq('user_id', userId)
    .gt('expires_at', new Date().toISOString())
    .order('date', { ascending: false })
  
  if (error) {
    console.error('Error fetching active warnings/strikes:', error)
    return []
  }
  
  return data || []
} 