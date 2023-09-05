import React from "react";
import { useContext } from "react";
import MovieScope from "../MovieScope";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { motion } from "framer-motion";
import defaultImage from "../assets/noPoster.png";

function Movie({ movie }) {
  const { addToFavourites, isFav } = useContext(MovieScope);

  return (
    // this is the movie card that displays the movie title, poster, overview and release date
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      layout
      className="movie"
    >
      {/* this is the link to the movie details page */}
      <div className="title-and-star" onClick={() => addToFavourites(movie)}>
        <h5 className="movie-title">{movie.title}</h5>
        {isFav(movie.id) ? <AiOutlineStar /> : <AiFillStar />}
      </div>
      <div onClick={() => addToFavourites(movie)}>
        {movie.poster_path !== null ? (
          <img src={"https://image.tmdb.org/t/p/w300" + movie.poster_path} />
        ) : (
          <img src={defaultImage} />
        )}
      </div>
      <div className="overview-section">
        <h4>Overview</h4>
        {/* displays overview of each movie but cuts off the description at 200 characters */}
        <p>
          {movie.overview.substring(0, 200)}
          {movie.overview.length > 100 ? "..." : ""}
        </p>
        <span className="release-date">Release Date: {movie.release_date}</span>
      </div>
    </motion.div>
  );
}

export default Movie;
