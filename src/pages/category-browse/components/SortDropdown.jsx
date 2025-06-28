import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortDropdown = ({ sortBy, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: 'newest', label: 'Newest First', icon: 'Clock' },
    { value: 'popular', label: 'Most Popular', icon: 'TrendingUp' },
    { value: 'trending', label: 'Trending Now', icon: 'Flame' },
    { value: 'oldest', label: 'Oldest First', icon: 'History' }
  ];

  const currentSort = sortOptions.find(option => option.value === sortBy) || sortOptions[0];

  const handleSortSelect = (value) => {
    onSortChange(value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2"
        iconName="ChevronDown"
        iconPosition="right"
        iconSize={16}
      >
        <Icon name={currentSort.icon} size={16} />
        <span className="hidden sm:inline">{currentSort.label}</span>
        <span className="sm:hidden">Sort</span>
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg z-dropdown">
          <div className="py-2">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSortSelect(option.value)}
                className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-surface transition-colors duration-200 ${
                  sortBy === option.value ? 'bg-accent/10 text-accent' : 'text-text-primary'
                }`}
              >
                <Icon 
                  name={option.icon} 
                  size={16} 
                  className={sortBy === option.value ? 'text-accent' : 'text-text-secondary'}
                />
                <span className="text-sm">{option.label}</span>
                {sortBy === option.value && (
                  <Icon name="Check" size={14} className="text-accent ml-auto" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;