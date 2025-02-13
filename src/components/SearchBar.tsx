'use client';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center">
        <FontAwesomeIcon 
          icon={faSearch} 
          className="absolute left-4 text-gray-400 text-lg"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher une recette, un ingrédient..."
          className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-250 
                     focus:outline-none focus:border-amber-400 focus:ring-1 
                     focus:ring-amber-400 text-lg placeholder-gray-400
                     shadow-sm hover:shadow-lg transition-shadow"
        />
        <button
          type="submit"
          className="absolute right-4 bg-amber-400 text-white px-6 py-2 
                     rounded-full hover:bg-amber-500 transition-colors
                     font-medium text-sm"
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </form>
  );
}
