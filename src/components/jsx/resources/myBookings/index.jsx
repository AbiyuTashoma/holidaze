import VenueApi from "../../../js/venueApi";
import Loading from "../loading";
import Error from "../error";
import { profilesUrl } from "../../../js/constants";
import useUser from "../../store/user";
import { shallow } from "zustand/shallow";
import DisplayBookings from "../displayBookings/displayBookings";

function MyBookings() {
  const { name, accessToken, apiKey } = useUser(
    (state) => ({
      name: state.name,
      accessToken: state.accessToken,
      apiKey: state.apiKey
    }),
    shallow
  );

  const getOption = {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey.data.key,
    },
  };

  const { apiData, isLoading, isError } = VenueApi(profilesUrl + "/" + name + "/bookings?_venue=true", getOption);

  if (isLoading || !apiData) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  console.log(apiData);
  return (apiData.length ? DisplayBookings(apiData) : <div>You have no bookings yet</div>);
}

export default MyBookings;