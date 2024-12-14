import VenueApi from "../../../js/venueApi";
import Loading from "../loading";
import Error from "../error";
import { useParams } from "react-router-dom";
import { url } from "../../../js/constants";
import DisplayVenue from "../aVenueDisplay";

function AVenue() {
  let { id } = useParams();
  const { apiData, isLoading, isError } = VenueApi(url + `/${id}` + "?_bookings=true");

  if (isLoading || !apiData) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  console.log(apiData);
  return DisplayVenue(apiData);
}

export default AVenue;