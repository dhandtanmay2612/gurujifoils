import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import { setupUsersTable } from './lib/database'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check active sessions and sets the user
    console.log('Checking initial session...')
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session?.user?.email)
      setUser(session?.user ?? null)
      if (session?.user) {
        console.log('Setting up user table for:', session.user.email)
        setupUsersTable(session.user)
      }
      setLoading(false)
    })

    // Listen for changes on auth state
    console.log('Setting up auth state listener...')
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email)
        
        if (event === 'SIGNED_IN') {
          console.log('User signed in:', session?.user)
          setUser(session?.user || null)
          if (session?.user) {
            console.log('Setting up user table for signed in user:', session.user.email)
            await setupUsersTable(session.user)
          }
        } else if (event === 'SIGNED_OUT') {
          console.log('User signed out')
          setUser(null)
        } else if (event === 'USER_UPDATED') {
          console.log('User updated:', session?.user)
          setUser(session?.user || null)
        } else if (event === 'PASSWORD_RECOVERY') {
          console.log('Password recovery initiated')
        }
        
        setLoading(false)
      }
    )

    return () => {
      console.log('Cleaning up auth subscription')
      subscription.unsubscribe()
    }
  }, [])

  // Will be passed down to Signup, Login and Dashboard components
  const value = {
    signUp: async (data) => {
      console.log('Attempting to sign up:', data.email)
      try {
        const { data: authData, error } = await supabase.auth.signUp(data)
        console.log('Sign up response:', { 
          user: authData?.user?.email,
          error: error?.message 
        })
        
        if (authData?.user) {
          console.log('User signed up successfully:', authData.user.email)
          await setupUsersTable(authData.user)
        }
        if (error) {
          console.error('Sign up error:', error.message)
        }
        return { data: authData, error }
      } catch (err) {
        console.error('Unexpected sign up error:', err)
        return { data: null, error: err }
      }
    },
    signIn: async (data) => {
      console.log('Attempting to sign in:', data.email)
      try {
        const result = await supabase.auth.signInWithPassword(data)
        console.log('Sign in response:', {
          user: result.data?.user?.email,
          error: result.error?.message
        })
        
        if (result.error) {
          console.error('Sign in error:', result.error.message)
        } else {
          console.log('User signed in successfully:', result.data.user.email)
        }
        return result
      } catch (err) {
        console.error('Unexpected sign in error:', err)
        return { data: null, error: err }
      }
    },
    signOut: async () => {
      console.log('Attempting to sign out')
      try {
        const { error } = await supabase.auth.signOut()
        console.log('Sign out response:', { error: error?.message })
        
        if (error) {
          console.error('Sign out error:', error.message)
        } else {
          console.log('User signed out successfully')
        }
        return { error }
      } catch (err) {
        console.error('Unexpected sign out error:', err)
        return { error: err }
      }
    },
    user,
    loading
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
} 