import { Video } from '../types/video';

export const mockVideos: Video[] = [
  {
    id: '1',
    title: 'React Development Tutorial',
    description: 'Learn the fundamentals of React development in this comprehensive tutorial.',
    thumbnailUrl: '', // Will be auto-generated from video
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    uploadDate: 'JAN 15, 2024',
    category: 'PROGRAMMING',
    duration: '15:42',
    size: '245 MB',
    views: 1250,
    isFavorite: false
  },
  {
    id: '2',
    title: 'Advanced CSS Animations',
    description: 'Master complex CSS animations and transforms to create stunning web experiences.',
    thumbnailUrl: '', // Will be auto-generated from video
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    uploadDate: 'JAN 10, 2024',
    category: 'DESIGN',
    duration: '12:33',
    size: '189 MB',
    views: 890,
    isFavorite: true
  },
  {
    id: '3',
    title: 'Python Data Analysis',
    description: 'Comprehensive guide to data analysis using pandas and matplotlib.',
    thumbnailUrl: '', // Will be auto-generated from video
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    uploadDate: 'JAN 8, 2024',
    category: 'PROGRAMMING',
    duration: '22:15',
    size: '356 MB',
    views: 2100,
    isFavorite: false
  },
  {
    id: '4',
    title: 'UI/UX Design Principles',
    description: 'Essential design principles every developer should know.',
    thumbnailUrl: '', // Will be auto-generated from video
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    uploadDate: 'JAN 5, 2024',
    category: 'DESIGN',
    duration: '18:27',
    size: '278 MB',
    views: 1567,
    isFavorite: true
  },
  {
    id: '5',
    title: 'Node.js Backend Development',
    description: 'Build scalable backend applications with Node.js and Express.',
    thumbnailUrl: '', // Will be auto-generated from video
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    uploadDate: 'DEC 28, 2023',
    category: 'PROGRAMMING',
    duration: '25:11',
    size: '402 MB',
    views: 1890,
    isFavorite: false
  },
  {
    id: '6',
    title: 'Photography Composition',
    description: 'Master the art of composition in digital photography.',
    thumbnailUrl: '', // Will be auto-generated from video
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    uploadDate: 'DEC 25, 2023',
    category: 'PHOTOGRAPHY',
    duration: '14:55',
    size: '225 MB',
    views: 956,
    isFavorite: false
  }
];

export const categories = ['ALL ARCHIVES', 'PROGRAMMING', 'DESIGN', 'PHOTOGRAPHY', 'PERSONAL'];