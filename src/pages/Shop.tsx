import { motion } from 'framer-motion';
import { StarIcon, TruckIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const products = [
  {
    id: 1,
    name: 'Pro Posture Corrector',
    description: 'Ergonomically designed posture corrector for all-day comfort and support.',
    price: '$49.99',
    rating: 4.8,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1616279969862-e71f0b6c4ab7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Posture Support',
    featured: true,
  },
  {
    id: 2,
    name: 'Ergonomic Office Chair',
    description: 'Premium office chair designed for optimal posture and comfort during long work hours.',
    price: '$299.99',
    rating: 4.9,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Office Equipment',
  },
  {
    id: 3,
    name: 'Posture Band Set',
    description: 'Resistance bands specifically designed for posture-correcting exercises.',
    price: '$29.99',
    rating: 4.7,
    reviews: 245,
    image: 'https://images.unsplash.com/photo-1593476123561-9516f2097158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Exercise Equipment',
  },
  {
    id: 4,
    name: 'Lumbar Support Cushion',
    description: 'Memory foam lumbar support cushion for your office chair or car seat.',
    price: '$39.99',
    rating: 4.6,
    reviews: 167,
    image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Posture Support',
  },
  {
    id: 5,
    name: 'Smart Posture Tracker',
    description: 'Wearable device that monitors your posture and provides real-time feedback via smartphone app.',
    price: '$89.99',
    rating: 4.5,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Accessories',
  },
  {
    id: 6,
    name: 'Adjustable Standing Desk',
    description: 'Electric height-adjustable desk for seamless transitions between sitting and standing.',
    price: '$499.99',
    rating: 4.9,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1595515106864-077d54b1309c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Office Equipment',
  },
  {
    id: 7,
    name: 'Foam Roller Set',
    description: 'Professional-grade foam roller set for muscle recovery and posture improvement.',
    price: '$45.99',
    rating: 4.7,
    reviews: 189,
    image: 'https://images.unsplash.com/photo-1600881333168-2ef49b341f30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Exercise Equipment',
  },
  {
    id: 8,
    name: 'Ergonomic Keyboard',
    description: 'Split design keyboard for natural hand positioning and reduced strain.',
    price: '$129.99',
    rating: 4.6,
    reviews: 142,
    image: 'https://images.unsplash.com/photo-1615869442320-fd02a129c77c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Office Equipment',
  },
  {
    id: 9,
    name: 'Posture Yoga Mat',
    description: 'Extra-thick yoga mat with alignment markers for proper posture during exercises.',
    price: '$59.99',
    rating: 4.8,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Exercise Equipment',
  },
  {
    id: 10,
    name: 'Kneeling Chair',
    description: 'Ergonomic kneeling chair that promotes active sitting and better posture.',
    price: '$189.99',
    rating: 4.5,
    reviews: 178,
    image: 'https://images.unsplash.com/photo-1583248483203-555f3d850303?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Office Equipment',
  },
  {
    id: 11,
    name: 'Massage Ball Set',
    description: 'Set of therapy balls for targeted muscle relief and posture improvement.',
    price: '$24.99',
    rating: 4.7,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Exercise Equipment',
  },
  {
    id: 12,
    name: 'Posture Correcting Insoles',
    description: 'Orthopedic insoles that help align your spine and improve overall posture.',
    price: '$34.99',
    rating: 4.4,
    reviews: 198,
    image: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Posture Support',
  }
];

const categories = [
  'All Products',
  'Posture Support',
  'Exercise Equipment',
  'Office Equipment',
  'Accessories',
];

const features = [
  {
    name: 'Free Shipping',
    description: 'Free shipping on orders over $100',
    icon: TruckIcon,
  },
  {
    name: 'Money Back Guarantee',
    description: '30-day money-back guarantee',
    icon: ShieldCheckIcon,
  },
];

export default function Shop() {
  const isShopEnabled = false; // This will be controlled by an environment variable or admin setting

  if (!isShopEnabled) {
    return (
      <div className="bg-gray-900 min-h-screen">
        <div className="main-wrapper flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl w-full space-y-8 text-center"
          >
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                Coming{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500">
                  Soon
                </span>
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                We're working on bringing you the best posture improvement products. Our shop will feature premium ergonomic solutions, exercise equipment, and posture support accessories.
              </p>
            </div>
            <div className="mt-10">
              <button
                type="button"
                className="inline-flex items-center px-6 py-3 text-base font-semibold rounded-lg bg-gradient-to-r from-red-500 to-purple-600 text-white shadow-sm hover:from-red-600 hover:to-purple-700 transition-all duration-200"
              >
                Notify me when shop opens
              </button>
              <p className="mt-4 text-sm text-gray-400">
                Be the first to know when our curated collection becomes available.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Posture Improvement Products
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Quality equipment and accessories to support your posture journey.
            </p>
          </div>

          {/* Hero Section */}
          <div className="relative isolate overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mx-auto max-w-2xl text-center"
              >
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                  Posture{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500">
                    Essentials
                  </span>
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-300">
                  Premium products designed to help you maintain perfect posture and enhance your well-being.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto max-w-7xl px-6 lg:px-8 pb-12"
          >
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  className="rounded-full px-4 py-2 text-sm font-medium text-gray-300 hover:text-white bg-gray-800/50 hover:bg-gray-800 backdrop-blur-sm transition-all duration-200"
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Featured Product */}
          <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {products.filter(product => product.featured).map(product => (
                <div
                  key={product.id}
                  className="relative isolate overflow-hidden rounded-2xl bg-gray-800/50 backdrop-blur-sm"
                >
                  <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
                    <div className="px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-48 xl:col-span-6">
                      <div className="mx-auto max-w-2xl lg:mx-0">
                        <div className="flex items-center gap-x-4">
                          <span className="rounded-full bg-red-500/10 px-3 py-1 text-sm font-medium text-red-400 ring-1 ring-inset ring-red-500/20">
                            New Arrival
                          </span>
                          <div className="flex items-center text-sm text-gray-400">
                            <StarIcon className="h-4 w-4 mr-1 text-yellow-500" />
                            {product.rating} ({product.reviews} reviews)
                          </div>
                        </div>
                        <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                          {product.name}
                        </h2>
                        <p className="mt-4 text-lg text-gray-300">{product.description}</p>
                        <div className="mt-8 flex items-center gap-x-6">
                          <span className="text-3xl font-bold text-white">{product.price}</span>
                          <button className="rounded-lg bg-gradient-to-r from-red-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:from-red-600 hover:to-purple-700 transition-all duration-200">
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative lg:col-span-5 lg:-mr-8 xl:col-span-6">
                      <img
                        className="aspect-[3/2] bg-gray-50 object-cover lg:aspect-[4/3] lg:h-[700px] xl:aspect-[16/9]"
                        src={product.image}
                        alt={product.name}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Product Grid */}
          <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {products.filter(product => !product.featured).map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 + product.id * 0.1 }}
                  className="flex flex-col overflow-hidden rounded-2xl bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300"
                >
                  <div className="relative flex-shrink-0">
                    <img
                      className="h-64 w-full object-cover"
                      src={product.image}
                      alt={product.name}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/75 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="rounded-full bg-gray-900/90 backdrop-blur-sm px-3 py-1 text-sm font-medium text-gray-200">
                        {product.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-white">{product.name}</h3>
                        <span className="text-lg font-bold text-red-400">{product.price}</span>
                      </div>
                      <p className="text-gray-400 text-sm mb-4">{product.description}</p>
                      <div className="flex items-center text-sm text-gray-400">
                        <StarIcon className="h-4 w-4 mr-1 text-yellow-500" />
                        {product.rating} ({product.reviews} reviews)
                      </div>
                    </div>
                    <button className="mt-6 w-full rounded-lg bg-gradient-to-r from-red-500 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:from-red-600 hover:to-purple-700 transition-all duration-200">
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Features Section */}
          <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="grid grid-cols-1 gap-8 sm:grid-cols-2"
            >
              {features.map((feature) => (
                <div
                  key={feature.name}
                  className="relative flex items-center gap-x-6 rounded-2xl bg-gray-800/50 backdrop-blur-sm p-6"
                >
                  <div className="flex h-12 w-12 flex-none items-center justify-center rounded-lg bg-gradient-to-r from-red-500 to-purple-600">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold leading-8 text-white">{feature.name}</h3>
                    <p className="mt-2 text-sm text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 