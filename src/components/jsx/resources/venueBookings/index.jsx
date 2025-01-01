import { Col, Container, Row } from "react-bootstrap";

function VenueBookings ({venue}) {  
  return (
    <Container className="mb-4">
      {venue['bookings'].length ? 
      <Row xs="1" sm="2" md="3" lg="4">
        {venue['bookings'].map((booking) => 
          <Col className="mb-3" key={booking.id}>
              <div className="pt-2" data-testid="bookings">
                <div>Name: {booking["customer"]["name"]}</div>
                <div>Date in: {(new Date(booking["dateFrom"])).toDateString()}</div>
                <div>Date out: {(new Date(booking["dateTo"])).toDateString()}</div>
                <div>Guests: {booking["guests"]}</div>
              </div>
          </Col>
        )}
      </Row>
      : <div className='my-3'>There are no bookings yet.</div>}
    </Container>
  );
}

export default VenueBookings;