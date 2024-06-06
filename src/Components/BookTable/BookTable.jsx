import React, { useState } from 'react';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';

const BookTable = ({ books, onAddToShelf }) => {
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [clickedButtons, setClickedButtons] = useState({});

  const sortedBooks = [...books].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? <FiArrowUp className="inline-block align-middle" /> : <FiArrowDown className="inline-block align-middle" />;
    }
    return null;
  };
  const handleAddToShelf = (book) => {
    setClickedButtons((prevClickedButtons) => ({
      ...prevClickedButtons,
      [book.title]: true,
    }));
    onAddToShelf(book);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-800 text-white text-left">
            <th className="py-2 px-4" onClick={() => requestSort('ratings_average')}>
              Ratings Average {getSortIcon('ratings_average')}
            </th>
            <th className="py-2 px-4" onClick={() => requestSort('author_name')}>
              Author Name {getSortIcon('author_name')}
            </th>
            <th className="py-2 px-4" onClick={() => requestSort('title')}>
              Title {getSortIcon('title')}
            </th>
            <th className="py-2 px-4" onClick={() => requestSort('first_publish_year')}>
              First Publish Year {getSortIcon('first_publish_year')}
            </th>
            <th className="py-2 px-4" onClick={() => requestSort('subject')}>
              Subject {getSortIcon('subject')}
            </th>
            <th className="py-2 px-4" onClick={() => requestSort('author_birth_date')}>
              Author Birth Date {getSortIcon('author_birth_date')}
            </th>
            <th className="py-2 px-4" onClick={() => requestSort('author_top_work')}>
              Author Top Work {getSortIcon('author_top_work')}
            </th>
            <th className="py-2 px-4">Add to Shelf</th>
          </tr>
        </thead>
        <tbody>
          {sortedBooks.map((book, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
              <td className="py-3 px-4">{book.ratings_average || 'N/A'}</td>
              <td className="py-3 px-4">{book.author_name || 'N/A'}</td>
              <td className="py-3 px-4">{book.title || 'N/A'}</td>
              <td className="py-3 px-4">{book.first_publish_year || 'N/A'}</td>
              <td className="py-3 px-4">{book.subject ? book.subject.join(', ') : 'N/A'}</td>
              <td className="py-3 px-4">{book.author_birth_date || 'N/A'}</td>
              <td className="py-3 px-4">{book.author_top_work || 'N/A'}</td>
              <td className="py-3 px-4">
              <button
                  onClick={() => handleAddToShelf(book)}
                  className={`font-bold py-2 px-4 rounded ${clickedButtons[book.title] ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-700'} text-white`}
                  disabled={clickedButtons[book.title]} // Disable button after click
                >
                  {clickedButtons[book.title] ? 'Added' : 'Add'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;
