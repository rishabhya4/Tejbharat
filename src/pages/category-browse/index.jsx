import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HeaderNavigation from '../../components/ui/HeaderNavigation';
import ContextualBreadcrumbs from '../../components/ui/ContextualBreadcrumbs';
import CategoryBanner from './components/CategoryBanner';
import SubcategoryTabs from './components/SubcategoryTabs';
import SortDropdown from './components/SortDropdown';
import ArticleGrid from './components/ArticleGrid';
import LoadMoreButton from './components/LoadMoreButton';
import PullToRefresh from './components/PullToRefresh';
import Icon from '../../components/AppIcon';

const CategoryBrowse = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category') || 'technology';
  
  const [activeSubcategory, setActiveSubcategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [articles, setArticles] = useState([]);
  const [featuredArticle, setFeaturedArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // Mock data
  const mockFeaturedArticle = {
    id: 'featured-1',
    title: `Breaking: Major ${category.charAt(0).toUpperCase() + category.slice(1)} Development Reshapes Industry Standards`,
    summary: `In a groundbreaking announcement that has sent shockwaves through the ${category} sector, industry leaders have unveiled revolutionary changes that promise to transform how we approach modern challenges. This comprehensive analysis explores the far-reaching implications and what it means for the future.`,
    image: `https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=400&fit=crop`,
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg'
    },
    source: 'TechDaily',
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    readTime: 8,
    category: category.charAt(0).toUpperCase() + category.slice(1)
  };

  const mockArticles = [
    {
      id: 'article-1',
      title: `${category.charAt(0).toUpperCase() + category.slice(1)} Innovation Drives Market Growth`,
      summary: `Recent developments in ${category} have led to unprecedented market expansion, with experts predicting continued growth throughout the year.`,
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?w=400&h=250&fit=crop',
      author: {
        name: 'Michael Chen',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg'
      },
      source: 'Industry Weekly',
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      readTime: 5,
      category: category.charAt(0).toUpperCase() + category.slice(1),
      isBookmarked: false
    },
    {
      id: 'article-2',
      title: `Global ${category.charAt(0).toUpperCase() + category.slice(1)} Summit Announces New Initiatives`,
      summary: `World leaders gather to discuss the future of ${category}, announcing collaborative efforts to address emerging challenges and opportunities.`,
      image: 'https://images.pixabay.com/photo/2016/11/29/06/15/plans-1867745_1280.jpg?w=400&h=250&fit=crop',
      author: {
        name: 'Emma Rodriguez',
        avatar: 'https://randomuser.me/api/portraits/women/28.jpg'
      },
      source: 'Global News',
      publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      readTime: 7,
      category: category.charAt(0).toUpperCase() + category.slice(1),
      isBookmarked: true
    },
    {
      id: 'article-3',
      title: `Expert Analysis: ${category.charAt(0).toUpperCase() + category.slice(1)} Trends for 2024`,
      summary: `Leading analysts share their insights on the most significant trends shaping the ${category} landscape in the coming year.`,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
      author: {
        name: 'David Park',
        avatar: 'https://randomuser.me/api/portraits/men/33.jpg'
      },
      source: 'Analytics Today',
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
      readTime: 6,
      category: category.charAt(0).toUpperCase() + category.slice(1),
      isBookmarked: false
    },
    {
      id: 'article-4',
      title: `Breakthrough Research in ${category.charAt(0).toUpperCase() + category.slice(1)} Field`,
      summary: `Scientists announce significant breakthrough that could revolutionize our understanding of ${category} applications.`,
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?w=400&h=250&fit=crop',
      author: {
        name: 'Dr. Lisa Wang',
        avatar: 'https://randomuser.me/api/portraits/women/41.jpg'
      },
      source: 'Research Journal',
      publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
      readTime: 9,
      category: category.charAt(0).toUpperCase() + category.slice(1),
      isBookmarked: false
    },
    {
      id: 'article-5',
      title: `${category.charAt(0).toUpperCase() + category.slice(1)} Startup Secures Major Funding`,
      summary: `Emerging company in the ${category} space raises significant investment to accelerate product development and market expansion.`,
      image: 'https://images.pixabay.com/photo/2016/11/27/21/42/stock-1863880_1280.jpg?w=400&h=250&fit=crop',
      author: {
        name: 'Alex Thompson',
        avatar: 'https://randomuser.me/api/portraits/men/29.jpg'
      },
      source: 'Startup News',
      publishedAt: new Date(Date.now() - 16 * 60 * 60 * 1000),
      readTime: 4,
      category: category.charAt(0).toUpperCase() + category.slice(1),
      isBookmarked: true
    },
    {
      id: 'article-6',
      title: `Policy Changes Impact ${category.charAt(0).toUpperCase() + category.slice(1)} Sector`,
      summary: `New regulations announced by government officials are expected to significantly influence ${category} industry practices.`,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop',
      author: {
        name: 'Jennifer Lee',
        avatar: 'https://randomuser.me/api/portraits/women/35.jpg'
      },
      source: 'Policy Watch',
      publishedAt: new Date(Date.now() - 20 * 60 * 60 * 1000),
      readTime: 6,
      category: category.charAt(0).toUpperCase() + category.slice(1),
      isBookmarked: false
    }
  ];

  useEffect(() => {
    loadInitialData();
  }, [category, activeSubcategory, sortBy]);

  const loadInitialData = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setFeaturedArticle(mockFeaturedArticle);
    setArticles(mockArticles);
    setPage(1);
    setHasMore(true);
    setIsLoading(false);
  };

  const handleRefresh = async () => {
    await loadInitialData();
  };

  const handleLoadMore = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock additional articles
    const additionalArticles = mockArticles.map((article, index) => ({
      ...article,
      id: `article-${page * 6 + index + 1}`,
      title: `${article.title} - Page ${page + 1}`,
      publishedAt: new Date(Date.now() - (24 + page * 6 + index) * 60 * 60 * 1000)
    }));
    
    setArticles(prev => [...prev, ...additionalArticles]);
    setPage(prev => prev + 1);
    
    // Simulate end of content after 3 pages
    if (page >= 3) {
      setHasMore(false);
    }
    
    setIsLoading(false);
  };

  const handleBookmark = (articleId) => {
    setArticles(prev => prev.map(article => 
      article.id === articleId 
        ? { ...article, isBookmarked: !article.isBookmarked }
        : article
    ));
  };

  const handleShare = (article) => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.summary,
        url: window.location.origin + `/article-detail-page?id=${article.id}`
      });
    } else {
      // Fallback for browsers without Web Share API
      navigator.clipboard.writeText(
        window.location.origin + `/article-detail-page?id=${article.id}`
      );
      // You could show a toast notification here
    }
  };

  const handleSubcategoryChange = (subcategory) => {
    setActiveSubcategory(subcategory);
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };

  const getCategoryDisplayName = () => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <HeaderNavigation />
      
      <PullToRefresh onRefresh={handleRefresh}>
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumbs */}
            <ContextualBreadcrumbs />

            {/* Category Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                  <Icon name="Grid3X3" size={24} color="white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-primary">
                    {getCategoryDisplayName()}
                  </h1>
                  <p className="text-text-secondary">
                    Latest news and updates in {category}
                  </p>
                </div>
              </div>

              {/* Sort Dropdown */}
              <div className="hidden sm:block">
                <SortDropdown sortBy={sortBy} onSortChange={handleSortChange} />
              </div>
            </div>

            {/* Featured Article Banner */}
            {featuredArticle && !isLoading && (
              <CategoryBanner 
                featuredArticle={featuredArticle} 
                category={getCategoryDisplayName()} 
              />
            )}

            {/* Subcategory Tabs */}
            <SubcategoryTabs
              category={category}
              activeSubcategory={activeSubcategory}
              onSubcategoryChange={handleSubcategoryChange}
            />

            {/* Mobile Sort */}
            <div className="sm:hidden mb-6">
              <SortDropdown sortBy={sortBy} onSortChange={handleSortChange} />
            </div>

            {/* Articles Grid */}
            <ArticleGrid
              articles={articles}
              isLoading={isLoading}
              onBookmark={handleBookmark}
              onShare={handleShare}
            />

            {/* Load More */}
            {!isLoading && articles.length > 0 && (
              <LoadMoreButton
                onLoadMore={handleLoadMore}
                isLoading={isLoading}
                hasMore={hasMore}
              />
            )}
          </div>
        </main>
      </PullToRefresh>
    </div>
  );
};

export default CategoryBrowse;