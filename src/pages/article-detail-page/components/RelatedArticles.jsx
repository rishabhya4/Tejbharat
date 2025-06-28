import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const RelatedArticles = ({ articles, currentArticleId }) => {
  const filteredArticles = articles.filter(article => article.id !== currentArticleId);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-surface rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="BookOpen" size={20} className="text-accent" />
        <h3 className="text-lg font-heading font-semibold text-primary">
          Related Articles
        </h3>
      </div>

      <div className="space-y-4">
        {filteredArticles.slice(0, 5).map((article) => (
          <Link
            key={article.id}
            to={`/article-detail-page?id=${article.id}&title=${encodeURIComponent(article.title)}&category=${article.category}`}
            className="block group"
          >
            <article className="flex space-x-3 p-3 rounded-lg hover:bg-background transition-colors duration-200">
              {/* Thumbnail */}
              <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-md">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-primary line-clamp-2 group-hover:text-accent transition-colors duration-200">
                  {article.title}
                </h4>
                
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-xs text-accent font-medium">
                    {article.category}
                  </span>
                  <span className="text-xs text-text-secondary">•</span>
                  <span className="text-xs text-text-secondary">
                    {formatDate(article.publishedAt)}
                  </span>
                </div>

                <div className="flex items-center space-x-3 mt-2 text-xs text-text-secondary">
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} />
                    <span>{article.readingTime} min</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Eye" size={12} />
                    <span>{article.views}</span>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* View More */}
      <div className="mt-6 pt-4 border-t border-border">
        <Link
          to="/category-browse"
          className="flex items-center justify-center space-x-2 text-sm text-accent hover:text-accent/80 font-medium transition-colors duration-200"
        >
          <span>View More Articles</span>
          <Icon name="ArrowRight" size={14} />
        </Link>
      </div>
    </div>
  );
};

export default RelatedArticles;