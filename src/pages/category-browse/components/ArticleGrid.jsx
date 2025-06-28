import React from 'react';
import ArticleCard from './ArticleCard';
import SkeletonCard from './SkeletonCard';
import Icon from '../../../components/AppIcon';


const ArticleGrid = ({ articles, isLoading, onBookmark, onShare }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="FileText" size={24} className="text-text-secondary" />
        </div>
        <h3 className="text-lg font-semibold text-primary mb-2">No Articles Found</h3>
        <p className="text-text-secondary">
          Try adjusting your filters or check back later for new content.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          onBookmark={onBookmark}
          onShare={onShare}
        />
      ))}
    </div>
  );
};

export default ArticleGrid;