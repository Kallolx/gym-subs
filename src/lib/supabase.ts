import { createClient } from '@supabase/supabase-js';

// Database Types
export type Profile = {
  id: string;
  full_name: string;
  height: number | null;
  weight: number | null;
  age: number | null;
  gender: string | null;
  is_public: boolean;
  created_at: string;
  updated_at: string;
};

export type PostureAssessment = {
  id: string;
  user_id: string;
  ankle: string;
  foot: string;
  knee: string;
  hip: string;
  spine: string;
  neck: string;
  assessment_date: string;
  notes: string | null;
};

export type Exercise = {
  id: string;
  title: string;
  description: string[];
  body_part: string;
  condition: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  image_url: string;
  created_at: string;
  updated_at: string;
};

export type ExerciseLog = {
  id: string;
  user_id: string;
  exercise_id: string;
  sets: number;
  reps: number;
  duration: number | null; // in seconds
  notes: string | null;
  completed_at: string;
};

export type ProgressPhoto = {
  id: string;
  user_id: string;
  photo_url: string;
  photo_type: 'front' | 'back' | 'side';
  taken_at: string;
  notes: string | null;
};

export type Subscription = {
  id: string;
  user_id: string;
  plan_type: 'free' | 'premium' | 'pro';
  status: 'active' | 'cancelled' | 'expired';
  start_date: string;
  end_date: string | null;
  payment_status: 'paid' | 'pending' | 'failed';
  created_at: string;
  updated_at: string;
};

// Check for required environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Missing environment variables: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be defined in .env file'
  );
}

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

// Database schema (for reference)
/*
create table public.profiles (
  id uuid references auth.users on delete cascade,
  full_name text,
  height numeric,
  weight numeric,
  age integer,
  gender text,
  is_public boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now()),
  primary key (id)
);

create table public.posture_assessments (
  id uuid default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  ankle text,
  foot text,
  knee text,
  hip text,
  spine text,
  neck text,
  assessment_date timestamp with time zone default timezone('utc'::text, now()),
  notes text,
  primary key (id)
);

create table public.exercises (
  id uuid default uuid_generate_v4(),
  title text not null,
  description text[] not null,
  body_part text not null,
  condition text not null,
  difficulty text not null,
  duration text not null,
  image_url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now()),
  primary key (id)
);

create table public.exercise_logs (
  id uuid default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  exercise_id uuid references public.exercises(id) on delete cascade,
  sets integer not null,
  reps integer not null,
  duration integer,
  notes text,
  completed_at timestamp with time zone default timezone('utc'::text, now()),
  primary key (id)
);

create table public.progress_photos (
  id uuid default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  photo_url text not null,
  photo_type text not null,
  taken_at timestamp with time zone default timezone('utc'::text, now()),
  notes text,
  primary key (id)
);

create table public.subscriptions (
  id uuid default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  plan_type text not null,
  status text not null,
  start_date timestamp with time zone not null,
  end_date timestamp with time zone,
  payment_status text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now()),
  primary key (id)
);

-- Enable Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.posture_assessments enable row level security;
alter table public.exercises enable row level security;
alter table public.exercise_logs enable row level security;
alter table public.progress_photos enable row level security;
alter table public.subscriptions enable row level security;

-- Create policies
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Similar policies for other tables...
*/ 