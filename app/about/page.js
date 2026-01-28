"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-8">About One-Upp</h1>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              One-Upp is an AI-powered LinkedIn analysis tool that gives you brutally honest
              feedback on your profile.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">The Problem</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Most professionals have no idea how recruiters actually evaluate their LinkedIn
              profiles. Generic advice like "be professional" or "show your passion" doesn't help.
              You need specific, actionable feedback based on what actually works.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">Our Approach</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              One-Upp analyzes your profile using the same criteria top recruiters and hiring
              managers use. We evaluate headline clarity, achievement quantification, profile
              consistency, keyword optimization, and overall impact. Then we give you a score and
              specific improvements to implement.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">Why We Built This</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              After reviewing thousands of LinkedIn profiles, we noticed the same patterns. Strong
              candidates with weak profiles getting overlooked. Generic descriptions that say
              nothing. Missing quantified achievements. We built One-Upp to solve this
              systematically.
            </p>

            <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-lg mb-3">Core Principles</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Objective scoring based on recruiter evaluation criteria</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Specific, actionable suggestions with before/after examples</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>No generic advice or motivational fluff</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Privacy-first approach with no login required</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
