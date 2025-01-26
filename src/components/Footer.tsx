import { Col, Container } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3" style={{ backgroundColor: "#CFE1F3"}}>
    <Container>
      <Col className="text-center">
        About us
        <br />
        Contact us
        <br />
      </Col>
    </Container>
  </footer>
);

export default Footer;
