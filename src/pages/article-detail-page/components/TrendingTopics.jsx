import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const TrendingTopics = () => {
  const trendingTopics = [
    { id: 1, name: "Climate Summit 2024", count: 156, trend: "up" },
    { id: 2, name: "AI Breakthrough", count: 134, trend: "up" },
    { id: 3, name: "Economic Policy", count: 98, trend: "down" },
    { id: 4, name: "Space Exploration", count: 87, trend: "up" },
    { id: 5, name: "Renewable Energy", count: 76, trend: "up" },
    { id: 6, name: "Cybersecurity", count: 65, trend: "down" },
    { id: 7, name: "Healthcare Innovation", count: 54, trend: "up" },
    { id: 8, name: "Education Reform", count: 43, trend: "up" }
  ];

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 'TrendingUp' : 'TrendingDown';
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'text-success' : 'text-error';
  };

  return (
    <div className="bg-surface rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="TrendingUp" size={20} className="text-accent" />
        <h3 className="text-lg font-heading font-semibold text-primary">
          Trending Topics
        </h3>
      </div>

      <div className="space-y-3">
        {trendingTopics.map((topic, index) => (
          <Link
            key={topic.id}
            to={`/search-results?q=${encodeURIComponent(topic.name)}`}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-background transition-colors duration-200 group"
          >
            <div className="flex items-center space-x-3">
              <span className="text-sm font-mono text-text-secondary w-6">
                #{index + 1}
              </span>
              <span className="text-sm font-medium text-primary group-hover:text-accent transition-colors duration-200">
                {topic.name}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs text-text-secondary">
                {topic.count}
              </span>
              <Icon 
                name={getTrendIcon(topic.trend)} 
                size={14} 
                className={getTrendColor(topic.trend)}
              />
            </div>
          </Link>
        ))}
      </div>

      {/* View All Trends */}
      <div className="mt-6 pt-4 border-t border-border">
        <Link
          to="/search-results"
          className="flex items-center justify-center space-x-2 text-sm text-accent hover:text-accent/80 font-medium transition-colors duration-200"
        >
          <span>View All Trends</span>
          <Icon name="ArrowRight" size={14} />
        </Link>
      </div>
    </div>
  );
};

export default TrendingTopics;