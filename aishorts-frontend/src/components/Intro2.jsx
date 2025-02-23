import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import PropTypes from "prop-types";

const FeaturePill = ({ text }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={
        inView
          ? {
              opacity: 1,
              y: 0,
              transition: { type: "spring", stiffness: 100 },
            }
          : {}
      }
      whileHover={{ scale: 1.05 }}
      className="mr-2 mb-2 inline-block rounded-full bg-gradient-to-r from-purple-600 to-pink-500 px-4 py-1 text-xs font-medium text-white shadow-lg sm:px-6 sm:py-2 sm:text-sm"
    >
      {text}
    </motion.div>
  );
};

FeaturePill.propTypes = {
  text: PropTypes.string.isRequired,
};

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

    <motion.div
      className="absolute inset-0 animate-float"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-purple-400/30"
          initial={{ scale: 0 }}
          animate={{
            scale: 1,
            transition: {
              delay: i * 0.1,
              repeat: Infinity,
              repeatType: "mirror",
              duration: 2,
            },
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </motion.div>
  </motion.div>
);

function Intro2() {
  return (
    <div className="relative overflow-hidden bg-gray-950 py-24 sm:py-24">
      <AnimatedBackground />

      <motion.div
        className="mx-auto max-w-7xl px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="relative isolate overflow-hidden px-8 py-16 backdrop-blur-xl sm:px-16 md:py-24 lg:flex lg:items-center lg:gap-x-20 lg:px-24"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:flex-auto lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                type: "spring",
              }}
              className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Revolutionize Information with
              <motion.span
                className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                }}
              >
                {" "}
                Gemini AI-Powered Precision
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.5,
                duration: 1,
                staggerChildren: 0.1,
              }}
              className="mt-6 text-lg leading-8 text-gray-300"
            >
              Harness the power of Gemini AI for lightning-fast, precise
              answers. AiShorts delivers concise, AI-driven summaries,
              transforming complex data into clear, actionable insights in
              seconds
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <FeaturePill text="🤖 Gemini Powered" />
              <FeaturePill text="⚡ Instant Results" />
              <FeaturePill text="🔒 Privacy First" />
            </motion.div>
          </div>

          <motion.div
            className="relative mt-16 lg:mt-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
          >
            <motion.div
              className="relative rounded-2xl bg-gradient-to-b from-purple-900/30 to-pink-900/20 p-1 shadow-2xl backdrop-blur-xl"
              whileHover={{
                scale: 1.02,
                rotate: -1,
                transition: { type: "spring" },
              }}
            >
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 opacity-20 blur-xl" />
              <motion.img
                alt="AI Interface Preview"
                src="/images/google-logo.png"
                className="w-full max-w-xl rounded-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Intro2;
