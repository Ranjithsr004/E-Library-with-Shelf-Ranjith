import React, { useEffect, useState, useCallback } from 'react';
import BookTable from '../BookTable/BookTable';
import SearchBar from '../SearchBar/SearchBar';
import Pagination from '../Pagination/Pagination';
import Spinner from '../Spinner/Spinner';
import { CSVLink } from 'react-csv';
import { auth } from '../Authenticate/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Navbar from '../Navbar/Navbar';

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [authorQuery, setAuthorQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  const fetchAuthorDetails = async (authorKey) => {
    try {
      const response = await fetch(`https://openlibrary.org/authors/${authorKey}.json`);
      const data = await response.json();
      return {
        birth_date: data.birth_date || 'N/A',
        top_work: data.top_work || 'N/A'
      };
    } catch (error) {
      console.error('Error fetching author details:', error);
      return {
        birth_date: 'N/A',
        top_work: 'N/A'
      };
    }
  };

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      let apiUrl = `https://openlibrary.org/search.json?`;
      if (authorQuery) {
        apiUrl += `author=${authorQuery}&`;
      } else {
        apiUrl += `q=${searchQuery}&`;
      }
      apiUrl += `page=${currentPage}&limit=${booksPerPage}`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      const booksWithDetails = await Promise.all(data.docs.map(async (book) => {
        if (book.author_key && book.author_key.length > 0) {
          const authorDetails = await fetchAuthorDetails(book.author_key[0]);
          return {
            ...book,
            author_birth_date: authorDetails.birth_date,
            author_top_work: authorDetails.top_work,
            author_name: book.author_name ? book.author_name[0] : 'N/A'
          };
        } else {
          return {
            ...book,
            author_birth_date: 'N/A',
            author_top_work: 'N/A',
            author_name: book.author_name ? book.author_name[0] : 'N/A'
          };
        }
      }));

      setBooks(booksWithDetails);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, currentPage, booksPerPage, authorQuery]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleAddToShelf = (book) => {
    const shelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    shelf.push(book);
    localStorage.setItem('bookshelf', JSON.stringify(shelf));
  };

  return (
    <div>
      <Navbar user={user} />
      <div className="container mx-auto p-4">
        <SearchBar setSearchQuery={setSearchQuery} setAuthorQuery={setAuthorQuery} />
        {loading ? <Spinner /> : <BookTable books={books} onAddToShelf={handleAddToShelf} />}
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          booksPerPage={booksPerPage}
          setBooksPerPage={setBooksPerPage}
        />
        <CSVLink data={books} filename={"book_data.csv"}>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4">
            Download CSV
          </button>
        </CSVLink>
      </div>
    </div>
  );
};

export default Dashboard;
