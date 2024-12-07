import { Col, Container, Row } from "react-bootstrap";

function DisplayVenue(aVenue) {
  return (
    <Container>
      <Row xs="1" md="2">        
        <Col>
          {aVenue['media'][0] ? <img src= {aVenue['media'][0]['url']} className="list-image" alt=""/> : <img src= "https://st4.depositphotos.com/17828278/24401/v/600/depositphotos_244011872-stock-illustration-image-vector-symbol-missing-available.jpg" className="list-image" alt="Not available"/>}
        </Col>
        <Col>
          <div>{aVenue['name']}</div>
          <div>{aVenue['price']}</div>
        </Col>
      </Row>
    </Container>
  );
}

export default DisplayVenue;
