import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';

import Button from '../../../components/ui/Button';

const ArticleCard = ({ article, onBookmark, onShare }) => {
  const handleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onBookmark(article.id);
  };

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onShare(article);
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const published = new Date(date);
    const diffInHours = Math.floor((now - published) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return published.toLocaleDateString();
  };

  return (
    <article className="news-card news-card-hover group">
      <Link
        to={`/article-detail-page?id=${article.id}&title=${encodeURIComponent(article.title)}&category=${article.category}`}
        className="block"
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <Image
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-background/90 text-primary backdrop-blur-sm">
              {article.category}
            </span>
          </div>
          <div className="absolute top-3 right-3 flex space-x-1">
            <Button
              variant="ghost"
              onClick={handleBookmark}
              className="w-8 h-8 bg-background/90 backdrop-blur-sm hover:bg-background touch-target"
              iconName={article.isBookmarked ? "BookmarkCheck" : "Bookmark"}
              iconSize={14}
            />
            <Button
              variant="ghost"
              onClick={handleShare}
              className="w-8 h-8 bg-background/90 backdrop-blur-sm hover:bg-background touch-target"
              iconName="Share2"
              iconSize={14}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Meta */}
          <div className="flex items-center space-x-2 text-xs text-text-secondary mb-2">
            <span>{article.source}</span>
            <span>•</span>
            <span>{getTimeAgo(article.publishedAt)}</span>
            <span>•</span>
            <span>{article.readTime} min read</span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-primary mb-2 line-clamp-2 group-hover:text-accent transition-colors duration-200">
            {article.title}
          </h3>

          {/* Summary */}
          <p className="text-text-secondary text-sm line-clamp-3 mb-4">
            {article.summary}
          </p>

          {/* Author */}
          <div className="flex items-center space-x-2">
            <Image
              src={article.author.avatar}
              alt={article.author.name}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-xs text-text-secondary">
              {article.author.name}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ArticleCard;