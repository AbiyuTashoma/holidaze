import { shallow } from "zustand/shallow";
import { useEffect } from "react";
import useApi from "../../jsx/store/api";
import useSearch from "../../jsx/store/search";
import usePage from "../../jsx/store/page";

function GetApi() {
  const { updateVenues, updateIsLoading, updateIsError } = useApi(
    (state) => ({
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

  const { url, updateNextPage, updatePrevPage } = usePage(
    (state) => ({
      url: state.url,
      updateNextPage: state.updateNextPage,
      updatePrevPage: state.updatePrevPage,
    }),
    shallow
  );

  useEffect(() => {
    async function getData() {
      try {
        updateIsLoading(true);
        updateIsError(false);

        const response = await fetch(url);
        const json = await response.json();

        console.log(json["data"]);

        updateVenues(json["data"]);
        updateSearchVenues(json["data"]);

        updateNextPage(json["meta"]["nextPage"]);
        updatePrevPage(json["meta"]["previousPage"]);
      } catch (error) {
        updateIsError(true);
      } finally {
        updateIsLoading(false);
      }
    }

    getData();
  }, [
    updateVenues,
    updateIsLoading,
    updateIsError,
    updateSearchVenues,
    url,
    updateNextPage,
    updatePrevPage,
  ]);
}

export default GetApi;
