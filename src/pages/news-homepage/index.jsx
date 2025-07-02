import React, { useState, useEffect, useCallback } from 'react';
import HeaderNavigation from '../../components/ui/HeaderNavigation';
import ContextualBreadcrumbs from '../../components/ui/ContextualBreadcrumbs';
import HeroSection from './components/HeroSection';
import CategoryChips from './components/CategoryChips';
import ArticleGrid from './components/ArticleGrid';
import FloatingActionButton from './components/FloatingActionButton';
import RefreshIndicator from './components/RefreshIndicator';
import LoadMoreButton from './components/LoadMoreButton';
import VerticalRotatingCards from "./components/VerticalRotatingCards";

const NewsHomepage = () => {
  const [articles, setArticles] = useState([]);
  const [featuredArticle, setFeaturedArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [bookmarkCount, setBookmarkCount] = useState(0);

  // Mock data for articles
  const mockArticles = [
    {
      id: 1,
      title: "Global Climate Summit Reaches Historic Agreement on Carbon Emissions",
      excerpt: "World leaders unite in unprecedented commitment to reduce global carbon emissions by 50% within the next decade, marking a pivotal moment in climate action.",
      image: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e5?w=800&h=600&fit=crop",
      source: "Reuters",
      category: "Politics",
      publishedAt: "2 hours ago",
      readTime: "4 min read",
      isBookmarked: false
    },
    {
      id: 2,
      title: "Revolutionary AI Breakthrough Promises to Transform Healthcare Diagnostics",
      excerpt: "New artificial intelligence system demonstrates 95% accuracy in early cancer detection, potentially saving millions of lives through faster diagnosis.",
      image: "https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg?w=800&h=600&fit=crop",
      source: "TechCrunch",
      category: "Technology",
      publishedAt: "4 hours ago",
      readTime: "6 min read",
      isBookmarked: true
    },
    {
      id: 3,
      title: "Stock Markets Surge Following Federal Reserve Interest Rate Decision",
      excerpt: "Major indices reach record highs as investors respond positively to the Fed\'s decision to maintain current interest rates amid economic uncertainty.",
      image: "https://images.pixabay.com/photo/2016/11/27/21/42/stock-1863880_1280.jpg?w=800&h=600&fit=crop",
      source: "Bloomberg",
      category: "Business",
      publishedAt: "6 hours ago",
      readTime: "3 min read",
      isBookmarked: false
    },
    {
      id: 4,
      title: "Olympic Games 2024: Record-Breaking Performances Captivate Global Audience",
      excerpt: "Athletes shatter multiple world records in swimming and track events, drawing the largest television audience in Olympic history.",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop",
      source: "ESPN",
      category: "Sports",
      publishedAt: "8 hours ago",
      readTime: "5 min read",
      isBookmarked: false
    },
    {
      id: 5,
      title: "Breakthrough Gene Therapy Shows Promise for Treating Rare Diseases",
      excerpt: "Clinical trials demonstrate remarkable success in treating previously incurable genetic disorders, offering hope to thousands of patients worldwide.",
      image: "https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg?w=800&h=600&fit=crop",
      source: "Nature Medicine",
      category: "Health",
      publishedAt: "10 hours ago",
      readTime: "7 min read",
      isBookmarked: true
    },
    {
      id: 6,
      title: "Space Exploration Milestone: Mars Mission Discovers Evidence of Ancient Water",
      excerpt: "NASA\'s latest Mars rover uncovers compelling evidence of ancient river systems, bringing scientists closer to understanding the planet\'s history.",
      image: "https://images.pixabay.com/photo/2011/12/13/14/30/earth-11014_1280.jpg?w=800&h=600&fit=crop",
      source: "NASA",
      category: "Science",
      publishedAt: "12 hours ago",
      readTime: "8 min read",
      isBookmarked: false
    },
    {
      id: 7,
      title: "Hollywood Blockbuster Breaks Box Office Records in Opening Weekend",
      excerpt: "The highly anticipated superhero sequel shatters previous opening weekend records, earning over $300 million globally in its first three days.",
      image: "https://images.unsplash.com/photo-1489599735734-79b4169c2a78?w=800&h=600&fit=crop",
      source: "Variety",
      category: "Entertainment",
      publishedAt: "14 hours ago",
      readTime: "4 min read",
      isBookmarked: false
    },
    {
      id: 8,
      title: "International Trade Agreement Reshapes Global Economic Landscape",
      excerpt: "Major economies sign comprehensive trade deal expected to boost global GDP by 2.5% over the next five years, reducing tariffs across multiple sectors.",
      image: "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?w=800&h=600&fit=crop",
      source: "Financial Times",
      category: "World",
      publishedAt: "16 hours ago",
      readTime: "6 min read",
      isBookmarked: true
    }
  ];

  const loadInitialData = useCallback(async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const featured = mockArticles[0];
    const remainingArticles = mockArticles.slice(1, 11);
    
    setFeaturedArticle(featured);
    setArticles(remainingArticles);
    setBookmarkCount(mockArticles.filter(article => article.isBookmarked).length);
    setIsLoading(false);
  }, []);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    
    // Simulate refresh API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Shuffle articles to simulate new content
    const shuffled = [...mockArticles].sort(() => Math.random() - 0.5);
    const featured = shuffled[0];
    const remainingArticles = shuffled.slice(1, 11);
    
    setFeaturedArticle(featured);
    setArticles(remainingArticles);
    setPage(1);
    setHasMore(true);
    setIsRefreshing(false);
  }, []);

  const handleLoadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;
    
    setIsLoadingMore(true);
    
    // Simulate load more API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newArticles = mockArticles.slice(0, 10).map(article => ({
      ...article,
      id: article.id + (page * 10),
      publishedAt: `${page + 1} day${page > 0 ? 's' : ''} ago`
    }));
    
    setArticles(prev => [...prev, ...newArticles]);
    setPage(prev => prev + 1);
    
    // Simulate reaching end of content
    if (page >= 3) {
      setHasMore(false);
    }
    
    setIsLoadingMore(false);
  }, [page, isLoadingMore, hasMore]);

  const handleBookmarkToggle = useCallback((articleId, isBookmarked) => {
    setArticles(prev => 
      prev.map(article => 
        article.id === articleId 
          ? { ...article, isBookmarked }
          : article
      )
    );
    
    if (featuredArticle && featuredArticle.id === articleId) {
      setFeaturedArticle(prev => ({ ...prev, isBookmarked }));
    }
    
    setBookmarkCount(prev => isBookmarked ? prev + 1 : prev - 1);
  }, [featuredArticle]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  // Auto-slide featuredArticle every 5 seconds
  useEffect(() => {
    if (!mockArticles.length) return;
    const interval = setInterval(() => {
      setFeaturedArticle(prev => {
        const currentIndex = mockArticles.findIndex(a => a.id === prev?.id);
        const nextIndex = (currentIndex + 1) % mockArticles.length;
        return mockArticles[nextIndex];
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [mockArticles]);

  return (
    <div className="min-h-screen bg-background">
      <HeaderNavigation />
      
      <main className="pt-16">
        <RefreshIndicator 
          onRefresh={handleRefresh} 
          isRefreshing={isRefreshing} 
        />
        
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ContextualBreadcrumbs />
          
          {/* Latest News Headline */}
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Latest News</h2>
          
          {/* Hero Section */}
          <section className="mb-8">
            <HeroSection featuredArticle={featuredArticle} />
          </section>
          
          {/* Category Navigation */}
          <section className="mb-8">
            <CategoryChips />
          </section>
          
          {/* Articles Grid */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm text-text-secondary">
                {articles.length} articles
              </span>
            </div>
            
            <ArticleGrid
              articles={articles}
              isLoading={isLoading}
              onBookmarkToggle={handleBookmarkToggle}
            />
            
            {!isLoading && (
              <LoadMoreButton
                onLoadMore={handleLoadMore}
                isLoading={isLoadingMore}
                hasMore={hasMore}
              />
            )}
          </section>
        </div>
        
        <FloatingActionButton bookmarkCount={bookmarkCount} />
      </main>
    </div>
  );
};

export default NewsHomepage;
