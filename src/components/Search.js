import React, { useState, useContext } from "react";
import { RiSearchLine } from "react-icons/ri";

import MovieScope from "../MovieScope";
// implement search functionality
const Search = () => {
  const [value, setValue] = useState("");
  const { getTrending, fetchSearch } = useContext(MovieScope);
  const onKeyUp = (event) => {
    if (event.key === "Enter" && value !== "") {
      const query = value.trim();
      if (query === "") {
        getTrending();
      } else {
        fetchSearch(query);
      }
      setValue("");
    }
  };
  return (
    <div className="search-box">
      <button className="btn-search">
        <RiSearchLine />
      </button>
      <input
        type="text"
        className="input-search"
        placeholder="Search for a title..."
        onKeyDown={(e) => onKeyUp(e)}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default Search;
