import { Col, Container, Row } from "react-bootstrap";
import StarRating from "../starRating";
import { Link } from "react-router-dom";
import ImageCarousel from "../imageCarousel";
import EditBooking from "../editBooking";

/**
 * Displays list of bookings made by a profile
 * @param {Array} bookingsList array of bookings
 * @param {String} accessToken user access token
 * @param {String} apiKey user api key
 * @returns {HTMLElement} list of bookings
 */
function DisplayBookings (bookingsList, accessToken, apiKey) {
  
  return (
    <Container className="mb-4">
      <Row xs="1" sm="2" lg="3" xl="4">
        {bookingsList.map((booking) => 
          <Col className="mb-3" key={booking.id}>
            <Col className="position-relative">
              {ImageCarousel(booking["venue"]["media"], booking["venue"].id, true)}          
              {StarRating(booking["venue"]["rating"])}
            </Col>
            <Col>
              <div className="pt-2">
                <div data-testid="venueName">{booking["venue"]["name"]}</div>
                <div data-testid="dateIn">Date in: {(new Date(booking["dateFrom"])).toDateString()}</div>
                <div data-testid="dateOut">Date out: {(new Date(booking["dateTo"])).toDateString()}</div>
                <div data-testid="guests">Guests: {booking["guests"]}</div>
                <div className="my-2 d-flex">
                  <Link to={"/" + booking["venue"].id} className="btn btn-primary btn-sm" data-testid="viewButton">View venue</Link>
                  <EditBooking bookingsList={bookingsList} booking={booking} accessToken={accessToken} apiKey={apiKey}/>
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