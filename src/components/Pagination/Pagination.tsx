
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, limit, total, onPageChange }) => {
  // Calcular o número total de páginas
  const totalPages = Math.ceil(total / limit);

  const handlePreviousPage = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) onPageChange(page + 1);
  };

  const handlePageClick = (newPage: number) => {
    onPageChange(newPage);
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-between pt-4 w-fit ml-auto">
      <button
        onClick={handlePreviousPage}
        disabled={page === 1}
        className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
      >
        <FaChevronLeft size={12} />
      </button>

      <div className="flex items-center space-x-2">
        {pageNumbers.map((num) => (
          <button
            key={num}
            onClick={() => handlePageClick(num)}
            className={`size-6 rounded-md font-medium text-xs ${
              num === page
                ? "bg-[#3e4676] text-white"
                : "bg-white text-gray-700 hover:bg-gray-200"
            }`}
          >
            {num}
          </button>
        ))}
      </div>

      <button
        onClick={handleNextPage}
        disabled={page === totalPages}
        className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
      >
        <FaChevronRight  size={12} />
      </button>
    </div>
  );
};

export default Pagination;
