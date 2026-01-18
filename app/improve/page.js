"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ImprovePage() {
  const router = useRouter();
  const [checkedItems, setCheckedItems] = useState({});
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem("oneup_analysis_result");

    if (!stored) {
      router.push("/analyze");
      return;
    }

    const parsed = JSON.parse(stored);

    if (!parsed.improvements || !parsed.improvements.length) {
      router.push("/analyze");
      return;
    }

    setSuggestions(parsed.improvements);
  }, [router]);

  const toggleCheck = (idx) => {
    setCheckedItems((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const getImpactColor = (impact) => {
    if (impact === "High")
      return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
    if (impact === "Medium")
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
    return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
  };

  if (!suggestions.length) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">Specific Improvements</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              These changes are tailored specifically to your LinkedIn profile
            </p>
          </div>

          {/* Improvements */}
          <div className="space-y-8">
            {suggestions.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3">
                    <button
                      onClick={() => toggleCheck(idx)}
                      className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        checkedItems[idx]
                          ? "bg-blue-600 border-blue-600"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                    >
                      {checkedItems[idx] && (
                        <CheckCircle2 size={16} className="text-white" />
                      )}
                    </button>

                    <div>
                      <h3 className="text-xl font-semibold capitalize">
                        {item.section}
                      </h3>
                      <span
                        className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${getImpactColor(
                          item.impact
                        )}`}
                      >
                        {item.impact} Impact
                      </span>
                    </div>
                  </div>
                </div>

                <div className="ml-8 space-y-4">
                  {/* Current */}
                  <div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Current:
                    </div>
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm">
                      {item.current}
                    </div>
                  </div>

                  {/* Suggested */}
                  <div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Suggested:
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-sm">
                      {item.suggested}
                    </div>
                  </div>

                  {/* Reason */}
                  <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Why this matters:</strong> {item.reason}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Checklist */}
          <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
            <h3 className="font-semibold text-lg mb-3">
              Implementation Checklist
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle2 size={16} className="text-blue-600" />
                <span>Apply suggested changes directly to LinkedIn</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 size={16} className="text-blue-600" />
                <span>Add metrics, tools, and outcomes wherever possible</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 size={16} className="text-blue-600" />
                <span>Re-run analysis to track improvement</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <button
              onClick={() => router.push("/analyze")}
              className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg transition-all hover:scale-105"
            >
              Re-analyze Profile
              <ArrowRight className="ml-2" size={20} />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
