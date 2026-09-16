export default function LoadingCards() {
  return (
    <div className="w-full mt-8">
      <div className="flex justify-center gap-4 mb-8">
        <div className="text-gray-500 font-medium animate-pulse">Searching YouTube...</div>
        <div className="text-gray-500 font-medium animate-pulse delay-75">Searching TikTok...</div>
        <div className="text-gray-500 font-medium animate-pulse delay-150">Searching Instagram...</div>
        <div className="text-gray-500 font-medium animate-pulse delay-200">Searching Facebook...</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col h-[380px] animate-pulse">
            <div className="w-full h-2/3 bg-gray-200 dark:bg-gray-700"></div>
            <div className="p-4 flex flex-col flex-grow">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
              <div className="mt-auto h-10 bg-gray-200 dark:bg-gray-700 rounded-xl w-full"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
