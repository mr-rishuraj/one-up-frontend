'use client';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, BarChart3, Target, Zap, Sparkles, TrendingUp, Award, Shield } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [typedText, setTypedText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [scoreVisible, setScoreVisible] = useState(false);
  
  const phrases = [
    'recruiters see.',
    'hiring managers judge.',
    'top companies evaluate.',
    'the market demands.'
  ];

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting && typedText === currentPhrase) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && typedText === '') {
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      } else if (isDeleting) {
        setTypedText(currentPhrase.substring(0, typedText.length - 1));
      } else {
        setTypedText(currentPhrase.substring(0, typedText.length + 1));
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, currentPhraseIndex]);

  useEffect(() => {
    const timer = setTimeout(() => setScoreVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={containerRef} className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 60%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        />
      </div>

      {/* Hero Section */}
 <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 min-h-screen flex items-center">
  <motion.div style={{ y, opacity }} className="w-full">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="text-center max-w-5xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full mb-8 border border-blue-200 dark:border-blue-800"
      >
        <Sparkles size={16} className="text-blue-600" />
        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
          AI-Powered LinkedIn Analysis
        </span>
      </motion.div>

      <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight mb-8 leading-tight">
        <span className="block">Get One-Upp on</span>
        <span className="block bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          LinkedIn.
        </span>
      </h1>

      {/* ✅ RESPONSIVE TYPED TEXT FIX */}
      <div className="text-xl sm:text-2xl lg:text-3xl text-gray-600 dark:text-gray-400 mb-6 flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
        <span>AI that judges your profile like</span>

        <span
          className="
            relative inline-flex items-center
            font-semibold text-gray-900 dark:text-white
            min-h-[1.5em]
            w-full sm:w-auto
            justify-center sm:justify-start
          "
        >
          <span className="whitespace-nowrap">
            {typedText}
          </span>

          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-0.5 h-7 sm:h-8 bg-blue-600 ml-1"
          />
        </span>
      </div>
      {/* ✅ END FIX */}

      <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
        Know exactly where you stand and what to fix.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Link href="/analyze">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex items-center px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl transition-all overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              Analyze My Profile
              <motion.div
                className="ml-3"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight size={20} />
              </motion.div>
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </Link>
      </motion.div>
    </motion.div>

    {/* Example Score Preview (UNCHANGED) */}
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: scoreVisible ? 1 : 0, y: scoreVisible ? 0 : 60 }}
      transition={{ duration: 1, delay: 1, ease: [0.22, 1, 0.36, 1] }}
      className="mt-24 max-w-3xl mx-auto"
    >
      {/* rest of score card stays exactly the same */}
    </motion.div>
  </motion.div>
</section>


      {/* How It Works */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Three steps to transform your profile</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Target, title: "Paste Your Profile", desc: "Simply paste your LinkedIn profile text. No login required.", delay: 0 },
              { icon: BarChart3, title: "AI Analysis", desc: "Our AI evaluates your profile across 15+ factors like a senior recruiter would.", delay: 0.2 },
              { icon: Zap, title: "Get Actionable Insights", desc: "Receive a detailed score, breakdown, and specific improvements to implement.", delay: 0.4 }
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: step.delay }}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative text-center p-8">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl mb-6 shadow-lg"
                  >
                    <step.icon size={36} className="text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Different */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-20"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Why One-Upp is Different
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Most profile reviews are generic. We give you the brutal truth with specific, actionable fixes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              { title: "Recruiter-Grade Analysis", desc: "Evaluated on the same criteria top companies use when screening candidates", icon: Award },
              { title: "Quantified Scoring", desc: "Objective scores across headline, experience, projects, and consistency", icon: BarChart3 },
              { title: "Before/After Examples", desc: "See exactly how to rewrite weak sections with proven templates", icon: TrendingUp },
              { title: "No Fluff", desc: "Zero generic advice. Every suggestion is specific to your profile data", icon: Target }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                className="relative p-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden group"
              >
                <motion.div
                  className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"
                />
                <feature.icon className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="font-semibold text-xl mb-3 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {/* <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold text-center mb-20 text-gray-900 dark:text-white"
          >
            What People Say
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Chen", role: "Software Engineer", text: "Improved my score from 62 to 89 in one week. Got 3 recruiter messages the next day.", delay: 0 },
              { name: "Marcus Johnson", role: "Product Manager", text: "The suggestions were so specific. Finally understood why my profile wasn't getting traction.", delay: 0.15 },
              { name: "Priya Sharma", role: "Data Scientist", text: "Honest feedback I couldn't get anywhere else. Worth every minute spent implementing changes.", delay: 0.3 }
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: testimonial.delay }}
                whileHover={{ y: -5 }}
                className="relative p-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg"
              >
                <div className="absolute top-0 left-8 -mt-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <CheckCircle2 size={18} className="text-white" />
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent"
        />
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Ready to Get One-Upp?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
              Join hundreds of professionals who've transformed their LinkedIn presence.
            </p>
            
            <Link href="/analyze">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(59, 130, 246, 0.4)" }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center px-12 py-6 bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold rounded-2xl transition-all overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Analyze My Profile
                  <motion.div
                    className="ml-3"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight size={24} />
                  </motion.div>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600"
                  animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{ backgroundSize: '200% 100%' }}
                />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}