import React, { useState } from "react";

function SearchBar({ onSearch, loading }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) {
      return;
    }
    onSearch(trimmed);
  };

  return (
    <header className="searchbar">
      <h1 className="searchbar__title">City Weather</h1>
      <form className="searchbar__form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search city..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Search"}
        </button>
      </form>
    </header>
  );
}

export default SearchBar;
