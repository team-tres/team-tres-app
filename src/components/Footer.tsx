import { Col, Container } from 'react-bootstrap';
import Link from 'next/link';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3" style={{ backgroundColor: 'white' }}>
    <Container>
      <Col className="text-center">
        <Link href="/contact-us" passHref>
          <span
            className="text-decoration-none"
            style={{
              color: 'blue',
              cursor: 'pointer',
              textDecoration: 'underline',
              fontWeight: 'bold',
            }}
          >
            Contact us
          </span>
        </Link>
      </Col>
    </Container>
  </footer>
);

export default Footer;
