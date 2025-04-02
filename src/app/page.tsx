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
    <Container fluid className={`page-container ${isLoaded ? 'loaded' : ''}`}>
      <Row className="hero-row min-vh-100 g-0">
        <Col xs={12} className="hero-section d-flex flex-column justify-content-center mb-4 mb-md-0">
          <div className={`hero-content ${isLoaded ? 'fade-in' : ''}`}>
            <h1 className="hero-quote mb-3">
              <span className="hawaiian-phrase">I ka wā ma mua, ka wā ma hope.</span>
            </h1>
            <h2 className="hero-translation text-center mb-5">
              <span>The future is found in the past.</span>
              <br />
              <Image
                src="/spirebar.png"
                alt="Spire Bar"
                width={70}
                height={0}
                className="spire-logo"
                priority
              />
            </h2>
            <h3 className="hero-attribution text-center">
              <span>Molokaʻi: Future of a Hawaiian Island, Sustainability Conference, July 2009</span>
            </h3>
          </div>
        </Col>
      </Row>
      <Row className="content-row g-0">
        <Col xs={12} className="content-section d-flex flex-column justify-content-center">
          <div className={`content-body ${isLoaded ? 'slide-in' : ''}`}>
            <h3 className="welcome-heading text-center">
              E komo mai!
              <br />
              {' '}
              Welcome to Spire.
            </h3>
            <div>
              <p className="lead content-text">
                <span />
                {'  '}
                At
                {' '}
                <Link
                  href="https://www.spirehawaii.com/"
                  className="content-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <strong>Spire</strong>
                </Link>
                , we&apos;ve developed this platform to streamline the
                financial analysis process between our expert team and
                the clients we serve. This tool transforms complex financial
                data into clear, actionable intelligence, allowing our analysts
                and auditors to provide more efficient and targeted insights for your organization.
                <br />
                <br />
                {'  '}
                By integrating historical financial information with relevant
                market variables, we generate sophisticated forecasts and trend analyses
                that illuminate the path forward in today&apos;s dynamic economic
                environment. Our system presents this information in an intuitive
                format, making complex financial concepts more digestible for
                decision-makers while enabling our professionals to deliver deeper, more customized guidance.
                <br />
                <br />
                {'  '}
                This approach honors the Hawaiian spirit of collaboration while
                enhancing your organization&apos;s ability to make informed strategic
                decisions based on expert financial analysis. Through this thoughtful integration
                of professional expertise and streamlined data presentation, we aim to
                provide exceptional value that supports your long-term success.
              </p>
            </div>

            <div className="footer-container d-flex justify-content-between align-items-center mt-4">
              <Link href="/about" className="about-link">
                About us
              </Link>

              <div className="partner-container d-flex align-items-center">
                <p className="partner-label me-3 mb-0">In partnership with:</p>
                <Link href="https://www.spirehawaii.com/" target="_blank" rel="noopener noreferrer">
                  <div className="logo-container">
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
