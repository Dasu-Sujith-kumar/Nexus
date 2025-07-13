import React from 'react';
import { Play, Heart, Eye, Clock, HardDrive } from 'lucide-react';
import { Video } from '../types/video';
import { useState, useEffect } from 'react';
import { generateThumbnailFromUrl, getVideoDurationFromUrl } from '../utils/videoUtils';

interface VideoCardProps {
  video: Video;
  onPlay: (video: Video) => void;
  onToggleFavorite: (videoId: string) => void;
}

export default function VideoCard({ video, onPlay, onToggleFavorite }: VideoCardProps) {
  const [thumbnailUrl, setThumbnailUrl] = useState(video.thumbnailUrl);
  const [duration, setDuration] = useState(video.duration);
  const [isLoadingThumbnail, setIsLoadingThumbnail] = useState(false);

  useEffect(() => {
    // If no thumbnail is provided, generate one from the video
    if (!video.thumbnailUrl && video.videoUrl) {
      setIsLoadingThumbnail(true);
      
      Promise.all([
        generateThumbnailFromUrl(video.videoUrl).catch(() => null),
        getVideoDurationFromUrl(video.videoUrl).catch(() => video.duration)
      ]).then(([thumbnail, videoDuration]) => {
        if (thumbnail) {
          setThumbnailUrl(thumbnail);
        }
        setDuration(videoDuration);
        setIsLoadingThumbnail(false);
      }).catch(() => {
        setIsLoadingThumbnail(false);
      });
    }
  }, [video.videoUrl, video.thumbnailUrl, video.duration]);

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700/50 hover:border-cyan-400/50 transition-all duration-300 group touch-manipulation">
      {/* Thumbnail */}
      <div className="relative aspect-video bg-slate-700/50 overflow-hidden">
        {isLoadingThumbnail ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => {
              // Fallback to a default thumbnail or video icon
              setThumbnailUrl('');
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-700">
            <Play className="w-12 sm:w-16 h-12 sm:h-16 text-slate-500" />
          </div>
        )}
        
        {/* Classification Badge */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
          <span className="bg-emerald-500 text-slate-900 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs font-bold">
            CLASSIFIED
          </span>
        </div>

        {/* Play Button Overlay */}
        <div 
          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
          onClick={() => onPlay(video)}
        >
          <div className="w-12 sm:w-16 h-12 sm:h-16 bg-cyan-500 rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 group-active:scale-100 transition-transform duration-300">
            <Play className="w-6 sm:w-8 h-6 sm:h-8 text-slate-900 ml-0.5 sm:ml-1" fill="currentColor" />
          </div>
        </div>

        {/* Duration */}
        <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 bg-black/70 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs font-medium">
          {duration}
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        <h3 className="text-base sm:text-lg font-semibold text-slate-200 mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
          {video.title}
        </h3>
        
        <p className="text-slate-400 text-sm mb-3 line-clamp-2">
          {video.description}
        </p>

        {/* Metadata */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
          <span className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{video.uploadDate}</span>
          </span>
          <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-slate-700/50 rounded text-xs font-medium text-cyan-400 truncate max-w-[100px] sm:max-w-none">
            {video.category}
          </span>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-4 text-xs text-slate-500">
            <span className="flex items-center space-x-1">
              <Eye className="w-3 h-3" />
              <span>{formatViews(video.views)}</span>
            </span>
            <span className="flex items-center space-x-1">
              <HardDrive className="w-3 h-3" />
              <span>{video.size}</span>
            </span>
          </div>
          
          <button
            onClick={() => onToggleFavorite(video.id)}
            className={`p-1.5 sm:p-1 rounded transition-colors touch-manipulation ${
              video.isFavorite
                ? 'text-red-400 hover:text-red-300'
                : 'text-slate-500 hover:text-red-400'
            }`}
          >
            <Heart className="w-4 h-4" fill={video.isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
    </div>
  );
}