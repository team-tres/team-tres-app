import './page.css';
import { Container, Row, Col, Button } from 'react-bootstrap';

const StressTests = () => (
  <main>
    <Container fluid id="client-dashboard">
      <Row className="full-height">
        <Col md={4} className="left-section">
          <h1 className="heading-left">
            Stress Tests
          </h1>
          <h3>
            There are five stress test options to &quot;test&quot; scenarios
            against the forecast. This helps decision makers understand
            its impact.
          </h3>
          <br />
          <Button className="white-button">View All</Button>
        </Col>
        <Col md={8} className="right-section">
          <Button className="blue-button">Stress Test 1</Button>
          <Button className="blue-button">Stress Test 2</Button>
          <Button className="blue-button">Stress Test 3</Button>
          <Button className="blue-button">Stress Test 4</Button>
          <Button className="blue-button">Stress Test 5</Button>
        </Col>
      </Row>
    </Container>
  </main>
);

export default StressTests;
