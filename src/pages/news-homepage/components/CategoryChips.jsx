import React, { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const CategoryChips = () => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainerRef = useRef(null);
  const location = useLocation();

  const categories = [
    { name: 'All', path: '/news-homepage', icon: 'Home' },
    { name: 'National', path: '/category-browse?category=national', icon: 'Globe' },
    { name: 'International', path: '/category-browse?category=international', icon: 'Globe' },
    { name: 'Finance', path: '/category-browse?category=finance', icon: 'TrendingUp' },
    { name: 'Aviation', path: '/category-browse?category=aviation', icon: 'Smartphone' },
    { name: 'Technology', path: '/category-browse?category=technology', icon: 'Smartphone' },
    { name: 'Mumbai', path: '/category-browse?category=mumbai', icon: 'Globe' },
    { name: 'Fact Check', path: '/category-browse?category=fact-check', icon: 'Atom' },
    { name: 'Videos', path: '/category-browse?category=videos', icon: 'Film' },
    { name: 'Contact', path: '/category-browse?category=contact', icon: 'Users' },
  ];

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const isActiveCategory = (path) => {
    if (path === '/news-homepage') {
      return location.pathname === '/' || location.pathname === '/news-homepage';
    }
    return location.pathname + location.search === path;
  };

  useEffect(() => {
    checkScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      window.addEventListener('resize', checkScrollButtons);
      return () => {
        container.removeEventListener('scroll', checkScrollButtons);
        window.removeEventListener('resize', checkScrollButtons);
      };
    }
  }, []);

  return (
    <div className="relative mb-8">
      <div className="flex items-center">
        {/* Left Scroll Button */}
        <button
          onClick={scrollLeft}
          className={`hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-background border border-border mr-2 transition-opacity duration-200 ${
            canScrollLeft ? 'opacity-100 hover:bg-surface' : 'opacity-0 pointer-events-none'
          }`}
          aria-label="Scroll categories left"
        >
          <Icon name="ChevronLeft" size={16} className="text-text-secondary" />
        </button>

        {/* Categories Container - Fixed for mobile */}
        <div
          ref={scrollContainerRef}
          className="flex space-x-2 sm:space-x-3 overflow-x-auto scrollbar-hide scroll-smooth flex-1 py-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((category) => {
            const isActive = isActiveCategory(category.path);
            return (
              <Link
                key={category.name}
                to={category.path}
                className={`group flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 touch-target flex-shrink-0 
                  ${isActive
                    ? 'bg-red-700 text-white border border-black'
                    : 'bg-white text-red-700 border border-black hover:bg-red-50 hover:text-red-800'}
                `}
              >
                <Icon 
                  name={category.icon} 
                  size={14} 
                  className={isActive ? 'text-white' : 'text-red-700 group-hover:text-red-800'} 
                />
                <span className="text-xs sm:text-sm">{category.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={scrollRight}
          className={`hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-background border border-border ml-2 transition-opacity duration-200 ${
            canScrollRight ? 'opacity-100 hover:bg-surface' : 'opacity-0 pointer-events-none'
          }`}
          aria-label="Scroll categories right"
        >
          <Icon name="ChevronRight" size={16} className="text-text-secondary" />
        </button>
      </div>
    </div>
  );
};

export default CategoryChips;
