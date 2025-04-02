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
      <Container fluid id="client-dashboard" className="full-height">
        <Col className="left-section">
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
        <Col className="right-section">
          <Button className="orange-button">View Sustainability Model</Button>
          <h3>
            View your company's fiscal sustainability model which incorporates inputs
            from your financial forecast and stress test scenario options. 
          </h3>
          <Button className="pink-button">View Stress Tests</Button>
          <h3>
            Apply different stess test scenarios against for financial forecast to understand
            its impact on your organization's financial health. 
          </h3>
          <Button className="purple-button">
            <Link href="/clientForecasts" passHref legacyBehavior>
              <a href="/clientForecasts">View Forecasts</a>
            </Link>
          </Button>
          <h3>
            Learn more about future financial outcomes for the next 12-years based on historical data
            obtained from your organization. 
          </h3>
        </Col>
      </Container>
    </main>
  );
};

export default ClientDashboard;
