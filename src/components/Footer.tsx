import { Col, Container } from 'react-bootstrap';
import Link from 'next/link';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3" style={{ backgroundColor: 'white' }}>
    <Container>
      <Col className="text-center">
        <Link href="/contact-us">
          <span className="text-decoration-none text-dark">Contact Us</span>
        </Link>
        <br />
      </Col>
    </Container>
  </footer>
);

export default Footer;
