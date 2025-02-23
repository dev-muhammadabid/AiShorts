import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import PropTypes from 'prop-types'; // Add this import

// Add prop validation
FeaturePill.propTypes = {
  text: PropTypes.string.isRequired
};

// Animated gradient background
const AnimatedBackground = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1.5 }}
    className="absolute inset-0 -z-10"
  >
    <svg
      viewBox="0 0 1024 1024"
      className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2"
    >
      <circle
        cx="512"
        cy="512"
        r="512"
        fill="url(#gradient)"
        fillOpacity="0.7"
      />
      <defs>
        <radialGradient id="gradient">
          <animate
            attributeName="fx"
            values="0%; 50%; 0%"
            dur="15s"
            repeatCount="indefinite"
          />
          <stop stopColor="#4F46E5" />
          <stop offset="0.5" stopColor="#9333EA" />
          <stop offset="1" stopColor="#EC4899" />
        </radialGradient>
      </defs>
    </svg>
    
    {/* Floating particles */}
    <div className="absolute inset-0 animate-float">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-purple-400/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.2}s`
          }}
        />
      ))}
    </div>
  </motion.div>
);

// Animated feature pills
const FeaturePill = ({ text }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="mr-4 mb-4 inline-block rounded-full bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-2 text-sm font-medium text-white shadow-lg"
    >
      {text}
    </motion.div>
  );
};

function Intro() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="relative overflow-hidden bg-gray-900 py-24 sm:py-32">
      <AnimatedBackground />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-b from-gray-900/80 to-gray-900/20 px-8 py-16 shadow-2xl backdrop-blur-xl sm:px-16 md:py-24 lg:flex lg:items-center lg:gap-x-20 lg:px-24">
          <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:flex-auto lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Revolutionize Information with
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {" "}AI-Powered Precision
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="mt-6 text-lg leading-8 text-gray-300"
            >
              AiShorts harnesses advanced AI to deliver crystal-clear answers in 
              exactly 60 words. Experience the future of concise information 
              with our neural network-powered summarization technology.
            </motion.p>

            <div className="mt-10 flex flex-wrap justify-center lg:justify-start">
              <FeaturePill text="🤖 GPT-4 Powered" />
              <FeaturePill text="⚡ Instant Results" />
              <FeaturePill text="🔒 Privacy First" />
            </div>

            <motion.div
              ref={ref}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="mt-12 flex justify-center lg:justify-start"
            >
              <Link
                to="/prompt"
                className="group relative flex items-center rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              >
                <span className="relative">Start Exploring</span>
                <span className="ml-3 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </motion.div>
          </div>

          <div className="relative mt-16 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative rounded-2xl border border-purple-300/20 bg-gradient-to-b from-purple-900/30 to-pink-900/20 p-1 shadow-2xl backdrop-blur-xl"
            >
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 opacity-20 blur-xl" />
              <img
                alt="AI Interface Preview"
                src="/images/aishorts-web.png"
                className="w-full max-w-xl rounded-2xl"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Intro;