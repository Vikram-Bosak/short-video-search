import Link from 'next/link';
import { Search, History, Bookmark } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Search className="h-5 w-5 text-white" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-gray-900 dark:text-white">
                ShortVideo<span className="text-indigo-600 dark:text-indigo-400">Search</span>
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <Link href="/history" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2 transition-colors">
              <History className="h-5 w-5" />
              <span className="hidden sm:inline font-medium">History</span>
            </Link>
            <Link href="/saved" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2 transition-colors">
              <Bookmark className="h-5 w-5" />
              <span className="hidden sm:inline font-medium">Saved</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
