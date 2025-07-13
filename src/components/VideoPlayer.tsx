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
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full max-h-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-200 mb-1">{video.title}</h2>
            <p className="text-slate-400">{video.description}</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onToggleFavorite(video.id)}
              className={`p-2 rounded-lg transition-colors ${
                video.isFavorite
                  ? 'text-red-400 hover:text-red-300'
                  : 'text-slate-500 hover:text-red-400'
              }`}
            >
              <Heart className="w-5 h-5" fill={video.isFavorite ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 text-slate-400 hover:text-cyan-400 rounded-lg transition-colors"
            >
              <Share className="w-5 h-5" />
            </button>
            <a
              href={video.videoUrl}
              download
              className="p-2 text-slate-400 hover:text-emerald-400 rounded-lg transition-colors"
            >
              <Download className="w-5 h-5" />
            </a>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-red-400 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
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
            className="w-full h-auto max-h-[70vh]"
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                onClose();
              }
            }}
          />
        </div>

        {/* Metadata */}
        <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
          <div className="flex items-center space-x-6">
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