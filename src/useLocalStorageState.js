import { useEffect, useState } from "react";

/*
1. Takes the initial state and the key (for local storage). 
2. Returns the current state and a setter function to change the saved data. 
*/

// Parameter destructuring in order to provide named arguments
function useLocalStorageState({ initialState = [], key }) {
  const [data, setData] = useState(() => {
    const localStorageData = JSON.parse(localStorage.getItem(key));
    // Only return the local storage data if the initial state isn't provided
    return localStorageData || initialState;
  });

  useEffect(() => {
    if (data.length === 0) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }, [data, key]);

  // Return the data and a setter function to handle changing the data
  return [data, setData];
}

export default useLocalStorageState;
