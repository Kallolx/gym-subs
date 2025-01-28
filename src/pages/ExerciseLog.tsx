import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import type { ExerciseLog, Exercise } from '../lib/supabase';
import { ClockIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function ExerciseLog() {
  const { user } = useAuth();
  const [logs, setLogs] = useState<(ExerciseLog & { exercise: Exercise })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchExerciseLogs();
  }, [user]);

  const fetchExerciseLogs = async () => {
    try {
      if (!user) return;

      const { data, error } = await supabase
        .from('exercise_logs')
        .select(`
          *,
          exercise:exercises(*)
        `)
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false });

      if (error) throw error;
      setLogs(data || []);
    } catch (error) {
      console.error('Error fetching exercise logs:', error);
      setError('Failed to load exercise logs');
    } finally {
      setLoading(false);
    }
  };

  const handleLogExercise = async (exerciseId: string, sets: number, reps: number, duration: number | null, notes: string | null) => {
    try {
      if (!user) return;

      const { error } = await supabase
        .from('exercise_logs')
        .insert([
          {
            user_id: user.id,
            exercise_id: exerciseId,
            sets,
            reps,
            duration,
            notes,
            completed_at: new Date().toISOString(),
          },
        ]);

      if (error) throw error;
      fetchExerciseLogs();
    } catch (error) {
      console.error('Error logging exercise:', error);
      setError('Failed to log exercise');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="main-wrapper">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-white">Exercise Log</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold hover:from-amber-600 hover:to-orange-700 transition-all duration-200"
            >
              <PlusIcon className="w-5 h-5" />
              <span>Log Exercise</span>
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-500/10 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Log Exercise Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
              <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
                <h2 className="text-xl font-bold text-white mb-4">Log Exercise</h2>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleLogExercise('exercise_1', 3, 12, null, null);
                  setIsModalOpen(false);
                }}>
                  {/* Add form fields here */}
                  <button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl px-4 py-3 font-semibold">
                    Save Exercise
                  </button>
                </form>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {logs.map((log) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700/50"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">{log.exercise.title}</h3>
                  <span className="text-sm text-gray-400">
                    {new Date(log.completed_at).toLocaleDateString()}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-4 text-sm text-gray-300">
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{log.sets}</span> sets
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{log.reps}</span> reps
                    </div>
                    {log.duration && (
                      <div className="flex items-center gap-1">
                        <ClockIcon className="w-4 h-4" />
                        <span>{Math.floor(log.duration / 60)}m {log.duration % 60}s</span>
                      </div>
                    )}
                  </div>

                  {log.notes && (
                    <p className="text-sm text-gray-400 italic">
                      {log.notes}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 text-xs rounded-full bg-red-500/20 text-red-400 border border-red-500/20">
                      {log.exercise.body_part}
                    </span>
                    <span className="px-2.5 py-1 text-xs rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/20">
                      {log.exercise.difficulty}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 