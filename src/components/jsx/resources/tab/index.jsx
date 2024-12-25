import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import CreateVenue from '../createVenue';
import useUser from '../../store/user';
import { shallow } from 'zustand/shallow';
import MyVenues from '../myVenues';

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
    >
      <Tab eventKey="bookings" title="My bookings">
        Tab content for Bookings
      </Tab>
      <Tab eventKey="venues" title="My venues">
        {venueManager ?  <MyVenues /> : <div>Upgrade to Venue manager</div>}
        
      </Tab>
      <Tab eventKey="create" title="Create venue">
        {venueManager ? <CreateVenue /> : <div>Upgrade to Venue manager</div>}
      </Tab>
    </Tabs>
  );
}

export default UserTab;