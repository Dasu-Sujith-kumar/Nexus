import React, { useState } from 'react';
import { Upload, Cloud, FileVideo, AlertCircle } from 'lucide-react';
import { extractVideoMetadata } from '../utils/videoUtils';
import { Video } from '../types/video';

interface UploadSectionProps {
  onVideoUploaded?: (video: Video) => void;
}

export default function UploadSection({ onVideoUploaded }: UploadSectionProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFiles(Array.from(files));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFiles(Array.from(files));
    }
  };

  const handleFiles = async (files: File[]) => {
    setUploading(true);
    
    for (const file of files) {
      if (!file.type.startsWith('video/')) {
        console.warn(`Skipping non-video file: ${file.name}`);
        continue;
      }

      try {
        setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));
        
        // Extract video metadata (thumbnail, duration, size)
        const metadata = await extractVideoMetadata(file);
        
        // Simulate upload progress
        for (let progress = 0; progress <= 100; progress += 10) {
          setUploadProgress(prev => ({ ...prev, [file.name]: progress }));
          await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        // Create video object
        const newVideo: Video = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          title: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
          description: `Uploaded video: ${file.name}`,
          thumbnailUrl: metadata.thumbnailUrl,
          videoUrl: URL.createObjectURL(file), // In real implementation, this would be S3 URL
          uploadDate: new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          }).toUpperCase(),
          category: 'PERSONAL',
          duration: metadata.duration,
          size: metadata.size,
          views: 0,
          isFavorite: false
        };

        // Call the callback to add video to the main list
        if (onVideoUploaded) {
          onVideoUploaded(newVideo);
        }

        // Remove from progress tracking
        setUploadProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress[file.name];
          return newProgress;
        });
        
      } catch (error) {
        console.error(`Error processing ${file.name}:`, error);
        setUploadProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress[file.name];
          return newProgress;
        });
      }
    }
    
    setUploading(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="border-l-4 border-emerald-500 pl-3 sm:pl-4 mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-200 mb-1">UPLOAD VIDEOS</h2>
        <p className="text-slate-400 text-sm sm:text-base">Add new videos to your personal archive</p>
      </div>

      {/* AWS S3 Integration Notice */}
      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 sm:w-6 h-5 sm:h-6 text-cyan-400 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-cyan-400 font-semibold mb-2 text-sm sm:text-base">AWS S3 Integration Required</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">
              This is a frontend-only application. To enable video uploads, you'll need to:
            </p>
            <ul className="text-slate-300 text-sm space-y-1 list-disc list-inside">
              <li>Configure AWS S3 bucket with proper CORS settings</li>
              <li>Set up AWS Lambda functions for video processing</li>
              <li>Implement authentication (AWS Cognito or similar)</li>
              <li>Add presigned URL generation for secure uploads</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
          dragActive
            ? 'border-cyan-400 bg-cyan-500/10'
            : 'border-slate-600 hover:border-slate-500'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="w-16 sm:w-24 h-16 sm:h-24 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
          <Upload className="w-8 sm:w-12 h-8 sm:h-12 text-slate-400" />
        </div>
        
        <h3 className="text-lg sm:text-xl font-semibold text-slate-200 mb-2">
          Drop your videos here
        </h3>
        <p className="text-slate-400 mb-4 sm:mb-6 text-sm sm:text-base">
          Or click to select files from your computer
        </p>

        <label className="bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-900 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all cursor-pointer inline-block text-sm sm:text-base touch-manipulation">
          Select Files
          <input
            type="file"
            multiple
            accept="video/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </label>

        <div className="mt-4 sm:mt-6 flex items-center justify-center space-x-4 sm:space-x-6 text-xs sm:text-sm text-slate-500">
          <span className="flex items-center space-x-2">
            <FileVideo className="w-4 h-4" />
            <span>MP4, WebM, AVI</span>
          </span>
          <span className="flex items-center space-x-2">
            <Cloud className="w-4 h-4" />
            <span>Max 500MB</span>
          </span>
        </div>
      </div>

      {/* Upload Progress */}
      {Object.keys(uploadProgress).length > 0 && (
        <div className="mt-6 sm:mt-8 bg-slate-800/30 rounded-lg p-4 sm:p-6">
          <h4 className="text-base sm:text-lg font-semibold text-slate-200 mb-4">Upload Progress</h4>
          <div className="space-y-3">
            {Object.entries(uploadProgress).map(([fileName, progress]) => (
              <div key={fileName}>
                <div className="flex justify-between text-sm text-slate-300 mb-1">
                  <span className="truncate">{fileName}</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Instructions */}
      <div className="mt-6 sm:mt-8 bg-slate-800/30 rounded-lg p-4 sm:p-6">
        <h4 className="text-base sm:text-lg font-semibold text-slate-200 mb-4">Upload Guidelines</h4>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <h5 className="text-cyan-400 font-medium mb-2">Supported Formats</h5>
            <ul className="text-slate-400 space-y-1">
              <li>• MP4 (recommended)</li>
              <li>• WebM</li>
              <li>• AVI</li>
              <li>• MOV</li>
            </ul>
          </div>
          <div>
            <h5 className="text-emerald-400 font-medium mb-2">Best Practices</h5>
            <ul className="text-slate-400 space-y-1">
              <li>• Use descriptive filenames</li>
              <li>• Keep videos under 500MB</li>
              <li>• Add proper categories</li>
              <li>• Include detailed descriptions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}