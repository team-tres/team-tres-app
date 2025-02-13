import { Col, Container } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3" style={{ backgroundColor: 'white' }}>
    <Container>
      <Col className="text-center">
        Contact us
        <br />
      </Col>
    </Container>
  </footer>
);

export default Footer;
