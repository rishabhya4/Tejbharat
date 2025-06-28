import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterSidebar = ({ isOpen, onClose, filters, onFiltersChange }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const categories = [
    'Politics', 'Technology', 'Business', 'Sports', 
    'Health', 'Science', 'Entertainment', 'World'
  ];

  const sources = [
    'BBC News', 'CNN', 'Reuters', 'Associated Press',
    'The Guardian', 'New York Times', 'Washington Post', 'NPR'
  ];

  const dateRanges = [
    { label: 'Last 24 hours', value: '24h' },
    { label: 'Last week', value: '7d' },
    { label: 'Last month', value: '30d' },
    { label: 'Last year', value: '365d' },
    { label: 'Custom range', value: 'custom' }
  ];

  const handleFilterChange = (filterType, value, checked = null) => {
    const newFilters = { ...localFilters };
    
    if (filterType === 'categories' || filterType === 'sources') {
      if (checked) {
        newFilters[filterType] = [...(newFilters[filterType] || []), value];
      } else {
        newFilters[filterType] = (newFilters[filterType] || []).filter(item => item !== value);
      }
    } else {
      newFilters[filterType] = value;
    }
    
    setLocalFilters(newFilters);
  };

  const applyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const clearFilters = () => {
    const clearedFilters = {
      categories: [],
      sources: [],
      dateRange: '',
      sortBy: 'relevance'
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (localFilters.categories?.length > 0) count += localFilters.categories.length;
    if (localFilters.sources?.length > 0) count += localFilters.sources.length;
    if (localFilters.dateRange) count += 1;
    return count;
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-40 lg:hidden">
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-background border-l border-border shadow-xl">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="text-lg font-semibold text-primary">Filters</h2>
                <Button
                  variant="ghost"
                  onClick={onClose}
                  className="p-2"
                  aria-label="Close filters"
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>

              {/* Filter Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                <FilterContent
                  categories={categories}
                  sources={sources}
                  dateRanges={dateRanges}
                  localFilters={localFilters}
                  handleFilterChange={handleFilterChange}
                />
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-border space-y-3">
                <Button
                  variant="primary"
                  onClick={applyFilters}
                  className="w-full"
                >
                  Apply Filters {getActiveFilterCount() > 0 && `(${getActiveFilterCount()})`}
                </Button>
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="w-full"
                >
                  Clear All
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 bg-surface border-r border-border">
        <div className="sticky top-32 p-6 space-y-6 max-h-[calc(100vh-8rem)] overflow-y-auto">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-primary">Filters</h2>
            {getActiveFilterCount() > 0 && (
              <Button
                variant="text"
                onClick={clearFilters}
                className="text-sm text-accent hover:text-accent/80"
              >
                Clear All
              </Button>
            )}
          </div>

          <FilterContent
            categories={categories}
            sources={sources}
            dateRanges={dateRanges}
            localFilters={localFilters}
            handleFilterChange={handleFilterChange}
          />
        </div>
      </div>
    </>
  );
};

const FilterContent = ({ categories, sources, dateRanges, localFilters, handleFilterChange }) => {
  return (
    <>
      {/* Sort By */}
      <div className="space-y-3">
        <h3 className="font-medium text-primary">Sort By</h3>
        <div className="space-y-2">
          {[
            { label: 'Relevance', value: 'relevance' },
            { label: 'Newest First', value: 'date-desc' },
            { label: 'Oldest First', value: 'date-asc' }
          ].map((option) => (
            <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
              <Input
                type="checkbox"
                checked={localFilters.sortBy === option.value}
                onChange={(e) => handleFilterChange('sortBy', option.value)}
                className="w-4 h-4"
              />
              <span className="text-sm text-text-primary">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Date Range */}
      <div className="space-y-3">
        <h3 className="font-medium text-primary">Date Range</h3>
        <div className="space-y-2">
          {dateRanges.map((range) => (
            <label key={range.value} className="flex items-center space-x-2 cursor-pointer">
              <Input
                type="checkbox"
                checked={localFilters.dateRange === range.value}
                onChange={(e) => handleFilterChange('dateRange', range.value)}
                className="w-4 h-4"
              />
              <span className="text-sm text-text-primary">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <h3 className="font-medium text-primary">Categories</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {categories.map((category) => (
            <label key={category} className="flex items-center space-x-2 cursor-pointer">
              <Input
                type="checkbox"
                checked={localFilters.categories?.includes(category) || false}
                onChange={(e) => handleFilterChange('categories', category, e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm text-text-primary">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sources */}
      <div className="space-y-3">
        <h3 className="font-medium text-primary">Sources</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {sources.map((source) => (
            <label key={source} className="flex items-center space-x-2 cursor-pointer">
              <Input
                type="checkbox"
                checked={localFilters.sources?.includes(source) || false}
                onChange={(e) => handleFilterChange('sources', source, e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm text-text-primary">{source}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;