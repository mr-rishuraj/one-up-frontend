"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AnalyzingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  const steps = [
    "Reading profile headline...",
    "Analyzing work experience...",
    "Evaluating projects and achievements...",
    "Checking profile consistency...",
    "Calculating final score...",
  ];

  useEffect(() => {
    // 🔒 Safety check: analysis must exist
    const stored = localStorage.getItem("oneup_analysis_result");
    if (!stored) {
      router.push("/analyze");
      return;
    }

    const interval = setInterval(() => {
      setStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 800);

    const timeout = setTimeout(() => {
      router.push("/results");
    }, 4500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [router]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center max-w-md"
      >
        <div className="mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mx-auto mb-6"
          >
            <div className="w-full h-full border-4 border-blue-600 border-t-transparent rounded-full"></div>
          </motion.div>

          <h2 className="text-2xl font-bold mb-4">
            Analyzing Your Profile
          </h2>
        </div>

        <div className="space-y-4">
          {steps.map((stepText, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: idx <= step ? 1 : 0.3, x: 0 }}
              className="flex items-center space-x-3"
            >
              {idx < step ? (
                <CheckCircle2
                  size={20}
                  className="text-green-500 flex-shrink-0"
                />
              ) : idx === step ? (
                <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin flex-shrink-0"></div>
              ) : (
                <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded-full flex-shrink-0"></div>
              )}

              <span
                className={
                  idx <= step
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-400 dark:text-gray-600"
                }
              >
                {stepText}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
