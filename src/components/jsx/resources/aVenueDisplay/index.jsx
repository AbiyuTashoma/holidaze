import { Accordion, Col, Container, Row } from "react-bootstrap";
import { currency, unit } from "../../../js/constants";
import Facility from "../facility";
import StarRating from "../starRating";
import BookForm from "./bookForm";
import VenueBookings from "../venueBookings";
import ImageCarousel from "../imageCarousel";
import VenueName from "../venueName";
import VenueDescription from "../venueDescription";

/**
 * Creates a venue display elements
 * @param {Object} aVenue a venue to display
 * @param {String} name username of the logged in customer
 * @param {String} accessToken access token of the user
 * @param {Object} apiKey authentication key of the user
 * @returns {HTMLElement} a venue display elements
 */
function DisplayVenue(aVenue, name, accessToken, apiKey) {
  const venueOwner = Boolean(aVenue["owner"]["name"] === name);

  return (
    <Container>
      <Row xs="1" md="2" className="my-4">        
        <Col className="position-relative mb-2">
          {ImageCarousel(aVenue["media"])}          
          {StarRating(aVenue["rating"])}
        </Col>
        <Col>
          <div className="my-2">{VenueName(aVenue["name"])}</div>
          <div data-testid="venuePrice">{aVenue["price"]} {currency}<span className="unit">{unit}</span></div>
          {VenueDescription(aVenue["description"])}
          <div data-testid="maxGuests">Max guests: {aVenue["maxGuests"]}</div>
          <div>{Facility(aVenue["meta"])}</div>
          <div className="my-4"><BookForm venue = {aVenue} accessToken = {accessToken} apiKey = {apiKey} /></div>
        </Col>
      </Row>
      <Row>
        {venueOwner ? 
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header bg="light">Bookings list</Accordion.Header>
              <Accordion.Body>
                <VenueBookings  venue = {aVenue}/>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion> 
        : <></>}
      </Row>
    </Container>
  );
}

export default DisplayVenue;
