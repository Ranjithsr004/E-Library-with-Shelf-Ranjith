import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Bookshelf = () => {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const storedBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    setBookshelf(storedBookshelf);
  }, []); 

  return (
    <div>
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/dashboard">
          <div className="flex items-center">
            <img src="/logo1.png" alt="Logo" className="h-8 mr-2" />
            <span className="text-white text-lg font-bold hidden md:inline">Ranjith E-Library</span>
          </div>
        </Link>
        <div className="flex items-center">
            <Link to="/dashboard" className="text-white ml-4 bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-md">Home</Link>
        </div>
        </div>
    </nav>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Bookshelf</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {bookshelf.map((book, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold mb-2">{book.title}</h2>
            <p><strong>Author:</strong> {book.author_name}</p>
            <p><strong>Ratings Average:</strong> {book.ratings_average || 'N/A'}</p>
            <p><strong>First Publish Year:</strong> {book.first_publish_year || 'N/A'}</p>
            <p><strong>Subject:</strong> {book.subject ? book.subject.join(', ') : 'N/A'}</p>
            <p><strong>Author Birth Date:</strong> {book.author_birth_date || 'N/A'}</p>
            <p><strong>Author Top Work:</strong> {book.author_top_work || 'N/A'}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Bookshelf;
