"use client";

import { useState, useEffect } from "react";
import { History, Search, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HistoryPage() {
  const [history, setHistory] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    try {
      const historyStr = localStorage.getItem('search_history');
      if (historyStr) {
        setHistory(JSON.parse(historyStr));
      }
    } catch (e) {
      console.error("Failed to load search history");
    }
    setIsLoaded(true);
  }, []);

  const clearHistory = () => {
    if (confirm("Are you sure you want to clear your search history?")) {
      setHistory([]);
      localStorage.removeItem('search_history');
    }
  };

  if (!isLoaded) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 border-b border-gray-200 dark:border-gray-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-xl">
            <History className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Recent Searches</h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium">Your last 20 search queries</p>
          </div>
        </div>
        
        {history.length > 0 && (
          <button 
            onClick={clearHistory}
            className="flex items-center gap-2 px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 rounded-xl font-medium transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Clear History
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <div className="bg-gray-100 dark:bg-gray-700 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">No search history</h2>
          <p className="text-gray-500 max-w-sm mx-auto mb-8">
            Your recent searches will appear here. Start by searching for some short videos!
          </p>
          <Link href="/" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-md">
            Go to Search
          </Link>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <ul className="divide-y divide-gray-100 dark:divide-gray-700">
            {history.map((keyword, index) => (
              <li key={`${keyword}-${index}`} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div 
                  className="flex items-center justify-between p-4 cursor-pointer"
                  onClick={() => router.push(`/?q=${encodeURIComponent(keyword)}`)}
                >
                  <div className="flex items-center gap-4">
                    <Search className="w-5 h-5 text-gray-400" />
                    <span className="text-lg font-medium text-gray-800 dark:text-gray-200">{keyword}</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-300" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
