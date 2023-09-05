import React from "react";
import Header from "./Header";
import MoviesList from "./MoviesList";
import Search from "./Search";
// holds the search bar, header and movie list components
const Container = () => {
  return (
    <div className="container">
      <Search />
      <Header />
      <MoviesList />
    </div>
  );
};

export default Container;
