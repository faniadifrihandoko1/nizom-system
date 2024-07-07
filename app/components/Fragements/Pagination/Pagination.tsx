import React from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

interface Props {
  page: number;
  totalPages: number;
  handlePreviousPage?: () => void;
  handleNextPage?: () => void;
  handlePageClick?: (pageNumber: number) => void;
}

export const Pagination = ({
  page,
  totalPages,
  handlePreviousPage,
  handleNextPage,
  handlePageClick,
}: Props) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageClick && handlePageClick(i)}
          className={`px-3 py-1  ${
            page === i
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
          }`}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-center items-center gap-2 py-4">
      <button
        onClick={handlePreviousPage}
        disabled={page <= 1}
        className={`flex items-center justify-center w-8 h-8  ${
          page <= 1
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-700"
        } text-white`}
      >
        <HiOutlineChevronLeft size={24} />
      </button>
      {renderPageNumbers()}
      <button
        onClick={handleNextPage}
        disabled={page >= totalPages}
        className={`flex items-center justify-center w-8 h-8  ${
          page >= totalPages
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-700"
        } text-white`}
      >
        <HiOutlineChevronRight size={24} />
      </button>
    </div>
  );
};
