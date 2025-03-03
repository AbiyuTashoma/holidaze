import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import CreateVenue from "../createVenue";
import useUser from "../../store/user";
import { shallow } from "zustand/shallow";
import MyVenues from "../myVenues";
import MyBookings from "../myBookings";

/**
 * Creates a tab of bookings, venues and create venue elements
 * @returns {HTMLElement} tab element
 */
function UserTab() {
  const { venueManager } = useUser(
    (state) => ({
      venueManager: state.venueManager,
    }),
    shallow
  );

  return (
    <Tabs
      defaultActiveKey="bookings"
      id="user-tab"
      className="mb-3"
      fill
    >
      <Tab eventKey="bookings" title="My bookings">
        <MyBookings />
      </Tab>
      <Tab eventKey="venues" title="My venues">
        {venueManager ?  <MyVenues /> : <div className="m-3">Register as Venue manager to create venues.</div>}
      </Tab>
      <Tab eventKey="create" title="Create venue">
        {venueManager ? <CreateVenue /> : <div className="m-3">Register as Venue manager to create venues.</div>}
      </Tab>
    </Tabs>
  );
}

export default UserTab;