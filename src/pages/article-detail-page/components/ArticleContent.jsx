import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ArticleContent = ({ content, readingTime }) => {
  const [fontSize, setFontSize] = useState('base');

  const fontSizeClasses = {
    sm: 'text-sm leading-relaxed',
    base: 'text-base leading-relaxed',
    lg: 'text-lg leading-relaxed',
    xl: 'text-xl leading-relaxed'
  };

  const adjustFontSize = (size) => {
    setFontSize(size);
  };

  const formatContent = (text) => {
    return text.split('\n\n').map((paragraph, index) => (
      <p key={index} className={`mb-6 ${fontSizeClasses[fontSize]} text-text-primary`}>
        {paragraph}
      </p>
    ));
  };

  return (
    <article className="max-w-none">
      {/* Reading Time and Font Controls */}
      <div className="flex items-center justify-between mb-8 p-4 bg-surface rounded-lg">
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="Clock" size={16} />
          <span>{readingTime} min read</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-text-secondary mr-2">Font size:</span>
          <Button
            variant={fontSize === 'sm' ? 'primary' : 'ghost'}
            onClick={() => adjustFontSize('sm')}
            className="px-2 py-1 text-xs"
          >
            A
          </Button>
          <Button
            variant={fontSize === 'base' ? 'primary' : 'ghost'}
            onClick={() => adjustFontSize('base')}
            className="px-2 py-1 text-sm"
          >
            A
          </Button>
          <Button
            variant={fontSize === 'lg' ? 'primary' : 'ghost'}
            onClick={() => adjustFontSize('lg')}
            className="px-2 py-1 text-base"
          >
            A
          </Button>
          <Button
            variant={fontSize === 'xl' ? 'primary' : 'ghost'}
            onClick={() => adjustFontSize('xl')}
            className="px-2 py-1 text-lg"
          >
            A
          </Button>
        </div>
      </div>

      {/* Article Body */}
      <div className="prose prose-slate max-w-none">
        {formatContent(content)}
      </div>

      {/* Article Footer */}
      <div className="mt-12 pt-8 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-sm text-text-secondary">
            <p>Published on {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</p>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="Eye" size={16} />
            <span>1,234 views</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleContent;