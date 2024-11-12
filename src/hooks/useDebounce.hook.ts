import { useEffect, useState } from "react";

export const useDebounce = (value: string, timeDelay: number) => {
  const [debounceValue, setDebounceValue] = useState("");

  useEffect(() => {
    const handleValue = setTimeout(() => {
      setDebounceValue(value);
    }, timeDelay);

    return () => {
      clearTimeout(handleValue);
    };
  }, [value, timeDelay]);

  return debounceValue;
};
