import React, { useRef, useEffect } from 'react';
import { X, Download, Share, Heart } from 'lucide-react';
import { Video } from '../types/video';

interface VideoPlayerProps {
  video: Video | null;
  onClose: () => void;
  onToggleFavorite: (videoId: string) => void;
}

export default function VideoPlayer({ video, onClose, onToggleFavorite }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (video && videoRef.current) {
      videoRef.current.focus();
    }
  }, [video]);

  if (!video) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: video.title,
        text: video.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="max-w-6xl w-full max-h-full overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between mb-2 sm:mb-4 gap-4">
          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-slate-200 mb-1 line-clamp-2">{video.title}</h2>
            <p className="text-slate-400 text-sm sm:text-base line-clamp-2 sm:line-clamp-none">{video.description}</p>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            <button
              onClick={() => onToggleFavorite(video.id)}
              className={`p-1.5 sm:p-2 rounded-lg transition-colors touch-manipulation ${
                video.isFavorite
                  ? 'text-red-400 hover:text-red-300'
                  : 'text-slate-500 hover:text-red-400'
              }`}
            >
              <Heart className="w-4 sm:w-5 h-4 sm:h-5" fill={video.isFavorite ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={handleShare}
              className="p-1.5 sm:p-2 text-slate-400 hover:text-cyan-400 rounded-lg transition-colors touch-manipulation"
            >
              <Share className="w-4 sm:w-5 h-4 sm:h-5" />
            </button>
            <a
              href={video.videoUrl}
              download
              className="p-1.5 sm:p-2 text-slate-400 hover:text-emerald-400 rounded-lg transition-colors touch-manipulation"
            >
              <Download className="w-4 sm:w-5 h-4 sm:h-5" />
            </a>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 text-slate-400 hover:text-red-400 rounded-lg transition-colors touch-manipulation"
            >
              <X className="w-4 sm:w-5 h-4 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Video */}
        <div className="relative bg-black rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            src={video.videoUrl}
            controls
            autoPlay
            className="w-full h-auto max-h-[60vh] sm:max-h-[70vh]"
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                onClose();
              }
            }}
          />
        </div>

        {/* Metadata */}
        <div className="mt-2 sm:mt-4 flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm text-slate-400 gap-2 sm:gap-0">
          <div className="flex items-center space-x-3 sm:space-x-6 flex-wrap">
            <span>Uploaded: {video.uploadDate}</span>
            <span>Category: {video.category}</span>
            <span>Duration: {video.duration}</span>
            <span>Size: {video.size}</span>
          </div>
          <span>{video.views} views</span>
        </div>
      </div>
    </div>
  );
}