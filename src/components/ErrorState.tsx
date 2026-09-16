import { AlertCircle } from 'lucide-react';

export default function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full mb-4">
        <AlertCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Search Failed</h3>
      <p className="text-red-500 dark:text-red-400 max-w-md">
        {message}
      </p>
    </div>
  );
}
