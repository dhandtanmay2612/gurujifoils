import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { User, Session } from '@supabase/supabase-js'
import type { Profile } from '@/lib/supabase'
import { useNavigate } from 'react-router-dom'

interface AuthContextType {
  user: User | null
  profile: Profile | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    console.log('AuthProvider: Initializing...')
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('AuthProvider: Initial session check:', session?.user?.email)
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      }
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('AuthProvider: Auth state changed:', event, session?.user?.email)
      setSession(session)
      setUser(session?.user ?? null)
      
      if (session?.user) {
        await fetchProfile(session.user.id)
        if (event === 'SIGNED_IN') {
          console.log('AuthProvider: User signed in, navigating to dashboard')
          navigate('/dashboard')
        }
      } else {
        setProfile(null)
        if (event === 'SIGNED_OUT') {
          console.log('AuthProvider: User signed out, navigating to home')
          navigate('/')
        }
      }
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [navigate])

  async function fetchProfile(userId: string) {
    try {
      console.log('AuthProvider: Fetching profile for user:', userId)
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('AuthProvider: Error fetching profile:', error)
        return
      }

      console.log('AuthProvider: Profile fetched:', data)
      setProfile(data)
    } catch (err) {
      console.error('AuthProvider: Error in fetchProfile:', err)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      console.log('AuthProvider: Attempting sign in for:', email)
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      console.log('AuthProvider: Sign in successful')
    } catch (error: any) {
      console.error('AuthProvider: Error signing in:', error.message)
      throw error
    }
  }

  const signUp = async (email: string, password: string, full_name?: string) => {
    return await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name }
      }
    });
  };

  const signOut = async () => {
    try {
      console.log('AuthProvider: Attempting sign out')
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      console.log('AuthProvider: Sign out successful')
    } catch (error: any) {
      console.error('AuthProvider: Error signing out:', error.message)
      throw error
    }
  }

  const value = {
    user,
    profile,
    session,
    loading,
    signIn,
    signUp,
    signOut
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 