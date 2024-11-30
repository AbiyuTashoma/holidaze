import { shallow } from "zustand/shallow";
import { useEffect } from "react";
import useApi from "../../jsx/store/api";
import useSearch from "../../jsx/store/search";

function GetApi(link) {
  const { updateVenues, updateIsLoading, updateIsError } = useApi(
    (state) => ({
      venues: state.venues,
      isLoading: state.isLoading,
      isError: state.isError,
      updateVenues: state.updateVenues,
      updateIsLoading: state.updateIsLoading,
      updateIsError: state.updateIsError,
    }),
    shallow
  );

  const { updateSearchVenues } = useSearch(
    (state) => ({
      updateSearchVenues: state.updateSearchVenues,
    }),
    shallow
  );

  useEffect(() => {
    async function getData() {
      try {
        updateIsLoading(true);
        updateIsError(false);

        const response = await fetch(link);
        const json = await response.json();

        console.log(json["data"]);

        updateVenues(json["data"]);
        updateSearchVenues(json["data"]);
      } catch (error) {
        updateIsError(true);
      } finally {
        updateIsLoading(false);
      }
    }

    getData();
  }, [updateVenues, updateIsLoading, updateIsError, updateSearchVenues, link]);
}

export default GetApi;
