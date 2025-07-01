import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const LocalizationSettings = ({ settings, onSettingsChange }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  ];

  const timezones = [
    { id: 'UTC-12', name: 'UTC-12:00', location: 'Baker Island' },
    { id: 'UTC-11', name: 'UTC-11:00', location: 'American Samoa' },
    { id: 'UTC-10', name: 'UTC-10:00', location: 'Hawaii' },
    { id: 'UTC-9', name: 'UTC-09:00', location: 'Alaska' },
    { id: 'UTC-8', name: 'UTC-08:00', location: 'Pacific Time' },
    { id: 'UTC-7', name: 'UTC-07:00', location: 'Mountain Time' },
    { id: 'UTC-6', name: 'UTC-06:00', location: 'Central Time' },
    { id: 'UTC-5', name: 'UTC-05:00', location: 'Eastern Time' },
    { id: 'UTC-4', name: 'UTC-04:00', location: 'Atlantic Time' },
    { id: 'UTC-3', name: 'UTC-03:00', location: 'Argentina' },
    { id: 'UTC-2', name: 'UTC-02:00', location: 'South Georgia' },
    { id: 'UTC-1', name: 'UTC-01:00', location: 'Azores' },
    { id: 'UTC+0', name: 'UTC+00:00', location: 'London, Dublin' },
    { id: 'UTC+1', name: 'UTC+01:00', location: 'Central Europe' },
    { id: 'UTC+2', name: 'UTC+02:00', location: 'Eastern Europe' },
    { id: 'UTC+3', name: 'UTC+03:00', location: 'Moscow' },
    { id: 'UTC+4', name: 'UTC+04:00', location: 'Dubai' },
    { id: 'UTC+5', name: 'UTC+05:00', location: 'Pakistan' },
    { id: 'UTC+5:30', name: 'UTC+05:30', location: 'India' },
    { id: 'UTC+6', name: 'UTC+06:00', location: 'Bangladesh' },
    { id: 'UTC+7', name: 'UTC+07:00', location: 'Thailand' },
    { id: 'UTC+8', name: 'UTC+08:00', location: 'China, Singapore' },
    { id: 'UTC+9', name: 'UTC+09:00', location: 'Japan, Korea' },
    { id: 'UTC+10', name: 'UTC+10:00', location: 'Australia East' },
    { id: 'UTC+11', name: 'UTC+11:00', location: 'Solomon Islands' },
    { id: 'UTC+12', name: 'UTC+12:00', location: 'New Zealand' }
  ];

  const dateFormats = [
    { id: 'MM/DD/YYYY', name: 'MM/DD/YYYY', example: '03/15/2024' },
    { id: 'DD/MM/YYYY', name: 'DD/MM/YYYY', example: '15/03/2024' },
    { id: 'YYYY-MM-DD', name: 'YYYY-MM-DD', example: '2024-03-15' },
    { id: 'DD MMM YYYY', name: 'DD MMM YYYY', example: '15 Mar 2024' },
    { id: 'MMM DD, YYYY', name: 'MMM DD, YYYY', example: 'Mar 15, 2024' }
  ];

  const timeFormats = [
    { id: '12h', name: '12-hour', example: '2:30 PM' },
    { id: '24h', name: '24-hour', example: '14:30' }
  ];

  const regions = [
    { id: 'us', name: 'United States', flag: '🇺🇸' },
    { id: 'uk', name: 'United Kingdom', flag: '🇬🇧' },
    { id: 'ca', name: 'Canada', flag: '🇨🇦' },
    { id: 'au', name: 'Australia', flag: '🇦🇺' },
    { id: 'de', name: 'Germany', flag: '🇩🇪' },
    { id: 'fr', name: 'France', flag: '🇫🇷' },
    { id: 'es', name: 'Spain', flag: '🇪🇸' },
    { id: 'it', name: 'Italy', flag: '🇮🇹' },
    { id: 'jp', name: 'Japan', flag: '🇯🇵' },
    { id: 'kr', name: 'South Korea', flag: '🇰🇷' },
    { id: 'cn', name: 'China', flag: '🇨🇳' },
    { id: 'in', name: 'India', flag: '🇮🇳' },
    { id: 'br', name: 'Brazil', flag: '🇧🇷' },
    { id: 'mx', name: 'Mexico', flag: '🇲🇽' }
  ];

  const handleLanguageChange = (languageCode) => {
    onSettingsChange('localization', {
      ...settings.localization,
      language: languageCode
    });
  };

  const handleTimezoneChange = (timezone) => {
    onSettingsChange('localization', {
      ...settings.localization,
      timezone
    });
  };

  const handleDateFormatChange = (format) => {
    onSettingsChange('localization', {
      ...settings.localization,
      dateFormat: format
    });
  };

  const handleTimeFormatChange = (format) => {
    onSettingsChange('localization', {
      ...settings.localization,
      timeFormat: format
    });
  };

  const handleRegionChange = (region) => {
    onSettingsChange('localization', {
      ...settings.localization,
      region
    });
  };

  const handleLocalNewsToggle = (enabled) => {
    onSettingsChange('localization', {
      ...settings.localization,
      showLocalNews: enabled
    });
  };

  return (
    <div className="bg-background border border-border rounded-lg">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-surface transition-colors duration-200"
      >
        <div className="flex items-center space-x-3">
          <Icon name="Globe" size={20} className="text-accent" />
          <div>
            <h3 className="text-lg font-semibold text-primary">Localization Settings</h3>
            <p className="text-sm text-text-secondary">Language, region, and format preferences</p>
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
          {/* Language Selection */}
          <div>
            <h4 className="text-sm font-semibold text-primary mb-4">Language</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {languages.map((language) => (
                <label
                  key={language.code}
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-surface cursor-pointer transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="language"
                      value={language.code}
                      checked={settings.localization.language === language.code}
                      onChange={() => handleLanguageChange(language.code)}
                      className="w-4 h-4 text-accent border-border focus:ring-accent/20"
                    />
                    <div>
                      <span className="text-sm text-primary font-medium">{language.name}</span>
                      <p className="text-xs text-text-secondary">{language.nativeName}</p>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Timezone */}
          <div>
            <h4 className="text-sm font-semibold text-primary mb-4">Timezone</h4>
            <select
              value={settings.localization.timezone}
              onChange={(e) => handleTimezoneChange(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-accent/20 focus:border-accent bg-background"
            >
              {timezones.map((timezone) => (
                <option key={timezone.id} value={timezone.id}>
                  {timezone.name} - {timezone.location}
                </option>
              ))}
            </select>
          </div>

          {/* Date Format */}
          <div>
            <h4 className="text-sm font-semibold text-primary mb-4">Date Format</h4>
            <div className="space-y-3">
              {dateFormats.map((format) => (
                <label
                  key={format.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-surface cursor-pointer transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="dateFormat"
                      value={format.id}
                      checked={settings.localization.dateFormat === format.id}
                      onChange={() => handleDateFormatChange(format.id)}
                      className="w-4 h-4 text-accent border-border focus:ring-accent/20"
                    />
                    <span className="text-sm text-primary font-medium">{format.name}</span>
                  </div>
                  <span className="text-sm text-text-secondary font-mono">{format.example}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Time Format */}
          <div>
            <h4 className="text-sm font-semibold text-primary mb-4">Time Format</h4>
            <div className="space-y-3">
              {timeFormats.map((format) => (
                <label
                  key={format.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-surface cursor-pointer transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="timeFormat"
                      value={format.id}
                      checked={settings.localization.timeFormat === format.id}
                      onChange={() => handleTimeFormatChange(format.id)}
                      className="w-4 h-4 text-accent border-border focus:ring-accent/20"
                    />
                    <span className="text-sm text-primary font-medium">{format.name}</span>
                  </div>
                  <span className="text-sm text-text-secondary font-mono">{format.example}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Region */}
          <div>
            <h4 className="text-sm font-semibold text-primary mb-4">Region</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {regions.map((region) => (
                <label
                  key={region.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-surface cursor-pointer transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="region"
                      value={region.id}
                      checked={settings.localization.region === region.id}
                      onChange={() => handleRegionChange(region.id)}
                      className="w-4 h-4 text-accent border-border focus:ring-accent/20"
                    />
                    <span className="text-lg">{region.flag}</span>
                    <span className="text-sm text-primary font-medium">{region.name}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Local News */}
          <div>
            <h4 className="text-sm font-semibold text-primary mb-4">Local Content</h4>
            <label className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-surface cursor-pointer transition-colors duration-200">
              <div>
                <span className="text-primary font-medium">Show local news</span>
                <p className="text-xs text-text-secondary">Display news relevant to your region</p>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={settings.localization.showLocalNews || false}
                  onChange={(e) => handleLocalNewsToggle(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                    settings.localization.showLocalNews ? 'bg-accent' : 'bg-neutral-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${
                      settings.localization.showLocalNews ? 'translate-x-6' : 'translate-x-0.5'
                    } mt-0.5`}
                  />
                </div>
              </div>
            </label>
          </div>

          {/* Preview */}
          <div className="bg-surface rounded-lg p-4 border border-border">
            <h4 className="text-sm font-semibold text-primary mb-3">Preview</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Current date:</span>
                <span className="text-primary font-mono">
                  {dateFormats.find(f => f.id === settings.localization.dateFormat)?.example || '03/15/2024'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Current time:</span>
                <span className="text-primary font-mono">
                  {timeFormats.find(f => f.id === settings.localization.timeFormat)?.example || '2:30 PM'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Language:</span>
                <span className="text-primary">
                  {languages.find(l => l.code === settings.localization.language)?.name || 'English'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Region:</span>
                <span className="text-primary">
                  {regions.find(r => r.id === settings.localization.region)?.flag} {regions.find(r => r.id === settings.localization.region)?.name || 'United States'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocalizationSettings;
