import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import HeaderNavigation from '../../components/ui/HeaderNavigation';
import ContextualBreadcrumbs from '../../components/ui/ContextualBreadcrumbs';
import SearchHeader from './components/SearchHeader';
import FilterSidebar from './components/FilterSidebar';
import FilterChips from './components/FilterChips';
import SearchResultsGrid from './components/SearchResultsGrid';
import SearchPagination from './components/SearchPagination';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    categories: [],
    sources: [],
    dateRange: '',
    sortBy: 'relevance'
  });

  const resultsPerPage = 12;

  // Mock search results data
  const mockArticles = [
    {
      id: 1,
      title: "Breakthrough in Artificial Intelligence Research Promises Revolutionary Changes",
      summary: "Scientists at leading tech companies have announced a major breakthrough in AI technology that could transform how we interact with digital systems. The new approach combines machine learning with quantum computing principles.",
      imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
      category: "Technology",
      source: "Tech Today",
      author: "Dr. Sarah Chen",
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      readingTime: 5,
      isBookmarked: false
    },
    {
      id: 2,
      title: "Climate Change Summit Reaches Historic Agreement on Carbon Emissions",
      summary: "World leaders have reached a unprecedented agreement on reducing global carbon emissions by 50% within the next decade. The summit concluded with commitments from over 190 countries.",
      imageUrl: "https://images.pexels.com/photos/9324302/pexels-photo-9324302.jpeg?w=800&h=600&fit=crop",
      category: "Politics",
      source: "Global News",
      author: "Michael Rodriguez",
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      readingTime: 7,
      isBookmarked: true
    },
    {
      id: 3,
      title: "Revolutionary Medical Treatment Shows Promise in Cancer Research",
      summary: "A new immunotherapy treatment has shown remarkable success in clinical trials, with 85% of patients showing significant improvement. The treatment targets specific cancer cells while preserving healthy tissue.",
      imageUrl: "https://images.pixabay.com/photo/2017/03/25/17/55/color-2174045_1280.jpg?w=800&h=600&fit=crop",
      category: "Health",
      source: "Medical Journal",
      author: "Dr. Emily Watson",
      publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      readingTime: 6,
      isBookmarked: false
    },
    {
      id: 4,
      title: "Space Exploration Mission Discovers Potential Signs of Life on Mars",
      summary: "NASA's latest rover mission has uncovered geological formations and chemical signatures that suggest the possibility of ancient microbial life on the Red Planet.",
      imageUrl: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&h=600&fit=crop",
      category: "Science",
      source: "Space News",
      author: "Dr. James Parker",
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
      readingTime: 8,
      isBookmarked: false
    },
    {
      id: 5,
      title: "Global Economy Shows Signs of Recovery After Challenging Period",
      summary: "Economic indicators suggest a positive trend in global markets, with unemployment rates declining and consumer confidence rising across major economies.",
      imageUrl: "https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?w=800&h=600&fit=crop",
      category: "Business",
      source: "Financial Times",
      author: "Robert Kim",
      publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000),
      readingTime: 4,
      isBookmarked: true
    },
    {
      id: 6,
      title: "Olympic Games 2024: Record-Breaking Performances Captivate Global Audience",
      summary: "Athletes from around the world continue to break records and inspire millions of viewers. The games have showcased incredible human achievement and international cooperation.",
      imageUrl: "https://images.pixabay.com/photo/2016/03/27/07/32/man-1282232_1280.jpg?w=800&h=600&fit=crop",
      category: "Sports",
      source: "Sports Weekly",
      author: "Maria Gonzalez",
      publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
      readingTime: 3,
      isBookmarked: false
    },
    {
      id: 7,
      title: "Renewable Energy Breakthrough Could Transform Power Generation",
      summary: "Scientists have developed a new solar panel technology that is 40% more efficient than current models, potentially revolutionizing clean energy production worldwide.",
      imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop",
      category: "Science",
      source: "Energy Today",
      author: "Dr. Lisa Chang",
      publishedAt: new Date(Date.now() - 14 * 60 * 60 * 1000),
      readingTime: 5,
      isBookmarked: false
    },
    {
      id: 8,
      title: "Cryptocurrency Market Experiences Significant Volatility",
      summary: "Digital currencies have seen dramatic price swings this week, with Bitcoin and Ethereum experiencing both sharp gains and losses as regulatory discussions continue.",
      imageUrl: "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?w=800&h=600&fit=crop",
      category: "Business",
      source: "Crypto News",
      author: "Alex Thompson",
      publishedAt: new Date(Date.now() - 16 * 60 * 60 * 1000),
      readingTime: 4,
      isBookmarked: true
    },
    {
      id: 9,
      title: "Educational Technology Transforms Learning in Remote Areas",
      summary: "New digital learning platforms are bringing quality education to underserved communities, with satellite internet and mobile devices enabling access to world-class instruction.",
      imageUrl: "https://images.pixabay.com/photo/2015/07/17/22/43/student-849825_1280.jpg?w=800&h=600&fit=crop",
      category: "Technology",
      source: "Education Weekly",
      author: "Jennifer Lee",
      publishedAt: new Date(Date.now() - 18 * 60 * 60 * 1000),
      readingTime: 6,
      isBookmarked: false
    }
  ];

  const filterArticles = (articles) => {
    let filtered = [...articles];

    // Filter by search query
    if (query) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.summary.toLowerCase().includes(query.toLowerCase()) ||
        article.category.toLowerCase().includes(query.toLowerCase()) ||
        article.source.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filter by categories
    if (filters.categories.length > 0) {
      filtered = filtered.filter(article =>
        filters.categories.includes(article.category)
      );
    }

    // Filter by sources
    if (filters.sources.length > 0) {
      filtered = filtered.filter(article =>
        filters.sources.includes(article.source)
      );
    }

    // Filter by date range
    if (filters.dateRange) {
      const now = new Date();
      const cutoffDate = new Date();
      
      switch (filters.dateRange) {
        case '24h':
          cutoffDate.setHours(now.getHours() - 24);
          break;
        case '7d':
          cutoffDate.setDate(now.getDate() - 7);
          break;
        case '30d':
          cutoffDate.setDate(now.getDate() - 30);
          break;
        case '365d':
          cutoffDate.setFullYear(now.getFullYear() - 1);
          break;
        default:
          break;
      }
      
      if (filters.dateRange !== 'custom') {
        filtered = filtered.filter(article => article.publishedAt >= cutoffDate);
      }
    }

    // Sort articles
    switch (filters.sortBy) {
      case 'date-desc':
        filtered.sort((a, b) => b.publishedAt - a.publishedAt);
        break;
      case 'date-asc':
        filtered.sort((a, b) => a.publishedAt - b.publishedAt);
        break;
      case 'relevance':
      default:
        // Keep original order for relevance
        break;
    }

    return filtered;
  };

  const filteredArticles = filterArticles(mockArticles);
  const totalResults = filteredArticles.length;
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  const startIndex = (currentPage - 1) * resultsPerPage;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + resultsPerPage);

  const handleQueryChange = (newQuery) => {
    setQuery(newQuery);
    setCurrentPage(1);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleFilterRemove = (filterType, value, clearAll = false) => {
    const newFilters = { ...filters };
    
    if (clearAll) {
      if (filterType === 'categories') {
        newFilters.categories = [];
      } else if (filterType === 'sources') {
        newFilters.sources = [];
      }
    } else {
      if (filterType === 'categories') {
        newFilters.categories = newFilters.categories.filter(cat => cat !== value);
      } else if (filterType === 'sources') {
        newFilters.sources = newFilters.sources.filter(source => source !== value);
      } else if (filterType === 'dateRange') {
        newFilters.dateRange = '';
      }
    }
    
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Simulate loading when filters change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [query, filters]);

  // Update page when search params change
  useEffect(() => {
    const newQuery = searchParams.get('q') || '';
    if (newQuery !== query) {
      setQuery(newQuery);
      setCurrentPage(1);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{query ? `Search results for "${query}"` : 'Search Results'} - NewsHub</title>
        <meta name="description" content={`Find news articles ${query ? `related to "${query}"` : 'using our advanced search'} on NewsHub`} />
      </Helmet>

      <HeaderNavigation />
      
      <main className="pt-16">
        <SearchHeader 
          onQueryChange={handleQueryChange}
          onFiltersChange={handleFiltersChange}
        />
        
        <div className="max-w-8xl mx-auto">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <ContextualBreadcrumbs />
          </div>
          
          <FilterChips
            filters={filters}
            onFilterRemove={handleFilterRemove}
            onShowFilters={() => setIsFilterSidebarOpen(true)}
            resultCount={totalResults}
          />
          
          <div className="flex">
            <FilterSidebar
              isOpen={isFilterSidebarOpen}
              onClose={() => setIsFilterSidebarOpen(false)}
              filters={filters}
              onFiltersChange={handleFiltersChange}
            />
            
            <div className="flex-1 min-w-0">
              <div className="px-4 sm:px-6 lg:px-8 py-8">
                <SearchResultsGrid
                  articles={paginatedArticles}
                  searchQuery={query}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
          
          {!isLoading && totalResults > 0 && (
            <SearchPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default SearchResults;