/* eslint-disable react/require-default-props */
/* eslint-disable max-len */

import authOptions from '@/lib/authOptions';
import { adminProtectedPage } from '@/lib/page-protection';
import { getServerSession } from 'next-auth';
import { Col, Container, Table, Row, Button } from 'react-bootstrap';
import getUsers from '@/app/queries/admin/getUser';
import SearchBar from '@/components/SearchBar';

const AdminPage = async ({ searchParams = {} }: { searchParams?: { query?: string } }) => {
  // Get session info and enforce admin protection
  const session = await getServerSession(authOptions);
  adminProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  // Extract search query from URL parameters
  const searchQuery = searchParams?.query?.toLowerCase() || '';

  // Fetch all users and filter out CLIENT roles
  const users = await getUsers();
  const filteredUsers = users
    .filter(user => ['ADMIN', 'ANALYST', 'AUDITOR'].includes(user.role))
    .filter(
      user => user.username.toLowerCase().includes(searchQuery)
        || user.role.toLowerCase().includes(searchQuery)
        || user.email.toLowerCase().includes(searchQuery),
    );

  return (
    <main style={{ backgroundColor: '#f5f5dc', minHeight: '100vh', paddingTop: '20px' }}>
      <Container id="list" fluid className="py-3">
        <Row className="align-items-center mb-3">
          <Col md={6}>
            <h1 className="text-dark">Clients</h1>
          </Col>
          <Col md={6}>
            <SearchBar />
          </Col>
        </Row>

        <Row>
          <Col>
            {/* Show clients in a table */}
            {users.length === 0 ? (
              <div className="text-center">
                <p>No clients found.</p>
              </div>
            ) : (
              <Table striped bordered hover className="shadow bg-white">
                <thead className="bg-secondary text-white">
                  <tr>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Name</th>
                    <th>Edit/Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((client) => (
                    <tr key={client.email}>
                      <td>{client.email}</td>
                      <td>{client.role}</td>
                      <td>{client.username}</td>
                      <td>
                        <Button className="btn btn-sm btn-primary">Edit</Button>
                        {' '}
                        <Button className="btn btn-sm btn-danger">Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default AdminPage;
