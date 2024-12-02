import GetApi from "../../../js/getApi";
import { baseUrl } from "../../../js/constants";
import useApi from "../../store/api";
import { shallow } from "zustand/shallow";
import VenueList from "../venueList";
import Loading from "../loading";
import Error from "../error";

function VenuesData() {

  const { venues, isLoading, isError } = useApi(
    (state) => ({
      venues: state.venues,
      isLoading: state.isLoading,
      isError: state.isError,
    }),
    shallow
  );

  GetApi(baseUrl);

  if (isLoading || !venues) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return VenueList(venues);
}

export default VenuesData;