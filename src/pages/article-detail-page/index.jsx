import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import HeaderNavigation from '../../components/ui/HeaderNavigation';
import ContextualBreadcrumbs from '../../components/ui/ContextualBreadcrumbs';
import ArticleHeader from './components/ArticleHeader';
import ArticleContent from './components/ArticleContent';
import FloatingToolbar from './components/FloatingToolbar';
// import RelatedArticles from './components/RelatedArticles';
// import TrendingTopics from './components/TrendingTopics';
import LoadingState from './components/LoadingState';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const ArticleDetailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [error, setError] = useState(null);

  const articleId = searchParams.get('id');
  const articleTitle = searchParams.get('title');
  const articleCategory = searchParams.get('category');

  // Mock article data
  const mockArticles = [
    {
      id: "1",
      title: "Revolutionary AI Breakthrough Changes Everything We Know About Machine Learning",
      summary: "Scientists at leading tech companies have developed a new artificial intelligence system that demonstrates unprecedented capabilities in understanding and generating human-like responses across multiple domains.",
      content: `In a groundbreaking development that could reshape the landscape of artificial intelligence, researchers have unveiled a revolutionary AI system that demonstrates capabilities previously thought to be decades away.\n\nThe new system, developed through a collaboration between leading technology companies and academic institutions, represents a significant leap forward in machine learning architecture. Unlike previous AI models that were designed for specific tasks, this breakthrough system exhibits remarkable versatility across multiple domains.\n\n"What we're seeing here is not just an incremental improvement, but a fundamental shift in how AI systems can understand and interact with the world," explains Dr. Sarah Chen, lead researcher on the project. "The implications for industries ranging from healthcare to education are profound."\n\nThe system's most impressive feature is its ability to understand context and nuance in ways that previous AI models struggled with. During testing, it demonstrated sophisticated reasoning capabilities, creative problem-solving skills, and an understanding of complex ethical considerations.\n\nEarly applications of the technology are already showing promise in medical diagnosis, where the AI has successfully identified rare conditions that human doctors initially missed. In educational settings, the system has proven capable of adapting its teaching methods to individual learning styles.\n\nHowever, the development has also raised important questions about the future of work and the need for robust AI safety measures. Industry experts emphasize the importance of responsible deployment and continued research into AI alignment.\n\n"This breakthrough represents both tremendous opportunity and significant responsibility," notes Dr. Michael Rodriguez, an AI ethics researcher. "We must ensure that as we advance these capabilities, we do so with careful consideration of their impact on society."\n\nThe research team plans to continue refining the system while working closely with policymakers and ethicists to establish guidelines for its responsible use. Commercial applications are expected to begin rolling out within the next two years, starting with carefully controlled pilot programs in healthcare and education.\n\nAs the AI revolution continues to accelerate, this latest breakthrough serves as both a testament to human ingenuity and a reminder of the importance of thoughtful, ethical development in emerging technologies.`,
      category: "Technology",
      author: {
        name: "Dr. Sarah Chen",
        role: "Senior Technology Reporter",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      source: {
        name: "TechNews Daily",
        logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=50&h=50&fit=crop"
      },
      imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
      publishedAt: "2024-01-15T10:30:00Z",
      readingTime: 8,
      views: "2.1k"
    },
    {
      id: "2",
      title: "Global Climate Summit Reaches Historic Agreement on Carbon Emissions",
      summary: "World leaders unite in unprecedented commitment to reduce global carbon emissions by 50% within the next decade, marking a turning point in international climate action.",
      content: `In a historic moment for global environmental policy, representatives from 195 countries have reached a landmark agreement at the Global Climate Summit, committing to ambitious carbon emission reduction targets that exceed all previous international accords.\n\nThe agreement, formally known as the Global Carbon Reduction Pact, establishes binding commitments for participating nations to reduce their carbon emissions by 50% within the next decade, with interim targets of 25% reduction by 2027.\n\n"Today marks a turning point in our collective fight against climate change," declared Summit President Maria Gonzalez during the closing ceremony. "For the first time in history, we have achieved truly global consensus on the urgent action needed to protect our planet for future generations."\n\nThe pact includes several groundbreaking provisions that distinguish it from previous climate agreements. Most notably, it establishes a global carbon trading system that will allow countries to buy and sell emission credits, creating economic incentives for rapid decarbonization.\n\nAdditionally, the agreement includes a $500 billion Global Climate Fund, contributed by developed nations, to support developing countries in their transition to renewable energy sources. This fund represents the largest international climate financing commitment in history.\n\nKey provisions of the agreement include mandatory renewable energy targets, with all signatory nations committing to generate at least 70% of their electricity from renewable sources by 2030. The pact also establishes strict regulations on deforestation and includes provisions for reforestation projects worldwide.\n\nThe private sector has responded enthusiastically to the agreement, with major corporations announcing new sustainability initiatives within hours of the pact's signing. Technology companies have pledged to accelerate development of clean energy solutions, while automotive manufacturers have committed to faster timelines for electric vehicle adoption.\n\nEnvironmental groups, while cautiously optimistic, emphasize that the real test will be in implementation. "This agreement represents unprecedented political will," says Dr. James Thompson, director of the Global Environmental Institute. "Now we must ensure that these commitments translate into concrete action."\n\nThe agreement includes robust monitoring and enforcement mechanisms, with annual reviews and potential economic sanctions for countries that fail to meet their targets. Independent international bodies will oversee compliance and provide technical assistance to nations struggling to meet their commitments.\n\nAs the world begins to implement this historic agreement, the focus now shifts to the practical challenges of transforming global energy systems while maintaining economic growth and social stability.`,
      category: "Politics",
      author: {
        name: "Maria Gonzalez",
        role: "Environmental Correspondent",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      source: {
        name: "Global News Network",
        logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=50&h=50&fit=crop"
      },
      imageUrl: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e5?w=800&h=400&fit=crop",
      publishedAt: "2024-01-14T14:20:00Z",
      readingTime: 12,
      views: "5.7k"
    },
    {
      id: "3",
      title: "Stock Markets Surge Following Federal Reserve Interest Rate Decision",
      summary: "Major stock indices reach record highs as investors respond positively to the Federal Reserve's decision to maintain current interest rates while signaling potential future cuts.",
      content: `Financial markets experienced their strongest rally in months following the Federal Reserve's latest monetary policy announcement, with major indices closing at record highs as investors celebrated the central bank's dovish stance on future interest rate policy.\n\nThe Dow Jones Industrial Average surged 2.3% to close at 38,547 points, while the S&P 500 gained 2.1% and the technology-heavy Nasdaq Composite jumped 2.8%. The rally was broad-based, with all major sectors participating in the advance.\n\nFederal Reserve Chairman Jerome Powell's post-meeting press conference struck a notably optimistic tone, citing improving inflation trends and a resilient labor market as key factors in the committee's decision to hold rates steady at their current range of 5.25% to 5.50%.\n\n"The data we're seeing suggests that our monetary policy is working as intended," Powell explained to reporters. "Inflation continues to move toward our 2% target while the labor market remains robust, giving us confidence in our current approach."\n\nThe Fed's accompanying statement hinted at potential rate cuts later in the year if economic conditions continue to improve, a signal that sent bond yields lower and further fueled the equity rally. The 10-year Treasury yield fell to 4.12%, its lowest level in three months.\n\nTechnology stocks led the advance, with artificial intelligence companies posting particularly strong gains. Semiconductor manufacturers saw their shares rise by an average of 4.2%, while software companies gained 3.8% on average.\n\nThe banking sector also performed well, with regional banks posting gains despite the prospect of lower interest rates. Analysts attributed this to expectations that rate cuts would reduce the sector's funding costs and potentially stimulate loan demand.\n\n"This is exactly what the market was hoping to hear," said Jennifer Walsh, chief investment strategist at Capital Markets Research. "The Fed is threading the needle perfectly, maintaining their inflation-fighting credibility while acknowledging that the economy is strong enough to handle a more accommodative stance."\n\nInternational markets also responded positively to the Fed's announcement, with European indices closing higher and Asian markets opening strongly in overnight trading. The dollar weakened against major currencies, providing additional support for multinational companies.\n\nLooking ahead, investors will be closely watching upcoming economic data releases, particularly employment figures and inflation readings, for further clues about the timing and magnitude of potential rate cuts. Options markets are currently pricing in a 70% probability of at least one rate cut by mid-year.`,
      category: "Business",
      author: {
        name: "Robert Kim",
        role: "Financial Markets Reporter",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      source: {
        name: "Financial Times",
        logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=50&h=50&fit=crop"
      },
      imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop",
      publishedAt: "2024-01-13T16:45:00Z",
      readingTime: 6,
      views: "3.2k"
    }
  ];

  useEffect(() => {
    const loadArticle = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const foundArticle = mockArticles.find(a => a.id === articleId);
        
        if (!foundArticle) {
          setError("Article not found");
          return;
        }

        setArticle(foundArticle);
        
        // Check if article is bookmarked (simulate from localStorage)
        const bookmarks = JSON.parse(localStorage.getItem('bookmarkedArticles') || '[]');
        setIsBookmarked(bookmarks.includes(articleId));
        
      } catch (err) {
        setError("Failed to load article");
      } finally {
        setIsLoading(false);
      }
    };

    if (articleId) {
      loadArticle();
    } else {
      setError("No article ID provided");
      setIsLoading(false);
    }
  }, [articleId]);

  const handleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedArticles') || '[]');
    
    if (isBookmarked) {
      const updatedBookmarks = bookmarks.filter(id => id !== articleId);
      localStorage.setItem('bookmarkedArticles', JSON.stringify(updatedBookmarks));
      setIsBookmarked(false);
    } else {
      const updatedBookmarks = [...bookmarks, articleId];
      localStorage.setItem('bookmarkedArticles', JSON.stringify(updatedBookmarks));
      setIsBookmarked(true);
    }
  };

  const handleShare = (platform, article) => {
    const url = window.location.href;
    const text = `Check out this article: ${article.title}`;
    
    switch (platform) {
      case 'Twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'Facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'LinkedIn':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'WhatsApp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
        break;
      case 'Copy Link':
        navigator.clipboard.writeText(url);
        // You could add a toast notification here
        break;
      default:
        break;
    }
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/news-homepage');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <HeaderNavigation />
        <main className="pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <LoadingState />
          </div>
        </main>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-background">
        <HeaderNavigation />
        <main className="pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-12">
              <Icon name="AlertCircle" size={48} className="text-error mx-auto mb-4" />
              <h1 className="text-2xl font-heading font-bold text-primary mb-2">
                {error || "Article Not Found"}
              </h1>
              <p className="text-text-secondary mb-6">
                The article you're looking for doesn't exist or has been removed.
              </p>
              <Button
                variant="primary"
                onClick={handleGoBack}
                iconName="ArrowLeft"
                iconPosition="left"
              >
                Go Back
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <HeaderNavigation />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={handleGoBack}
              iconName="ArrowLeft"
              iconPosition="left"
              className="text-text-secondary hover:text-primary"
            >
              Back
            </Button>
          </div>

          {/* Breadcrumbs */}
          <ContextualBreadcrumbs />

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Article Content */}
            <div className="lg:col-span-2">
              <ArticleHeader
                article={article}
                onBookmark={handleBookmark}
                isBookmarked={isBookmarked}
              />
              
              <ArticleContent
                content={article.content}
                readingTime={article.readingTime}
              />
            </div>

            {/* Sidebar */}
            {/* <div className="space-y-6">
              <RelatedArticles
                articles={mockArticles}
                currentArticleId={article.id}
              />
              
              <TrendingTopics />
            </div> */}
          </div>
        </div>
      </main>

      {/* Floating Toolbar */}
      <FloatingToolbar
        article={article}
        onShare={handleShare}
        onBookmark={handleBookmark}
        isBookmarked={isBookmarked}
      />
    </div>
  );
};

export default ArticleDetailPage;