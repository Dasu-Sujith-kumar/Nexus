import React from 'react';
import { VideoStats } from '../types/video';

interface HeroSectionProps {
  stats: VideoStats;
}

export default function HeroSection({ stats }: HeroSectionProps) {
  return (
    <div className="bg-gradient-to-br from-cyan-500 via-cyan-400 to-emerald-400 rounded-2xl p-8 mb-8 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
        NEXUS ARCHIVE
      </h1>
      <p className="text-slate-800 text-lg mb-8 opacity-90">
        PERSONAL VIDEO DATABASE
      </p>
      
      <div className="flex justify-center space-x-8">
        <div className="bg-emerald-500/20 backdrop-blur-sm rounded-xl p-4 min-w-[100px]">
          <div className="text-3xl font-bold text-slate-900 mb-1">
            {stats.totalVideos}
          </div>
          <div className="text-slate-800 font-medium">
            FILES
          </div>
        </div>
        <div className="bg-emerald-500/20 backdrop-blur-sm rounded-xl p-4 min-w-[100px]">
          <div className="text-3xl font-bold text-slate-900 mb-1">
            {stats.totalCategories}
          </div>
          <div className="text-slate-800 font-medium">
            CATEGORIES
          </div>
        </div>
      </div>
    </div>
  );
}