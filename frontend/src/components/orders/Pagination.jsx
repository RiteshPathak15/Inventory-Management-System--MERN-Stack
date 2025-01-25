import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center items-center mt-8">
      <button
        onClick={() => handleClick(currentPage - 1)}
        className="px-4 py-2 bg-gray-300 rounded-l-lg"
      >
        Prev
      </button>
      <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
      <button
        onClick={() => handleClick(currentPage + 1)}
        className="px-4 py-2 bg-gray-300 rounded-r-lg"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;