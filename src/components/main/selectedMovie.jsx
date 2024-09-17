import { useEffect, useState, useRef } from "react";
import StarRating from "../reusableComponents/StarRating.jsx";
import useKey from "../../useKey.js";
function SelectedMovie({
  selectedMovieId,
  onCloseMovie,
  onAddWatchedMovie,
  watched,
}) {
  const [selectedMovieUserRating, setSelectedMovieUserRating] = useState(null);
  const [selectedMovieData, setSelectedMovieData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = selectedMovieData;

  const APIkey = `42e8f174`;
  const url = `http://www.omdbapi.com/?apikey=${APIkey}&i=${selectedMovieId}`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setSelectedMovieData(data);
        setIsLoading(false);
      });
    setIsLoading(true);
  }, [selectedMovieId]);

  const isWatched = watched
    .map((movie) => {
      return movie.imdbID;
    })
    .includes(selectedMovieId);

  const selectedWatchedMovieRating = watched.find((movie) => {
    return movie.imdbID === selectedMovieId;
  })?.userRating;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        document.title = data.Title;
      });

    return function () {
      document.title = "pop-corn";
    };
  }, [selectedMovieId]);

  /* This logic is handling a key press, it will be replaced with a hook */
  // useEffect(() => {
  //   document.body.addEventListener("keydown", keyPressHandler);
  //   function keyPressHandler(event) {
  //     console.log(
  //       "Note that this must be logged once, otherwise there are duplicate EV",
  //       event
  //     );
  //     if (event.key === "Escape") {
  //       onCloseMovie();
  //     }
  //   }
  //   return () => {
  //     document.body.removeEventListener("keydown", keyPressHandler);
  //   };
  // }, [onCloseMovie]);

  /* useKey hook usage */
  useKey("keydown", (event) => {
    console.log(
      "Note that this must be logged once, otherwise there are duplicate EV",
      event
    );
    if (event.key === "Escape") {
      onCloseMovie();
    }
  });
  /* ---------------------- */

  // Create a reference for the selected movie rating
  const movieRatingChangesCount = useRef(0);

  // UseEffect to save an info whenever the movie rating changes
  useEffect(() => {
    if (selectedMovieUserRating) {
      movieRatingChangesCount.current += 1;
    }
  }, [selectedMovieUserRating]);

  useEffect(() => {
    movieRatingChangesCount.current = 0;
  }, [selectedMovieId]);

  return (
    <div className="details">
      <>
        {isLoading ? (
          <h2>Loading</h2>
        ) : (
          <>
            <header>
              <button className="btn-back" onClick={onCloseMovie}>
                &larr;
              </button>
              <img src={poster} alt={`Poster of ${title} movie`} />
              <div className="details-overview">
                <h2>{title}</h2>
                <p>
                  {released} &bull; {runtime}
                </p>
                <p>{genre}</p>
                <p>
                  <span>⭐️</span>
                  {imdbRating} IMDb rating
                </p>
              </div>
            </header>
            <section>
              <div className="rating">
                {!isWatched ? (
                  <>
                    <StarRating
                      maxRating={10}
                      size={24}
                      onSetRating={setSelectedMovieUserRating}
                    />

                    {selectedMovieUserRating > 0 && (
                      <button
                        className="btn-add"
                        onClick={() => {
                          const watchedMovieData = {
                            imdbID: selectedMovieId,
                            title,
                            year,
                            poster,
                            userRating: selectedMovieUserRating,
                            imdbRating: Number(imdbRating),
                            runtime: Number(runtime.split(" ").at(0)),
                            // Adding the reference as a property here when saving the movie
                            movieRatingChangesCount:
                              movieRatingChangesCount.current,
                          };
                          console.log(watchedMovieData);
                          onAddWatchedMovie(watchedMovieData);
                        }}
                      >
                        Add to the list
                      </button>
                    )}
                  </>
                ) : (
                  <p>
                    {`Movie is added to the watched list and rated ${selectedWatchedMovieRating}`}
                  </p>
                )}
              </div>
              <p>
                <em>{plot}</em>
              </p>
              <p>Starring {actors}</p>
              <p>Directed by {director}</p>
            </section>
          </>
        )}
      </>
    </div>
  );
}

export default SelectedMovie;
