import { createContext, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

const MovieScope = createContext();
// not used due to the fact that the API key is public
// const API_KEY = process.env.REACT_APP_MOVIE_DB_API_KEY; // Get the API key from the environment variable
//  this is the context provider that will hold all the state and functionality for the app
export function MovieProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeGenre, setActiveGenre] = useState(0);
  const [header, setHeader] = useState("Trending");
  const API_KEY = process.env.REACT_APP_MOVIE_DB_API_KEY;
  const [totalResults, setTotalResults] = useState(0);

  // pagination state allos for only 10 movies to be displayed per page
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(10);

  // useLocalStorage state
  const [favourites, setFavourites] = useLocalStorage("fav", []);
  const fetchMovies = async (numberOfPages) => {
    let allMovies = [];
    for (let i = 1; i <= numberOfPages; i++) {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=7b189dbd615de6a4b325412a3d2f1c83&language=en-US&page=${i}`
      );
      const data = await response.json();
      allMovies = allMovies.concat(data.results);
    }
    setMovies(allMovies);
    setFiltered(allMovies);
    setTotalResults(allMovies.length);
  };

  // auto fetch trending movies to display on home page
  const getTrending = async () => {
    await fetchMovies(5); // Fetching 5  can change to more
    setHeader("Trending Movies Today");
    setActiveGenre(0);
  };
  const fetchSearchMovies = async (query, numberOfPages) => {
    let allMovies = [];
    for (let i = 1; i <= numberOfPages; i++) {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=7b189dbd615de6a4b325412a3d2f1c83&language=en-US&page=${i}&include_adult=false`
      );
      const data = await response.json();
      allMovies = allMovies.concat(data.results);
    }
    setMovies(allMovies);
    setFiltered(allMovies);
    setTotalResults(allMovies.length);
  };

  const fetchSearch = async (query) => {
    setCurrentPage(1); // reset page number to 0 so it won't break the pagination
    await fetchSearchMovies(query, 50); // Fetching 5 pages as an because the api only allows you to search 20 at a time so you have to recall
    setHeader(`Results for "${query}"`);

    setActiveGenre(0);
  };
  const addToFavourites = (movie) => {
    let isOnArray = false;
    favourites.map((fav) => {
      if (fav.id === movie.id) {
        isOnArray = true;
      }
    });

    if (isOnArray) {
      setFavourites(favourites.filter((fav) => fav.id !== movie.id));
    } else {
      setFavourites((prevState) => [...prevState, movie]);
    }
  };

  const getFavourites = () => {
    setMovies(favourites);
    setFiltered(favourites);
    setHeader("Your favourites");
    setActiveGenre(0);
  };
// checks if movie is in favourites
  const isFav = (id) => {
    let fav = favourites.filter((fav) => fav.id === id);
    return fav.length === 0 ? true : false;
  };

  return (
    <MovieScope.Provider
      value={{
        header,
        setHeader,
        addToFavourites,
        filtered,
        setFiltered,
        getTrending,
        movies,
        setMovies,
        activeGenre,
        setActiveGenre,
        fetchSearch,
        getFavourites,
        isFav,
        totalResults,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </MovieScope.Provider>
  );
}

export default MovieScope;
