import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import CategoryFilter from './components/CategoryFilter';
import VideoGrid from './components/VideoGrid';
import VideoPlayer from './components/VideoPlayer';
import UploadSection from './components/UploadSection';
import { mockVideos, categories } from './data/mockVideos';
import { Video, VideoStats } from './types/video';

function App() {
  const [videos, setVideos] = useState<Video[]>(mockVideos);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL ARCHIVES');
  const [currentView, setCurrentView] = useState('home');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  // Calculate stats
  const stats: VideoStats = useMemo(() => {
    const totalVideos = videos.length;
    const totalCategories = new Set(videos.map(v => v.category)).size;
    const totalSizeBytes = videos.reduce((acc, video) => {
      const size = parseInt(video.size.replace(/[^\d]/g, ''));
      return acc + size;
    }, 0);
    const totalSize = `${(totalSizeBytes / 1000).toFixed(1)} GB`;
    
    return {
      totalVideos,
      totalCategories,
      totalSize,
      totalDuration: '2h 45m'
    };
  }, [videos]);

  // Filter videos based on search, category, and view
  const filteredVideos = useMemo(() => {
    let filtered = videos;

    // Filter by favorites if in favorites view
    if (currentView === 'favorites') {
      filtered = filtered.filter(video => video.isFavorite);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(video =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (activeCategory !== 'ALL ARCHIVES') {
      filtered = filtered.filter(video => video.category === activeCategory);
    }

    return filtered;
  }, [videos, searchQuery, activeCategory, currentView]);

  const handleToggleFavorite = (videoId: string) => {
    setVideos(prevVideos =>
      prevVideos.map(video =>
        video.id === videoId ? { ...video, isFavorite: !video.isFavorite } : video
      )
    );
  };

  const handlePlayVideo = (video: Video) => {
    setSelectedVideo(video);
    // Increment view count
    setVideos(prevVideos =>
      prevVideos.map(v =>
        v.id === video.id ? { ...v, views: v.views + 1 } : v
      )
    );
  };

  const getViewTitle = () => {
    switch (currentView) {
      case 'favorites':
        return 'FAVORITE VIDEOS';
      case 'all':
        return 'ALL VIDEOS';
      case 'upload':
        return '';
      default:
        return 'RECENT UPLOADS';
    }
  };

  const getViewSubtitle = () => {
    switch (currentView) {
      case 'favorites':
        return `${filteredVideos.length} videos marked as favorites`;
      case 'all':
        return `${filteredVideos.length} videos in archive`;
      default:
        return `${filteredVideos.length} files located`;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {currentView === 'upload' ? (
          <UploadSection onVideoUploaded={(newVideo) => {
            setVideos(prevVideos => [newVideo, ...prevVideos]);
            // Optionally switch to home view to show the new video
            setCurrentView('home');
          }} />
        ) : (
          <>
            {currentView === 'home' && <HeroSection stats={stats} />}
            
            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />

            <VideoGrid
              videos={filteredVideos}
              onPlay={handlePlayVideo}
              onToggleFavorite={handleToggleFavorite}
              title={getViewTitle()}
              subtitle={getViewSubtitle()}
            />
          </>
        )}
      </main>

      <VideoPlayer
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
}

export default App;