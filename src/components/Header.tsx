import React from 'react';
import { Search, Home, Play, Grid3X3, Heart, Upload } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  currentView: string;
  onViewChange: (view: string) => void;
}

export default function Header({ searchQuery, onSearchChange, currentView, onViewChange }: HeaderProps) {
  return (
    <header className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-emerald-400 rounded-lg flex items-center justify-center">
              <Play className="w-6 h-6 text-slate-900" fill="currentColor" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              NEXUS
            </h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="SEARCH ARCHIVE..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg pl-10 pr-4 py-2 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-2">
            <button
              onClick={() => onViewChange('home')}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 ${
                currentView === 'home'
                  ? 'bg-cyan-500 text-slate-900'
                  : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50'
              }`}
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">HOME</span>
            </button>
            <button
              onClick={() => onViewChange('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 ${
                currentView === 'all'
                  ? 'bg-cyan-500 text-slate-900'
                  : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
              <span className="hidden sm:inline">ALL VIDEOS</span>
            </button>
            <button
              onClick={() => onViewChange('favorites')}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 ${
                currentView === 'favorites'
                  ? 'bg-cyan-500 text-slate-900'
                  : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">FAVORITES</span>
            </button>
            <button
              onClick={() => onViewChange('upload')}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 ${
                currentView === 'upload'
                  ? 'bg-emerald-500 text-slate-900'
                  : 'text-slate-300 hover:text-emerald-400 hover:bg-slate-800/50'
              }`}
            >
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">UPLOAD</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}