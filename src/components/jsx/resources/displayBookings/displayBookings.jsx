import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function DisplayBookings (bookingsList) {
  return (
    <Container className="mb-4">
      <Row xs="1" sm="2" xl="3">
        {bookingsList.map((booking) => 
          <Col key={booking.id}>
            <div className="booking-list my-2">
              <div>Date in: {(new Date(booking["dateFrom"])).toDateString()}</div>
              <div>Date out: {(new Date(booking["dateTo"])).toDateString()}</div>
              <div>Guests: {booking["guests"]}</div>
              <div className="my-2">
                <Link to={'/' + booking.id} className="view-button">View venue</Link>
              </div>
            </div>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default DisplayBookings;