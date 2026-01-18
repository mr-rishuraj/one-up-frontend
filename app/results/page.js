"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function ResultsPage() {
  const router = useRouter();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem("oneup_analysis_result");

    if (!stored) {
      router.push("/analyze");
      return;
    }

    const parsed = JSON.parse(stored);

    // 🔧 Adapt backend response → UI format (LOGIC ONLY)
    const adaptedData = {
      score: parsed.score,
      strengths: parsed.strengths,
      weaknesses: parsed.weaknesses,
      sections: {
        headline: { score: Math.max(parsed.score - 10, 0), weight: 20 },
        experience: { score: parsed.score, weight: 30 },
        projects: { score: Math.max(parsed.score - 5, 0), weight: 25 },
        keywords: { score: Math.max(parsed.score - 8, 0), weight: 25 },
      },
    };

    setData(adaptedData);
  }, [router]);

  if (!data) return null;

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-orange-500";
  };

  const getScoreGrade = (score) => {
    if (score >= 90) return "A+";
    if (score >= 85) return "A";
    if (score >= 80) return "A-";
    if (score >= 75) return "B+";
    if (score >= 70) return "B";
    if (score >= 65) return "B-";
    if (score >= 60) return "C+";
    return "C";
  };

  const getBarColor = (score) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-orange-500";
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          
          {/* Overall Score */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 sm:p-12 text-white mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div>
                <div className="text-sm opacity-90 mb-2">
                  Your Profile Score
                </div>
                <div className="text-6xl sm:text-7xl font-bold mb-2">
                  {data.score}/100
                </div>
                <div className="text-2xl font-semibold opacity-90">
                  Grade: {getScoreGrade(data.score)}
                </div>
              </div>

              <div className="mt-6 sm:mt-0">
                <div className="w-32 h-32 rounded-full border-8 border-white/30 flex items-center justify-center bg-white/10 backdrop-blur">
                  <span className="text-4xl font-bold">
                    {getScoreGrade(data.score)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section Breakdown */}
          <h2 className="text-2xl font-bold mb-6">Section Breakdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {Object.entries(data.sections).map(([key, value]) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold capitalize">{key}</h3>
                  <span
                    className={`text-2xl font-bold ${getScoreColor(
                      value.score
                    )}`}
                  >
                    {value.score}
                  </span>
                </div>

                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${value.score}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className={`h-full ${getBarColor(value.score)}`}
                  />
                </div>

                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Weight: {value.weight}%
                </div>
              </motion.div>
            ))}
          </div>

          {/* Strengths & Weaknesses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <TrendingUp className="mr-2 text-green-500" size={24} />
                Strengths
              </h2>
              <div className="space-y-3">
                {data.strengths.map((strength, idx) => (
                  <div
                    key={idx}
                    className="flex items-start space-x-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
                  >
                    <CheckCircle2
                      size={20}
                      className="text-green-500 flex-shrink-0 mt-0.5"
                    />
                    <span className="text-sm">{strength}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <AlertCircle className="mr-2 text-orange-500" size={24} />
                Areas to Improve
              </h2>
              <div className="space-y-3">
                {data.weaknesses.map((weakness, idx) => (
                  <div
                    key={idx}
                    className="flex items-start space-x-3 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800"
                  >
                    <AlertCircle
                      size={20}
                      className="text-orange-500 flex-shrink-0 mt-0.5"
                    />
                    <span className="text-sm">{weakness}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <button
              onClick={() => router.push("/improve")}
              className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg transition-all hover:scale-105"
            >
              See Specific Improvements
              <ChevronRight className="ml-2" size={20} />
            </button>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
