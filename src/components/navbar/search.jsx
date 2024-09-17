import { useEffect, useRef } from "react";
import useKey from "../../useKey";

export function Search({ setQuery, query }) {
  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.focus();
  });

  /* ------------------ */
  /* Also this logic contains a key press, lets replace with the hook */
  // useEffect(() => {
  //   document.addEventListener("keydown", handleEnterPress);

  //   function handleEnterPress(e) {
  //     if (e.code === "Enter" && document.activeElement !== inputEl.current) {
  //       setQuery("");
  //       inputEl.current.focus();
  //     }
  //   }
  //   return () => {
  //     document.removeEventListener("keydown", handleEnterPress);
  //   };
  // }, [setQuery]);

  useKey("keydown", handleEnterPress);

  function handleEnterPress(e) {
    if (e.code === "Enter" && document.activeElement !== inputEl.current) {
      setQuery("");
      inputEl.current.focus();
    }
  }
  /* ------------------ */

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
