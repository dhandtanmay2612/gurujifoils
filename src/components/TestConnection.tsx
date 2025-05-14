import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestConnection() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function testConnection() {
      try {
        console.log('Testing Supabase connection...')
        const { data, error } = await supabase.from('profiles').select('count').limit(1)
        
        if (error) {
          console.error('Connection test failed:', error)
          setError(error.message)
          setStatus('error')
          return
        }

        console.log('Connection test successful:', data)
        setStatus('success')
      } catch (err: any) {
        console.error('Connection test error:', err)
        setError(err.message)
        setStatus('error')
      }
    }

    testConnection()
  }, [])

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-bold mb-2">Supabase Connection Test</h2>
      {status === 'loading' && <p>Testing connection...</p>}
      {status === 'success' && <p className="text-green-500">✅ Connection successful!</p>}
      {status === 'error' && (
        <div>
          <p className="text-red-500">❌ Connection failed</p>
          <p className="text-sm text-gray-600">{error}</p>
        </div>
      )}
    </div>
  )
} 