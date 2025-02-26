'use client';

import { Col, Container, Row, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import './page.css';

const ClientDashboard = () => {
  const { data: session } = useSession();
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setCurrentDate(formattedDate);
  }, []);

  return (
    <main>
      <Container fluid id="client-dashboard">
        <Row className="full-height">
          <Col md={4} className="left-section">
            <h1 className="heading-left">
              Welcome
              {' '}
              {session?.user?.email }
            </h1>
            <p className="date-text">{currentDate}</p>
            <Button className="white-button">Manage Account</Button>
            <br />
            <Button className="white-button">Account Summary</Button>
          </Col>

          <Col md={8} className="right-section">
            <Button className="blue-button">View Sustainability Model</Button>
            <Button className="blue-button">
              <Link href="/clientStressTests" passHref legacyBehavior>
                <a href="/clientStressTests">View Stress Tests</a>
              </Link>
            </Button>
            <Button className="blue-button">
              <Link href="/clientForecasts" passHref legacyBehavior>
                <a href="/clientForecasts">View Forecasts</a>
              </Link>
            </Button>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ClientDashboard;
