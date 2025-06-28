import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchResultCard = ({ article, searchQuery }) => {
  const [isBookmarked, setIsBookmarked] = useState(article.isBookmarked || false);

  const highlightSearchTerms = (text, query) => {
    if (!query || !text) return text;
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 text-yellow-900 px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  const handleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.summary,
        url: window.location.origin + `/article-detail-page?id=${article.id}`
      });
    } else {
      navigator.clipboard.writeText(
        window.location.origin + `/article-detail-page?id=${article.id}`
      );
    }
  };

  const getRelevanceScore = () => {
    return Math.floor(Math.random() * 30) + 70; // Mock relevance score 70-100%
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <article className="news-card news-card-hover group">
      <Link
        to={`/article-detail-page?id=${article.id}&title=${encodeURIComponent(article.title)}&category=${encodeURIComponent(article.category)}`}
        className="block p-6 space-y-4"
      >
        {/* Article Image */}
        {article.imageUrl && (
          <div className="relative overflow-hidden rounded-lg h-48 sm:h-40">
            <Image
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            
            {/* Relevance Badge */}
            <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full">
              <div className="flex items-center space-x-1">
                <Icon name="Target" size={12} className="text-accent" />
                <span className="text-xs font-medium text-primary">
                  {getRelevanceScore()}% match
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Article Content */}
        <div className="space-y-3">
          {/* Category and Source */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                {article.category}
              </span>
              <span className="text-text-secondary">•</span>
              <span className="text-text-secondary">{article.source}</span>
            </div>
            <span className="text-text-secondary">{formatTimeAgo(article.publishedAt)}</span>
          </div>

          {/* Title with highlighted search terms */}
          <h2 className="text-lg font-semibold text-primary line-clamp-2 group-hover:text-accent transition-colors duration-200">
            {highlightSearchTerms(article.title, searchQuery)}
          </h2>

          {/* Summary with highlighted search terms */}
          <p className="text-text-secondary line-clamp-3 text-sm leading-relaxed">
            {highlightSearchTerms(article.summary, searchQuery)}
          </p>

          {/* Author and Reading Time */}
          <div className="flex items-center justify-between text-sm text-text-secondary">
            <div className="flex items-center space-x-2">
              {article.author && (
                <>
                  <span>By {article.author}</span>
                  <span>•</span>
                </>
              )}
              <span>{article.readingTime} min read</span>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button
                variant="ghost"
                onClick={handleBookmark}
                className="p-2 hover:bg-surface"
                aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
              >
                <Icon 
                  name={isBookmarked ? "BookmarkCheck" : "Bookmark"} 
                  size={16} 
                  className={isBookmarked ? "text-accent" : "text-text-secondary"} 
                />
              </Button>
              
              <Button
                variant="ghost"
                onClick={handleShare}
                className="p-2 hover:bg-surface"
                aria-label="Share article"
              >
                <Icon name="Share2" size={16} className="text-text-secondary" />
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default SearchResultCard;