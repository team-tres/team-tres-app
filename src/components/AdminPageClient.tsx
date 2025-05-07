'use client';

import { useState } from 'react';
import { Col, Container, Row, Table, Button, ButtonGroup } from 'react-bootstrap';
import Link from 'next/link';

const AdminPageClient = ({ initialPendingUsers }: { initialPendingUsers: any[] }) => {
  const [pendingUsers, setPendingUsers] = useState(initialPendingUsers);

  const handleUserAction = async (userId: number, status: boolean) => {
    try {
      console.log('handleUserAction called with:', { userId, status });
      const response = await fetch('/api/admin/update-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'pending form',
          data: [
            {
              userId,
              status,
            },
          ],
        }),
      });

      if (response.ok) {
        // Remove user from the pending list
        setPendingUsers(pendingUsers.filter(user => user.id !== userId));
      } else {
        console.error('Failed to update user status');
        // You could add error handling UI here
      }
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  return (
    <main>
      <Container id="dashboard" fluid style={{ backgroundColor: '#051C2C', minHeight: '100vh', paddingTop: '30px' }}>
        <Row className="mb-3">
          <Col className="text-center">
            <h1 className="text-light">Admin Dashboard</h1>
            <ButtonGroup>
              <Link href="/admin/user-management" passHref>
                <Button variant="light" className="mx-2">Manage All Users</Button>
              </Link>
              <Link href="/admin/company-management" passHref>
                <Button
                  variant="light"
                  className="mx-2"
                >
                  Manage Companies
                </Button>
              </Link>
              <Link href="/admin/client-viewing" passHref>
                <Button variant="light" className="mx-2">Manage Clients</Button>
              </Link>
            </ButtonGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2 className="text-light">Pending Users</h2>
            <Table striped bordered hover className="shadow bg-white">
              <thead className="bg-secondary text-white">
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingUsers.length > 0 ? (
                  pendingUsers.map((user) => (
                    <tr key={user.email}>
                      <td>{user.username}</td>
                      <td>{user.role}</td>
                      <td>{user.email}</td>
                      <td style={{ backgroundColor: '#808080', color: 'black' }}>Pending Approval</td>
                      <td>
                        <Button
                          className="btn btn-sm btn-success"
                          onClick={() => {
                            console.log('Allow clicked for user:', user.id);
                            handleUserAction(user.id, true);
                          }}
                        >
                          Allow
                        </Button>
                        {' '}
                        <Button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleUserAction(user.id, false)}
                        >
                          Deny
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center">
                      No pending users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default AdminPageClient;
