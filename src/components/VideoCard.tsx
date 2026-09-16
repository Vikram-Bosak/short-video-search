"use client";

import { VideoResult } from '@/lib/search/types';
import { ExternalLink, Heart, Bookmark, BookmarkCheck } from 'lucide-react';
import { useState, useEffect } from 'react';

interface VideoCardProps {
  video: VideoResult;
  isSavedInitial?: boolean;
  onSaveToggle?: (video: VideoResult, isSaved: boolean) => void;
  showRanking?: boolean;
  rankIndex?: number;
}

export default function VideoCard({ video, isSavedInitial = false, onSaveToggle, showRanking = false, rankIndex = 0 }: VideoCardProps) {
  const [isSaved, setIsSaved] = useState(isSavedInitial);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setIsSaved(isSavedInitial);
  }, [isSavedInitial]);

  const handleSave = () => {
    const newState = !isSaved;
    setIsSaved(newState);
    if (onSaveToggle) {
      onSaveToggle(video, newState);
    }
  };

  const getPlatformColor = (platform: string) => {
    switch(platform) {
      case 'youtube': return 'bg-red-600';
      case 'tiktok': return 'bg-black dark:bg-gray-700';
      case 'instagram': return 'bg-pink-600';
      case 'facebook': return 'bg-blue-600';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col h-full group relative">
      
      {showRanking && (
        <div className="absolute top-3 left-3 z-10 bg-black/80 text-white font-black text-lg w-10 h-10 flex items-center justify-center rounded-full shadow-lg border-2 border-yellow-400">
          #{rankIndex}
        </div>
      )}

      {/* Thumbnail */}
      <div className="relative aspect-[9/16] bg-gray-200 dark:bg-gray-900 overflow-hidden">
        {video.thumbnail && !imageError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img 
            src={video.thumbnail} 
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 p-6 text-center">
            No thumbnail available
          </div>
        )}
        
        {/* Platform Badge */}
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white shadow-md ${getPlatformColor(video.platform)} capitalize`}>
          {video.platform}
        </div>
        
        {/* Save Button Overlay */}
        <button 
          onClick={handleSave}
          className="absolute bottom-3 right-3 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white backdrop-blur-sm transition-colors"
          title={isSaved ? "Remove from saved" : "Save video"}
        >
          {isSaved ? <BookmarkCheck className="w-5 h-5 text-indigo-400" /> : <Bookmark className="w-5 h-5" />}
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2 mb-2" title={video.title}>
          {video.title}
        </h3>
        
        <div className="mt-auto space-y-2">
          {video.creator && (
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              {video.creator}
            </p>
          )}
          
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 gap-4">
            {video.views !== undefined && (
              <span>{video.views.toLocaleString()} views</span>
            )}
            {video.likes !== undefined && (
              <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> {video.likes.toLocaleString()}</span>
            )}
          </div>
          
          <a 
            href={video.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 text-gray-800 dark:text-gray-200 rounded-xl font-medium transition-colors"
          >
            <span>OPEN VIDEO</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
