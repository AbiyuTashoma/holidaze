import { useState, useEffect } from "react";

function VenueApi(link) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getVenueData() {
      try {
        setIsLoading(true);
        setIsError(false);

        const response = await fetch(link);
        const json = await response.json();

        setData(json["data"]);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getVenueData();
  }, [link]);

  return { data, isLoading, isError };
}

export default VenueApi;
