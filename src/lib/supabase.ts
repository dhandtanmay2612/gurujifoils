import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

// Log Supabase initialization details
console.log('Initializing Supabase...');
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('Supabase Key present:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables:', {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseAnonKey
  });
  throw new Error('Missing Supabase environment variables');
}

// Create Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Log successful initialization
console.log('Supabase client initialized successfully');

// Export types
export type Profile = {
  id: string;
  full_name: string | null;
  points: number;
  created_at: string;
};

export type DrivingScore = {
  id: string;
  user_id: string;
  score: number;
  details: any;
  created_at: string;
};

export type Warning = Database['public']['Tables']['warnings']['Row']; 