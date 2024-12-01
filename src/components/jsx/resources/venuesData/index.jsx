import GetApi from "../../../js/getApi";
import { baseUrl } from "../../../js/constants";
import useApi from "../../store/api";
import { shallow } from "zustand/shallow";
import VenueList from "../venueList";

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
    return (<div>Loading</div>);
  }

  if (isError) {
    return (<div>Error</div>);
  }

  return VenueList(venues);
}

export default VenuesData;