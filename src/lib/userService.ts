import { supabase } from './supabase'
import type { UserProfile } from './database'

type UserProfileUpdate = Partial<Omit<UserProfile, 'id' | 'email' | 'created_at'>>

export const userService = {
  // Get current user profile
  async getCurrentUser(): Promise<UserProfile | null> {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return null
    
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()
    
    if (error) {
      console.error('Error fetching user profile:', error)
      return null
    }
    
    return data
  },
  
  // Update user profile
  async updateUserProfile(userId: string, updates: UserProfileUpdate): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating user profile:', error)
      return null
    }
    
    return data
  },
  
  // Update user tier based on score
  async updateUserTier(userId: string, score: number): Promise<UserProfile | null> {
    let tier: UserProfile['tier'] = 'bronze'
    
    if (score >= 90) {
      tier = 'gold'
    } else if (score >= 75) {
      tier = 'silver'
    }
    
    return await this.updateUserProfile(userId, { tier })
  },

  // Get user's current tier benefits
  async getTierBenefits(tier: UserProfile['tier']) {
    const benefits = {
      bronze: {
        insuranceDiscount: 5,
        tollRebate: 2,
        maxCredits: 1000
      },
      silver: {
        insuranceDiscount: 10,
        tollRebate: 5,
        maxCredits: 2500
      },
      gold: {
        insuranceDiscount: 15,
        tollRebate: 10,
        maxCredits: 5000
      },
      platinum: {
        insuranceDiscount: 20,
        tollRebate: 15,
        maxCredits: 10000
      }
    }
    
    return benefits[tier]
  },

  // Add credits to user's account
  async addCredits(userId: string, amount: number): Promise<UserProfile | null> {
    const { data: user, error: fetchError } = await supabase
      .from('users')
      .select('credits, tier')
      .eq('id', userId)
      .single()
    
    if (fetchError) {
      console.error('Error fetching user credits:', fetchError)
      return null
    }
    
    const tierBenefits = await this.getTierBenefits(user.tier)
    const newCredits = Math.min(user.credits + amount, tierBenefits.maxCredits)
    
    return await this.updateUserProfile(userId, { credits: newCredits })
  },

  // Use credits from user's account
  async useCredits(userId: string, amount: number): Promise<UserProfile | null> {
    const { data: user, error: fetchError } = await supabase
      .from('users')
      .select('credits')
      .eq('id', userId)
      .single()
    
    if (fetchError) {
      console.error('Error fetching user credits:', fetchError)
      return null
    }
    
    if (user.credits < amount) {
      throw new Error('Insufficient credits')
    }
    
    return await this.updateUserProfile(userId, { credits: user.credits - amount })
  }
} 