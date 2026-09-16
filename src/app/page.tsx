"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SearchBar from "../components/SearchBar";
import PlatformFilter from "../components/PlatformFilter";
import VideoGrid from "../components/VideoGrid";
import LoadingCards from "../components/LoadingCards";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import { Platform, VideoResult } from "../lib/search/types";

function HomeContent() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get('q') || "";
  
  const [query, setQuery] = useState(initialQ);
  const [platforms, setPlatforms] = useState<Platform[]>(["youtube", "tiktok", "instagram", "facebook"]);
  const [results, setResults] = useState<VideoResult[]>([]);
  const [stats, setStats] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [savedUrls, setSavedUrls] = useState<Set<string>>(new Set());
  const [showRanking, setShowRanking] = useState(false);

  // Load saved state from local storage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('saved_videos');
      if (saved) {
        const parsed: VideoResult[] = JSON.parse(saved);
        setSavedUrls(new Set(parsed.map(v => v.url)));
      }
    } catch (e) {
      console.error("Failed to load saved videos");
    }
    
    // Auto search if query param is present
    if (initialQ && !hasSearched && !isLoading) {
      handleSearch(initialQ);
    }
  }, [initialQ]);

  const handleSearch = async (keyword: string) => {
    if (!keyword.trim() || platforms.length === 0) return;
    
    setQuery(keyword);
    setIsLoading(true);
    setError("");
    setHasSearched(true);
    setResults([]);
    
    // Save to history
    try {
      const historyStr = localStorage.getItem('search_history');
      let history: string[] = historyStr ? JSON.parse(historyStr) : [];
      history = [keyword, ...history.filter(h => h !== keyword)].slice(0, 20);
      localStorage.setItem('search_history', JSON.stringify(history));
    } catch (e) {}
    
    try {
      const platformParam = platforms.join(',');
      const res = await fetch(`/api/search?q=${encodeURIComponent(keyword)}&platforms=${platformParam}`);
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch results");
      }
      
      setResults(data.results || []);
      setStats(data.stats || {});
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveToggle = (video: VideoResult, isSaved: boolean) => {
    try {
      const savedStr = localStorage.getItem('saved_videos');
      let saved: VideoResult[] = savedStr ? JSON.parse(savedStr) : [];
      
      if (isSaved) {
        // Add to saved
        if (!saved.some(v => v.url === video.url)) {
          saved.push(video);
        }
        setSavedUrls(prev => new Set([...prev, video.url]));
      } else {
        // Remove from saved
        saved = saved.filter(v => v.url !== video.url);
        setSavedUrls(prev => {
          const next = new Set(prev);
          next.delete(video.url);
          return next;
        });
      }
      
      localStorage.setItem('saved_videos', JSON.stringify(saved));
    } catch (e) {
      console.error("Failed to update saved videos");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
      <div className="text-center mb-10 pt-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 tracking-tight mb-4 pb-2">
          Find Short Videos Faster
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-medium">
          Search short-form videos across YouTube, TikTok, Instagram & Facebook. No API keys required.
        </p>
      </div>

      <SearchBar onSearch={handleSearch} isLoading={isLoading} initialValue={query} />
      
      <PlatformFilter 
        selectedPlatforms={platforms} 
        onChange={setPlatforms} 
        disabled={isLoading}
      />

      {/* Main Content Area */}
      <div className="mt-16">
        {isLoading && <LoadingCards />}
        
        {error && <ErrorState message={error} />}
        
        {!isLoading && !error && hasSearched && results.length === 0 && (
          <EmptyState query={query} />
        )}
        
        {!isLoading && !error && hasSearched && results.length > 0 && (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                Found <span className="text-indigo-600 dark:text-indigo-400">{results.length}</span> results for &quot;{query}&quot;
              </h2>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">Ranking Mode</span>
                  <button 
                    onClick={() => setShowRanking(!showRanking)}
                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${showRanking ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}
                  >
                    <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200 ease-in-out ${showRanking ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>
            </div>
            
            {showRanking && (
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 border border-indigo-100 dark:border-indigo-800 text-indigo-800 dark:text-indigo-300 p-4 rounded-xl mb-8 text-sm flex items-center justify-center text-center shadow-sm">
                <p className="font-medium">⚠️ Ranking based on this tool&apos;s internal relevance signals. Not an official platform ranking.</p>
              </div>
            )}
            
            <VideoGrid 
              videos={results} 
              savedUrls={savedUrls} 
              onSaveToggle={handleSaveToggle}
              showRanking={showRanking}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="flex justify-center p-20"><div className="animate-pulse font-bold text-xl text-gray-400">Loading search...</div></div>}>
      <HomeContent />
    </Suspense>
  );
}
