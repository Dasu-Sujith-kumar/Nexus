import React from 'react';
import { Play } from 'lucide-react';
import { Video } from '../types/video';
import VideoCard from './VideoCard';

interface VideoGridProps {
  videos: Video[];
  onPlay: (video: Video) => void;
  onToggleFavorite: (videoId: string) => void;
  title: string;
  subtitle?: string;
}

export default function VideoGrid({ videos, onPlay, onToggleFavorite, title, subtitle }: VideoGridProps) {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="border-l-4 border-emerald-500 pl-3 sm:pl-4 mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-200 mb-1">{title}</h2>
        {subtitle && (
          <p className="text-slate-400 text-sm sm:text-base">{subtitle}</p>
        )}
      </div>

      {videos.length === 0 ? (
        <div className="text-center py-8 sm:py-12">
          <div className="w-16 sm:w-24 h-16 sm:h-24 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Play className="w-8 sm:w-12 h-8 sm:h-12 text-slate-600" />
          </div>
          <p className="text-slate-400 text-base sm:text-lg">No videos found</p>
          <p className="text-slate-500 text-sm">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onPlay={onPlay}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}