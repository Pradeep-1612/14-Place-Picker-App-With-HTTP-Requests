import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";
import { useFetch } from "../hooks/useFetch.js";

async function fetchAllAvailablePlaces() {
  const places = await fetchAvailablePlaces();
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        places,
        position.coords.latitude,
        position.coords.longitude
      );
      resolve(sortedPlaces);
    });
  });
}

export default function AvailablePlaces({ onSelectPlace }) {
  // const [availablePlaces, setAvailablePlaces] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(undefined);
  // useEffect(() => {
  //   async function fetchPlaces() {
  //     setIsLoading(true);
  //     try {
  //       const places = await fetchAvailablePlaces();
  //       navigator.geolocation.getCurrentPosition((position) => {
  //         const sortedPlaces = sortPlacesByDistance(
  //           places,
  //           position.coords.latitude,
  //           position.coords.longitude
  //         );
  //         setAvailablePlaces(sortedPlaces);
  //         setIsLoading(false);
  //       });
  //     } catch (error) {
  //       setError({
  //         message: error.message || "Error occurred. Please try again later.",
  //       });
  //       setIsLoading(false);
  //     }
  //   }
  //   fetchPlaces();
  // }, []);

  const {
    data: availablePlaces,
    isFetching: isLoading,
    error,
  } = useFetch(fetchAllAvailablePlaces, []);

  if (error) {
    return <Error message={error.message} />;
  }
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isLoading}
      loadingText="Fetching places..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
