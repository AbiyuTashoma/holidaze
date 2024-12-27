import VenueApi from "../../../js/venueApi";
import Loading from "../loading";
import Error from "../error";
import { useParams } from "react-router-dom";
import { url } from "../../../js/constants";
import DisplayVenue from "../aVenueDisplay";
import useUser from "../../store/user";
import { shallow } from "zustand/shallow";

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

  const { apiData, isLoading, isError } = VenueApi(url + "/" + id + "?_bookings=true&_owner=true");

  if (isLoading || !apiData) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  console.log(apiData);
  return DisplayVenue(apiData, name, accessToken, apiKey);
}

export default AVenue;