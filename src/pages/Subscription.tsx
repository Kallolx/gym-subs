import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import type { Subscription } from '../lib/supabase';
import { CheckIcon } from '@heroicons/react/24/outline';

const SUBSCRIPTION_PLANS = [
  {
    type: 'free',
    name: 'Basic',
    price: '$0',
    features: [
      'Basic posture assessment',
      'Exercise tracking',
      'Limited exercise library',
      'Progress photo storage (5 photos)',
    ],
  },
  {
    type: 'premium',
    name: 'Premium',
    price: '$9.99/month',
    features: [
      'Advanced posture assessment',
      'Detailed exercise tracking',
      'Full exercise library',
      'Progress photo storage (50 photos)',
      'Custom exercise plans',
      'Priority support',
    ],
  },
  {
    type: 'pro',
    name: 'Professional',
    price: '$19.99/month',
    features: [
      'Everything in Premium',
      'Personal trainer consultation',
      'Custom workout plans',
      'Unlimited progress photos',
      'Analytics and reporting',
      'Video exercise guides',
      '24/7 support',
    ],
  },
] as const;

export default function SubscriptionPage() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSubscription();
  }, [user]);

  const fetchSubscription = async () => {
    try {
      if (!user) return;

      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      setSubscription(data);
    } catch (error) {
      console.error('Error fetching subscription:', error);
      setError('Failed to load subscription details');
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (planType: 'free' | 'premium' | 'pro') => {
    try {
      if (!user) return;

      const { error } = await supabase
        .from('subscriptions')
        .upsert([
          {
            user_id: user.id,
            plan_type: planType,
            status: 'active',
            start_date: new Date().toISOString(),
            payment_status: 'paid',
          },
        ]);

      if (error) throw error;
      fetchSubscription();
    } catch (error) {
      console.error('Error updating subscription:', error);
      setError('Failed to update subscription');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="main-wrapper">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-white mb-4">Choose Your Plan</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Select the plan that best fits your fitness journey. Upgrade anytime to unlock more features.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-500/10 text-red-400 text-sm max-w-2xl mx-auto">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {SUBSCRIPTION_PLANS.map((plan) => {
              const isCurrentPlan = subscription?.plan_type === plan.type;
              return (
                <motion.div
                  key={plan.type}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`relative bg-gradient-to-br ${
                    plan.type === 'pro'
                      ? 'from-purple-900/50 to-purple-800/30 border-purple-500/30'
                      : plan.type === 'premium'
                      ? 'from-red-900/50 to-red-800/30 border-red-500/30'
                      : 'from-gray-800/50 to-gray-900/30 border-gray-700/30'
                  } rounded-xl p-6 backdrop-blur-sm border`}
                >
                  {plan.type === 'pro' && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="px-4 py-1 bg-purple-500 text-white text-sm font-medium rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                    <div className="text-3xl font-bold text-white mb-4">{plan.price}</div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-gray-300">
                        <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleSubscribe(plan.type)}
                    disabled={isCurrentPlan}
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                      isCurrentPlan
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : plan.type === 'pro'
                        ? 'bg-gradient-to-r from-purple-600 to-purple-800 text-white hover:from-purple-700 hover:to-purple-900'
                        : plan.type === 'premium'
                        ? 'bg-gradient-to-r from-red-600 to-red-800 text-white hover:from-red-700 hover:to-red-900'
                        : 'bg-gray-700 text-white hover:bg-gray-600'
                    }`}
                  >
                    {isCurrentPlan ? 'Current Plan' : 'Subscribe'}
                  </button>
                </motion.div>
              );
            })}
          </div>

          {subscription && (
            <div className="mt-12 max-w-2xl mx-auto p-6 bg-gray-800/50 rounded-xl border border-gray-700/50">
              <h3 className="text-lg font-semibold text-white mb-4">Current Subscription</h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex justify-between">
                  <span>Plan:</span>
                  <span className="font-medium">{subscription.plan_type.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className={`font-medium ${
                    subscription.status === 'active' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {subscription.status.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Start Date:</span>
                  <span>{new Date(subscription.start_date).toLocaleDateString()}</span>
                </div>
                {subscription.end_date && (
                  <div className="flex justify-between">
                    <span>End Date:</span>
                    <span>{new Date(subscription.end_date).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 