import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import SearchInterface from './SearchInterface';

const HeaderNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const navigationItems = [
    { label: 'Home', path: '/news-homepage', icon: 'Home' },
    { label: 'Categories', path: '/category-browse', icon: 'Grid3X3', hasDropdown: true },
    { label: 'Bookmarks', path: '/bookmarks-library', icon: 'Bookmark' },
    { label: 'Settings', path: '/user-settings', icon: 'Settings' },
  ];

  const categories = [
    { label: 'Politics', path: '/category-browse?category=politics', count: 245 },
    { label: 'Technology', path: '/category-browse?category=technology', count: 189 },
    { label: 'Business', path: '/category-browse?category=business', count: 156 },
    { label: 'Sports', path: '/category-browse?category=sports', count: 134 },
    { label: 'Health', path: '/category-browse?category=health', count: 98 },
    { label: 'Science', path: '/category-browse?category=science', count: 87 },
    { label: 'Entertainment', path: '/category-browse?category=entertainment', count: 76 },
    { label: 'World', path: '/category-browse?category=world', count: 203 },
  ];

  const isActiveRoute = (path) => {
    if (path === '/news-homepage') {
      return location.pathname === '/' || location.pathname === '/news-homepage';
    }
    return location.pathname === path || location.pathname.startsWith(path);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsCategoryDropdownOpen(false);
  };

  const toggleCategoryDropdown = (e) => {
    e.preventDefault();
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsCategoryDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCategoryDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsCategoryDropdownOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-header bg-background border-b border-border safe-area-inset-top">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              to="/news-homepage" 
              className="flex items-center space-x-2 group"
              onClick={closeMobileMenu}
            >
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center group-hover:bg-accent/90 transition-colors duration-200">
                <Icon name="Newspaper" size={20} color="white" />
              </div>
              <span className="text-xl font-heading font-bold text-primary group-hover:text-accent transition-colors duration-200">
                NewsHub
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div key={item.path} className="relative" ref={item.hasDropdown ? dropdownRef : null}>
                {item.hasDropdown ? (
                  <button
                    onClick={toggleCategoryDropdown}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 touch-target ${
                      isActiveRoute(item.path)
                        ? 'text-accent bg-accent/10' :'text-text-secondary hover:text-primary hover:bg-surface'
                    }`}
                    aria-expanded={isCategoryDropdownOpen}
                    aria-haspopup="true"
                  >
                    <Icon name={item.icon} size={16} />
                    <span>{item.label}</span>
                    <Icon 
                      name="ChevronDown" 
                      size={14} 
                      className={`transform transition-transform duration-200 ${
                        isCategoryDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 touch-target ${
                      isActiveRoute(item.path)
                        ? 'text-accent bg-accent/10' :'text-text-secondary hover:text-primary hover:bg-surface'
                    }`}
                    onClick={closeMobileMenu}
                  >
                    <Icon name={item.icon} size={16} />
                    <span>{item.label}</span>
                  </Link>
                )}

                {/* Category Dropdown */}
                {item.hasDropdown && (
                  <div className={`contextual-menu top-full left-0 mt-2 w-80 ${isCategoryDropdownOpen ? 'show' : ''}`}>
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-primary mb-3">Browse Categories</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {categories.map((category) => (
                          <Link
                            key={category.path}
                            to={category.path}
                            className="flex items-center justify-between p-2 rounded-md hover:bg-surface transition-colors duration-200"
                            onClick={() => setIsCategoryDropdownOpen(false)}
                          >
                            <span className="text-sm text-text-primary">{category.label}</span>
                            <span className="text-xs text-text-secondary font-mono">{category.count}</span>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-3 pt-3 border-t border-border">
                        <Link
                          to="/category-browse"
                          className="text-sm text-accent hover:text-accent/80 font-medium"
                          onClick={() => setIsCategoryDropdownOpen(false)}
                        >
                          View All Categories →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Search and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Desktop Search */}
            <div className="hidden md:block">
              <SearchInterface />
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              onClick={toggleMobileMenu}
              className="lg:hidden touch-target"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-overlay bg-background/95 backdrop-blur-sm lg:hidden">
          <div 
            ref={mobileMenuRef}
            className="absolute top-16 left-0 right-0 bg-background border-b border-border shadow-news-lg"
          >
            <div className="px-4 py-6 space-y-6">
              {/* Mobile Search */}
              <div className="md:hidden">
                <SearchInterface />
              </div>

              {/* Mobile Navigation */}
              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <div key={item.path}>
                    {item.hasDropdown ? (
                      <div>
                        <button
                          onClick={toggleCategoryDropdown}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 touch-target ${
                            isActiveRoute(item.path)
                              ? 'text-accent bg-accent/10' :'text-text-secondary hover:text-primary hover:bg-surface'
                          }`}
                          aria-expanded={isCategoryDropdownOpen}
                        >
                          <div className="flex items-center space-x-3">
                            <Icon name={item.icon} size={20} />
                            <span>{item.label}</span>
                          </div>
                          <Icon 
                            name="ChevronDown" 
                            size={16} 
                            className={`transform transition-transform duration-200 ${
                              isCategoryDropdownOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        {/* Mobile Category List */}
                        {isCategoryDropdownOpen && (
                          <div className="mt-2 ml-4 space-y-1">
                            {categories.map((category) => (
                              <Link
                                key={category.path}
                                to={category.path}
                                className="flex items-center justify-between px-4 py-2 rounded-md text-sm text-text-secondary hover:text-primary hover:bg-surface transition-colors duration-200"
                                onClick={closeMobileMenu}
                              >
                                <span>{category.label}</span>
                                <span className="text-xs font-mono">{category.count}</span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        to={item.path}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 touch-target ${
                          isActiveRoute(item.path)
                            ? 'text-accent bg-accent/10' :'text-text-secondary hover:text-primary hover:bg-surface'
                        }`}
                        onClick={closeMobileMenu}
                      >
                        <Icon name={item.icon} size={20} />
                        <span>{item.label}</span>
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              {/* Status Indicator */}
              <div className="flex items-center justify-center pt-4 border-t border-border">
                <div className="status-indicator status-online">
                  <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                  <span>Connected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderNavigation;