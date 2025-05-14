export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          tier: string
          credits: number
          created_at: string
        }
        Insert: {
          id: string
          email: string
          tier?: string
          credits?: number
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          tier?: string
          credits?: number
          created_at?: string
        }
      }
      driving_scores: {
        Row: {
          id: string
          user_id: string
          score: number
          month: string
          year: number
          created_at: string
          metrics: Json
        }
        Insert: {
          id?: string
          user_id: string
          score: number
          month: string
          year: number
          created_at?: string
          metrics?: Json
        }
        Update: {
          id?: string
          user_id?: string
          score?: number
          month?: string
          year?: number
          created_at?: string
          metrics?: Json
        }
      }
      warnings: {
        Row: {
          id: string
          user_id: string
          type: string
          description: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: string
          description: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: string
          description?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 