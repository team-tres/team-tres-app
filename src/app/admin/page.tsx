/* eslint-disable max-len */
import { getServerSession } from 'next-auth';
import { Col, Container, Row, Table, Button, ButtonGroup } from 'react-bootstrap';
import { adminProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import Link from 'next/link';
import getUsers from '../queries/admin/getUser';

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  adminProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );
  const users = await getUsers();
  const pendingUsers = users.filter(user => user.status === true);
  return (
    <main>
      <Container id="dashboard" fluid style={{ backgroundColor: '#051C2C', minHeight: '100vh', paddingTop: '30px' }}>
        <Row className="mb-3">
          <Col className="text-center">
            <h1 className="text-light">Admin Dashboard</h1>
            <ButtonGroup>
              <Link href="/admin/client-viewing" passHref>
                <Button style={{ borderColor: 'Black', backgroundColor: 'white', color: '#051C2C' }}>View Clients</Button>
              </Link>
              <Link href="/admin/user-logs" passHref>
                <Button style={{ borderColor: 'Black', backgroundColor: 'white', color: '#051C2C' }}>User Logs</Button>
              </Link>
              <Link href="/admin/user-management" passHref>
                <Button style={{ borderColor: 'Black', backgroundColor: 'white', color: '#051C2C' }}>Manage Users</Button>
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
                      <td style={{ backgroundColor: '#808080', color: 'black' }}>Pending</td>
                      <td>
                        <Button className="btn btn-sm btn-success">Allow</Button>
                        {' '}
                        <Button className="btn btn-sm btn-danger">Deny</Button>
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

export default AdminPage;
