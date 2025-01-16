import VenueApi from "../../../js/venueApi";
import Loading from "../loading";
import Error from "../error";
import { useParams } from "react-router-dom";
import { venuesUrl } from "../../../js/constants";
import DisplayVenue from "../aVenueDisplay";
import useUser from "../../store/user";
import { shallow } from "zustand/shallow";

/**
 * Fetches a venue data using query parameter
 * @returns {HTMLElement} a venue page elements
 */
function AVenue() {
  let { id } = useParams();

  const { name, accessToken, apiKey } = useUser(
    (state) => ({
      name: state.name,
      accessToken: state.accessToken,
      apiKey: state.apiKey,
    }),
    shallow
  );

  const { apiData, isLoading, isError } = VenueApi(venuesUrl + "/" + id + "?_bookings=true&_owner=true");

  if (isLoading || !apiData) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return DisplayVenue(apiData["data"], name, accessToken, apiKey);
}

export default AVenue;