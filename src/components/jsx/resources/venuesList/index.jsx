import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { currency, unit } from "../../../js/constants";
import Facility from "../facility";
import StarRating from "../starRating";
import EditVenue from "../editVenue";
import ImageCarousel from "../imageCarousel";
import PrevNextPage from "../prevNextPage";
import VenueName from "../venueName";

function VenuesList({venues, name, accessToken, apiKey, edit = false, prevNext = false}) {
  return (
    <Container>
      <Row xs="1" md="2" xl="3" xxl="4">        
        {venues["data"].map((venue) => 
          <Col key={venue.id} className="position-relative my-2">
            {ImageCarousel(venue["media"], venue.id, true)}
            {StarRating(venue["rating"])}
            {(edit || (venue["owner"]["name"] === name)) ? <EditVenue venue={venue} accessToken={accessToken} apiKey={apiKey} /> : <div></div>}            
            <Row className="my-2">
              <Col>
                <div data-testid="venueName">{VenueName(venue["name"])}</div>
                <div data-testid="venuePrice">{venue["price"]} {currency}<span className="unit">{unit}</span></div>
              </Col>
              <Col xs="auto" className="view-button-container">
                <Link to={"/" + venue.id} className="view-button" data-testid="viewButton">View</Link>
              </Col>
            </Row>
            {Facility(venue["meta"])}
          </Col>
        )}
      </Row>
      {prevNext ? 
        <PrevNextPage 
          prevPage={venues["meta"]["previousPage"]} 
          nextPage={venues["meta"]["nextPage"]} 
          currentPage={venues["meta"]["currentPage"]}
          lastPage={venues["meta"]["pageCount"]} /> 
        : <div></div>}
    </Container>
  );
}

export default VenuesList;
