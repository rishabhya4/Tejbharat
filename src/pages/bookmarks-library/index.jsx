import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import HeaderNavigation from '../../components/ui/HeaderNavigation';
import ContextualBreadcrumbs from '../../components/ui/ContextualBreadcrumbs';
import BookmarkCard from './components/BookmarkCard';
import BookmarkFilters from './components/BookmarkFilters';
import BulkActions from './components/BulkActions';
import EmptyBookmarksState from './components/EmptyBookmarksState';
import BookmarkStats from './components/BookmarkStats';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const BookmarksLibrary = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [filteredBookmarks, setFilteredBookmarks] = useState([]);
  const [selectedBookmarks, setSelectedBookmarks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('savedDate');
  const [filterBy, setFilterBy] = useState('all');
  const [selectedFolder, setSelectedFolder] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

  // Mock data
  const mockBookmarks = [
    {
      id: 1,
      title: "Revolutionary AI Breakthrough in Healthcare Diagnostics",
      summary: "Scientists develop new AI system that can detect diseases with 99% accuracy, potentially revolutionizing medical diagnostics worldwide.",
      content: `Scientists at leading research institutions have developed a groundbreaking artificial intelligence system that demonstrates unprecedented accuracy in medical diagnostics. The new AI model, trained on millions of medical images and patient data, can identify various diseases and conditions with a remarkable 99% accuracy rate.\n\nThis breakthrough represents a significant leap forward in healthcare technology, potentially transforming how medical professionals diagnose and treat patients. The system has shown particular promise in early detection of cancer, cardiovascular diseases, and neurological conditions.\n\nThe research team spent over five years developing and refining the AI algorithms, incorporating advanced machine learning techniques and neural networks. The system has been tested across multiple hospitals and medical centers, consistently delivering accurate results that match or exceed those of experienced medical professionals.\n\nDr. Sarah Chen, lead researcher on the project, explains that the AI system doesn't replace doctors but rather serves as a powerful diagnostic tool that can help medical professionals make more informed decisions. The technology is expected to be particularly valuable in regions with limited access to specialist medical care.\n\nThe implications of this breakthrough extend beyond individual patient care. Healthcare systems worldwide could benefit from reduced diagnostic errors, faster treatment decisions, and more efficient resource allocation. The technology could also help address the growing shortage of medical specialists in many countries.\n\nRegulatory approval processes are already underway in several countries, with the first commercial implementations expected within the next two years. The research team continues to refine the system and expand its capabilities to cover additional medical conditions and specialties.`,
      category: "Technology",
      source: "TechMed Journal",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
      savedDate: new Date(Date.now() - 86400000 * 2), // 2 days ago
      isRead: false,
      tags: ["AI", "Healthcare", "Innovation"],
      isOfflineAvailable: true,
      syncStatus: "synced"
    },
    {
      id: 2,
      title: "Climate Summit Reaches Historic Global Agreement",
      summary: "World leaders unite on comprehensive climate action plan with binding commitments for carbon neutrality by 2050.",
      content: `In a historic moment for global environmental policy, world leaders from 195 countries have reached a comprehensive agreement on climate action during the latest international climate summit. The agreement includes binding commitments for achieving carbon neutrality by 2050 and represents the most ambitious climate accord in history.\n\nThe negotiations, which lasted for two weeks, addressed critical issues including greenhouse gas emissions reduction, renewable energy transition, and financial support for developing nations. The final agreement includes specific targets for each country based on their current emissions levels and economic capabilities.\n\nKey provisions of the agreement include a commitment to reduce global greenhouse gas emissions by 50% by 2030, compared to 2019 levels. Developed nations have pledged $100 billion annually to support climate adaptation and mitigation efforts in developing countries. The agreement also establishes a new international carbon trading system to help countries meet their emission reduction targets.\n\nEnvironmental groups have praised the agreement as a significant step forward, though some critics argue that the targets may not be ambitious enough to prevent the most severe impacts of climate change. The agreement will require ratification by individual countries' governments before taking effect.\n\nThe summit also featured announcements of major technological breakthroughs in renewable energy and carbon capture technologies. Several countries unveiled new national policies aimed at accelerating the transition to clean energy and reducing dependence on fossil fuels.\n\nImplementation of the agreement will begin immediately, with regular review meetings scheduled to assess progress and adjust targets as needed. The success of this agreement will largely depend on the political will of individual nations and their ability to implement the necessary policy changes.`,
      category: "Politics",
      source: "Global News Network",
      image: "https://images.pexels.com/photos/9324336/pexels-photo-9324336.jpeg?w=400&h=250&fit=crop",
      savedDate: new Date(Date.now() - 86400000 * 5), // 5 days ago
      isRead: true,
      tags: ["Climate", "Politics", "Environment"],
      isOfflineAvailable: false,
      syncStatus: "synced"
    },
    {
      id: 3,
      title: "Tech Giants Report Record Q4 Earnings Despite Market Volatility",
      summary: "Major technology companies exceed analyst expectations with strong quarterly results driven by cloud services and AI investments.",
      content: `Major technology companies have reported exceptional fourth-quarter earnings results, significantly exceeding analyst expectations despite ongoing market volatility and economic uncertainty. The strong performance was primarily driven by robust growth in cloud computing services and strategic investments in artificial intelligence technologies.\n\nLeading tech giants saw revenue increases ranging from 15% to 25% compared to the same quarter last year. Cloud services emerged as the primary growth driver, with enterprise customers increasingly adopting digital transformation strategies and remote work solutions.\n\nArtificial intelligence investments have also begun to show substantial returns, with companies reporting significant improvements in operational efficiency and new revenue streams from AI-powered products and services. The integration of AI technologies across various business segments has created new opportunities for growth and innovation.\n\nDespite global economic challenges, including inflation concerns and supply chain disruptions, technology companies have demonstrated remarkable resilience. Their ability to adapt quickly to changing market conditions and consumer demands has been a key factor in their continued success.\n\nInvestors have responded positively to the earnings reports, with tech stock prices showing significant gains in after-hours trading. Analysts predict continued growth in the technology sector, particularly in areas related to cloud computing, artificial intelligence, and cybersecurity.\n\nThe strong earnings results have also led to increased hiring plans and expanded research and development budgets. Companies are investing heavily in talent acquisition and innovation to maintain their competitive advantages in rapidly evolving markets.\n\nLooking ahead, technology leaders remain optimistic about future growth prospects, citing strong demand for digital solutions and emerging technologies as key drivers for continued expansion.`,
      category: "Business",
      source: "Financial Times",
      image: "https://images.pixabay.com/photo/2016/11/27/21/42/stock-1863880_1280.jpg?w=400&h=250&fit=crop",
      savedDate: new Date(Date.now() - 86400000 * 7), // 1 week ago
      isRead: false,
      tags: ["Business", "Technology", "Earnings"],
      isOfflineAvailable: true,
      syncStatus: "syncing"
    },
    {
      id: 4,
      title: "Olympic Games 2024: Record-Breaking Performances and New Champions",
      summary: "Athletes from around the world deliver spectacular performances, setting new world records and inspiring millions of viewers.",
      content: `The 2024 Olympic Games have concluded with a spectacular display of athletic excellence, featuring record-breaking performances and the emergence of new champions who have captured the hearts of millions of viewers worldwide. The games showcased the pinnacle of human athletic achievement across multiple sports and disciplines.\n\nSeveral world records were shattered during the competition, with athletes pushing the boundaries of what was previously thought possible. Swimming events saw particularly impressive performances, with multiple records falling in both individual and relay competitions. Track and field events also featured outstanding achievements, including new records in sprinting and distance running.\n\nThe games were notable for their emphasis on sustainability and environmental responsibility. Organizers implemented comprehensive green initiatives, including renewable energy sources, waste reduction programs, and sustainable transportation options. These efforts have set new standards for future Olympic events.\n\nTechnology played a significant role in enhancing both athlete performance and viewer experience. Advanced timing systems, virtual reality broadcasts, and real-time performance analytics provided unprecedented insights into athletic achievements. Social media engagement reached record levels, with billions of interactions across various platforms.\n\nThe Paralympic Games that followed continued the tradition of excellence, showcasing the incredible abilities of athletes with disabilities. These events highlighted the importance of inclusivity in sports and inspired countless individuals around the world.\n\nBeyond the competition, the games served as a platform for promoting international cooperation and understanding. Athletes from different countries and cultures came together in the spirit of friendly competition, demonstrating the unifying power of sports.\n\nThe economic impact of the games was substantial, with significant benefits for the host city and country. Tourism, infrastructure development, and international exposure contributed to long-term economic growth and development.`,
      category: "Sports",
      source: "Olympic Broadcasting",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=250&fit=crop",
      savedDate: new Date(Date.now() - 86400000 * 10), // 10 days ago
      isRead: true,
      tags: ["Olympics", "Sports", "Records"],
      isOfflineAvailable: false,
      syncStatus: "synced"
    },
    {
      id: 5,
      title: "Breakthrough in Renewable Energy Storage Technology",
      summary: "New battery technology promises to solve the intermittency problem of renewable energy sources with 10x improved capacity.",
      content: `Researchers have achieved a major breakthrough in renewable energy storage technology with the development of a new battery system that promises to solve one of the biggest challenges facing clean energy adoption. The innovative technology offers ten times the storage capacity of current systems while maintaining cost-effectiveness and environmental sustainability.\n\nThe new battery technology utilizes advanced materials science and novel chemical processes to achieve unprecedented energy density and longevity. Unlike traditional lithium-ion batteries, this system can store energy for extended periods without significant degradation, making it ideal for grid-scale renewable energy storage.\n\nThe breakthrough addresses the intermittency problem that has long plagued renewable energy sources like solar and wind power. By providing reliable, long-term energy storage, the technology enables renewable sources to provide consistent power even when the sun isn't shining or the wind isn't blowing.\n\nField tests conducted over the past year have demonstrated the technology's effectiveness in real-world conditions. The battery systems have shown remarkable stability and efficiency, maintaining over 95% of their storage capacity after thousands of charge-discharge cycles.\n\nCommercial production is expected to begin within the next three years, with initial deployments planned for utility-scale renewable energy projects. The technology could significantly accelerate the global transition to clean energy by making renewable sources more reliable and cost-competitive with fossil fuels.\n\nThe environmental benefits of the new technology extend beyond its renewable energy applications. The battery systems are designed to be fully recyclable, using sustainable materials that minimize environmental impact throughout their lifecycle.\n\nInvestment in the technology has attracted significant interest from major energy companies and government agencies worldwide. The potential market for advanced energy storage systems is projected to reach hundreds of billions of dollars over the next decade.`,
      category: "Science",
      source: "Energy Research Today",
      image: "https://images.pexels.com/photos/9875414/pexels-photo-9875414.jpeg?w=400&h=250&fit=crop",
      savedDate: new Date(Date.now() - 86400000 * 14), // 2 weeks ago
      isRead: false,
      tags: ["Energy", "Science", "Innovation"],
      isOfflineAvailable: true,
      syncStatus: "error"
    }
  ];

  const mockFolders = [
    { id: 'tech', name: 'Technology', count: 2 },
    { id: 'politics', name: 'Politics & Climate', count: 1 },
    { id: 'business', name: 'Business News', count: 1 },
    { id: 'sports', name: 'Sports & Entertainment', count: 1 }
  ];

  const mockStats = {
    total: 5,
    unread: 3,
    read: 2,
    offline: 3,
    thisWeek: 2,
    avgReadingTime: 7,
    mostActiveDay: 'Monday'
  };

  // Initialize data
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setBookmarks(mockBookmarks);
      setFilteredBookmarks(mockBookmarks);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter and sort bookmarks
  useEffect(() => {
    let filtered = [...bookmarks];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(bookmark =>
        bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bookmark.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bookmark.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply category filter
    if (filterBy !== 'all') {
      switch (filterBy) {
        case 'unread':
          filtered = filtered.filter(bookmark => !bookmark.isRead);
          break;
        case 'read':
          filtered = filtered.filter(bookmark => bookmark.isRead);
          break;
        case 'offline':
          filtered = filtered.filter(bookmark => bookmark.isOfflineAvailable);
          break;
      }
    }

    // Apply folder filter
    if (selectedFolder) {
      // In a real app, this would filter by folder assignment
      filtered = filtered.filter(bookmark => {
        switch (selectedFolder) {
          case 'tech':
            return bookmark.category === 'Technology' || bookmark.category === 'Science';
          case 'politics':
            return bookmark.category === 'Politics';
          case 'business':
            return bookmark.category === 'Business';
          case 'sports':
            return bookmark.category === 'Sports';
          default:
            return true;
        }
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'source':
          return a.source.localeCompare(b.source);
        case 'readStatus':
          return a.isRead === b.isRead ? 0 : a.isRead ? 1 : -1;
        case 'savedDate':
        default:
          return new Date(b.savedDate) - new Date(a.savedDate);
      }
    });

    setFilteredBookmarks(filtered);
  }, [bookmarks, searchQuery, sortBy, filterBy, selectedFolder]);

  const handleRemoveBookmark = async (bookmarkId) => {
    setBookmarks(prev => prev.filter(bookmark => bookmark.id !== bookmarkId));
    setSelectedBookmarks(prev => prev.filter(id => id !== bookmarkId));
  };

  const handleToggleRead = async (bookmarkId) => {
    setBookmarks(prev => prev.map(bookmark =>
      bookmark.id === bookmarkId
        ? { ...bookmark, isRead: !bookmark.isRead }
        : bookmark
    ));
  };

  const handleShare = async (bookmark) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: bookmark.title,
          text: bookmark.summary,
          url: `${window.location.origin}/article-detail-page?id=${bookmark.id}`
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`${bookmark.title} - ${window.location.origin}/article-detail-page?id=${bookmark.id}`);
      alert('Link copied to clipboard!');
    }
  };

  const handleSelectBookmark = (bookmarkId, isSelected) => {
    if (isSelected) {
      setSelectedBookmarks(prev => [...prev, bookmarkId]);
    } else {
      setSelectedBookmarks(prev => prev.filter(id => id !== bookmarkId));
    }
  };

  const handleSelectAll = () => {
    setSelectedBookmarks(filteredBookmarks.map(bookmark => bookmark.id));
  };

  const handleDeselectAll = () => {
    setSelectedBookmarks([]);
  };

  const handleBulkDelete = async (bookmarkIds) => {
    setBookmarks(prev => prev.filter(bookmark => !bookmarkIds.includes(bookmark.id)));
    setSelectedBookmarks([]);
  };

  const handleBulkMarkRead = async (bookmarkIds) => {
    setBookmarks(prev => prev.map(bookmark =>
      bookmarkIds.includes(bookmark.id)
        ? { ...bookmark, isRead: true }
        : bookmark
    ));
  };

  const handleBulkMarkUnread = async (bookmarkIds) => {
    setBookmarks(prev => prev.map(bookmark =>
      bookmarkIds.includes(bookmark.id)
        ? { ...bookmark, isRead: false }
        : bookmark
    ));
  };

  const handleBulkMoveToFolder = async (bookmarkIds, folderId) => {
    // In a real app, this would update the folder assignment
    console.log('Moving bookmarks to folder:', bookmarkIds, folderId);
  };

  const handleBulkExport = async (bookmarkIds) => {
    const exportData = bookmarks.filter(bookmark => bookmarkIds.includes(bookmark.id));
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'bookmarks-export.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCreateFolder = async (folderName) => {
    // In a real app, this would create a new folder
    console.log('Creating folder:', folderName);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Loading Bookmarks - NewsHub</title>
        </Helmet>
        <HeaderNavigation />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-neutral-200 rounded w-1/4"></div>
              <div className="h-32 bg-neutral-200 rounded"></div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-32 bg-neutral-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Bookmarks Library - NewsHub</title>
        <meta name="description" content="Manage and organize your saved articles in your personal reading library" />
      </Helmet>

      <HeaderNavigation />

      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ContextualBreadcrumbs />

          {bookmarks.length === 0 ? (
            <EmptyBookmarksState />
          ) : (
            <>
              {/* Page Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-primary mb-2">
                    Bookmarks Library
                  </h1>
                  <p className="text-text-secondary">
                    Manage and organize your saved articles
                  </p>
                </div>

                <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                  <Button
                    variant={viewMode === 'list' ? 'primary' : 'outline'}
                    onClick={() => setViewMode('list')}
                    iconName="List"
                    iconSize={16}
                    className="px-3 py-2"
                  />
                  <Button
                    variant={viewMode === 'grid' ? 'primary' : 'outline'}
                    onClick={() => setViewMode('grid')}
                    iconName="Grid3X3"
                    iconSize={16}
                    className="px-3 py-2"
                  />
                </div>
              </div>

              {/* Stats */}
              <BookmarkStats stats={mockStats} />

              {/* Filters */}
              <BookmarkFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                sortBy={sortBy}
                onSortChange={setSortBy}
                filterBy={filterBy}
                onFilterChange={setFilterBy}
                selectedFolder={selectedFolder}
                onFolderChange={setSelectedFolder}
                folders={mockFolders}
                onCreateFolder={handleCreateFolder}
              />

              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="text-sm text-text-secondary">
                  {filteredBookmarks.length} of {bookmarks.length} bookmarks
                  {searchQuery && ` matching "${searchQuery}"`}
                </div>

                {filteredBookmarks.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      onClick={selectedBookmarks.length > 0 ? handleDeselectAll : handleSelectAll}
                      className="text-xs px-3 py-1"
                      iconName={selectedBookmarks.length > 0 ? "Square" : "CheckSquare"}
                      iconSize={14}
                    >
                      {selectedBookmarks.length > 0 ? 'Deselect All' : 'Select All'}
                    </Button>
                  </div>
                )}
              </div>

              {/* Bookmarks List */}
              {filteredBookmarks.length > 0 ? (
                <div className={`space-y-4 ${viewMode === 'grid' ? 'sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 sm:space-y-0' : ''}`}>
                  {filteredBookmarks.map((bookmark) => (
                    <BookmarkCard
                      key={bookmark.id}
                      bookmark={bookmark}
                      onRemove={handleRemoveBookmark}
                      onToggleRead={handleToggleRead}
                      onShare={handleShare}
                      isSelected={selectedBookmarks.includes(bookmark.id)}
                      onSelect={handleSelectBookmark}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} className="text-text-secondary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    No bookmarks found
                  </h3>
                  <p className="text-text-secondary mb-4">
                    Try adjusting your search or filter criteria
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('');
                      setFilterBy('all');
                      setSelectedFolder('');
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}

              {/* Bulk Actions */}
              <BulkActions
                selectedBookmarks={selectedBookmarks}
                onSelectAll={handleSelectAll}
                onDeselectAll={handleDeselectAll}
                onBulkDelete={handleBulkDelete}
                onBulkMarkRead={handleBulkMarkRead}
                onBulkMarkUnread={handleBulkMarkUnread}
                onBulkMoveToFolder={handleBulkMoveToFolder}
                onBulkExport={handleBulkExport}
                totalBookmarks={filteredBookmarks.length}
                folders={mockFolders}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default BookmarksLibrary;