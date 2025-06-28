import React from 'react';
import SearchResultCard from './SearchResultCard';
import Icon from '../../../components/AppIcon';


const SearchResultsGrid = ({ articles, searchQuery, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index} className="news-card">
            <div className="p-6 space-y-4">
              {/* Image Skeleton */}
              <div className="skeleton skeleton-shimmer h-48 sm:h-40 rounded-lg"></div>
              
              {/* Content Skeleton */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="skeleton h-6 w-20 rounded-full"></div>
                  <div className="skeleton h-4 w-16"></div>
                </div>
                <div className="skeleton h-6 w-full"></div>
                <div className="skeleton h-6 w-3/4"></div>
                <div className="space-y-2">
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-2/3"></div>
                </div>
                <div className="flex justify-between">
                  <div className="skeleton h-4 w-32"></div>
                  <div className="skeleton h-4 w-20"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="Search" size={32} className="text-text-secondary" />
          </div>
          <h3 className="text-xl font-semibold text-primary mb-2">No results found</h3>
          <p className="text-text-secondary mb-6">
            We couldn't find any articles matching your search criteria. Try adjusting your filters or search terms.
          </p>
          
          {/* Search Suggestions */}
          <div className="space-y-4">
            <h4 className="font-medium text-primary">Try searching for:</h4>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                'breaking news',
                'technology',
                'politics',
                'business',
                'sports',
                'health'
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  className="px-3 py-1 bg-surface hover:bg-accent/10 text-text-secondary hover:text-accent rounded-full text-sm transition-colors duration-200"
                  onClick={() => {
                    window.location.href = `/search-results?q=${encodeURIComponent(suggestion)}`;
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {articles.map((article) => (
        <SearchResultCard
          key={article.id}
          article={article}
          searchQuery={searchQuery}
        />
      ))}
    </div>
  );
};

export default SearchResultsGrid;