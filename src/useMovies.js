import { useEffect, useState } from "react";

function useMovies(query, callback) {
  /*
  Executing the callback here will result in an infinite loop, 
  because if it contains a setstate it will be like directly setting the state in the body of the component.
  We have to think of that
  */

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  const APIkey = `42e8f174`;
  const url = `https://www.omdbapi.com/?apikey=${APIkey}&s=${query}`;

  useEffect(
    function () {
      // Before any execution, execute the callback on each query change
      callback();

      setIsLoading(true);
      setError("");
      const abortController = new AbortController();
      if (query.length) {
        (async () => {
          try {
            const res = await fetch(url, { signal: abortController.signal });

            if (!res.ok) {
              throw new Error("Something went wrong with fetching movies");
            }
            const data = await res.json();
            if (data.Response === "False") {
              throw new Error("No movie was found");
            }
            setMovies(data.Search);
            setError("");
          } catch (error) {
            if (error instanceof DOMException && error.name === "AbortError") {
              console.log(error.message, "-->", error.name);
            } else {
              setError(error.message);
            }
          } finally {
            setIsLoading(false);
          }
        })();
      } else {
        setMovies([]);
        setIsLoading(false);
        return;
      }
      return function () {
        abortController.abort();
      };
    },
    // Although the linter is complaining, adding the callback to the array will result in an advanced error.(we can't study yet)
    [query]
  );

  return { movies, isLoading, error };
}

export default useMovies;
