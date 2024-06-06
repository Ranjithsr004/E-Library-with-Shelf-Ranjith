import React from 'react';

const Pagination = ({ currentPage, setCurrentPage, booksPerPage, setBooksPerPage }) => {
  return (
    <div className="flex justify-between items-center mt-4">
      <div>
        <label htmlFor="booksPerPage" className="mr-2">Books per page:</label>
        <select
          id="booksPerPage"
          value={booksPerPage}
          onChange={(e) => setBooksPerPage(Number(e.target.value))}
          className="border p-2"
        >
          <option value={10}>10</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
      <div>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 bg-gray-300 text-gray-700 mr-2"
        >
          Previous
        </button>
        <span className="mx-2">{currentPage}</span>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="p-2 bg-blue-500 text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
