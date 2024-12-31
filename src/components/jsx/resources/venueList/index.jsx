import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { currency, unit } from "../../../js/constants";
import Facility from "../facility";
import StarRating from "../starRating";
import EditVenue from "../editVenue";
import ImageCarousel from "../imageCarousel";

function VenueList(venues, name, accessToken, apiKey, profile = false) {

  return (
    <Container>
      <Row xs="1" md="2" xl="3" xxl="4">        
        {venues.map((venue) => 
          <Col key={venue.id} className="position-relative my-2">
            <Link to={'/' + venue.id}>
              {ImageCarousel(venue['media'])}
              {StarRating(venue['rating'])}
            </Link>
            {(profile || (venue['owner']['name'] === name)) ? <EditVenue venue={venue} accessToken={accessToken} apiKey={apiKey} /> : <div></div>}            
            <Row className="my-2">
              <Col>
                <div className="fw-semibold">{venue['name']}</div>
                <div>{venue['price']} {currency}<span className="unit">{unit}</span></div>
              </Col>
              <Col className="view-button-container">
                <Link to={'/' + venue.id} className="view-button">View</Link>
              </Col>
            </Row>
            {Facility(venue['meta'])}
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default VenueList;
