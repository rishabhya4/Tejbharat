import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const ArticleHeader = ({ article, onBookmark, isBookmarked }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <header className="w-full mb-8">
      {/* Hero Image */}
      <div className="w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg mb-6">
        <Image
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Meta */}
      <div className="space-y-4">
        {/* Category Badge */}
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
            {article.category}
          </span>
          <span className="text-sm text-text-secondary">
            {formatDate(article.publishedAt)}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-primary leading-tight">
          {article.title}
        </h1>

        {/* Subtitle/Summary */}
        {article.summary && (
          <p className="text-lg text-text-secondary leading-relaxed">
            {article.summary}
          </p>
        )}

        {/* Author and Source Info */}
        <div className="flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 overflow-hidden rounded-full">
              <Image
                src={article.author.avatar}
                alt={article.author.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-primary">
                {article.author.name}
              </p>
              <p className="text-xs text-text-secondary">
                {article.author.role} at {article.source.name}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Source Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 overflow-hidden rounded">
                <Image
                  src={article.source.logo}
                  alt={article.source.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm text-text-secondary">
                {article.source.name}
              </span>
            </div>

            {/* Bookmark Button */}
            <button
              onClick={onBookmark}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                isBookmarked
                  ? 'bg-accent text-white' :'bg-surface text-text-secondary hover:text-accent hover:bg-accent/10'
              }`}
              aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
            >
              <Icon 
                name={isBookmarked ? 'Bookmark' : 'BookmarkPlus'} 
                size={18} 
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ArticleHeader;