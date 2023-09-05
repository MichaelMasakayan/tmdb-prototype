import React, { useContext, useEffect } from "react";
import Movie from "./Movie";
import MovieScope from "../MovieScope";
import { motion } from "framer-motion";

// function for pagination
const PaginationControls = ({
  currentPage,
  handlePageChange,
  hasMoreMovies,
}) => (
  <nav aria-label="Page navigation example" className="mt-4">
    <ul className="pagination justify-content-center">
      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
        <a
          className="page-link"
          href="#"
          aria-label="Previous"
          onClick={(e) => {
            e.preventDefault();
            handlePageChange("prev");
          }}
        >
          <span aria-hidden="true">&laquo;</span>
          <span className="sr-only">Previous</span>
        </a>
      </li>
      <li className="page-item">
        <span className="page-link">{currentPage}</span>
      </li>
      <li className={`page-item ${!hasMoreMovies ? "disabled" : ""}`}>
        <a
          className="page-link"
          href="#"
          aria-label="Next"
          onClick={(e) => {
            e.preventDefault();
            handlePageChange("next");
          }}
        >
          <span aria-hidden="true">&raquo;</span>
          <span className="sr-only">Next</span>
        </a>
      </li>
    </ul>
  </nav>
);
// movielist component that will hold the movie cards in the scope
const MoviesList = () => {
  const {
    filtered,
    getTrending,
    header,
    currentPage,
    setCurrentPage,
    totalResults,
  } = useContext(MovieScope);

  useEffect(() => {
    if (header === "Trending") {
      getTrending();
    }
  }, [header, currentPage]); // Added currentPage to the dependency array

  // Function to handle page change
  const handlePageChange = (direction) => {
    if (direction === "next") {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const hasMoreMovies = filtered.length > currentPage * 10;

  return (
    <>
      <motion.div layout className="trending-movies">
        {filtered
          .slice((currentPage - 1) * 10, currentPage * 10)
          .map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))}
      </motion.div>
      {filtered.length === 0 && <p className="info">No movies to display</p>}
      {/* page controls function */}
      <PaginationControls
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        hasMoreMovies={hasMoreMovies}
      />
      <div className="total-results">Total Results: {totalResults}</div>
    </>
  );
};

export default MoviesList;
