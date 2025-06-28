import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterChips = ({ filters, onFilterRemove, onShowFilters, resultCount }) => {
  const getActiveFilters = () => {
    const activeFilters = [];
    
    if (filters.categories?.length > 0) {
      filters.categories.forEach(category => {
        activeFilters.push({
          type: 'category',
          value: category,
          label: category,
          icon: 'Tag'
        });
      });
    }
    
    if (filters.sources?.length > 0) {
      filters.sources.forEach(source => {
        activeFilters.push({
          type: 'source',
          value: source,
          label: source,
          icon: 'Globe'
        });
      });
    }
    
    if (filters.dateRange) {
      const dateLabels = {
        '24h': 'Last 24 hours',
        '7d': 'Last week',
        '30d': 'Last month',
        '365d': 'Last year',
        'custom': 'Custom range'
      };
      activeFilters.push({
        type: 'dateRange',
        value: filters.dateRange,
        label: dateLabels[filters.dateRange] || filters.dateRange,
        icon: 'Calendar'
      });
    }
    
    return activeFilters;
  };

  const activeFilters = getActiveFilters();

  const handleRemoveFilter = (filterType, value) => {
    if (filterType === 'category') {
      onFilterRemove('categories', value);
    } else if (filterType === 'source') {
      onFilterRemove('sources', value);
    } else if (filterType === 'dateRange') {
      onFilterRemove('dateRange', null);
    }
  };

  return (
    <div className="bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Results Count and Filter Button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <p className="text-sm text-text-secondary">
                {resultCount.toLocaleString()} results found
              </p>
              <Button
                variant="outline"
                onClick={onShowFilters}
                className="lg:hidden flex items-center space-x-2"
                iconName="Filter"
                iconPosition="left"
              >
                Filters
                {activeFilters.length > 0 && (
                  <span className="ml-1 bg-accent text-accent-foreground text-xs px-1.5 py-0.5 rounded-full">
                    {activeFilters.length}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Active Filter Chips */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-text-secondary hidden sm:block">Active filters:</span>
              {activeFilters.map((filter, index) => (
                <div
                  key={`${filter.type}-${filter.value}-${index}`}
                  className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-3 py-1.5 rounded-full text-sm border border-accent/20"
                >
                  <Icon name={filter.icon} size={14} />
                  <span className="max-w-32 truncate">{filter.label}</span>
                  <Button
                    variant="ghost"
                    onClick={() => handleRemoveFilter(filter.type, filter.value)}
                    className="p-0 h-auto hover:bg-transparent"
                    aria-label={`Remove ${filter.label} filter`}
                  >
                    <Icon name="X" size={14} className="hover:text-accent/70" />
                  </Button>
                </div>
              ))}
              
              {activeFilters.length > 1 && (
                <Button
                  variant="text"
                  onClick={() => {
                    onFilterRemove('categories', null, true);
                    onFilterRemove('sources', null, true);
                    onFilterRemove('dateRange', null);
                  }}
                  className="text-sm text-text-secondary hover:text-primary ml-2"
                >
                  Clear all
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterChips;