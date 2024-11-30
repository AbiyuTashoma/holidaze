import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function VenueList(venues) {
  return (
    <Container>
      <Row xs="1" md="2" xl="3">        
        {venues.map((venue) =>
          <Col key={venue.id} className="my-2">
            <Link to={'/' + venue.id}>
              {venue['media'][0] ? <img src= {venue['media'][0]['url']} className="list-image" alt=""/> : <img src= "https://st4.depositphotos.com/17828278/24401/v/600/depositphotos_244011872-stock-illustration-image-vector-symbol-missing-available.jpg" className="list-image" alt="Not available"/>}
            </Link>
            <Row className="my-2">
              <Col>
                <div>{venue['name']}</div>
                <div>{venue['price']}</div>
              </Col>
              <Col className="view-button-container">
                <Link to={'/' + venue.id} className="view-button">View</Link>
              </Col>
            </Row>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default VenueList;
