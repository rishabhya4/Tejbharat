import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="news-card animate-pulse">
      {/* Image skeleton */}
      <div className="h-48 bg-neutral-200 rounded-t-lg"></div>
      
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Meta skeleton */}
        <div className="flex items-center space-x-2">
          <div className="h-3 bg-neutral-200 rounded w-16"></div>
          <div className="h-3 bg-neutral-200 rounded w-1"></div>
          <div className="h-3 bg-neutral-200 rounded w-12"></div>
          <div className="h-3 bg-neutral-200 rounded w-1"></div>
          <div className="h-3 bg-neutral-200 rounded w-20"></div>
        </div>
        
        {/* Title skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-neutral-200 rounded w-full"></div>
          <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
        </div>
        
        {/* Summary skeleton */}
        <div className="space-y-2">
          <div className="h-3 bg-neutral-200 rounded w-full"></div>
          <div className="h-3 bg-neutral-200 rounded w-full"></div>
          <div className="h-3 bg-neutral-200 rounded w-2/3"></div>
        </div>
        
        {/* Author skeleton */}
        <div className="flex items-center space-x-2 pt-2">
          <div className="w-6 h-6 bg-neutral-200 rounded-full"></div>
          <div className="h-3 bg-neutral-200 rounded w-20"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;