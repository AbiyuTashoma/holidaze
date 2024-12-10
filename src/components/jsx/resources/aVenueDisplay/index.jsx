import { Col, Container, Row } from "react-bootstrap";
import { currency, unit } from "../../../js/constants";
import Facility from "../facility";
import StarRating from "../starRating";
import Calendar from "./datePicker";

const bookingArray = [{ id: "73beeeee-eb10-4c21-a850-5e1436a8ec9c", dateFrom: "2024-12-08T23:00:00.000Z", dateTo: "2024-12-10T23:00:00.000Z" },
  { id: "57c8f59b-5d35-4cfc-a83f-ea4bc4ed15d5", dateFrom: "2025-02-13T22:00:00.000Z", dateTo: "2025-02-22T21:59:59.999Z" },
  { id: "1f67857c-494a-4ec0-a514-3500ccf1464d", dateFrom: "2024-12-08T23:00:00.000Z", dateTo: "2024-12-18T23:00:00.000Z" },
  { id: "5652db32-34e6-4902-b17b-3c498fa76000", dateFrom: "2024-12-24T16:21:35.029Z", dateTo: "2024-12-26T16:21:35.029Z" }];

  const booking = [];


function getBooking(bkng) {
  let booking = [];
  bkng.map((item) => (booking.push({start: item["dateFrom"], end: item["dateTo"]})));
  console.log(booking);
  return booking;
}

function DisplayVenue(aVenue) {
  return (
    <Container>
      <Row xs="1" md="2">        
        <Col className="position-relative">
          {aVenue['media'][0] ? <img src= {aVenue['media'][0]['url']} className="list-image" alt=""/> : <img src= "https://st4.depositphotos.com/17828278/24401/v/600/depositphotos_244011872-stock-illustration-image-vector-symbol-missing-available.jpg" className="list-image" alt="Not available"/>}
          {StarRating(aVenue['rating'])}
        </Col>
        <Col>
          <div>{aVenue['name']}</div>
          <div>{aVenue['price']} {currency}<span className="unit">{unit}</span></div>
          <div>{aVenue['description']}</div>
          {Facility(aVenue['meta'])}
          {Calendar(getBooking(bookingArray))}
          {/* {getBooking(bookingArray)} */}
        </Col>
      </Row>
    </Container>
  );
}

export default DisplayVenue;
