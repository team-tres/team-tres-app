/* eslint-disable max-len */
import { getServerSession } from 'next-auth';
import { Col, Container, Row, Table, Button, ButtonGroup } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { adminProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import Link from 'next/link';

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  adminProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );
  const users = await prisma.user.findMany();

  return (
    <main>
      <Container id="dashboard" fluid className="py-3">
        <Row className="mb-3">
          <Col className="text-center">
            <h1>Admin Dashboard</h1>
            <ButtonGroup>
              <Link href="/admin/client-viewing" passHref>
                <Button style={{ backgroundColor: '#F5F5DC', borderColor: 'Black', color: '#000' }}>View Clients</Button>
              </Link>
              <Link href="/admin/user-logs" passHref>
                <Button style={{ backgroundColor: '#F5F5DC', borderColor: 'Black', color: '#000' }}>User Logs</Button>
              </Link>
              <Link href="/admin/user-management" passHref>
                <Button style={{ backgroundColor: '#F5F5DC', borderColor: 'Black', color: '#000' }}>Manage Users</Button>
              </Link>
            </ButtonGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>Pending Users</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Set Role</th>
                  <th>Set Company</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.email}</td>
                    <td>__________</td>
                    <td>__________</td>
                    <td style={{ backgroundColor: '#FFF3CD' }}>Pending</td>
                    <td>
                      <Button variant="success" size="sm">Allow</Button>
                      {' '}
                      <Button variant="danger" size="sm">Deny</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default AdminPage;
