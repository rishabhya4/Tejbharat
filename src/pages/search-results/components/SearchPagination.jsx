import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchPagination = ({ currentPage, totalPages, totalResults, resultsPerPage, onPageChange }) => {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const getResultsRange = () => {
    const start = (currentPage - 1) * resultsPerPage + 1;
    const end = Math.min(currentPage * resultsPerPage, totalResults);
    return { start, end };
  };

  const { start, end } = getResultsRange();
  const visiblePages = getVisiblePages();

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Results Info */}
          <div className="text-sm text-text-secondary">
            Showing <span className="font-medium text-primary">{start.toLocaleString()}</span> to{' '}
            <span className="font-medium text-primary">{end.toLocaleString()}</span> of{' '}
            <span className="font-medium text-primary">{totalResults.toLocaleString()}</span> results
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center space-x-2">
            {/* Previous Button */}
            <Button
              variant="outline"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center space-x-2 px-3 py-2"
              aria-label="Previous page"
            >
              <Icon name="ChevronLeft" size={16} />
              <span className="hidden sm:inline">Previous</span>
            </Button>

            {/* Page Numbers */}
            <div className="flex items-center space-x-1">
              {visiblePages.map((page, index) => (
                <React.Fragment key={index}>
                  {page === '...' ? (
                    <span className="px-3 py-2 text-text-secondary">...</span>
                  ) : (
                    <Button
                      variant={currentPage === page ? "primary" : "ghost"}
                      onClick={() => onPageChange(page)}
                      className="w-10 h-10 p-0 flex items-center justify-center"
                      aria-label={`Go to page ${page}`}
                      aria-current={currentPage === page ? "page" : undefined}
                    >
                      {page}
                    </Button>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Next Button */}
            <Button
              variant="outline"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center space-x-2 px-3 py-2"
              aria-label="Next page"
            >
              <span className="hidden sm:inline">Next</span>
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>
        </div>

        {/* Mobile Page Info */}
        <div className="sm:hidden mt-4 text-center">
          <span className="text-sm text-text-secondary">
            Page {currentPage} of {totalPages}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchPagination;