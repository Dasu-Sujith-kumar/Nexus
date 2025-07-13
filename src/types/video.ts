export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  uploadDate: string;
  category: string;
  duration: string;
  size: string;
  views: number;
  isFavorite: boolean;
}

export interface VideoStats {
  totalVideos: number;
  totalCategories: number;
  totalSize: string;
  totalDuration: string;
}