// Pagination.jsx

import React from "react";

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  if (totalPages <= 1) {
    // If there is only one page or no pages, don't render pagination
    return null;
  }

  const pagesToShow = 10; // Adjust the number of pages to show
  const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <button onClick={() => handlePageChange(currentPage - 1)}>
          &lt; Prev
        </button>
      )}

      {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
        <button
          key={startPage + index}
          onClick={() => handlePageChange(startPage + index)}
          className={currentPage === startPage + index ? "active" : ""}
        >
          {startPage + index}
        </button>
      ))}

      {currentPage < totalPages && (
        <button onClick={() => handlePageChange(currentPage + 1)}>
          Next &gt;
        </button>
      )}
    </div>
  );
};

export default Pagination;
