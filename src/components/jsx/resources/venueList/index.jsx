import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { currency, unit } from "../../../js/constants";
import Facility from "../facility";
import StarRating from "../starRating";
import UpdateVenue from "../updateVenue";

function VenueList(venues, name, accessToken, owner = false) {
  let lists = [];
  owner ? (lists = venues.filter((item) => item['owner']['name'] === name)) : (lists = [...venues]);

  return (
    <Container>
      <Row xs="1" md="2" xl="3">        
        {lists.map((venue) => 
          <Col key={venue.id} className="position-relative my-2">
            <Link to={'/' + venue.id}>
              {StarRating(venue['rating'])}
              {venue['media'][0] ? <img src= {venue['media'][0]['url']} className="list-image" alt=""/> : <img src= "https://st4.depositphotos.com/17828278/24401/v/600/depositphotos_244011872-stock-illustration-image-vector-symbol-missing-available.jpg" className="list-image" alt="Not available"/>}
            </Link>
            {(venue['owner']['name'] === name) ? <UpdateVenue venue={venue} accessToken={accessToken} /> : <div></div>}            
            <Row className="my-2">
              <Col>
                <div>{venue['name']}</div>
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
