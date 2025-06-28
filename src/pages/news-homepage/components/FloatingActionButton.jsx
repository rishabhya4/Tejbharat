import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const FloatingActionButton = ({ bookmarkCount = 0 }) => {
  return (
    <Link
      to="/bookmarks-library"
      className="floating-action w-14 h-14 z-fab"
      aria-label={`View bookmarks (${bookmarkCount} saved)`}
    >
      <div className="relative">
        <Icon name="Bookmark" size={24} />
        {bookmarkCount > 0 && (
          <span className="absolute -top-2 -right-2 w-6 h-6 bg-error text-white text-xs font-bold rounded-full flex items-center justify-center">
            {bookmarkCount > 99 ? '99+' : bookmarkCount}
          </span>
        )}
      </div>
    </Link>
  );
};

export default FloatingActionButton;