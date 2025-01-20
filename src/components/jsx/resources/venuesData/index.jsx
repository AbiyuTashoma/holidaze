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

  const { url } = usePage(
    (state) => ({
      url: state.url,
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

  return <VenuesList venues={apiData} name={name} accessToken={accessToken} apiKey={apiKey} edit={false} prevNext={true}/>;
}

export default VenuesData;