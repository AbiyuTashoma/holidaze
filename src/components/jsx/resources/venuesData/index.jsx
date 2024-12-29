import { shallow } from "zustand/shallow";
import VenueList from "../venueList";
import Loading from "../loading";
import Error from "../error";
import useUser from "../../store/user";
import usePage from "../../store/page";
import VenueApi from "../../../js/venueApi";

function VenuesData() {

  const { name, accessToken, apiKey } = useUser(
    (state) => ({
      name: state.name,
      accessToken: state.accessToken,
      apiKey: state.apiKey,
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

  const { apiData, isLoading, isError } = VenueApi(url);

  if (isLoading || !apiData) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  updateNextPage(apiData["meta"]["nextPage"]);
  updatePrevPage(apiData["meta"]["previousPage"]);
  return VenueList(apiData["data"], name, accessToken, apiKey);
}

export default VenuesData;