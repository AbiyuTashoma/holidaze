import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function VenueList(venues) {
  return (
    <Container>
      <Row xs="1" md="2" xl="3" xxl="4">        
        {venues.map((venue) =>
          <Col key={venue.id} className="venues-col">
            <Link to={'/' + venue.id}>
              {venue['media'][0] ? <img src= {venue['media'][0]['url']} className="list-image" alt=""/> : <img src= '../../../resources/avatar/avatar.jpeg' className="list-image" alt=""/>}
              {console.log(venue['media'][0])}
            </Link>
            <Row>
              <Col>{venue['name']}</Col>
              <Col>{venue['price']}</Col>
            </Row>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default VenueList;