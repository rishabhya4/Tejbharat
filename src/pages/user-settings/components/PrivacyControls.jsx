import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PrivacyControls = ({ settings, onSettingsChange }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showDataExport, setShowDataExport] = useState(false);

  const privacyOptions = [
    {
      id: 'analytics',
      name: 'Usage Analytics',
      description: 'Help improve NewsHub by sharing anonymous usage data',
      icon: 'BarChart3'
    },
    {
      id: 'personalization',
      name: 'Personalized Content',
      description: 'Show personalized news recommendations based on reading history',
      icon: 'Target'
    },
    {
      id: 'locationData',
      name: 'Location-based News',
      description: 'Show local news based on your location',
      icon: 'MapPin'
    },
    {
      id: 'socialSharing',
      name: 'Social Media Integration',
      description: 'Enable sharing articles to social media platforms',
      icon: 'Share2'
    }
  ];

  const cookieCategories = [
    {
      id: 'essential',
      name: 'Essential Cookies',
      description: 'Required for basic site functionality',
      required: true
    },
    {
      id: 'analytics',
      name: 'Analytics Cookies',
      description: 'Help us understand how you use the site',
      required: false
    },
    {
      id: 'marketing',
      name: 'Marketing Cookies',
      description: 'Used to show relevant advertisements',
      required: false
    },
    {
      id: 'preferences',
      name: 'Preference Cookies',
      description: 'Remember your settings and preferences',
      required: false
    }
  ];

  const dataRetentionPeriods = [
    { id: '30days', name: '30 Days', description: 'Minimal retention' },
    { id: '6months', name: '6 Months', description: 'Balanced approach' },
    { id: '1year', name: '1 Year', description: 'Extended retention' },
    { id: '2years', name: '2 Years', description: 'Maximum retention' }
  ];

  const handlePrivacyToggle = (option, enabled) => {
    onSettingsChange('privacy', {
      ...settings.privacy,
      [option]: enabled
    });
  };

  const handleCookieToggle = (category, enabled) => {
    onSettingsChange('privacy', {
      ...settings.privacy,
      cookies: {
        ...settings.privacy.cookies,
        [category]: enabled
      }
    });
  };

  const handleDataRetentionChange = (period) => {
    onSettingsChange('privacy', {
      ...settings.privacy,
      dataRetention: period
    });
  };

  const handleDataExport = () => {
    setShowDataExport(true);
    // Simulate data export process
    setTimeout(() => {
      setShowDataExport(false);
      alert('Your data export has been prepared and will be sent to your email address.');
    }, 2000);
  };

  const handleDataDeletion = () => {
    if (window.confirm('Are you sure you want to delete all your data? This action cannot be undone.')) {
      alert('Data deletion request has been submitted. You will receive a confirmation email.');
    }
  };

  return (
    <div className="bg-background border border-border rounded-lg">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-surface transition-colors duration-200"
      >
        <div className="flex items-center space-x-3">
          <Icon name="Shield" size={20} className="text-accent" />
          <div>
            <h3 className="text-lg font-semibold text-primary">Privacy Controls</h3>
            <p className="text-sm text-text-secondary">Manage your data and privacy preferences</p>
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
          {/* Privacy Options */}
          <div>
            <h4 className="text-sm font-semibold text-primary mb-4">Privacy Preferences</h4>
            <div className="space-y-3">
              {privacyOptions.map((option) => (
                <label
                  key={option.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-surface cursor-pointer transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <Icon name={option.icon} size={18} className="text-text-secondary" />
                    <div>
                      <span className="text-primary font-medium">{option.name}</span>
                      <p className="text-xs text-text-secondary">{option.description}</p>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={settings.privacy[option.id] || false}
                      onChange={(e) => handlePrivacyToggle(option.id, e.target.checked)}
                      className="sr-only"
                    />
                    <div
                      className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                        settings.privacy[option.id] ? 'bg-accent' : 'bg-neutral-300'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${
                          settings.privacy[option.id] ? 'translate-x-6' : 'translate-x-0.5'
                        } mt-0.5`}
                      />
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Cookie Preferences */}
          <div>
            <h4 className="text-sm font-semibold text-primary mb-4">Cookie Preferences</h4>
            <div className="space-y-3">
              {cookieCategories.map((category) => (
                <label
                  key={category.id}
                  className={`flex items-center justify-between p-3 rounded-lg border border-border transition-colors duration-200 ${
                    category.required ? 'bg-neutral-50 cursor-not-allowed' : 'hover:bg-surface cursor-pointer'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div>
                      <span className="text-primary font-medium">{category.name}</span>
                      {category.required && (
                        <span className="ml-2 text-xs text-accent font-medium">(Required)</span>
                      )}
                      <p className="text-xs text-text-secondary">{category.description}</p>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={category.required || settings.privacy.cookies?.[category.id] || false}
                      onChange={(e) => !category.required && handleCookieToggle(category.id, e.target.checked)}
                      disabled={category.required}
                      className="sr-only"
                    />
                    <div
                      className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                        category.required || settings.privacy.cookies?.[category.id] 
                          ? 'bg-accent' :'bg-neutral-300'
                      } ${category.required ? 'opacity-50' : ''}`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${
                          category.required || settings.privacy.cookies?.[category.id] 
                            ? 'translate-x-6' :'translate-x-0.5'
                        } mt-0.5`}
                      />
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Data Retention */}
          <div>
            <h4 className="text-sm font-semibold text-primary mb-4">Data Retention</h4>
            <p className="text-xs text-text-secondary mb-4">
              Choose how long we keep your reading history and preferences
            </p>
            <div className="space-y-3">
              {dataRetentionPeriods.map((period) => (
                <label
                  key={period.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-surface cursor-pointer transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="dataRetention"
                      value={period.id}
                      checked={settings.privacy.dataRetention === period.id}
                      onChange={() => handleDataRetentionChange(period.id)}
                      className="w-4 h-4 text-accent border-border focus:ring-accent/20"
                    />
                    <div>
                      <span className="text-primary font-medium">{period.name}</span>
                      <p className="text-xs text-text-secondary">{period.description}</p>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Data Management */}
          <div>
            <h4 className="text-sm font-semibold text-primary mb-4">Data Management</h4>
            <div className="space-y-4">
              <div className="p-4 bg-surface rounded-lg border border-border">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h5 className="text-sm font-medium text-primary">Export Your Data</h5>
                    <p className="text-xs text-text-secondary">Download a copy of your data</p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleDataExport}
                    disabled={showDataExport}
                    iconName={showDataExport ? "Loader2" : "Download"}
                    className={showDataExport ? "animate-spin" : ""}
                  >
                    {showDataExport ? 'Preparing...' : 'Export Data'}
                  </Button>
                </div>
                <p className="text-xs text-text-secondary">
                  Includes reading history, bookmarks, and preferences. Export will be sent to your email.
                </p>
              </div>

              <div className="p-4 bg-error/5 rounded-lg border border-error/20">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h5 className="text-sm font-medium text-error">Delete All Data</h5>
                    <p className="text-xs text-text-secondary">Permanently remove all your data</p>
                  </div>
                  <Button
                    variant="danger"
                    onClick={handleDataDeletion}
                    iconName="Trash2"
                  >
                    Delete Data
                  </Button>
                </div>
                <p className="text-xs text-text-secondary">
                  This action cannot be undone. All your reading history, bookmarks, and preferences will be permanently deleted.
                </p>
              </div>
            </div>
          </div>

          {/* Privacy Information */}
          <div className="bg-surface rounded-lg p-4 border border-border">
            <div className="flex items-center space-x-3 mb-3">
              <Icon name="Info" size={18} className="text-accent" />
              <h4 className="text-sm font-semibold text-primary">Privacy Information</h4>
            </div>
            <div className="space-y-2 text-xs text-text-secondary">
              <p>• We never sell your personal data to third parties</p>
              <p>• All data is encrypted in transit and at rest</p>
              <p>• You can request data deletion at any time</p>
              <p>• We comply with GDPR and CCPA regulations</p>
            </div>
            <div className="mt-4">
              <Button variant="link" className="text-xs p-0">
                Read our full Privacy Policy →
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacyControls;