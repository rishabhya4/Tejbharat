import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LoadMoreButton = ({ onLoadMore, isLoading, hasMore }) => {
  if (!hasMore) {
    return (
      <div className="text-center py-8">
        <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <Icon name="CheckCircle" size={20} className="text-success" />
        </div>
        <p className="text-text-secondary text-sm">
          You've reached the end of the news feed
        </p>
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
        iconName={isLoading ? undefined : "ChevronDown"}
        iconPosition="right"
        className="px-8"
      >
        {isLoading ? 'Loading more articles...' : 'Load More Articles'}
      </Button>
    </div>
  );
};

export default LoadMoreButton;