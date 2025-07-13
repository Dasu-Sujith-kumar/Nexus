import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6 overflow-x-auto pb-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap text-sm sm:text-base ${
            activeCategory === category
              ? 'bg-cyan-500 text-slate-900'
              : 'bg-slate-800/50 text-slate-300 hover:text-cyan-400 hover:bg-slate-700/50 border border-slate-600/50'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}