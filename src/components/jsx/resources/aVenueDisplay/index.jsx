import { Col, Container, Row } from "react-bootstrap";
import { currency, unit } from "../../../js/constants";
import Facility from "../facility";
import StarRating from "../starRating";
import Calendar from "./datePicker";

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
          <Calendar />
        </Col>
      </Row>
    </Container>
  );
}

export default DisplayVenue;
