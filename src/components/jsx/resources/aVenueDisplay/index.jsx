import { Accordion, Col, Container, Row } from "react-bootstrap";
import { currency, unit } from "../../../js/constants";
import Facility from "../facility";
import StarRating from "../starRating";
import BookForm from "./bookForm";
import EditVenue from "../editVenue";
import VenueBookings from "../venueBookings";

function DisplayVenue(aVenue, name, accessToken, apiKey) {
  const venueOwner = Boolean(aVenue['owner']['name'] === name);

  return (
    <Container>
      <Row xs="1" md="2" className="my-4">        
        <Col className="position-relative mb-2">
          {aVenue['media'][0] ? <img src= {aVenue['media'][0]['url']} className="list-image" alt=""/> : <img src= "https://st4.depositphotos.com/17828278/24401/v/600/depositphotos_244011872-stock-illustration-image-vector-symbol-missing-available.jpg" className="list-image" alt="Not available"/>}
          {StarRating(aVenue['rating'])}
          {venueOwner ? <EditVenue venue={aVenue} accessToken={accessToken} apiKey={apiKey} /> : <div></div>}
        </Col>
        <Col>
          <div>{aVenue['name']}</div>
          <div>{aVenue['price']} {currency}<span className="unit">{unit}</span></div>
          <div>{aVenue['description']}</div>
          <div>Max guests: {aVenue["maxGuests"]}</div>
          <div>{Facility(aVenue['meta'])}</div>
          <div><BookForm venue = {aVenue} accessToken = {accessToken} apiKey = {apiKey} /></div>
        </Col>
      </Row>
      <Row className={venueOwner ? "d-block" : "d-none"}>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header bg="light">Bookings</Accordion.Header>
            <Accordion.Body>
              <VenueBookings  venue = {aVenue}/>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Row>
    </Container>
  );
}

export default DisplayVenue;
