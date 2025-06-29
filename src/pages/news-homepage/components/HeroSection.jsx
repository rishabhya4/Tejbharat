import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const HeroSection = ({ featuredArticle }) => {
  if (!featuredArticle) {
    return (
      <div className="relative w-full h-96 bg-neutral-200 rounded-lg overflow-hidden animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-6 left-6 right-6">
          <div className="h-4 bg-white/20 rounded mb-3"></div>
          <div className="h-8 bg-white/20 rounded mb-2"></div>
          <div className="h-4 bg-white/20 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  return (
    <Link 
      to={`/article-detail-page?id=${featuredArticle.id}&title=${encodeURIComponent(featuredArticle.title)}&category=${featuredArticle.category}`}
      className="block relative w-full h-96 rounded-lg overflow-hidden group"
    >
      <div className="absolute inset-0">
        <Image
          src={featuredArticle.image}
          alt={featuredArticle.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      
      <div className="absolute bottom-6 left-6 right-6 text-white">
        <div className="flex items-center space-x-2 mb-3">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent text-white">
            {featuredArticle.category}
          </span>
          <span className="text-sm opacity-80">Featured</span>
        </div>
        
        <h1 className="text-2xl md:text-3xl font-heading font-bold mb-3 line-clamp-2 group-hover:text-red-600 transition-colors duration-200">
          {featuredArticle.title}
        </h1>
        
        <p className="text-base opacity-90 line-clamp-2 mb-4">
          {featuredArticle.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium">{featuredArticle.source}</span>
            <span className="text-sm opacity-70">•</span>
            <span className="text-sm opacity-70">{featuredArticle.publishedAt}</span>
          </div>
          
          <div className="flex items-center space-x-1 text-sm opacity-80 group-hover:opacity-100 transition-opacity duration-200">
            <span>Read more</span>
            <Icon name="ArrowRight" size={16} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HeroSection;
