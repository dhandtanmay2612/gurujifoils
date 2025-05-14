import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

function AuthTest() {
  const [status, setStatus] = useState('Checking authentication...')
  
  useEffect(() => {
    async function checkAuth() {
      try {
        console.log('Checking authentication status...')
        const { data, error } = await supabase.auth.getSession()
        console.log('Auth check response:', { data, error })
        
        if (error) {
          console.error('Auth check error:', error)
          setStatus('Error checking auth: ' + error.message)
          return
        }
        
        if (data.session) {
          console.log('User authenticated:', data.session.user)
          setStatus('Authenticated as: ' + data.session.user.email)
        } else {
          console.log('No active session found')
          setStatus('Not authenticated')
        }
      } catch (err: any) {
        console.error('Auth check exception:', err)
        setStatus('Exception: ' + err.message)
      }
    }
    
    checkAuth()
  }, [])
  
  return (
    <div className="p-5 border border-gray-200 rounded-lg shadow-sm bg-white">
      <h2 className="text-xl font-semibold mb-3">Auth Test</h2>
      <p className="text-gray-700">{status}</p>
    </div>
  )
}

export default AuthTest 