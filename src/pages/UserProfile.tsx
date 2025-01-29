import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabaseClient';
import {
  ArrowsUpDownIcon,
  CalendarDaysIcon,
  UserIcon,
  ScaleIcon,
  ChartBarIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import { Tab } from '@headlessui/react';
import { exerciseDatabase } from '../data/exerciseDatabase';

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  field: keyof FormData;
}

interface PostureAssessmentData {
  spine: 'lordosis' | 'kyphosis' | 'neutral' | '';
  neck: 'forward head' | 'neutral' | '';
}

interface FormData {
  fullName: string;
  gender: string;
  age: string;
  height: string;
  heightUnit: 'cm' | 'ft' | 'm';
  weight: string;
  weightUnit: 'kg' | 'lb';
  fitnessLevel: string;
  goals: string[];
  postureAssessment: PostureAssessmentData;
}

const steps: OnboardingStep[] = [
  {
    id: 1,
    title: "What's your name?",
    description: "We'll use this to personalize your experience",
    field: 'fullName'
  },
  {
    id: 2,
    title: 'Select your gender',
    description: 'This helps us provide more accurate recommendations',
    field: 'gender'
  },
  {
    id: 3,
    title: 'How old are you?',
    description: 'Age helps us tailor exercises to your needs',
    field: 'age'
  },
  {
    id: 4,
    title: "What's your height?",
    description: 'Height is important for posture assessment',
    field: 'height'
  },
  {
    id: 5,
    title: "What's your weight?",
    description: 'Weight helps us customize your exercise plan',
    field: 'weight'
  },
  {
    id: 6,
    title: "What's your fitness level?",
    description: 'This helps us set the right intensity for you',
    field: 'fitnessLevel'
  }
];

const fitnessLevels = ['Beginner', 'Intermediate', 'Advanced'];
const genderOptions = ['Male', 'Female', 'Other'];

export default function UserProfile(): JSX.Element {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    gender: '',
    age: '',
    height: '',
    heightUnit: 'cm',
    weight: '',
    weightUnit: 'kg',
    fitnessLevel: '',
    goals: [],
    postureAssessment: {
      spine: '',
      neck: ''
    }
  });
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  async function fetchUserProfile() {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // Profile doesn't exist, keep the onboarding flow
          return;
        }
        throw error;
      }

      if (profile) {
        setFormData({
          fullName: profile.full_name || '',
          gender: profile.gender || '',
          age: profile.age?.toString() || '',
          height: profile.height?.toString() || '',
          heightUnit: profile.height_unit || 'cm',
          weight: profile.weight?.toString() || '',
          weightUnit: profile.weight_unit || 'kg',
          fitnessLevel: profile.fitness_level || '',
          goals: profile.goals || [],
          postureAssessment: {
            spine: profile.posture_assessment?.spine || '',
            neck: profile.posture_assessment?.neck || ''
          }
        });
        setIsProfileComplete(true);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  }

  async function handleNextStep() {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    } else {
      await handleSaveProfile();
    }
  }

  async function handleSaveProfile() {
    if (!user) return;
    setLoading(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          full_name: formData.fullName,
          gender: formData.gender,
          age: formData.age ? parseInt(formData.age) : null,
          height: formData.height ? parseFloat(formData.height) : null,
          height_unit: formData.heightUnit,
          weight: formData.weight ? parseFloat(formData.weight) : null,
          weight_unit: formData.weightUnit,
          fitness_level: formData.fitnessLevel,
          updated_at: new Date().toISOString()
        })
        .eq('id', user?.id);

      if (error) throw error;
      setIsProfileComplete(true);
      setMessage('Profile updated successfully!');
      setMessageType('success');
    } catch (error) {
      console.error('Error saving profile:', error);
      setMessage('Error updating profile. Please try again.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  }

  function handleInputChange(field: keyof FormData, value: string | string[]) {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }

  function getIcon() {
    switch (steps[currentStep - 1].field) {
      case 'fullName':
        return <UserIcon className="h-6 w-6 text-amber-400" />;
      case 'age':
        return <CalendarDaysIcon className="h-6 w-6 text-amber-400" />;
      case 'height':
        return <ArrowsUpDownIcon className="h-6 w-6 text-amber-400" />;
      case 'weight':
        return <ScaleIcon className="h-6 w-6 text-amber-400" />;
      case 'fitnessLevel':
        return <ChartBarIcon className="h-6 w-6 text-amber-400" />;
      default:
        return null;
    }
  }

  function renderStep(step: OnboardingStep) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="max-w-lg mx-auto"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          {getIcon()}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">{step.title}</h2>
            <p className="text-gray-400">{step.description}</p>
          </div>
        </div>

        <div className="space-y-4">
          {step.field === 'gender' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {genderOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleInputChange('gender', option)}
                  className={`p-4 rounded-xl text-center transition-all duration-200 ${
                    formData.gender === option
                      ? 'bg-amber-500 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {step.field === 'fitnessLevel' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {fitnessLevels.map((level) => (
                <button
                  key={level}
                  onClick={() => handleInputChange('fitnessLevel', level)}
                  className={`p-4 rounded-xl text-center transition-all duration-200 ${
                    formData.fitnessLevel === level
                      ? 'bg-amber-500 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          )}

          {(step.field === 'height' || step.field === 'weight') && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="number"
                  value={formData[step.field]}
                  onChange={(e) => handleInputChange(step.field, e.target.value)}
                  placeholder={`Enter your ${step.field}`}
                  className="flex-1 bg-gray-800 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
                <select
                  value={formData[step.field === 'height' ? 'heightUnit' : 'weightUnit']}
                  onChange={(e) => handleInputChange(step.field === 'height' ? 'heightUnit' : 'weightUnit', e.target.value)}
                  className="w-full sm:w-32 bg-gray-800 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                >
                  {step.field === 'height' ? (
                    <>
                      <option value="cm">cm</option>
                      <option value="m">m</option>
                      <option value="ft">ft</option>
                    </>
                  ) : (
                    <>
                      <option value="kg">kg</option>
                      <option value="lb">lb</option>
                    </>
                  )}
                </select>
              </div>
            </div>
          )}

          {(step.field === 'fullName' || step.field === 'age') && (
            <input
              type={step.field === 'age' ? 'number' : 'text'}
              value={formData[step.field]}
              onChange={(e) => handleInputChange(step.field, e.target.value)}
              placeholder={`Enter your ${step.field.toLowerCase()}`}
              className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          )}
        </div>

        <div className="mt-6 sm:mt-8">
          <button
            onClick={handleNextStep}
            disabled={!formData[step.field] || loading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl px-6 py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-amber-600 hover:to-orange-700 transition-all duration-200"
          >
            {currentStep === steps.length ? 'Complete Profile' : 'Continue'}
            <ArrowRightIcon className="h-5 w-5" />
          </button>
        </div>
      </motion.div>
    );
  }

  if (isProfileComplete) {
    return (
      <div className="bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 pt-20 sm:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="mb-8 sm:mb-10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Welcome, {formData.fullName}!</h2>
                  <p className="text-gray-400">Your personalized fitness journey awaits.</p>
                </div>
                <button
                  onClick={() => setIsProfileComplete(false)}
                  className="w-full sm:w-auto bg-gray-800 text-white rounded-xl px-4 py-2 font-medium hover:bg-gray-700 transition-all duration-200"
                >
                  Edit Profile
                </button>
              </div>
            </div>

            <Tab.Group>
              <Tab.List className="flex flex-col sm:flex-row gap-2 sm:gap-0 rounded-xl bg-gray-800/50 p-1.5 mb-6">
                {['Profile Info', 'Exercise Recommendations', 'Progress Photos'].map((tab) => (
                  <Tab
                    key={tab}
                    className={({ selected }) =>
                      `w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all duration-200 ${
                        selected
                          ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg'
                          : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                      }`
                    }
                  >
                    {tab}
                  </Tab>
                ))}
              </Tab.List>

              <Tab.Panels className="mt-6">
                <Tab.Panel>
                  <div className="bg-gray-800 rounded-xl p-4 sm:p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-medium text-white mb-4">Personal Information</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                            <p className="text-white">{formData.fullName}</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Gender</label>
                            <p className="text-white">{formData.gender}</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Age</label>
                            <p className="text-white">{formData.age} years</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white mb-4">Physical Information</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Height</label>
                            <p className="text-white">{formData.height} {formData.heightUnit}</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Weight</label>
                            <p className="text-white">{formData.weight} {formData.weightUnit}</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Fitness Level</label>
                            <p className="text-white">{formData.fitnessLevel}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab.Panel>

                <Tab.Panel>
                  <div className="bg-gray-800 rounded-xl p-6 space-y-8">
                    <div>
                      <h3 className="text-lg font-medium text-white mb-6">Posture Assessment</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                        {/* Spine Assessment */}
                        <div>
                          <label className="block text-lg font-medium text-white mb-4">Spine Position</label>
                          <div className="grid grid-cols-1 gap-3">
                            {[
                              { value: 'lordosis', label: 'Lordosis', description: 'Excessive inward curve of lower back' },
                              { value: 'kyphosis', label: 'Kyphosis', description: 'Excessive outward curve of upper back' },
                              { value: 'neutral', label: 'Neutral', description: 'Natural spine alignment' }
                            ].map((position) => (
                              <label
                                key={position.value}
                                className={`relative flex flex-col p-4 cursor-pointer rounded-xl border-2 transition-all duration-200 ${
                                  formData.postureAssessment.spine === position.value
                                    ? 'border-amber-500 bg-amber-500/10'
                                    : 'border-gray-700 bg-gray-700/50 hover:border-gray-600'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div>
                                    <span className="text-white font-medium">{position.label}</span>
                                    <p className="text-sm text-gray-400 mt-1">{position.description}</p>
                                  </div>
                                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                    formData.postureAssessment.spine === position.value
                                      ? 'border-amber-500 bg-amber-500'
                                      : 'border-gray-600'
                                  }`}>
                                    {formData.postureAssessment.spine === position.value && (
                                      <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-3 h-3 bg-white rounded-full"
                                      />
                                    )}
                                  </div>
                                </div>
                                <input
                                  type="radio"
                                  name="spine"
                                  value={position.value}
                                  checked={formData.postureAssessment.spine === position.value}
                                  onChange={(e) => {
                                    setFormData(prev => ({
                                      ...prev,
                                      postureAssessment: {
                                        ...prev.postureAssessment,
                                        spine: e.target.value as PostureAssessmentData['spine']
                                      }
                                    }));
                                  }}
                                  className="sr-only"
                                />
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Neck Assessment */}
                        <div>
                          <label className="block text-lg font-medium text-white mb-4">Neck Position</label>
                          <div className="grid grid-cols-1 gap-3">
                            {[
                              { value: 'forward head', label: 'Forward Head', description: 'Head positioned forward of shoulders' },
                              { value: 'neutral', label: 'Neutral', description: 'Natural neck alignment' }
                            ].map((position) => (
                              <label
                                key={position.value}
                                className={`relative flex flex-col p-4 cursor-pointer rounded-xl border-2 transition-all duration-200 ${
                                  formData.postureAssessment.neck === position.value
                                    ? 'border-amber-500 bg-amber-500/10'
                                    : 'border-gray-700 bg-gray-700/50 hover:border-gray-600'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div>
                                    <span className="text-white font-medium">{position.label}</span>
                                    <p className="text-sm text-gray-400 mt-1">{position.description}</p>
                                  </div>
                                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                    formData.postureAssessment.neck === position.value
                                      ? 'border-amber-500 bg-amber-500'
                                      : 'border-gray-600'
                                  }`}>
                                    {formData.postureAssessment.neck === position.value && (
                                      <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-3 h-3 bg-white rounded-full"
                                      />
                                    )}
                                  </div>
                                </div>
                                <input
                                  type="radio"
                                  name="neck"
                                  value={position.value}
                                  checked={formData.postureAssessment.neck === position.value}
                                  onChange={(e) => {
                                    setFormData(prev => ({
                                      ...prev,
                                      postureAssessment: {
                                        ...prev.postureAssessment,
                                        neck: e.target.value as PostureAssessmentData['neck']
                                      }
                                    }));
                                  }}
                                  className="sr-only"
                                />
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Exercise Recommendations */}
                    <div className="mt-8">
                      <h3 className="text-lg font-medium text-white mb-6">Recommended Exercises</h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {Object.entries(exerciseDatabase).map(([bodyPart, conditions]) => {
                          const selectedCondition = formData.postureAssessment[bodyPart as keyof PostureAssessmentData];
                          if (!selectedCondition || !conditions[selectedCondition]) return null;
                          
                          return conditions[selectedCondition].map((exercise, index) => (
                            <motion.div
                              key={`${bodyPart}-${exercise.title}`}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="bg-gray-700/50 rounded-xl overflow-hidden flex flex-col"
                            >
                              <div className="aspect-w-16 aspect-h-9 relative">
                                <img
                                  src={exercise.imageUrl}
                                  alt={exercise.title}
                                  className="object-cover w-full h-full"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                              </div>
                              <div className="p-4 sm:p-6 flex-1 flex flex-col">
                                <h4 className="text-xl font-semibold text-white mb-2">{exercise.title}</h4>
                                <div className="flex flex-wrap gap-2 mb-4">
                                  <span className="px-3 py-1 bg-amber-500/10 text-amber-400 rounded-full text-sm">
                                    {exercise.bodyPart}
                                  </span>
                                  <span className="px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full text-sm">
                                    {exercise.difficulty}
                                  </span>
                                  <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm">
                                    {exercise.duration}
                                  </span>
                                </div>
                                <div className="space-y-2 flex-1">
                                  <h5 className="font-medium text-white">Instructions:</h5>
                                  <div className="text-gray-400 space-y-2">
                                    {exercise.description.map((step, i) => (
                                      <div key={i} className="flex items-start">
                                        <span className="mr-2">{i + 1}.</span>
                                        <span>{step.replace(/^\d+\.\s*/, '')}</span>
                                      </div>
                                    ))}
                                  </div>
                                  {exercise.tips && (
                                    <div className="text-amber-400 mt-4 p-3 bg-amber-500/5 rounded-lg">
                                      <span className="font-medium block mb-1">💡 Tip:</span>
                                      {exercise.tips}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          ));
                        })}
                      </div>
                      {(!formData.postureAssessment.spine && !formData.postureAssessment.neck) && (
                        <div className="text-center py-8">
                          <p className="text-gray-400">
                            Select your spine and neck positions above to see personalized exercise recommendations.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </Tab.Panel>

                <Tab.Panel>
                  <div className="bg-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-medium text-white mb-4">Progress Photos</h3>
                    <p className="text-gray-400">Track your progress by uploading photos.</p>
                    {/* Progress Photos component will be added here */}
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 pt-20 sm:pt-24">
        {isProfileComplete ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="mb-8 sm:mb-10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    Welcome, {formData.fullName}!
                  </h2>
                  <p className="text-gray-400">Your personalized fitness journey awaits.</p>
                </div>
                <button
                  onClick={() => setIsProfileComplete(false)}
                  className="w-full sm:w-auto bg-gray-800 text-white rounded-xl px-4 py-2 font-medium hover:bg-gray-700 transition-all duration-200"
                >
                  Edit Profile
                </button>
              </div>
            </div>

            <Tab.Group>
              <Tab.List className="flex flex-col sm:flex-row gap-2 sm:gap-0 rounded-xl bg-gray-800/50 p-1.5 mb-6">
                {['Profile Info', 'Exercise Recommendations', 'Progress Photos'].map((tab) => (
                  <Tab
                    key={tab}
                    className={({ selected }) =>
                      `w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all duration-200 ${
                        selected
                          ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg'
                          : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                      }`
                    }
                  >
                    {tab}
                  </Tab>
                ))}
              </Tab.List>

              <Tab.Panels className="mt-6">
                <Tab.Panel>
                  <div className="bg-gray-800 rounded-xl p-4 sm:p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-medium text-white mb-4">Personal Information</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                            <p className="text-white">{formData.fullName}</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Gender</label>
                            <p className="text-white">{formData.gender}</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Age</label>
                            <p className="text-white">{formData.age} years</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white mb-4">Physical Information</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Height</label>
                            <p className="text-white">{formData.height} {formData.heightUnit}</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Weight</label>
                            <p className="text-white">{formData.weight} {formData.weightUnit}</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Fitness Level</label>
                            <p className="text-white">{formData.fitnessLevel}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab.Panel>

                <Tab.Panel>
                  <div className="bg-gray-800 rounded-xl p-6 space-y-8">
                    <div>
                      <h3 className="text-lg font-medium text-white mb-6">Posture Assessment</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                        {/* Spine Assessment */}
                        <div>
                          <label className="block text-lg font-medium text-white mb-4">Spine Position</label>
                          <div className="grid grid-cols-1 gap-3">
                            {[
                              { value: 'lordosis', label: 'Lordosis', description: 'Excessive inward curve of lower back' },
                              { value: 'kyphosis', label: 'Kyphosis', description: 'Excessive outward curve of upper back' },
                              { value: 'neutral', label: 'Neutral', description: 'Natural spine alignment' }
                            ].map((position) => (
                              <label
                                key={position.value}
                                className={`relative flex flex-col p-4 cursor-pointer rounded-xl border-2 transition-all duration-200 ${
                                  formData.postureAssessment.spine === position.value
                                    ? 'border-amber-500 bg-amber-500/10'
                                    : 'border-gray-700 bg-gray-700/50 hover:border-gray-600'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div>
                                    <span className="text-white font-medium">{position.label}</span>
                                    <p className="text-sm text-gray-400 mt-1">{position.description}</p>
                                  </div>
                                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                    formData.postureAssessment.spine === position.value
                                      ? 'border-amber-500 bg-amber-500'
                                      : 'border-gray-600'
                                  }`}>
                                    {formData.postureAssessment.spine === position.value && (
                                      <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-3 h-3 bg-white rounded-full"
                                      />
                                    )}
                                  </div>
                                </div>
                                <input
                                  type="radio"
                                  name="spine"
                                  value={position.value}
                                  checked={formData.postureAssessment.spine === position.value}
                                  onChange={(e) => {
                                    setFormData(prev => ({
                                      ...prev,
                                      postureAssessment: {
                                        ...prev.postureAssessment,
                                        spine: e.target.value as PostureAssessmentData['spine']
                                      }
                                    }));
                                  }}
                                  className="sr-only"
                                />
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Neck Assessment */}
                        <div>
                          <label className="block text-lg font-medium text-white mb-4">Neck Position</label>
                          <div className="grid grid-cols-1 gap-3">
                            {[
                              { value: 'forward head', label: 'Forward Head', description: 'Head positioned forward of shoulders' },
                              { value: 'neutral', label: 'Neutral', description: 'Natural neck alignment' }
                            ].map((position) => (
                              <label
                                key={position.value}
                                className={`relative flex flex-col p-4 cursor-pointer rounded-xl border-2 transition-all duration-200 ${
                                  formData.postureAssessment.neck === position.value
                                    ? 'border-amber-500 bg-amber-500/10'
                                    : 'border-gray-700 bg-gray-700/50 hover:border-gray-600'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div>
                                    <span className="text-white font-medium">{position.label}</span>
                                    <p className="text-sm text-gray-400 mt-1">{position.description}</p>
                                  </div>
                                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                    formData.postureAssessment.neck === position.value
                                      ? 'border-amber-500 bg-amber-500'
                                      : 'border-gray-600'
                                  }`}>
                                    {formData.postureAssessment.neck === position.value && (
                                      <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-3 h-3 bg-white rounded-full"
                                      />
                                    )}
                                  </div>
                                </div>
                                <input
                                  type="radio"
                                  name="neck"
                                  value={position.value}
                                  checked={formData.postureAssessment.neck === position.value}
                                  onChange={(e) => {
                                    setFormData(prev => ({
                                      ...prev,
                                      postureAssessment: {
                                        ...prev.postureAssessment,
                                        neck: e.target.value as PostureAssessmentData['neck']
                                      }
                                    }));
                                  }}
                                  className="sr-only"
                                />
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Exercise Recommendations */}
                    <div className="mt-8">
                      <h3 className="text-lg font-medium text-white mb-6">Recommended Exercises</h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {Object.entries(exerciseDatabase).map(([bodyPart, conditions]) => {
                          const selectedCondition = formData.postureAssessment[bodyPart as keyof PostureAssessmentData];
                          if (!selectedCondition || !conditions[selectedCondition]) return null;
                          
                          return conditions[selectedCondition].map((exercise, index) => (
                            <motion.div
                              key={`${bodyPart}-${exercise.title}`}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="bg-gray-700/50 rounded-xl overflow-hidden flex flex-col"
                            >
                              <div className="aspect-w-16 aspect-h-9 relative">
                                <img
                                  src={exercise.imageUrl}
                                  alt={exercise.title}
                                  className="object-cover w-full h-full"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                              </div>
                              <div className="p-4 sm:p-6 flex-1 flex flex-col">
                                <h4 className="text-xl font-semibold text-white mb-2">{exercise.title}</h4>
                                <div className="flex flex-wrap gap-2 mb-4">
                                  <span className="px-3 py-1 bg-amber-500/10 text-amber-400 rounded-full text-sm">
                                    {exercise.bodyPart}
                                  </span>
                                  <span className="px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full text-sm">
                                    {exercise.difficulty}
                                  </span>
                                  <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm">
                                    {exercise.duration}
                                  </span>
                                </div>
                                <div className="space-y-2 flex-1">
                                  <h5 className="font-medium text-white">Instructions:</h5>
                                  <div className="text-gray-400 space-y-2">
                                    {exercise.description.map((step, i) => (
                                      <div key={i} className="flex items-start">
                                        <span className="mr-2">{i + 1}.</span>
                                        <span>{step.replace(/^\d+\.\s*/, '')}</span>
                                      </div>
                                    ))}
                                  </div>
                                  {exercise.tips && (
                                    <div className="text-amber-400 mt-4 p-3 bg-amber-500/5 rounded-lg">
                                      <span className="font-medium block mb-1">💡 Tip:</span>
                                      {exercise.tips}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          ));
                        })}
                      </div>
                      {(!formData.postureAssessment.spine && !formData.postureAssessment.neck) && (
                        <div className="text-center py-8">
                          <p className="text-gray-400">
                            Select your spine and neck positions above to see personalized exercise recommendations.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </Tab.Panel>

                <Tab.Panel>
                  <div className="bg-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-medium text-white mb-4">Progress Photos</h3>
                    <p className="text-gray-400">Track your progress by uploading photos.</p>
                    {/* Progress Photos component will be added here */}
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </motion.div>
        ) : (
          <>
            {/* Progress Bar */}
            <div className="max-w-lg mx-auto mb-8 sm:mb-12 px-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Step {currentStep} of {steps.length}</span>
                <span className="text-sm text-amber-400">{Math.round((currentStep / steps.length) * 100)}% Complete</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentStep / steps.length) * 100}%` }}
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-600 rounded-full"
                />
              </div>
            </div>

            {/* Onboarding Steps */}
            <div className="px-4">
              {renderStep(steps[currentStep - 1])}
            </div>
          </>
        )}
      </div>
    </div>
  );
} 