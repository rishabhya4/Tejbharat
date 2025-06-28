import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const NotificationSettings = ({ settings, onSettingsChange }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const notificationTypes = [
    {
      id: 'breakingNews',
      name: 'Breaking News',
      description: 'Urgent news alerts',
      icon: 'AlertTriangle'
    },
    {
      id: 'dailyDigest',
      name: 'Daily Digest',
      description: 'Summary of top stories',
      icon: 'Mail'
    },
    {
      id: 'categoryUpdates',
      name: 'Category Updates',
      description: 'New articles in subscribed categories',
      icon: 'Grid3X3'
    },
    {
      id: 'bookmarkReminders',
      name: 'Bookmark Reminders',
      description: 'Reminders to read saved articles',
      icon: 'Bookmark'
    }
  ];

  const deliveryTimes = [
    { id: 'immediate', name: 'Immediate', description: 'As soon as available' },
    { id: 'hourly', name: 'Hourly', description: 'Once per hour' },
    { id: 'daily', name: 'Daily', description: 'Once per day at 8:00 AM' },
    { id: 'weekly', name: 'Weekly', description: 'Every Monday at 8:00 AM' }
  ];

  const categories = [
    'Politics', 'Technology', 'Business', 'Sports', 'Health', 'Science', 'Entertainment', 'World'
  ];

  const handleNotificationToggle = (type, enabled) => {
    onSettingsChange('notifications', {
      ...settings.notifications,
      [type]: enabled
    });
  };

  const handleDeliveryTimeChange = (time) => {
    onSettingsChange('notifications', {
      ...settings.notifications,
      deliveryTime: time
    });
  };

  const handleCategorySubscription = (category, subscribed) => {
    const currentSubscriptions = settings.notifications.subscribedCategories || [];
    const updatedSubscriptions = subscribed
      ? [...currentSubscriptions, category]
      : currentSubscriptions.filter(c => c !== category);
    
    onSettingsChange('notifications', {
      ...settings.notifications,
      subscribedCategories: updatedSubscriptions
    });
  };

  const handleQuietHoursToggle = (enabled) => {
    onSettingsChange('notifications', {
      ...settings.notifications,
      quietHours: {
        ...settings.notifications.quietHours,
        enabled
      }
    });
  };

  const handleQuietHoursChange = (field, value) => {
    onSettingsChange('notifications', {
      ...settings.notifications,
      quietHours: {
        ...settings.notifications.quietHours,
        [field]: value
      }
    });
  };

  return (
    <div className="bg-background border border-border rounded-lg">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-surface transition-colors duration-200"
      >
        <div className="flex items-center space-x-3">
          <Icon name="Bell" size={20} className="text-accent" />
          <div>
            <h3 className="text-lg font-semibold text-primary">Notification Settings</h3>
            <p className="text-sm text-text-secondary">Manage your news alerts and updates</p>
          </div>
        </div>
        <Icon 
          name="ChevronDown" 
          size={20} 
          className={`text-text-secondary transform transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {isExpanded && (
        <div className="px-6 pb-6 space-y-8">
          {/* Notification Types */}
          <div>
            <h4 className="text-sm font-semibold text-primary mb-4">Notification Types</h4>
            <div className="space-y-3">
              {notificationTypes.map((type) => (
                <label
                  key={type.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-surface cursor-pointer transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <Icon name={type.icon} size={18} className="text-text-secondary" />
                    <div>
                      <span className="text-primary font-medium">{type.name}</span>
                      <p className="text-xs text-text-secondary">{type.description}</p>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={settings.notifications[type.id] || false}
                      onChange={(e) => handleNotificationToggle(type.id, e.target.checked)}
                      className="sr-only"
                    />
                    <div
                      className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                        settings.notifications[type.id] ? 'bg-accent' : 'bg-neutral-300'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${
                          settings.notifications[type.id] ? 'translate-x-6' : 'translate-x-0.5'
                        } mt-0.5`}
                      />
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Delivery Timing */}
          <div>
            <h4 className="text-sm font-semibold text-primary mb-4">Delivery Timing</h4>
            <div className="space-y-3">
              {deliveryTimes.map((time) => (
                <label
                  key={time.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-surface cursor-pointer transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="deliveryTime"
                      value={time.id}
                      checked={settings.notifications.deliveryTime === time.id}
                      onChange={() => handleDeliveryTimeChange(time.id)}
                      className="w-4 h-4 text-accent border-border focus:ring-accent/20"
                    />
                    <div>
                      <span className="text-primary font-medium">{time.name}</span>
                      <p className="text-xs text-text-secondary">{time.description}</p>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Category Subscriptions */}
          <div>
            <h4 className="text-sm font-semibold text-primary mb-4">Category Subscriptions</h4>
            <p className="text-xs text-text-secondary mb-4">
              Get notifications for new articles in these categories
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {categories.map((category) => (
                <label
                  key={category}
                  className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-surface cursor-pointer transition-colors duration-200"
                >
                  <input
                    type="checkbox"
                    checked={(settings.notifications.subscribedCategories || []).includes(category)}
                    onChange={(e) => handleCategorySubscription(category, e.target.checked)}
                    className="w-4 h-4 text-accent border-border focus:ring-accent/20 rounded"
                  />
                  <span className="text-sm text-primary">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Quiet Hours */}
          <div>
            <h4 className="text-sm font-semibold text-primary mb-4">Quiet Hours</h4>
            <label className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-surface cursor-pointer transition-colors duration-200 mb-4">
              <div>
                <span className="text-primary font-medium">Enable quiet hours</span>
                <p className="text-xs text-text-secondary">Pause notifications during specified times</p>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={settings.notifications.quietHours?.enabled || false}
                  onChange={(e) => handleQuietHoursToggle(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                    settings.notifications.quietHours?.enabled ? 'bg-accent' : 'bg-neutral-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${
                      settings.notifications.quietHours?.enabled ? 'translate-x-6' : 'translate-x-0.5'
                    } mt-0.5`}
                  />
                </div>
              </div>
            </label>

            {settings.notifications.quietHours?.enabled && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-surface rounded-lg border border-border">
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Start Time</label>
                  <input
                    type="time"
                    value={settings.notifications.quietHours?.startTime || '22:00'}
                    onChange={(e) => handleQuietHoursChange('startTime', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-accent/20 focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">End Time</label>
                  <input
                    type="time"
                    value={settings.notifications.quietHours?.endTime || '08:00'}
                    onChange={(e) => handleQuietHoursChange('endTime', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-accent/20 focus:border-accent"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Push Notification Status */}
          <div className="bg-surface rounded-lg p-4 border border-border">
            <div className="flex items-center space-x-3 mb-3">
              <Icon name="Smartphone" size={18} className="text-accent" />
              <h4 className="text-sm font-semibold text-primary">Push Notification Status</h4>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-primary">Browser notifications</p>
                <p className="text-xs text-text-secondary">Allow NewsHub to send push notifications</p>
              </div>
              <div className="status-indicator status-online">
                <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                <span>Enabled</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationSettings;