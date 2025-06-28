import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const ArticleCard = ({ article, onBookmarkToggle }) => {
  const [isBookmarked, setIsBookmarked] = useState(article.isBookmarked || false);

  const handleBookmarkClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newBookmarkState = !isBookmarked;
    setIsBookmarked(newBookmarkState);
    if (onBookmarkToggle) {
      onBookmarkToggle(article.id, newBookmarkState);
    }
  };

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.origin + `/article-detail-page?id=${article.id}&title=${encodeURIComponent(article.title)}&category=${article.category}`
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      const url = window.location.origin + `/article-detail-page?id=${article.id}&title=${encodeURIComponent(article.title)}&category=${article.category}`;
      navigator.clipboard.writeText(url).then(() => {
        // Could show a toast notification here
        console.log('Article URL copied to clipboard');
      });
    }
  };

  return (
    <article className="news-card news-card-hover group">
      <Link 
        to={`/article-detail-page?id=${article.id}&title=${encodeURIComponent(article.title)}&category=${article.category}`}
        className="block"
      >
        {/* Article Image */}
        <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
          <Image
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent text-white">
              {article.category}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex space-x-2">
            <button
              onClick={handleBookmarkClick}
              className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200 touch-target"
              aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
            >
              <Icon 
                name={isBookmarked ? 'Bookmark' : 'Bookmark'} 
                size={16} 
                className={isBookmarked ? 'text-accent fill-current' : 'text-text-secondary'} 
              />
            </button>
            
            <button
              onClick={handleShare}
              className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200 touch-target"
              aria-label="Share article"
            >
              <Icon name="Share2" size={16} className="text-text-secondary" />
            </button>
          </div>
        </div>

        {/* Article Content */}
        <div className="p-4">
          {/* Article Title */}
          <h3 className="text-lg font-heading font-semibold text-primary mb-2 line-clamp-2 group-hover:text-accent transition-colors duration-200">
            {article.title}
          </h3>

          {/* Article Excerpt */}
          <p className="text-sm text-text-secondary mb-3 line-clamp-3">
            {article.excerpt}
          </p>

          {/* Article Meta */}
          <div className="flex items-center justify-between text-xs text-text-secondary">
            <div className="flex items-center space-x-2">
              <span className="font-medium">{article.source}</span>
              <span>•</span>
              <span>{article.publishedAt}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={12} />
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ArticleCard;