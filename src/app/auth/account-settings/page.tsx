'use client';

import { Container, Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import './page.css';

const AccountSettings = () => {
  const router = useRouter();

  return (
    <main className="account-settings-bg">
      <Container className="account-settings-container">
        <h1 className="account-settings-title">Account Settings</h1>
        <p className="account-settings-subtext">What would you like to change?</p>
        <div>
          <Button
            className="account-btn btn-orange"
            onClick={() => router.push('/auth/change-password')}
          >
            Change Password
          </Button>
          <Button
            className="account-btn btn-purple"
            onClick={() => router.push('/auth/change-username')}
          >
            Change Username
          </Button>
        </div>
      </Container>
    </main>
  );
};

export default AccountSettings;
