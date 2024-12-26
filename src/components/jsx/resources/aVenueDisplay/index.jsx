import { Col, Container, Row } from "react-bootstrap";
import { currency, unit } from "../../../js/constants";
import Facility from "../facility";
import StarRating from "../starRating";
import BookForm from "./bookForm";
import EditVenue from "../editVenue";

function DisplayVenue(aVenue, name, accessToken, apiKey) {

  return (
    <Container>
      <Row xs="1" md="2" className="my-4">        
        <Col className="position-relative mb-2">
          {aVenue['media'][0] ? <img src= {aVenue['media'][0]['url']} className="list-image" alt=""/> : <img src= "https://st4.depositphotos.com/17828278/24401/v/600/depositphotos_244011872-stock-illustration-image-vector-symbol-missing-available.jpg" className="list-image" alt="Not available"/>}
          {StarRating(aVenue['rating'])}
          {(aVenue['owner']['name'] === name) ? <EditVenue venue={aVenue} accessToken={accessToken} apiKey={apiKey} /> : <div></div>}
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
    </Container>
  );
}

export default DisplayVenue;
