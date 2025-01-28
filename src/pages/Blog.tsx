import { motion } from 'framer-motion';
import { CalendarDaysIcon, ClockIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const posts = [
  {
    id: 1,
    title: 'The Science Behind Perfect Posture',
    description: 'Discover the anatomical principles that define good posture and learn how to achieve it in your daily life.',
    category: 'Education',
    author: 'Dr. Sarah Chen',
    date: 'Mar 16, 2024',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    featured: true
  },
  {
    id: 2,
    title: '5 Exercises to Fix Forward Head Posture',
    description: 'Simple yet effective exercises you can do at home to correct tech neck and improve your head positioning.',
    category: 'Exercises',
    author: 'Mike Johnson',
    date: 'Mar 14, 2024',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1616279969862-e71f0b6c4ab7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 3,
    title: 'Ergonomic Setup: Your Ultimate Guide',
    description: 'Learn how to create the perfect workspace setup that promotes good posture and prevents strain.',
    category: 'Workplace',
    author: 'Emma Roberts',
    date: 'Mar 12, 2024',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
  }
];

const categories = ['All', 'Education', 'Exercises', 'Workplace', 'Lifestyle', 'Success Stories'];

export default function Blog(): JSX.Element {
  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="main-wrapper">
        {/* Hero Section */}
        <div className="relative isolate overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 pb-24 pt-16 sm:pt-32 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-2xl text-center"
            >
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                Insights for a{' '}
                <span className="bg-gradient-to-r from-amber-500 to-orange-600 text-transparent bg-clip-text">
                  Better Posture
                </span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Expert advice, tips, and success stories to help you achieve and maintain perfect posture.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Categories */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-12">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 bg-gray-800/50 text-gray-300 hover:bg-gray-800 hover:text-amber-400"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-12">
          {posts.filter(post => post.featured).map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative group cursor-pointer"
            >
              <div className="relative h-96 w-full overflow-hidden rounded-2xl">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <span className="inline-flex items-center rounded-full bg-amber-500/10 px-3 py-1 text-sm font-semibold text-amber-400 w-fit">
                    {post.category}
                  </span>
                  <h2 className="mt-4 text-3xl font-bold text-white">{post.title}</h2>
                  <p className="mt-4 text-lg text-gray-300">{post.description}</p>
                  <div className="mt-6 flex items-center gap-6 text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                      <UserCircleIcon className="h-5 w-5" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarDaysIcon className="h-5 w-5" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ClockIcon className="h-5 w-5" />
                      <span>{post.readTime} read</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {posts.filter(post => !post.featured).map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative group cursor-pointer"
              >
                <div className="relative h-72 w-full overflow-hidden rounded-xl">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <span className="inline-flex items-center rounded-full bg-amber-500/10 px-3 py-1 text-sm font-semibold text-amber-400 w-fit">
                      {post.category}
                    </span>
                    <h3 className="mt-4 text-xl font-bold text-white">{post.title}</h3>
                    <p className="mt-2 text-sm text-gray-300">{post.description}</p>
                    <div className="mt-4 flex items-center gap-4 text-sm text-gray-300">
                      <div className="flex items-center gap-2">
                        <UserCircleIcon className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarDaysIcon className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ClockIcon className="h-4 w-4" />
                        <span>{post.readTime} read</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative isolate overflow-hidden bg-gray-800/50 px-6 py-12 shadow-2xl rounded-2xl sm:px-24 xl:py-16"
          >
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Get weekly posture tips in your inbox
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-gray-300">
                Join our newsletter for expert advice, new exercises, and success stories.
              </p>
              <div className="mt-8 flex max-w-md mx-auto gap-x-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="min-w-0 flex-auto rounded-lg bg-gray-700/50 px-4 py-3 text-white shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-amber-500"
                />
                <button className="rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:from-amber-600 hover:to-orange-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500">
                  Subscribe
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 