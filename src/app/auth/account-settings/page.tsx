// account-settings/page.tsx

'use client';

import { Container, Row, Col, Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

const AccountSettings = () => {
  const router = useRouter();

  return (
    <main>
      <Container>
        <Row className="justify-content-center">
          <Col xs={6} className="text-center">
            <h1>Account Settings</h1>
            <p>What would you like to change?</p>
            <Button className="btn btn-primary m-2" onClick={() => router.push('/change-password')}>
              Change Password
            </Button>
            <Button className="btn btn-primary m-2" onClick={() => router.push('/change-username')}>
              Change Username
            </Button>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default AccountSettings;
