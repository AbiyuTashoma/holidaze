import { Button, Col, Container, Row } from "react-bootstrap";
import StarRating from "../starRating";
import reRoute from "../../../js/reRoute/reRoute";
import { bookingsUrl, timeout } from "../../../js/constants";
import { Link } from "react-router-dom";
import ImageCarousel from "../imageCarousel";

/**
 * Displays list of bookings registered by a profile
 * @param {Array} bookingsList array of bookings
 * @param {String} accessToken user access token
 * @param {String} apiKey user api key
 * @returns {HTMLElement} 
 */
function DisplayBookings (bookingsList, accessToken, apiKey) {
  async function handleDelete(id) {
    console.log("Delete:" + id);
    const deleteOption = {
      method: "DELETE",
      body: JSON.stringify({}),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey.data.key,
      },
    };

    await fetch(bookingsUrl + '/' + id, deleteOption);
    setTimeout(reRoute(window.location.pathname), timeout);
  }
  return (
    <Container className="mb-4">
      <Row xs="1" sm="2" md="3" lg="4">
        {bookingsList.map((booking) => 
          <Col className="mb-3" key={booking.id}>
            <Col className="position-relative">
              <Link to={'/' + booking["venue"].id}>
                {ImageCarousel(booking["venue"]['media'])}          
                {StarRating(booking["venue"]['rating'])}
              </Link>
            </Col>
            <Col>
              <div className="pt-2">
                <div>{booking["venue"]["name"]}</div>
                <div>Date in: {(new Date(booking["dateFrom"])).toDateString()}</div>
                <div>Date out: {(new Date(booking["dateTo"])).toDateString()}</div>
                <div>Guests: {booking["guests"]}</div>
                <div className="my-2">
                  <Link to={'/' + booking["venue"].id} className="btn btn-primary btn-sm">View venue</Link>
                  <Button className="ms-2" variant="secondary" onClick={() => handleDelete(booking.id)} size="sm">Cancel booking</Button>
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