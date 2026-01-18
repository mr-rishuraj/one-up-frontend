'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function AnalyzePage() {
  const router = useRouter();

  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!text.trim()) {
      setError('Please paste your LinkedIn profile text');
      return;
    }

    if (text.trim().length < 100) {
      setError(
        'Please paste more content from your profile (at least 100 characters)'
      );
      return;
    }

    setLoading(true);
    setError('');

    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

      if (!API_BASE_URL) {
        throw new Error('API base URL not configured');
      }

      const res = await fetch(
        `${API_BASE_URL}/api/analyze-profile`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            profile_text: text,
          }),
        }
      );

      if (!res.ok) {
        throw new Error('Backend returned an error');
      }

      const data = await res.json();

      // Store result for results & improve pages
      localStorage.setItem(
        'oneup_analysis_result',
        JSON.stringify(data)
      );

      router.push('/analyzing');
    } catch (err) {
      console.error(err);
      setError('Something went wrong while analyzing. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Analyze Your Profile
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Paste your LinkedIn profile text to get started
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
          <label className="block text-sm font-medium mb-3 text-gray-900 dark:text-white">
            LinkedIn Profile Text
          </label>

          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setError('');
            }}
            placeholder="Paste your entire LinkedIn profile content here..."
            rows={12}
            className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400 resize-none"
          />

          {error && (
            <div className="mt-3 flex items-center text-red-500 text-sm">
              <AlertCircle size={16} className="mr-2" />
              {error}
            </div>
          )}

          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              How to copy your LinkedIn profile:
            </div>

            <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-start space-x-2">
                <span className="text-blue-600 font-medium">1.</span>
                <span>Open your LinkedIn profile in a browser</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-600 font-medium">2.</span>
                <span>Press Ctrl + A (or Cmd + A on Mac)</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-600 font-medium">3.</span>
                <span>Press Ctrl + C (or Cmd + C on Mac)</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-600 font-medium">4.</span>
                <span>Paste it above</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full mt-6 px-6 py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold rounded-lg transition-colors flex items-center justify-center"
          >
            {loading ? 'Analyzing...' : 'Analyze Profile'}
            <ArrowRight className="ml-2" size={20} />
          </button>

          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-start space-x-3 text-sm text-gray-600 dark:text-gray-400">
              <CheckCircle2
                size={20}
                className="text-green-500 flex-shrink-0 mt-0.5"
              />
              <div>
                <strong>Privacy first:</strong> Your profile is analyzed instantly
                and never stored.
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
