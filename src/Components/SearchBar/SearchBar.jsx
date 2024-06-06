import React, { useState } from 'react';

const SearchBar = ({ setSearchQuery, setAuthorQuery }) => {
  const [input, setInput] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(input);
  };

  const handleAuthorSearch = (e) => {
    e.preventDefault();
    setAuthorQuery(input);
  };

  return (
    <form className="mb-4 flex">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search by author or title"
        className="border p-2 mr-2 flex-grow"
      />
      <button type="submit" onClick={handleSearch} className="p-2 bg-blue-500 text-white mr-2">Search</button>
      <button type="submit" onClick={handleAuthorSearch} className="p-2 bg-blue-500 text-white">Search by Author</button>
    </form>
  );
};

export default SearchBar;
