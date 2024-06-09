import { useEffect } from "react";
import { useState } from "react";

export function useFetch(fetchFn, initialValue) {
  const [data, setData] = useState(initialValue);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        setIsFetching(true);
        const places = await fetchFn();
        setData(places);
        setIsFetching(false);
      } catch (error) {
        setError({
          message: error.message || "Failed to fetch data.",
        });
        setIsFetching(false);
      }
    }

    fetchData();
  }, [fetchFn]);

  return {
    data,
    setData,
    isFetching,
    setIsFetching,
    error,
    setError
  }
}
