"use client";

import { Platform } from '@/lib/search/types';
import { Check } from 'lucide-react';

interface PlatformFilterProps {
  selectedPlatforms: Platform[];
  onChange: (platforms: Platform[]) => void;
  disabled?: boolean;
}

const PLATFORMS: { id: Platform; label: string; color: string }[] = [
  { id: 'youtube', label: 'YouTube', color: 'bg-red-600' },
  { id: 'tiktok', label: 'TikTok', color: 'bg-black dark:bg-gray-700' },
  { id: 'instagram', label: 'Instagram', color: 'bg-pink-600' },
  { id: 'facebook', label: 'Facebook', color: 'bg-blue-600' },
];

export default function PlatformFilter({ selectedPlatforms, onChange, disabled = false }: PlatformFilterProps) {
  
  const togglePlatform = (platform: Platform) => {
    if (disabled) return;
    
    if (selectedPlatforms.includes(platform)) {
      // Don't uncheck if it's the last one
      if (selectedPlatforms.length > 1) {
        onChange(selectedPlatforms.filter(p => p !== platform));
      }
    } else {
      onChange([...selectedPlatforms, platform]);
    }
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center mb-8">
      {PLATFORMS.map((platform) => {
        const isSelected = selectedPlatforms.includes(platform.id);
        
        return (
          <button
            key={platform.id}
            type="button"
            onClick={() => togglePlatform(platform.id)}
            disabled={disabled}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-200
              ${isSelected 
                ? `${platform.color} text-white shadow-md transform scale-105` 
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <div className={`w-4 h-4 rounded-sm flex items-center justify-center border ${isSelected ? 'border-white' : 'border-gray-400'}`}>
              {isSelected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
            </div>
            {platform.label}
          </button>
        );
      })}
    </div>
  );
}
