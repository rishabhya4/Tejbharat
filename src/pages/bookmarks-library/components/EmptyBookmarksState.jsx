import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const EmptyBookmarksState = () => {
  const trendingArticles = [
    {
      id: 1,
      title: "Revolutionary AI Breakthrough Changes Everything",
      category: "Technology",
      source: "TechNews",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Climate Summit Reaches Historic Agreement",
      category: "Politics",
      source: "Global Times",
      image: "https://images.pexels.com/photos/9324336/pexels-photo-9324336.jpeg?w=400&h=250&fit=crop",
      readTime: "8 min read"
    },
    {
      id: 3,
      title: "Market Analysis: Tech Stocks Surge",
      category: "Business",
      source: "Financial Daily",
      image: "https://images.pixabay.com/photo/2016/11/27/21/42/stock-1863880_1280.jpg?w=400&h=250&fit=crop",
      readTime: "6 min read"
    }
  ];

  const bookmarkingTips = [
    {
      icon: "Bookmark",
      title: "Save for Later",
      description: "Click the bookmark icon on any article to save it for later reading"
    },
    {
      icon: "Folder",
      title: "Organize with Folders",
      description: "Create folders to categorize your bookmarks by topic or priority"
    },
    {
      icon: "Search",
      title: "Quick Search",
      description: "Use the search feature to quickly find specific bookmarked articles"
    },
    {
      icon: "Download",
      title: "Offline Reading",
      description: "Download articles for offline reading when you're on the go"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto text-center py-12">
      {/* Main Empty State */}
      <div className="mb-12">
        <div className="w-24 h-24 mx-auto mb-6 bg-accent/10 rounded-full flex items-center justify-center">
          <Icon name="BookmarkPlus" size={48} className="text-accent" />
        </div>
        
        <h2 className="text-2xl font-bold text-primary mb-4">
          No Bookmarks Yet
        </h2>
        
        <p className="text-lg text-text-secondary mb-8 max-w-md mx-auto">
          Start building your personal reading library by bookmarking articles that interest you.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="primary"
            iconName="Home"
            iconPosition="left"
          >
            <Link to="/news-homepage">Browse Latest News</Link>
          </Button>
          
          <Button
            variant="outline"
            iconName="Grid3X3"
            iconPosition="left"
          >
            <Link to="/category-browse">Explore Categories</Link>
          </Button>
        </div>
      </div>

      {/* Bookmarking Tips */}
      <div className="mb-12">
        <h3 className="text-xl font-semibold text-primary mb-6">
          How to Get Started
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bookmarkingTips.map((tip, index) => (
            <div key={index} className="text-center p-4">
              <div className="w-12 h-12 mx-auto mb-3 bg-surface rounded-lg flex items-center justify-center">
                <Icon name={tip.icon} size={24} className="text-accent" />
              </div>
              <h4 className="font-semibold text-primary mb-2">
                {tip.title}
              </h4>
              <p className="text-sm text-text-secondary">
                {tip.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Articles */}
      <div>
        <h3 className="text-xl font-semibold text-primary mb-6">
          Trending Articles to Bookmark
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trendingArticles.map((article) => (
            <div key={article.id} className="news-card news-card-hover p-4 text-left">
              <div className="mb-4">
                <div className="w-full h-40 rounded-lg overflow-hidden bg-surface mb-3">
                  <Image
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex items-center space-x-2 text-xs text-text-secondary mb-2">
                  <span className="bg-accent/10 text-accent px-2 py-1 rounded-full font-medium">
                    {article.category}
                  </span>
                  <span>•</span>
                  <span>{article.source}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
                
                <h4 className="font-semibold text-primary mb-3 line-clamp-2">
                  {article.title}
                </h4>
              </div>
              
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  className="text-xs px-3 py-1"
                  iconName="Eye"
                  iconSize={14}
                >
                  <Link to={`/article-detail-page?id=${article.id}&title=${encodeURIComponent(article.title)}&category=${article.category}`}>
                    Read Article
                  </Link>
                </Button>
                
                <Button
                  variant="ghost"
                  className="text-xs px-2 py-1 text-accent hover:bg-accent/10"
                  iconName="Bookmark"
                  iconSize={14}
                >
                  Bookmark
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8">
          <Button
            variant="outline"
            iconName="ArrowRight"
            iconPosition="right"
          >
            <Link to="/news-homepage">View More Articles</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmptyBookmarksState;