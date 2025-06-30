import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const ArticleCard = ({ article, onBookmarkToggle }) => {
  const [isBookmarked, setIsBookmarked] = useState(article?.isBookmarked || false);
  const [isBookmarkLoading, setIsBookmarkLoading] = useState(false);

  // Extra strong popup shadow, no border, no image
  const cardBaseClass = 'shadow-[0_12px_48px_0_rgba(0,0,0,0.55)] rounded-lg transition-transform duration-300';

  const handleBookmarkClick = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isBookmarkLoading) return;
    setIsBookmarkLoading(true);
    try {
      const newBookmarkState = !isBookmarked;
      setIsBookmarked(newBookmarkState);
      if (onBookmarkToggle) {
        await onBookmarkToggle(article?.id, newBookmarkState);
      }
    } catch (error) {
      setIsBookmarked(isBookmarked);
      console.error('Bookmark toggle failed:', error);
    } finally {
      setIsBookmarkLoading(false);
    }
  }, [isBookmarked, isBookmarkLoading, onBookmarkToggle, article?.id]);

  const handleShare = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const shareData = {
        title: article?.title,
        text: article?.excerpt,
        url: `${window.location.origin}/article-detail-page?id=${article?.id}&title=${encodeURIComponent(article?.title || '')}&category=${article?.category || ''}`
      };
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        const url = shareData.url;
        await navigator.clipboard.writeText(url);
        const shareButton = e.currentTarget;
        const originalText = shareButton.getAttribute('aria-label');
        shareButton.setAttribute('aria-label', 'Link copied!');
        setTimeout(() => {
          shareButton.setAttribute('aria-label', originalText);
        }, 2000);
      }
    } catch (error) {
      console.error('Share failed:', error);
    }
  }, [article]);

  if (!article) {
    return null;
  }

  return (
    <article className={`news-card group ${cardBaseClass}`}>
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
              disabled={isBookmarkLoading}
              className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200 touch-target disabled:opacity-50"
              aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
            >
              {isBookmarkLoading ? (
                <Icon name="Loader2" size={16} className="animate-spin text-text-secondary" />
              ) : (
                <Icon 
                  name="Bookmark" 
                  size={16} 
                  className={isBookmarked ? 'text-accent fill-current' : 'text-text-secondary'} 
                />
              )}
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
        <div className="p-6">
          {/* Article Title */}
          <h3 className="text-lg font-article font-normal text-black group-hover:text-red-600 transition-colors duration-200 mb-2">
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
