"use client";

import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              One-Upp
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm max-w-md">
              AI-powered LinkedIn analysis that gives you the competitive edge in
              your career.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
              Product
            </h4>
            <div className="space-y-2">
              <button
                onClick={() => router.push("/analyze")}
                className="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                Analyze Profile
              </button>
              <button
                onClick={() => router.push("/about")}
                className="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                About
              </button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
              Legal
            </h4>
            <div className="space-y-2">
              <a
                href="#"
                className="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                Privacy
              </a>
              <a
                href="#"
                className="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                Terms
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-10 p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center max-w-4xl mx-auto">
            <strong>Disclaimer:</strong> One-Upp provides AI-generated insights
            based on the text you share. Results may vary depending on profile
            completeness, formatting, and copied content. This analysis is
            intended as guidance, not a definitive evaluation.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-500 text-center">
            © 2026 One-Upp. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
