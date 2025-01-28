import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRightIcon, FireIcon, SparklesIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Transform Your Posture',
    description: 'Get a personalized workout plan designed to strengthen your core and improve posture.',
    icon: FireIcon,
  },
  {
    name: 'Expert Guidance',
    description: 'Train with certified posture specialists and physiotherapists.',
    icon: SparklesIcon,
  },
  {
    name: 'Track Progress',
    description: 'Monitor your improvements with our advanced posture tracking technology.',
    icon: ChartBarIcon,
  },
];

export default function Landing() {
  return (
    <div className="bg-gray-900">
      {/* Hero section */}
      <div className="relative isolate">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <div className="relative h-[100vh] w-full">
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Background"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/80 to-gray-900"></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative">
          <div className="main-wrapper pt-0 min-h-[100vh] flex flex-col justify-center">
            <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-24">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Column - Text Content */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-left"
                >
                  <div className="mb-8 inline-flex">
                    <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-200 ring-1 ring-gray-100/10 hover:ring-gray-100/20 bg-gray-900/30 backdrop-blur-sm">
                      Start your fitness journey today.{' '}
                      <a href="#features" className="font-semibold text-amber-400">
                        <span className="absolute inset-0" aria-hidden="true" />
                        View programs 
                      </a>
                    </div>
                  </div>
                  <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl drop-shadow-lg mb-6">
                    UNLEASH YOUR{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
                      POTENTIAL
                    </span>
                  </h1>
                  <p className="text-lg leading-8 text-gray-100 drop-shadow-lg mb-8">
                    Transform your body and mind with our revolutionary posture-focused fitness programs. 
                    Join the movement towards a stronger, healthier you.
                  </p>
                  <div className="flex items-start gap-x-4 sm:gap-x-6">
                    <Link
                      to="/signup"
                      className="rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-white shadow-lg hover:from-amber-600 hover:to-orange-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 transition-all duration-200 flex items-center gap-2"
                    >
                      Start Training
                      <ArrowRightIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Link>
                    <Link
                      to="/courses"
                      className="text-sm sm:text-base font-semibold leading-6 text-gray-100 hover:text-amber-400 transition-all duration-200"
                    >
                      Explore Programs <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </motion.div>

                {/* Right Column - Stats */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="grid grid-cols-2 gap-4"
                >
                  {[
                    { label: 'Active Members', value: '2,000+' },
                    { label: 'Expert Trainers', value: '20+' },
                    { label: 'Success Stories', value: '500+' },
                    { label: 'Workout Plans', value: '100+' },
                  ].map((stat) => (
                    <div 
                      key={stat.label} 
                      className="backdrop-blur-sm bg-gray-900/30 rounded-xl p-6 border border-gray-800/50 hover:border-amber-500/20 transition-all duration-300"
                    >
                      <div className="text-3xl sm:text-4xl font-bold text-white mb-2">{stat.value}</div>
                      <div className="text-sm text-gray-300">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature section */}
      <div id="features" className="relative bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-base font-semibold leading-7 text-amber-400">WHAT WE OFFER</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Transform Your Body & Life
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Our comprehensive approach combines cutting-edge fitness technology with expert guidance
              to help you achieve your fitness goals and maintain perfect posture.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto mt-16 max-w-7xl sm:mt-20 lg:mt-24"
          >
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-white">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-amber-500 to-orange-600">
                      <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-300">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 