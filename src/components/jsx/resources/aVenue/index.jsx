import VenueApi from "../../../js/venueApi";
import Loading from "../loading";
import Error from "../error";
import { useParams } from "react-router-dom";
import { url } from "../../../js/constants";
import DisplayVenue from "../aVenueDisplay";

function AVenue() {
  let { id } = useParams();
  const { data, isLoading, isError } = VenueApi(url + `/${id}` + "?_bookings=true");

  if (isLoading || !data) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  console.log(data);
  return DisplayVenue(data);
}

export default AVenue;