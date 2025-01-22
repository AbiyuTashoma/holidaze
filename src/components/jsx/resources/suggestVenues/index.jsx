import VenuesList from "../venuesList";
import Loading from "../loading";
import Error from "../error";
import VenueApi from "../../../js/venueApi";
import { suggestUrl } from "../../../js/constants";

/**
 * Fetches and displays list of suggested venues
 * @returns {HTMLElement} a list of suggested venues
 */
function SuggestVenues() {
  const { apiData, isLoading, isError } = VenueApi(suggestUrl);

  if (isLoading || !apiData) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return <VenuesList venues={apiData} name={null} accessToken={null} apiKey={null} edit={false} prevNext={false}/>;
}

export default SuggestVenues;