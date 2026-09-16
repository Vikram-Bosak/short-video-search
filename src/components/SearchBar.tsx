"use client";

import { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (keyword: string) => void;
  initialValue?: string;
  isLoading?: boolean;
}

export default function SearchBar({ onSearch, initialValue = '', isLoading = false }: SearchBarProps) {
  const [keyword, setKeyword] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      onSearch(keyword.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto mt-8 mb-6">
      <div className="relative flex items-center w-full h-16 rounded-2xl focus-within:shadow-xl focus-within:ring-2 focus-within:ring-indigo-500 bg-white dark:bg-gray-800 overflow-hidden border border-gray-200 dark:border-gray-700 transition-all shadow-md">
        <div className="grid place-items-center h-full w-14 text-gray-400">
          <Search className="h-6 w-6" />
        </div>
        
        <input
          className="peer h-full w-full outline-none text-gray-700 dark:text-gray-100 bg-transparent pr-2 font-medium text-lg placeholder-gray-400"
          type="text"
          id="search"
          placeholder="Enter a topic or keyword (e.g. funny dogs)..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          disabled={isLoading}
        />
        
        <button 
          type="submit"
          disabled={isLoading || !keyword.trim()}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold h-full px-8 sm:px-10 transition-colors text-lg"
        >
          {isLoading ? 'SEARCHING...' : 'SEARCH'}
        </button>
      </div>
    </form>
  );
}
