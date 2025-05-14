import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import type { DrivingScore } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { Loader2, AlertCircle } from 'lucide-react';

export function MonthlyDrivingScore() {
  const { user, loading: authLoading } = useAuth();
  const [score, setScore] = useState<DrivingScore | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchScore = async () => {
      try {
        const { data, error } = await supabase
          .from('driving_scores')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (error) throw error;
        setScore(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch driving score');
      } finally {
        setLoading(false);
      }
    };

    fetchScore();
  }, [user]);

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8 text-red-500">
        <AlertCircle className="w-8 h-8 mr-2" />
        <span>{error}</span>
      </div>
    );
  }

  if (!score) {
    return (
      <div className="text-center p-8 text-gray-400">
        No driving score available for this month
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Monthly Driving Score</h2>
        <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm">
          {score.month} {score.year}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Main Score */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-xl" />
          <div className="relative bg-gray-900/50 rounded-lg p-6 border border-white/10">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                {score.score}
              </div>
              <div className="text-sm text-gray-400">Overall Score</div>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="space-y-4">
          {Object.entries(score.metrics).map(([key, value]) => (
            <div key={key} className="bg-gray-900/50 rounded-lg p-4 border border-white/10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400 capitalize">
                  {key.replace(/_/g, ' ')}
                </span>
                <span className="text-sm font-medium">{value}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
} 