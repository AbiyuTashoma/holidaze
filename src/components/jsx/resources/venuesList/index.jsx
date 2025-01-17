import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { currency, unit } from "../../../js/constants";
import Facility from "../facility";
import StarRating from "../starRating";
import EditVenue from "../editVenue";
import ImageCarousel from "../imageCarousel";
import PrevNextPage from "../prevNextPage";

function VenuesList({venues, name, accessToken, apiKey, profile = false}) {
  return (
    <Container>
      <Row xs="1" md="2" xl="3" xxl="4">        
        {venues["data"].map((venue) => 
          <Col key={venue.id} className="position-relative my-2">
            {ImageCarousel(venue["media"], venue.id, true)}
            {StarRating(venue["rating"])}
            {(profile || (venue["owner"]["name"] === name)) ? <EditVenue venue={venue} accessToken={accessToken} apiKey={apiKey} /> : <div></div>}            
            <Row className="my-2">
              <Col>
                <div className="fw-semibold" data-testid="venueName">{venue["name"]}</div>
                <div data-testid="venuePrice">{venue["price"]} {currency}<span className="unit">{unit}</span></div>
              </Col>
              <Col className="view-button-container">
                <Link to={"/" + venue.id} className="view-button" data-testid="viewButton">View</Link>
              </Col>
            </Row>
            {Facility(venue["meta"])}
          </Col>
        )}
      </Row>
      {profile ? <div></div> : <PrevNextPage prevPage={venues["meta"]["previousPage"]} nextPage={venues["meta"]["nextPage"]} />}
    </Container>
  );
}

export default VenuesList;
