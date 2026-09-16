"use client";

import { useState, useEffect } from "react";
import { VideoResult } from "@/lib/search/types";
import VideoGrid from "@/components/VideoGrid";
import { Bookmark, Trash2 } from "lucide-react";
import Link from "next/link";

export default function SavedPage() {
  const [savedVideos, setSavedVideos] = useState<VideoResult[]>([]);
  const [savedUrls, setSavedUrls] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('saved_videos');
      if (saved) {
        const parsed = JSON.parse(saved);
        setSavedVideos(parsed);
        setSavedUrls(new Set(parsed.map((v: VideoResult) => v.url)));
      }
    } catch (e) {
      console.error("Failed to load saved videos");
    }
    setIsLoaded(true);
  }, []);

  const handleSaveToggle = (video: VideoResult, isSaved: boolean) => {
    try {
      let updatedSaved = [...savedVideos];
      
      if (isSaved) {
        if (!updatedSaved.some(v => v.url === video.url)) {
          updatedSaved.push(video);
        }
      } else {
        updatedSaved = updatedSaved.filter(v => v.url !== video.url);
      }
      
      setSavedVideos(updatedSaved);
      setSavedUrls(new Set(updatedSaved.map(v => v.url)));
      localStorage.setItem('saved_videos', JSON.stringify(updatedSaved));
    } catch (e) {
      console.error("Failed to update saved videos");
    }
  };

  const clearSaved = () => {
    if (confirm("Are you sure you want to clear all saved videos?")) {
      setSavedVideos([]);
      setSavedUrls(new Set());
      localStorage.removeItem('saved_videos');
    }
  };

  if (!isLoaded) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 border-b border-gray-200 dark:border-gray-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-xl">
            <Bookmark className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Saved Videos</h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium">Your collection of {savedVideos.length} saved research videos</p>
          </div>
        </div>
        
        {savedVideos.length > 0 && (
          <button 
            onClick={clearSaved}
            className="flex items-center gap-2 px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 rounded-xl font-medium transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      {savedVideos.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <div className="bg-gray-100 dark:bg-gray-700 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Bookmark className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">No saved videos yet</h2>
          <p className="text-gray-500 max-w-sm mx-auto mb-8">
            When you find interesting videos during your research, click the bookmark icon to save them here.
          </p>
          <Link href="/" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg">
            Start Searching
          </Link>
        </div>
      ) : (
        <VideoGrid 
          videos={savedVideos} 
          savedUrls={savedUrls} 
          onSaveToggle={handleSaveToggle}
        />
      )}
    </div>
  );
}
