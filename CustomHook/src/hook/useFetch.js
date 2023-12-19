import { useEffect,useState } from "react";
export function useFetch(fetchFn,inititial){
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(inititial);
  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        const places = await fetchFn();
        setFetchedData(places);
      } catch (error) {
        setError({ message: error.message || 'Failed to fetch user places.' });
      }

      setIsFetching(false);
    }

    fetchPlaces();
  }, [fetchFn]);
  return({
    isFetching,
    error,
    fetchedData,
    setFetchedData
  })
}