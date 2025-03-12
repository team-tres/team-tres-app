/* eslint-disable max-len */
import { getServerSession } from 'next-auth';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import Link from 'next/link';

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  return (
    <main>
      <Container id="dashboard" fluid className="py-3 text-center">
        <h1>Analyst Dashboard</h1>
        <Row className="justify-content-center mt-4">
          <Col md={4} className="d-grid gap-3">
            <Link href="/analyst/create-workpaper" passHref>
              <Button style={{ backgroundColor: '#F5F5DC', borderColor: 'Black', color: '#000' }}>Create Workpaper</Button>
            </Link>
            <Link href="/analyst/create-scenario" passHref>
              <Button style={{ backgroundColor: '#F5F5DC', borderColor: 'Black', color: '#000' }}>Create Scenario</Button>
            </Link>
            <Link href="/analyst/create-forecast" passHref>
              <Button style={{ backgroundColor: '#00008B', borderColor: 'Black', color: 'white' }}>Create Forecast</Button>
            </Link>
            <Link href="/analyst/create-stress-test" passHref>
              <Button style={{ backgroundColor: '#F5F5DC', borderColor: 'Black', color: '#000' }}>Create Stress Test</Button>
            </Link>
          </Col>
          <Col md={4} className="d-grid gap-3">
            <Link href="/view-workpapers" passHref>
              <Button style={{ backgroundColor: '#F5F5DC', borderColor: 'Black', color: '#000' }}>View Workpapers</Button>
            </Link>
            <Link href="/view-scenarios" passHref>
              <Button style={{ backgroundColor: '#F5F5DC', borderColor: 'Black', color: '#000' }}>View Scenarios</Button>
            </Link>
            <Link href="/view-forecasts" passHref>
              <Button style={{ backgroundColor: '#F5F5DC', borderColor: 'Black', color: '#000' }}>View Forecasts</Button>
            </Link>
            <Link href="/view-stress-tests" passHref>
              <Button style={{ backgroundColor: '#F5F5DC', borderColor: 'Black', color: '#000' }}>View Stress Tests</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default AdminPage;
