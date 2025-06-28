import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const RefreshIndicator = ({ onRefresh, isRefreshing }) => {
  const [pullDistance, setPullDistance] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [startY, setStartY] = useState(0);

  const handleTouchStart = (e) => {
    if (window.scrollY === 0) {
      setStartY(e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e) => {
    if (window.scrollY === 0 && startY > 0) {
      const currentY = e.touches[0].clientY;
      const distance = Math.max(0, currentY - startY);
      
      if (distance > 10) {
        e.preventDefault();
        setPullDistance(Math.min(distance, 120));
        setIsVisible(distance > 50);
      }
    }
  };

  const handleTouchEnd = () => {
    if (pullDistance > 80 && !isRefreshing) {
      onRefresh();
    }
    
    setPullDistance(0);
    setIsVisible(false);
    setStartY(0);
  };

  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      document.addEventListener('touchstart', handleTouchStart, { passive: false });
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);

      return () => {
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [startY, pullDistance, isRefreshing]);

  if (!isVisible && !isRefreshing) {
    return null;
  }

  return (
    <div 
      className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-200"
      style={{ 
        transform: `translate(-50%, ${Math.max(0, pullDistance - 50)}px)`,
        opacity: isVisible || isRefreshing ? 1 : 0
      }}
    >
      <div className="bg-background border border-border rounded-full px-4 py-2 shadow-lg flex items-center space-x-2">
        <Icon 
          name="RefreshCw" 
          size={16} 
          className={`text-accent ${isRefreshing ? 'animate-spin' : ''}`} 
        />
        <span className="text-sm font-medium text-primary">
          {isRefreshing ? 'Refreshing...' : pullDistance > 80 ? 'Release to refresh' : 'Pull to refresh'}
        </span>
      </div>
    </div>
  );
};

export default RefreshIndicator;