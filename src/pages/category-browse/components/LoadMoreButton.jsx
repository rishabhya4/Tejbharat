import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LoadMoreButton = ({ onLoadMore, isLoading, hasMore }) => {
  if (!hasMore) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center space-x-2 text-text-secondary">
          <Icon name="CheckCircle" size={20} />
          <span>You've reached the end of this category</span>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-8">
      <Button
        variant="outline"
        onClick={onLoadMore}
        disabled={isLoading}
        loading={isLoading}
        iconName={isLoading ? undefined : "ArrowDown"}
        iconPosition="right"
        className="min-w-32"
      >
        {isLoading ? 'Loading...' : 'Load More Articles'}
      </Button>
    </div>
  );
};

export default LoadMoreButton;