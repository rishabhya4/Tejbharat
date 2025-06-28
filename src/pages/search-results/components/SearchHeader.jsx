import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchHeader = ({ onQueryChange, onFiltersChange }) => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches] = useState([
    'climate change summit',
    'tech earnings report',
    'artificial intelligence',
    'olympic games 2024'
  ]);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const mockSuggestions = [
    'artificial intelligence breakthrough',
    'climate change policy',
    'cryptocurrency regulation',
    'renewable energy investment',
    'space exploration mission',
    'healthcare innovation'
  ];

  useEffect(() => {
    const currentQuery = searchParams.get('q') || '';
    setQuery(currentQuery);
    if (onQueryChange) {
      onQueryChange(currentQuery);
    }
  }, [searchParams, onQueryChange]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length > 0) {
      const filtered = mockSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearch = (searchQuery = query) => {
    if (searchQuery.trim()) {
      navigate(`/search-results?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    handleSearch(suggestion);
  };

  const handleClearSearch = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    navigate('/search-results');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-background border-b border-border sticky top-16 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div ref={containerRef} className="relative max-w-2xl mx-auto">
          <div className="relative">
            <Input
              ref={inputRef}
              type="search"
              placeholder="Search news articles..."
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="w-full pl-12 pr-12 py-3 text-lg bg-surface border-2 border-border rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-200"
              autoComplete="off"
            />
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Icon name="Search" size={20} className="text-text-secondary" />
            </div>
            {query && (
              <Button
                variant="ghost"
                onClick={handleClearSearch}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-secondary hover:text-primary"
                aria-label="Clear search"
              >
                <Icon name="X" size={20} />
              </Button>
            )}
          </div>

          {/* Search Suggestions */}
          {showSuggestions && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
              {suggestions.length > 0 ? (
                <div className="py-2">
                  <div className="px-4 py-2 text-xs font-semibold text-text-secondary uppercase tracking-wide">
                    Suggestions
                  </div>
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-surface transition-colors duration-200"
                    >
                      <Icon name="Search" size={16} className="text-text-secondary flex-shrink-0" />
                      <span className="text-sm text-primary">{suggestion}</span>
                    </button>
                  ))}
                </div>
              ) : query.length === 0 && recentSearches.length > 0 ? (
                <div className="py-2">
                  <div className="px-4 py-2 text-xs font-semibold text-text-secondary uppercase tracking-wide">
                    Recent Searches
                  </div>
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(search)}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-surface transition-colors duration-200"
                    >
                      <Icon name="Clock" size={16} className="text-text-secondary flex-shrink-0" />
                      <span className="text-sm text-primary">{search}</span>
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;