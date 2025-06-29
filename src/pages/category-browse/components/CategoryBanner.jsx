import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CategoryBanner = ({ featuredArticle, category }) => {
  const handleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Article bookmarked:', featuredArticle.id);
  };

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Article shared:', featuredArticle.id);
  };

  const getCategoryColor = (categoryName) => {
    const colors = {
      politics: 'bg-red-500',
      technology: 'bg-blue-500',
      business: 'bg-green-500',
      sports: 'bg-orange-500',
      health: 'bg-purple-500',
      science: 'bg-indigo-500',
      entertainment: 'bg-pink-500',
      world: 'bg-teal-500'
    };
    return colors[categoryName?.toLowerCase()] || 'bg-accent';
  };

  return (
    <div className="relative bg-surface rounded-xl overflow-hidden shadow-lg mb-8 group">
      <div className="grid lg:grid-cols-2 gap-0">
        {/* Image Section */}
        <div className="relative h-64 lg:h-80 overflow-hidden">
          <Image
            src={featuredArticle.image}
            alt={featuredArticle.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden"></div>

          {/* Mobile overlay content */}
          <div className="absolute bottom-4 left-4 right-4 lg:hidden">
            <div className="flex items-center space-x-2 mb-2">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${getCategoryColor(category)}`}>
                {category}
              </span>
              <span className="text-white/80 text-xs">
                {featuredArticle.readTime} min read
              </span>
            </div>
            <h2 className="text-black text-lg font-bold leading-tight mb-2 transition-colors group-hover:text-red-600">
              {featuredArticle.title}
            </h2>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 lg:p-8 flex flex-col justify-center">
          {/* Meta info */}
          <div className="hidden lg:flex items-center space-x-3 mb-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white ${getCategoryColor(category)}`}>
              <Icon name="Tag" size={14} className="mr-1" />
              {category}
            </span>
            <span className="text-text-secondary text-sm">
              {featuredArticle.readTime} min read
            </span>
            <span className="text-text-secondary text-sm">
              {new Date(featuredArticle.publishedAt).toLocaleDateString()}
            </span>
          </div>

          {/* Desktop title */}
          <h2 className="hidden lg:block text-2xl xl:text-3xl font-bold text-black mb-4 leading-tight transition-colors group-hover:text-red-600">
            {featuredArticle.title}
          </h2>

          {/* Summary */}
          <p className="text-text-secondary text-base leading-relaxed mb-6 line-clamp-3">
            {featuredArticle.summary}
          </p>

          {/* Author + buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image
                src={featuredArticle.author.avatar}
                alt={featuredArticle.author.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium text-primary">
                  {featuredArticle.author.name}
                </p>
                <p className="text-xs text-text-secondary">
                  {featuredArticle.source}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                onClick={handleBookmark}
                className="touch-target"
                iconName="Bookmark"
                iconSize={16}
              />
              <Button
                variant="ghost"
                onClick={handleShare}
                className="touch-target"
                iconName="Share2"
                iconSize={16}
              />
              <Link
                to={`/article-detail-page?id=${featuredArticle.id}&title=${encodeURIComponent(featuredArticle.title)}&category=${category}`}
              >
                <Button variant="primary" iconName="ArrowRight" iconPosition="right">
                  Read More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryBanner;
