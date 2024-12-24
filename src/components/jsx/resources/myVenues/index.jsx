import VenueApi from "../../../js/venueApi";
import Loading from "../loading";
import Error from "../error";
import { apiKeyUrl, profilesUrl } from "../../../js/constants";
import VenueList from "../venueList";
import useUser from "../../store/user";
import { shallow } from "zustand/shallow";
import api from "../../../js/api";
import apiDataKey from "../../../js/apiDataKey";

function MyVenues() {
  const { name, accessToken } = useUser(
    (state) => ({
      name: state.name,
      accessToken: state.accessToken,
    }),
    shallow
  );

  const updateOption = {
    method: "GET",
    body: JSON.stringify({}),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiDataKey(accessToken),
    },
  };

  const { apiData, isLoading, isError } = VenueApi(profilesUrl + name + "/venues", updateOption);

  if (isLoading || !apiData) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  console.log(apiData);
  return <VenueList venues={apiData} name={name} accessToken={accessToken} />;
}

export default MyVenues;