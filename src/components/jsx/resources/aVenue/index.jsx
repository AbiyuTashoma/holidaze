import VenueApi from "../../../js/venueApi";
import Loading from "../loading";
import Error from "../error";
import { useParams } from "react-router-dom";
import { url } from "../../../js/constants";
import DisplayVenue from "../aVenueDisplay";

function AVenue() {
  let { id } = useParams();
  const { data, isLoading, isError } = VenueApi(url + `/${id}`);

  if (isLoading || !data) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return DisplayVenue(data);
}

export default AVenue;