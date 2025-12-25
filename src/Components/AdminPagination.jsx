import React from 'react';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';

const AdminPagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  loading = false,
  compact = false
}) => {
  if (totalPages <= 1) return null;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = compact ? 3 : 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
      const end = Math.min(totalPages, start + maxVisible - 1);
      
      if (start > 1) {
        pages.push(1);
        if (start > 2) pages.push('...');
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (end < totalPages) {
        if (end < totalPages - 1) pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={`admin-pagination ${compact ? 'compact' : ''} ${loading ? 'pagination-loading' : ''}`}>
      <div className="pagination-info">
        <Info className="info-icon" />
        <span>
          Showing {startIndex + 1} to {endIndex} of {totalItems} results
        </span>
      </div>
      
      <div className="pagination-controls">
        {/* Previous Button */}
        <button
          className="pagination-btn nav-btn prev"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || loading}
        >
          <ChevronLeft className="btn-icon" />
          <span>Previous</span>
        </button>
        
        {/* Page Numbers */}
        <div className="pagination-numbers">
          {pageNumbers.map((page, index) => (
            page === '...' ? (
              <div key={`ellipsis-${index}`} className="pagination-ellipsis">
                ...
              </div>
            ) : (
              <button
                key={page}
                className={`pagination-btn page-number ${currentPage === page ? 'active' : ''}`}
                onClick={() => onPageChange(page)}
                disabled={loading}
              >
                {page}
              </button>
            )
          ))}
        </div>
        
        {/* Next Button */}
        <button
          className="pagination-btn nav-btn next"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || loading}
        >
          <span>Next</span>
          <ChevronRight className="btn-icon" />
        </button>
      </div>
    </div>
  );
};

export default AdminPagination;