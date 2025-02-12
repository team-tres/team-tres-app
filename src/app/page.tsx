import { Col, Container, Row, Button } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import './page.css';

const Home = () => (
  <main>
    <Container fluid id="landing-page">
      <Row className="full-height">
        {/* Left Section - Full Height Blue Background */}
        <Col md={4} className="left-section">
          <h1 className="heading-left">
            <span>I ka wā ma mua, </span>
            <br />
            <span> ka wā ma hope.</span>
          </h1>
          <h2 className="heading-left">
            The future is found in the past.
          </h2>
          <h3 className="heading-left">
            – Molokaʻi: Future of a Hawaiian Island, Sustainability Conference, July 2009
          </h3>
        </Col>

        {/* Right Section - Full Height White Background */}
        <Col md={8} className="right-section">

          <h1 className="heading-right">E komo mai! Welcome to FiscNav.</h1>
          <h2 className="text-right">
            In cooperation with
            {' '}
            <Link href="https://www.spirehawaii.com/" passHref legacyBehavior>
              <a
                href="https://www.spirehawaii.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-right-link"
              >
                <strong>
                  Spire
                </strong>
              </a>
            </Link>
            ,
            we leverage Fiscal Sustainability Models (FSMs)
            to support organizations in making informed financial and strategic decisions
            FSMs utilize historical financial data, incorporate relevant variables, and provide
            future-forward financial
            forecasts and trend analyses. This integrated approach enables organizations to navigate today’s
            evolving economic landscape, enhancing their ability to make sound management decisions.
          </h2>
          <Button className="custom-button">
            <Link href="/about" passHref legacyBehavior>
              <a href="/about">About us</a>
            </Link>
          </Button>
          <div className="spire-logo">
            <Image src="/spire.png" alt="Spire Logo" width={180} height={80} />
          </div>
        </Col>
      </Row>
    </Container>
  </main>
);

export default Home;
