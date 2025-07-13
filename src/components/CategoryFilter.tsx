import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
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