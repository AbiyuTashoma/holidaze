import { useState, useEffect } from "react";

/**
 * Makes an api request
 * @param {URL} link url of the api request
 * @param {Object} reqOption request options
 * @returns {Object} response data and status
 */
function VenueApi(link, reqOption) {
  const [apiData, setApiData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getVenueData() {
      try {
        setIsLoading(true);
        setIsError(false);

        const response = await fetch(link, reqOption);
        const json = await response.json();

        setApiData(json);
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
