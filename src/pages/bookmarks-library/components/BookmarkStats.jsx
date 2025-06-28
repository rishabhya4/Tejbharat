import React from 'react';
import Icon from '../../../components/AppIcon';

const BookmarkStats = ({ stats }) => {
  const statItems = [
    {
      label: 'Total Bookmarks',
      value: stats.total,
      icon: 'Bookmark',
      color: 'text-accent'
    },
    {
      label: 'Unread Articles',
      value: stats.unread,
      icon: 'EyeOff',
      color: 'text-warning'
    },
    {
      label: 'Read Articles',
      value: stats.read,
      icon: 'Eye',
      color: 'text-success'
    },
    {
      label: 'Offline Available',
      value: stats.offline,
      icon: 'Download',
      color: 'text-info'
    }
  ];

  const readingProgress = stats.total > 0 ? Math.round((stats.read / stats.total) * 100) : 0;

  return (
    <div className="bg-surface border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-primary">Your Reading Library</h2>
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="TrendingUp" size={16} />
          <span>{readingProgress}% completed</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-neutral-200 rounded-full h-2 mb-6">
        <div 
          className="bg-success h-2 rounded-full transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        ></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statItems.map((item, index) => (
          <div key={index} className="text-center">
            <div className={`w-12 h-12 mx-auto mb-2 bg-background rounded-lg flex items-center justify-center ${item.color}`}>
              <Icon name={item.icon} size={24} />
            </div>
            <div className="text-2xl font-bold text-primary mb-1">
              {item.value.toLocaleString()}
            </div>
            <div className="text-sm text-text-secondary">
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Insights */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-sm text-text-secondary mb-1">This Week</div>
            <div className="text-lg font-semibold text-primary">
              +{stats.thisWeek} bookmarks
            </div>
          </div>
          <div>
            <div className="text-sm text-text-secondary mb-1">Avg. Reading Time</div>
            <div className="text-lg font-semibold text-primary">
              {stats.avgReadingTime} min
            </div>
          </div>
          <div>
            <div className="text-sm text-text-secondary mb-1">Most Active Day</div>
            <div className="text-lg font-semibold text-primary">
              {stats.mostActiveDay}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookmarkStats;