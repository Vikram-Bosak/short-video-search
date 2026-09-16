import { VideoResult } from '@/lib/search/types';
import VideoCard from './VideoCard';

interface VideoGridProps {
  videos: VideoResult[];
  savedUrls: Set<string>;
  onSaveToggle: (video: VideoResult, isSaved: boolean) => void;
  showRanking?: boolean;
}

export default function VideoGrid({ videos, savedUrls, onSaveToggle, showRanking = false }: VideoGridProps) {
  if (videos.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {videos.map((video, idx) => (
        <VideoCard 
          key={`${video.platform}-${video.url}-${idx}`} 
          video={video} 
          isSavedInitial={savedUrls.has(video.url)}
          onSaveToggle={onSaveToggle}
          showRanking={showRanking}
          rankIndex={idx + 1}
        />
      ))}
    </div>
  );
}
