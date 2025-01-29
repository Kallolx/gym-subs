import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Database Types
export interface Profile {
  id: string;
  full_name: string | null;
  gender: string | null;
  age: number | null;
  height: number | null;
  height_unit: string | null;
  weight: number | null;
  weight_unit: string | null;
  fitness_level: string | null;
  goals: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface PostureAssessment {
  id: string;
  user_id: string;
  assessment_date: string;
  body_parts: Record<string, string>;
  created_at: string;
  updated_at: string;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  body_part: string;
  difficulty: string;
  image_url: string | null;
  created_at: string;
}

export interface ExerciseLog {
  id: string;
  user_id: string;
  exercise_id: string;
  date: string;
  sets: number;
  reps: number;
  duration: number | null;
  notes: string | null;
  created_at: string;
}

export interface ProgressPhoto {
  id: string;
  user_id: string;
  photo_url: string;
  photo_type: string;
  notes: string | null;
  created_at: string;
} 