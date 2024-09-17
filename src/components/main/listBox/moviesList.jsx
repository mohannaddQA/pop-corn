import { Movie } from "./movie";

export function MovieList({ movies, setSelectedMovieId }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          setSelectedMovieId={setSelectedMovieId}
        />
      ))}
    </ul>
  );
}
