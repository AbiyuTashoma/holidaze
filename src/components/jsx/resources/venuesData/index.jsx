import { shallow } from "zustand/shallow";
import VenuesList from "../venuesList";
import Loading from "../loading";
import Error from "../error";
import useUser from "../../store/user";
import usePage from "../../store/page";
import VenueApi from "../../../js/venueApi";

/**
 * Fetches a venues data, update page state and display list of venues
 * @returns {HTMLElement} a list of venues
 */
function VenuesData() {
  const { name, accessToken, apiKey } = useUser(
    (state) => ({
      name: state.name,
      accessToken: state.accessToken,
      apiKey: state.apiKey,
    }),
    shallow
  );

  const { url, updateNextPage, updatePrevPage, updateTotalPages } = usePage(
    (state) => ({
      url: state.url,
      updateNextPage: state.updateNextPage,
      updatePrevPage: state.updatePrevPage,
      updateTotalPages: state.updateTotalPages,
    }),
    shallow
  );

  const { apiData, isLoading, isError } = VenueApi(url);

  if (isLoading || !apiData) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }
console.log(apiData);
  updateNextPage(apiData["meta"]["nextPage"]);
  updatePrevPage(apiData["meta"]["previousPage"]);
  updateTotalPages(apiData["meta"]["pageCount"]);
  return VenuesList(apiData["data"], name, accessToken, apiKey);
}

export default VenuesData;