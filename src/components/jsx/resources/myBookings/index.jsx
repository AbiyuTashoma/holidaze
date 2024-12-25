import VenueApi from "../../../js/venueApi";
import Loading from "../loading";
import Error from "../error";
import { profilesUrl } from "../../../js/constants";
import useUser from "../../store/user";
import { shallow } from "zustand/shallow";
import DisplayBookings from "../displayBookings/displayBookings";

const bookingsList = [
  {
    "id": "553f496e-dd37-4c41-9d74-e1ac393cc117",
    "dateFrom": "2025-04-03T22:00:00.000Z",
    "dateTo": "2025-04-12T21:59:59.999Z",
    "guests": 1,
    "created": "2024-11-07T08:21:51.492Z",
    "updated": "2024-11-07T08:21:51.492Z"
  },
  {
    "id": "566d27e0-8fae-42d5-a34d-5a92a4f37ccb",
    "dateFrom": "2025-05-03T22:00:00.000Z",
    "dateTo": "2025-05-12T21:59:59.999Z",
    "guests": 3,
    "created": "2024-11-07T08:21:51.492Z",
    "updated": "2024-11-07T08:21:51.492Z"
  },
  {
    "id": "553f496e-dd37-4c41-9d74-e1ac393cc117",
    "dateFrom": "2025-04-03T22:00:00.000Z",
    "dateTo": "2025-04-12T21:59:59.999Z",
    "guests": 1,
    "created": "2024-11-07T08:21:51.492Z",
    "updated": "2024-11-07T08:21:51.492Z"
  },
  {
    "id": "566d27e0-8fae-42d5-a34d-5a92a4f37ccb",
    "dateFrom": "2025-05-03T22:00:00.000Z",
    "dateTo": "2025-05-12T21:59:59.999Z",
    "guests": 3,
    "created": "2024-11-07T08:21:51.492Z",
    "updated": "2024-11-07T08:21:51.492Z"
  }
];

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

  const { apiData, isLoading, isError } = VenueApi(profilesUrl + name + "/bookings", getOption);

  if (isLoading || !apiData) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  console.log(apiData);
  // return (apiData.length ? DisplayBookings(bookingsList) : <div>You have no bookings yet</div>);
  return (bookingsList.length ? DisplayBookings(bookingsList) : <div>You have no bookings yet</div>);
}

export default MyBookings;