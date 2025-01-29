import Link from 'next/link';
import { Col, Container } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3" style={{ backgroundColor: '#CFE1F3' }}>
    <Container>
      <Col className="text-center">
        <Link href="/about" passHref className="text-decoration-none text-dark">
          About us
        </Link>
        <br />
        Contact us
        <br />
      </Col>
    </Container>
  </footer>
);

export default Footer;
