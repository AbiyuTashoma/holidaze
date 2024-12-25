import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import CreateVenue from '../createVenue';
import useUser from '../../store/user';
import { shallow } from 'zustand/shallow';
import MyVenues from '../myVenues';
import MyBookings from '../myBookings';

function UserTab() {
  
  const { venueManager } = useUser(
    (state) => ({
      venueManager: state.venueManager,
    }),
    shallow
  );

  return (
    <Tabs
      defaultActiveKey={venueManager ? "venues" : "bookings"}
      id="user-tab"
      className="mb-3"
      fill
    >
      <Tab eventKey="bookings" title="My bookings">
        <MyBookings />
      </Tab>
      <Tab eventKey="venues" title="My venues">
        {venueManager ?  <MyVenues /> : <div>Register as Venue manager to create venues.</div>}
      </Tab>
      <Tab eventKey="create" title="Create venue">
        {venueManager ? <CreateVenue /> : <div>Register as Venue manager to create venues.</div>}
      </Tab>
    </Tabs>
  );
}

export default UserTab;