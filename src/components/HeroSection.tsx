import React from 'react';
import { VideoStats } from '../types/video';

interface HeroSectionProps {
  stats: VideoStats;
}

export default function HeroSection({ stats }: HeroSectionProps) {
  return (
    <div className="bg-gradient-to-br from-cyan-500 via-cyan-400 to-emerald-400 rounded-2xl p-6 sm:p-8 mb-6 sm:mb-8 text-center">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-3 sm:mb-4">
        NEXUS ARCHIVE
      </h1>
      <p className="text-slate-800 text-base sm:text-lg mb-6 sm:mb-8 opacity-90">
        PERSONAL VIDEO DATABASE
      </p>
      
      <div className="flex justify-center space-x-4 sm:space-x-8">
        <div className="bg-emerald-500/20 backdrop-blur-sm rounded-xl p-3 sm:p-4 min-w-[80px] sm:min-w-[100px]">
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">
            {stats.totalVideos}
          </div>
          <div className="text-slate-800 font-medium text-sm sm:text-base">
            FILES
          </div>
        </div>
        <div className="bg-emerald-500/20 backdrop-blur-sm rounded-xl p-3 sm:p-4 min-w-[80px] sm:min-w-[100px]">
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">
            {stats.totalCategories}
          </div>
          <div className="text-slate-800 font-medium text-sm sm:text-base">
            CATEGORIES
          </div>
        </div>
      </div>
    </div>
  );
}