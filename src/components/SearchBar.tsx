import React from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Rechercher des notes..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};