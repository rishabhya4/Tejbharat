import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FloatingToolbar = ({ article, onShare, onBookmark, isBookmarked }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const shareOptions = [
    { name: 'Twitter', icon: 'Twitter', color: 'text-blue-500' },
    { name: 'Facebook', icon: 'Facebook', color: 'text-blue-600' },
    { name: 'LinkedIn', icon: 'Linkedin', color: 'text-blue-700' },
    { name: 'WhatsApp', icon: 'MessageCircle', color: 'text-green-500' },
    { name: 'Copy Link', icon: 'Link', color: 'text-text-secondary' }
  ];

  const handleShare = (platform) => {
    onShare(platform, article);
    setShowShareMenu(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3">
      {/* Share Menu */}
      {showShareMenu && (
        <div className="bg-background border border-border rounded-lg shadow-lg p-2 mb-2">
          <div className="flex flex-col space-y-1">
            {shareOptions.map((option) => (
              <button
                key={option.name}
                onClick={() => handleShare(option.name)}
                className="flex items-center space-x-2 px-3 py-2 text-sm rounded-md hover:bg-surface transition-colors duration-200"
              >
                <Icon name={option.icon} size={16} className={option.color} />
                <span className="text-text-primary">{option.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Floating Actions */}
      <div className="flex flex-col space-y-2">
        {/* Share Button */}
        <Button
          variant="primary"
          onClick={() => setShowShareMenu(!showShareMenu)}
          className="w-12 h-12 rounded-full shadow-lg"
          aria-label="Share article"
        >
          <Icon name="Share2" size={20} />
        </Button>

        {/* Bookmark Button */}
        <Button
          variant={isBookmarked ? "success" : "secondary"}
          onClick={onBookmark}
          className="w-12 h-12 rounded-full shadow-lg"
          aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
        >
          <Icon name={isBookmarked ? 'Bookmark' : 'BookmarkPlus'} size={20} />
        </Button>

        {/* Scroll to Top */}
        <Button
          variant="ghost"
          onClick={scrollToTop}
          className="w-12 h-12 rounded-full shadow-lg bg-background border border-border"
          aria-label="Scroll to top"
        >
          <Icon name="ArrowUp" size={20} />
        </Button>
      </div>
    </div>
  );
};

export default FloatingToolbar;