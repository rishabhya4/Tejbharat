import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const DisplayPreferences = ({ settings, onSettingsChange }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const themes = [
    { id: 'light', name: 'Light', icon: 'Sun', description: 'Clean and bright interface' },
    { id: 'dark', name: 'Dark', icon: 'Moon', description: 'Easy on the eyes' },
    { id: 'auto', name: 'Auto', icon: 'Monitor', description: 'Follows system preference' }
  ];

  const fontSizes = [
    { id: 'small', name: 'Small', size: '14px' },
    { id: 'medium', name: 'Medium', size: '16px' },
    { id: 'large', name: 'Large', size: '18px' },
    { id: 'extra-large', name: 'Extra Large', size: '20px' }
  ];

  const layoutDensities = [
    { id: 'compact', name: 'Compact', description: 'More content per screen' },
    { id: 'comfortable', name: 'Comfortable', description: 'Balanced spacing' },
    { id: 'spacious', name: 'Spacious', description: 'Extra breathing room' }
  ];

  const handleThemeChange = (themeId) => {
    onSettingsChange('display', { ...settings.display, theme: themeId });
  };

  const handleFontSizeChange = (fontSize) => {
    onSettingsChange('display', { ...settings.display, fontSize });
  };

  const handleLayoutDensityChange = (density) => {
    onSettingsChange('display', { ...settings.display, layoutDensity: density });
  };

  const handleArticlePreviewChange = (enabled) => {
    onSettingsChange('display', { ...settings.display, showArticlePreview: enabled });
  };

  const handleImageQualityChange = (quality) => {
    onSettingsChange('display', { ...settings.display, imageQuality: quality });
  };

  return (
    <div className="bg-background border border-border rounded-lg">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-surface transition-colors duration-200"
      >
        <div className="flex items-center space-x-3">
          <Icon name="Palette" size={20} className="text-accent" />
          <div>
            <h3 className="text-lg font-semibold text-primary">Display Preferences</h3>
            <p className="text-sm text-text-secondary">Customize your reading experience</p>
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
          {/* Theme Selection */}
          <div>
            <h4 className="text-sm font-semibold text-primary mb-4">Theme</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => handleThemeChange(theme.id)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                    settings.display.theme === theme.id
                      ? 'border-accent bg-accent/5' :'border-border hover:border-accent/50 hover:bg-surface'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <Icon 
                      name={theme.icon} 
                      size={18} 
                      className={settings.display.theme === theme.id ? 'text-accent' : 'text-text-secondary'} 
                    />
                    <span className={`font-medium ${
                      settings.display.theme === theme.id ? 'text-accent' : 'text-primary'
                    }`}>
                      {theme.name}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary">{theme.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Font Size */}
          <div>
            <h4 className="text-sm font-semibold text-primary mb-4">Font Size</h4>
            <div className="space-y-3">
              {fontSizes.map((font) => (
                <label
                  key={font.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-surface cursor-pointer transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="fontSize"
                      value={font.id}
                      checked={settings.display.fontSize === font.id}
                      onChange={() => handleFontSizeChange(font.id)}
                      className="w-4 h-4 text-accent border-border focus:ring-accent/20"
                    />
                    <span className="text-primary font-medium">{font.name}</span>
                  </div>
                  <span 
                    className="text-text-secondary font-mono"
                    style={{ fontSize: font.size }}
                  >
                    Sample Text
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Layout Density */}
          <div>
            <h4 className="text-sm font-semibold text-primary mb-4">Layout Density</h4>
            <div className="space-y-3">
              {layoutDensities.map((density) => (
                <label
                  key={density.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-surface cursor-pointer transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="layoutDensity"
                      value={density.id}
                      checked={settings.display.layoutDensity === density.id}
                      onChange={() => handleLayoutDensityChange(density.id)}
                      className="w-4 h-4 text-accent border-border focus:ring-accent/20"
                    />
                    <div>
                      <span className="text-primary font-medium">{density.name}</span>
                      <p className="text-xs text-text-secondary">{density.description}</p>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Article Preview */}
          <div>
            <h4 className="text-sm font-semibold text-primary mb-4">Article Preview</h4>
            <label className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-surface cursor-pointer transition-colors duration-200">
              <div>
                <span className="text-primary font-medium">Show article previews</span>
                <p className="text-xs text-text-secondary">Display article summaries in listings</p>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={settings.display.showArticlePreview}
                  onChange={(e) => handleArticlePreviewChange(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                    settings.display.showArticlePreview ? 'bg-accent' : 'bg-neutral-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${
                      settings.display.showArticlePreview ? 'translate-x-6' : 'translate-x-0.5'
                    } mt-0.5`}
                  />
                </div>
              </div>
            </label>
          </div>

          {/* Image Quality */}
          <div>
            <h4 className="text-sm font-semibold text-primary mb-4">Image Quality</h4>
            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-surface cursor-pointer transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="imageQuality"
                    value="low"
                    checked={settings.display.imageQuality === 'low'}
                    onChange={() => handleImageQualityChange('low')}
                    className="w-4 h-4 text-accent border-border focus:ring-accent/20"
                  />
                  <div>
                    <span className="text-primary font-medium">Low</span>
                    <p className="text-xs text-text-secondary">Faster loading, less data usage</p>
                  </div>
                </div>
              </label>
              <label className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-surface cursor-pointer transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="imageQuality"
                    value="high"
                    checked={settings.display.imageQuality === 'high'}
                    onChange={() => handleImageQualityChange('high')}
                    className="w-4 h-4 text-accent border-border focus:ring-accent/20"
                  />
                  <div>
                    <span className="text-primary font-medium">High</span>
                    <p className="text-xs text-text-secondary">Best quality, more data usage</p>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-surface rounded-lg p-4 border border-border">
            <h4 className="text-sm font-semibold text-primary mb-3">Live Preview</h4>
            <div className="space-y-3">
              <div className="bg-background rounded border border-border p-3">
                <h5 
                  className="font-semibold text-primary mb-1"
                  style={{ 
                    fontSize: fontSizes.find(f => f.id === settings.display.fontSize)?.size || '16px' 
                  }}
                >
                  Sample News Headline
                </h5>
                {settings.display.showArticlePreview && (
                  <p 
                    className="text-text-secondary"
                    style={{ 
                      fontSize: `calc(${fontSizes.find(f => f.id === settings.display.fontSize)?.size || '16px'} - 2px)` 
                    }}
                  >
                    This is how article previews will appear in your news feed with the current settings.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayPreferences;