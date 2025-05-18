// Imports
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import PropTypes from "prop-types";
import "./Intro.css";

// FeaturePill component: a small pill-shaped tag that animates when it enters viewport
const FeaturePill = ({ text }) => {
  // useInView hook to detect when the pill is visible on screen
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref} // attach ref to detect visibility
      initial={{ opacity: 0, y: 20 }} // start hidden and slightly below
      animate={inView ? { opacity: 1, y: 0 } : {}} // animate to visible and original position when in view
      transition={{ duration: 0.5 }} // animation duration
      className="mr-2 mb-2 inline-block rounded-full bg-gradient-to-r from-purple-600 to-pink-500 px-4 py-1 text-xs font-medium text-white shadow-lg sm:px-6 sm:py-2 sm:text-sm"
    >
      {text}
    </motion.div>
  );
};

// PropTypes to enforce 'text' is a required string
FeaturePill.propTypes = {
  text: PropTypes.string.isRequired,
};

// AnimatedBackground component: renders a gradient circle with floating particles behind content
const AnimatedBackground = () => (
  <motion.div
    initial={{ opacity: 0 }} // fade in on mount
    animate={{ opacity: 1 }}
    transition={{ duration: 1.5 }}
    className="absolute inset-0 -z-10" // position behind all other content
  >
    {/* Large gradient circle SVG */}
    <svg
      viewBox="0 0 1024 1024"
      className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2"
    >
      <circle cx="512" cy="512" r="512" fill="url(#gradient)" fillOpacity="0.7" />
      <defs>
        {/* Radial gradient with animated focal point */}
        <radialGradient id="gradient">
          <animate attributeName="fx" values="0%; 50%; 0%" dur="15s" repeatCount="indefinite" />
          <stop stopColor="#4F46E5" />
          <stop offset="0.5" stopColor="#9333EA" />
          <stop offset="1" stopColor="#EC4899" />
        </radialGradient>
      </defs>
    </svg>

    {/* Floating particle dots */}
    <div className="absolute inset-0 animate-float">
      {[...Array(typeof window !== "undefined" && window.innerWidth < 768 ? 10 : 20)].map((_, i) => (
        <div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-purple-400/30"
          style={{
            left: `${Math.random() * 100}%`, // random horizontal position
            top: `${Math.random() * 100}%`, // random vertical position
            animationDelay: `${i * 0.2}s`, // stagger animation start time for a natural effect
          }}
        />
      ))}
    </div>
  </motion.div>
);

function Intro3() {
  // useInView to trigger animation for the CTA container
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="relative overflow-hidden bg-gray-950 py-16 sm:py-24 lg:py-20">
      {/* Background gradient and particles */}
      <AnimatedBackground />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden px-6 py-12 backdrop-blur-xl sm:px-12 sm:py-16 lg:flex lg:items-center lg:gap-x-20 lg:px-16 lg:py-20">
          {/* Left text content */}
          <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:flex-auto lg:text-left">
            {/* Heading with fade and slide up animation */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl"
            >
              Transform Information Consumption with
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {" "}
                Gemini
              </span>
            </motion.h1>

            {/* Subheading paragraph with fade-in */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="mt-4 text-base leading-7 text-gray-300 sm:mt-6 sm:text-lg sm:leading-8"
            >
              Our AI-powered engine analyzes complex information and distills it
              into essential insights, saving you time while maintaining
              accuracy.
            </motion.p>

            {/* Features grid */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* Feature item */}
              <div className="rounded-lg bg-gray-800/50 p-4 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white">Smart Analysis</h3>
                <p className="mt-2 text-sm text-gray-300">
                  Deep learning algorithms extract key points from any text
                </p>
              </div>
              {/* Feature item */}
              <div className="rounded-lg bg-gray-800/50 p-4 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white">Multi-language Support</h3>
                <p className="mt-2 text-sm text-gray-300">
                  Process content in 15+ languages with native accuracy
                </p>
              </div>
              {/* Feature item */}
              <div className="rounded-lg bg-gray-800/50 p-4 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white">Real-time Processing</h3>
                <p className="mt-2 text-sm text-gray-300">
                  Get results in under 2 seconds with our optimized AI
                </p>
              </div>
            </div>

            {/* Call To Action (CTA) section with animation on scroll */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="mt-10 flex flex-col items-center gap-6 sm:flex-row lg:justify-start"
            >
              {/* Add buttons or interactive CTAs here */}
            </motion.div>
          </div>

          {/* Right preview image with hover overlay and stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="relative mt-12 lg:mt-0 lg:max-w-2xl"
          >
            {/* Image container with gradient border and blur */}
            <div className="relative rounded-2xl border border-purple-300/20 bg-gradient-to-b from-purple-900/30 to-pink-900/20 p-1 shadow-2xl backdrop-blur-xl">
              {/* Background glow */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 opacity-20 blur-xl" />
              {/* Preview image */}
              <img
                alt="AI Interface Preview"
                src="/images/aishorts-web.png"
                className="w-full rounded-2xl"
                loading="lazy"
                decoding="async"
              />
              {/* Hover overlay with View Demo button */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 hover:opacity-100">
                <button className="rounded-full bg-white/10 px-6 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20">
                  View Demo
                </button>
              </div>
            </div>

            {/* Stats overlay at the bottom of image */}
            <div className="absolute -bottom-6 left-1/2 flex -translate-x-1/2 transform gap-4 rounded-xl bg-gray-900/80 px-6 py-3 backdrop-blur-sm">
              <div className="text-center">
                <div className="text-xl font-bold text-white">10K+</div>
                <div className="text-xs text-gray-300">Daily Queries</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-white">99.9%</div>
                <div className="text-xs text-gray-300">Accuracy</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Intro3;
