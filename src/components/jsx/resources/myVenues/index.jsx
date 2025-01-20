import VenueApi from "../../../js/venueApi";
import Loading from "../loading";
import Error from "../error";
import { profilesUrl } from "../../../js/constants";
import VenuesList from "../venuesList";
import useUser from "../../store/user";
import { shallow } from "zustand/shallow";

/**
 * Fetches venues created by a user
 * @returns {HTMLElement} venues created by a user
 */
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

  const { apiData, isLoading, isError } = VenueApi(profilesUrl + "/" + name + "/venues", getOption);

  if (isLoading || !apiData) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (apiData["data"].length ? 
    <VenuesList venues={apiData} name={name} accessToken={accessToken} apiKey={apiKey} edit={true} prevNext={false}/>
    : <div className="m-3">You have no venues yet</div>);
}

export default MyVenues;