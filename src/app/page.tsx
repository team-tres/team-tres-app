/* eslint-disable max-len */

'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import './page.css';

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <Container fluid className={`main-container ${isLoaded ? 'loaded' : ''}`}>
      <Row fluid className="min-vh-100 flex-column flex-md-column g-0">
        <Col xs={12} className="top-section d-flex flex-column justify-content-center mb-4 mb-md-0">
          <div className={`content-wrapper ${isLoaded ? 'fade-in' : ''}`}>
            <h1 className="heading-left mb-3">
              <span className="hawaiian-quote">I ka wā ma mua,</span>
              <br />
              <span className="hawaiian-quote">ka wā ma hope.</span>
            </h1>
            <h2 className="heading-left mb-5 quote-translation">
              The future is found in the past.
            </h2>
            <h3 className="heading-left quote-attribution">
              Molokaʻi: Future of a Hawaiian Island, Sustainability Conference, July 2009
            </h3>
          </div>
        </Col>

        {/* Right Section - White Background */}
        <Col xs={12} className="bottom-section d-flex flex-column justify-content-center">
          <div className={`content-wrapper ${isLoaded ? 'slide-in' : ''}`}>
            <h3 className="heading-right text-center">
              E komo mai!
              <br />
              {' '}
              Welcome to Spire&apos;s Fiscal Navigator.
            </h3>
            <div className="text-right">
              <p className="lead text-center">
                <span />
                In cooperation with
                {' '}
                <Link href="https://www.spirehawaii.com/" className="text-right-link" target="_blank" rel="noopener noreferrer">
                  <strong>Spire</strong>
                </Link>
                , we utilize this fiscal navigator, or Fisc-Nav for short, to support organizations in making informed financial and strategic decisions. Fisc-Nav leverages historical financial data, incorporates relevant variables, and provides future-focused financial forecasts and trend analyses. Through this integrated approach, Spire helps organizations navigate today&apos;s evolving economic landscape, enhancing their ability to make sound management decisions.
              </p>
            </div>

            <div className="action-container d-flex justify-content-between align-items-center mt-4">
              <Link href="/about" className="about-link">
                About us
              </Link>

              <div className="partner-section d-flex align-items-center">
                <p className="partner-text me-3 mb-0">In partnership with:</p>
                <Link href="https://www.spirehawaii.com/" target="_blank" rel="noopener noreferrer">
                  <div className="logo-wrapper">
                    <Image
                      src="/spire.png"
                      alt="Spire Logo"
                      width={120}
                      height={41}
                      className="spire-logo"
                      priority
                    />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
