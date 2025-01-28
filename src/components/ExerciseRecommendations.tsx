import { motion } from 'framer-motion';
import type { PostureAssessment } from '../lib/supabase';
import { exerciseDatabase } from '../data/exerciseDatabase';
import type { Exercise } from '../types/exercise';
import { ClockIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface ExerciseRecommendationsProps {
  assessment: Partial<PostureAssessment>;
}

export default function ExerciseRecommendations({ assessment }: ExerciseRecommendationsProps) {
  const getRecommendedExercises = () => {
    const recommendations: Exercise[] = [];
    
    (Object.entries(assessment) as [string, string][]).forEach(([part, condition]) => {
      if (
        condition && 
        condition !== 'neutral' && 
        part in exerciseDatabase && 
        condition in exerciseDatabase[part]
      ) {
        recommendations.push(...exerciseDatabase[part][condition]);
      }
    });
    
    return recommendations;
  };

  const recommendedExercises = getRecommendedExercises();

  if (recommendedExercises.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="inline-block px-6 py-4 rounded-lg bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50">
          <p className="text-gray-300">
            No specific exercises recommended. Your posture is well aligned!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 mt-16">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-white mb-2">Your Personalized Exercise Plan</h2>
        <p className="text-gray-400 mb-8">Follow these exercises to improve your posture</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {recommendedExercises.map((exercise, index) => (
          <motion.div
            key={`${exercise.title}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700/50 group"
          >
            <div className="aspect-w-16 aspect-h-9 relative">
              <img
                src={exercise.imageUrl}
                alt={exercise.title}
                className="object-cover w-full h-48 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
              
              {/* Difficulty Badge */}
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  exercise.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400 border border-green-500/20' :
                  exercise.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/20' :
                  'bg-red-500/20 text-red-400 border border-red-500/20'
                }`}>
                  {exercise.difficulty}
                </span>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-semibold text-white">{exercise.title}</h3>
              
              {/* Duration and Difficulty */}
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <ClockIcon className="w-4 h-4" />
                  <span>{exercise.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <SparklesIcon className="w-4 h-4" />
                  <span>{exercise.bodyPart}</span>
                </div>
              </div>
              
              {/* Steps */}
              <div className="space-y-2">
                {exercise.description.map((step, i) => (
                  <p key={i} className="text-gray-300 text-sm leading-relaxed">
                    {step}
                  </p>
                ))}
              </div>
              
              {/* Tips */}
              <div className="mt-4 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <p className="text-purple-300 text-sm">
                  💡 <span className="font-medium">Tip:</span> {exercise.tips}
                </p>
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-3 py-1 text-xs rounded-full bg-red-500/20 text-red-400 border border-red-500/20">
                  {exercise.bodyPart}
                </span>
                <span className="px-3 py-1 text-xs rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/20">
                  {exercise.condition}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 