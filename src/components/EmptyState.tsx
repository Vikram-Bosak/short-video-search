import { Search } from 'lucide-react';

export default function EmptyState({ query }: { query?: string }) {
  if (!query) return null;
  
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-full mb-6">
        <Search className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No results found</h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-md">
        We couldn&apos;t find any short videos matching &quot;{query}&quot;. Try adjusting your search terms or selecting more platforms.
      </p>
    </div>
  );
}
