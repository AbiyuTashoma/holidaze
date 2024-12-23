import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import CreateVenue from '../createVenue';
import useUser from '../../store/user';
import { shallow } from 'zustand/shallow';
import useApi from '../../store/api';
import VenueList from '../venueList';

function UserTab() {
  const { venues } = useApi(
    (state) => ({
      venues: state.venues,
    }),
    shallow
  );

    const { name, accessToken } = useUser(
    (state) => ({
      name: state.name,
      accessToken: state.accessToken,
    }),
    shallow
  );

  return (
    <Tabs
      defaultActiveKey="bookings"
      id="user-tab"
      className="mb-3"
    >
      <Tab eventKey="bookings" title="My bookings">
        Tab content for Bookings
      </Tab>
      <Tab eventKey="venues" title="My venues">
        {VenueList (venues, name, accessToken, true)}
      </Tab>
      <Tab eventKey="create" title="Create venue">
        <CreateVenue />
      </Tab>
    </Tabs>
  );
}

export default UserTab;