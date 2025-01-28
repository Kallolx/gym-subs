import { motion } from 'framer-motion';
import { ClockIcon, UserGroupIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const courses = [
  {
    id: 1,
    title: 'Foundation Posture Training',
    description: 'Master the basics of proper posture and build a strong foundation for long-term improvement.',
    duration: '4 weeks',
    level: 'Beginner',
    lessons: 12,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    category: 'Posture Basics',
    price: '$49.99'
  },
  {
    id: 2,
    title: 'Advanced Spine Alignment',
    description: 'Take your posture to the next level with advanced techniques and targeted exercises.',
    duration: '6 weeks',
    level: 'Intermediate',
    lessons: 18,
    image: 'https://images.pexels.com/photos/802417/pexels-photo-802417.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Advanced Training',
    price: '$79.99'
  },
  {
    id: 3,
    title: 'Office Worker Wellness',
    description: 'Specific exercises and routines designed for those who spend long hours at a desk.',
    duration: '4 weeks',
    level: 'Beginner',
    lessons: 10,
    image: 'https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    category: 'Workplace Health',
    price: '$59.99'
  },
  {
    id: 4,
    title: 'Athletic Posture Optimization',
    description: 'Enhance your athletic performance through improved posture and body alignment.',
    duration: '8 weeks',
    level: 'Advanced',
    lessons: 24,
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    category: 'Sports Performance',
    price: '$99.99'
  }
];

const categories = ['All', 'Posture Basics', 'Advanced Training', 'Workplace Health', 'Sports Performance'];

export default function Courses() {
  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 pt-20 sm:pt-24">
        <div className="space-y-6">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-4 flex flex-col gap-2">
              <div>
                Improve Your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
                  Posture
                </span>
              </div>
              <div>Transform Your Life</div>
            </h1>
            <p className="mt-4 text-lg leading-8 text-gray-400 max-w-2xl mx-auto">
              Discover expert-led courses designed to help you achieve better posture and movement.
            </p>
          </div>

          {/* Course Categories */}
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 bg-gray-800/50 text-gray-300 hover:bg-gray-800 hover:text-amber-400"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {courses.map((course) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative group"
              >
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-gray-800">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-amber-500/10 px-3 py-1 text-sm font-semibold text-amber-400">
                        {course.category}
                      </span>
                      <span className="text-lg font-bold text-white">{course.price}</span>
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-white">{course.title}</h3>
                    <p className="mt-2 text-sm text-gray-300">{course.description}</p>
                    <div className="mt-4 flex items-center gap-4 text-sm text-gray-300">
                      <div className="flex items-center gap-1">
                        <ClockIcon className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <UserGroupIcon className="h-4 w-4" />
                        <span>{course.lessons} lessons</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ChartBarIcon className="h-4 w-4" />
                        <span>{course.level}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 sm:mt-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative isolate overflow-hidden bg-gray-800/50 px-6 py-12 shadow-2xl rounded-2xl sm:px-24 xl:py-16"
            >
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Ready to start your journey?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-gray-300">
                  Join our community of posture enthusiasts and transform your life today.
                </p>
                <div className="mt-8 flex justify-center">
                  <button className="rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:from-amber-600 hover:to-orange-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500">
                    Get Started Today
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 