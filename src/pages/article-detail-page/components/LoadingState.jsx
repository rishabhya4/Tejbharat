import React from 'react';

const LoadingState = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <div className="w-full mb-8">
        {/* Hero Image Skeleton */}
        <div className="w-full h-64 md:h-80 lg:h-96 bg-neutral-200 rounded-lg mb-6 skeleton"></div>

        {/* Meta Skeleton */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-16 h-6 bg-neutral-200 rounded-full skeleton"></div>
            <div className="w-24 h-4 bg-neutral-200 rounded skeleton"></div>
          </div>

          {/* Title Skeleton */}
          <div className="space-y-2">
            <div className="w-full h-8 bg-neutral-200 rounded skeleton"></div>
            <div className="w-3/4 h-8 bg-neutral-200 rounded skeleton"></div>
          </div>

          {/* Summary Skeleton */}
          <div className="space-y-2">
            <div className="w-full h-4 bg-neutral-200 rounded skeleton"></div>
            <div className="w-5/6 h-4 bg-neutral-200 rounded skeleton"></div>
          </div>

          {/* Author Info Skeleton */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-neutral-200 rounded-full skeleton"></div>
              <div className="space-y-1">
                <div className="w-24 h-4 bg-neutral-200 rounded skeleton"></div>
                <div className="w-32 h-3 bg-neutral-200 rounded skeleton"></div>
              </div>
            </div>
            <div className="w-8 h-8 bg-neutral-200 rounded-lg skeleton"></div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Reading Controls Skeleton */}
          <div className="flex items-center justify-between mb-8 p-4 bg-surface rounded-lg">
            <div className="w-20 h-4 bg-neutral-200 rounded skeleton"></div>
            <div className="flex space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-6 bg-neutral-200 rounded skeleton"></div>
              ))}
            </div>
          </div>

          {/* Article Content Skeleton */}
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="space-y-2">
                <div className="w-full h-4 bg-neutral-200 rounded skeleton"></div>
                <div className="w-full h-4 bg-neutral-200 rounded skeleton"></div>
                <div className="w-3/4 h-4 bg-neutral-200 rounded skeleton"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Skeleton */}
        <div className="space-y-6">
          {/* Related Articles Skeleton */}
          <div className="bg-surface rounded-lg p-6">
            <div className="w-32 h-6 bg-neutral-200 rounded skeleton mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex space-x-3">
                  <div className="w-16 h-16 bg-neutral-200 rounded-md skeleton"></div>
                  <div className="flex-1 space-y-2">
                    <div className="w-full h-4 bg-neutral-200 rounded skeleton"></div>
                    <div className="w-2/3 h-4 bg-neutral-200 rounded skeleton"></div>
                    <div className="w-1/2 h-3 bg-neutral-200 rounded skeleton"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Topics Skeleton */}
          <div className="bg-surface rounded-lg p-6">
            <div className="w-32 h-6 bg-neutral-200 rounded skeleton mb-6"></div>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-4 bg-neutral-200 rounded skeleton"></div>
                    <div className="w-24 h-4 bg-neutral-200 rounded skeleton"></div>
                  </div>
                  <div className="w-8 h-4 bg-neutral-200 rounded skeleton"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;