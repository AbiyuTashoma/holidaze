import { Button, Col, Container, Row } from "react-bootstrap";
import StarRating from "../starRating";
import reRoute from "../../../js/reRoute/reRoute";
import { bookingsUrl } from "../../../js/constants";

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
    setTimeout(reRoute(window.location.pathname), 1500);
  }
  return (
    <Container className="mb-4">
      <Row xs="1" sm="2" md="3" lg="4">
        {bookingsList.map((booking) => 
          <Col className="mb-3" key={booking.id}>
            <Col className="position-relative">
              {booking["venue"]['media'][0] ? <img src= {booking["venue"]['media'][0]['url']} className="list-image" alt=""/> : <img src= "https://st4.depositphotos.com/17828278/24401/v/600/depositphotos_244011872-stock-illustration-image-vector-symbol-missing-available.jpg" className="list-image" alt="Not available"/>}
              {StarRating(booking["venue"]['rating'])}
            </Col>
            <Col>
              <div className="pt-2">
                <div>{booking["venue"]["name"]}</div>
                <div>Date in: {(new Date(booking["dateFrom"])).toDateString()}</div>
                <div>Date out: {(new Date(booking["dateTo"])).toDateString()}</div>
                <div>Guests: {booking["guests"]}</div>
                <div className="my-2">
                  <Button href={'/' + booking["venue"].id} className="btn btn-primary" size="sm">View venue</Button>
                  <Button className="ms-2" variant="secondary" onClick={() => handleDelete(booking.id)} size="sm">Delete booking</Button>
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