import { Accordion, Col, Container, Row } from "react-bootstrap";
import { currency, unit } from "../../../js/constants";
import Facility from "../facility";
import StarRating from "../starRating";
import BookForm from "./bookForm";
import EditVenue from "../editVenue";
import VenueBookings from "../venueBookings";
import ImageCarousel from "../imageCarousel";

function DisplayVenue(aVenue, name, accessToken, apiKey) {
  const venueOwner = Boolean(aVenue['owner']['name'] === name);

  return (
    <Container>
      <Row xs="1" md="2" className="my-4">        
        <Col className="position-relative mb-2">
          {ImageCarousel(aVenue['media'])}          
          {StarRating(aVenue['rating'])}
          {venueOwner ? <EditVenue venue={aVenue} accessToken={accessToken} apiKey={apiKey} /> : <div></div>}
        </Col>
        <Col>
          <div className="fw-semibold fs-5 my-2">{aVenue['name']}</div>
          <div data-testid="venuePrice">{aVenue['price']} {currency}<span className="unit">{unit}</span></div>
          <div className="my-2">{aVenue['description']}</div>
          <div data-testid="maxGuests">Max guests: {aVenue["maxGuests"]}</div>
          <div>{Facility(aVenue['meta'])}</div>
          <div className="my-4"><BookForm venue = {aVenue} accessToken = {accessToken} apiKey = {apiKey} /></div>
        </Col>
      </Row>
      <Row>
        {venueOwner ? 
          <Accordion>
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
