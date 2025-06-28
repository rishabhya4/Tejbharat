import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const PullToRefresh = ({ onRefresh, children }) => {
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const containerRef = useRef(null);
  const startY = useRef(0);
  const currentY = useRef(0);

  const threshold = 80;
  const maxPullDistance = 120;

  const handleTouchStart = (e) => {
    if (window.scrollY === 0) {
      startY.current = e.touches[0].clientY;
      setIsPulling(true);
    }
  };

  const handleTouchMove = (e) => {
    if (!isPulling || isRefreshing) return;

    currentY.current = e.touches[0].clientY;
    const distance = Math.max(0, currentY.current - startY.current);
    
    if (distance > 0 && window.scrollY === 0) {
      e.preventDefault();
      setPullDistance(Math.min(distance * 0.5, maxPullDistance));
    }
  };

  const handleTouchEnd = async () => {
    if (!isPulling || isRefreshing) return;

    setIsPulling(false);

    if (pullDistance >= threshold) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } catch (error) {
        console.error('Refresh failed:', error);
      } finally {
        setIsRefreshing(false);
        setPullDistance(0);
      }
    } else {
      setPullDistance(0);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isPulling, pullDistance, isRefreshing]);

  const getRefreshIcon = () => {
    if (isRefreshing) return 'Loader2';
    if (pullDistance >= threshold) return 'ArrowDown';
    return 'ArrowDown';
  };

  const getRefreshText = () => {
    if (isRefreshing) return 'Refreshing...';
    if (pullDistance >= threshold) return 'Release to refresh';
    return 'Pull to refresh';
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Pull to refresh indicator */}
      <div
        className={`fixed top-16 left-0 right-0 z-50 bg-background border-b border-border transition-transform duration-300 ${
          pullDistance > 0 || isRefreshing ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{
          transform: `translateY(${Math.min(pullDistance - 60, 0)}px)`
        }}
      >
        <div className="flex items-center justify-center py-4">
          <div className="flex items-center space-x-2 text-text-secondary">
            <Icon
              name={getRefreshIcon()}
              size={20}
              className={`${isRefreshing ? 'animate-spin' : ''} ${
                pullDistance >= threshold ? 'rotate-180' : ''
              } transition-transform duration-200`}
            />
            <span className="text-sm font-medium">{getRefreshText()}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          transform: `translateY(${pullDistance}px)`,
          transition: isPulling ? 'none' : 'transform 0.3s ease-out'
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default PullToRefresh;