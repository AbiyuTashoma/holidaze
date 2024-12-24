import { useState, useEffect } from "react";

function VenueApi(link, reqOption) {
  const [apiData, setApiData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getVenueData() {
      try {
        setIsLoading(true);
        setIsError(false);

        console.log(link);
        console.log(reqOption);
        const response = await fetch(link, reqOption);
        const json = await response.json();

        setApiData(json["data"]);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getVenueData();
  }, [link]);

  return { apiData, isLoading, isError };
}

export default VenueApi;
