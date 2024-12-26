import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import StarRating from "../starRating";

function DisplayBookings (bookingsList) {
  return (
    <Container className="mb-4">
      <Row xs="1" sm="2" md="3" lg="4">
        {bookingsList.map((booking) => 
          <Col className="mb-3">
            <Col className="position-relative">
              {booking["venue"]['media'][0] ? <img src= {booking["venue"]['media'][0]['url']} className="list-image" alt=""/> : <img src= "https://st4.depositphotos.com/17828278/24401/v/600/depositphotos_244011872-stock-illustration-image-vector-symbol-missing-available.jpg" className="list-image" alt="Not available"/>}
              {StarRating(booking["venue"]['rating'])}
            </Col>
            <Col key={booking.id}>
              <div className="pt-2">
                <div>{booking["venue"]["name"]}</div>
                <div>Date in: {(new Date(booking["dateFrom"])).toDateString()}</div>
                <div>Date out: {(new Date(booking["dateTo"])).toDateString()}</div>
                <div>Guests: {booking["guests"]}</div>
                <div className="my-2">
                  <Link to={'/' + booking["venue"].id} className="btn btn-primary">View venue</Link>
                </div>
              </div>
            </Col>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default DisplayBookings;