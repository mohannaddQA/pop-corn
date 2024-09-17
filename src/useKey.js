import { useEffect, useState } from "react";

/*
1. Takes the key press, and the key press handler function as a callback to be executed when the key is pressed
2. It doesn't return data
*/

function useKey(keyPress, keyPressHandler) {
  useEffect(() => {
    document.body.addEventListener(keyPress, keyPressHandler);
    return () => {
      document.body.removeEventListener(keyPress, keyPressHandler);
    };
  }, [keyPress, keyPressHandler]);
}

export default useKey;
