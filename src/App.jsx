import { useEffect, useState } from "react";
import "./App.css";
import { Navbar } from "./components/navbar/navbar";
import { Search } from "./components/navbar/search";
import { NumResults } from "./components/navbar/numResults";
import { Box } from "./components/reusableComponents/box";
import { Main } from "./components/main/mainBody";
import { MovieList } from "./components/main/listBox/moviesList";
import { WatchedSummary } from "./components/main/watchedBBox/watchedSummary";
import { WatchedMoviesList } from "./components/main/watchedBBox/watchedMoviesList";
import SelectedMovie from "./components/main/selectedMovie";
import useMovie from "./useMovies";
import useLocalStorageState from "./useLocalStorageState";
import useKey from "./useKey";

function App() {
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [query, setQuery] = useState("");
  const { movies, isLoading, error } = useMovie(query, handleCloseMovie);
  const [watched, setWatched] = useLocalStorageState({ key: "watched" });

  function handleCloseMovie() {
    setSelectedMovieId(null);
  }
  function handleAddWatchedMovie(movie) {
    setWatched((pre) => {
      return [...pre, movie];
    });
  }

  function handleDelete(id) {
    setWatched((pre) => {
      return pre.filter((movie) => {
        return movie.imdbID !== id;
      });
    });
  }

  return (
    <>
      <Navbar>
        <Search setQuery={setQuery} query={query} />
        <NumResults movies={movies} />
      </Navbar>

      <Main val={document.getElementById("AA")}>
        <Box
          element={
            <>
              {query == "" ? <h2>Search for a movie</h2> : null}
              {isLoading ? (
                <h2>Loading</h2>
              ) : error ? (
                <ErrorMessage message={error} />
              ) : (
                <MovieList
                  movies={movies}
                  setSelectedMovieId={setSelectedMovieId}
                />
              )}
            </>
          }
        />
        <Box
          element={
            <>
              {selectedMovieId ? (
                <SelectedMovie
                  selectedMovieId={selectedMovieId} // my approach --> pass the setter to the child and create the handler there
                  onCloseMovie={handleCloseMovie} // jonas approach --> create the handler in the parent and pass it to the child
                  onAddWatchedMovie={handleAddWatchedMovie}
                  watched={watched}
                />
              ) : (
                <>
                  <WatchedSummary watched={watched} />
                  <WatchedMoviesList
                    watched={watched}
                    onDelete={handleDelete}
                  />
                </>
              )}
            </>
          }
        />
      </Main>
    </>
  );
}

export default App;

// Simple component for errors
function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>📛</span> {message}
    </p>
  );
}
