import VenueApi from "../../../js/venueApi";
import Loading from "../loading";
import Error from "../error";
import { profilesUrl } from "../../../js/constants";
import VenueList from "../venueList";
import useUser from "../../store/user";
import { shallow } from "zustand/shallow";

function MyVenues() {
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

  const { apiData, isLoading, isError } = VenueApi(profilesUrl + name + "/venues", getOption);

  if (isLoading || !apiData) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  console.log(apiData);
  return VenueList(apiData, name, accessToken, apiKey, true);
}

export default MyVenues;