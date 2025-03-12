/* eslint-disable react/require-default-props */
import SearchBar from '@/components/SearchBar';
import authOptions from '@/lib/authOptions';
import { adminProtectedPage } from '@/lib/page-protection';
import { getServerSession } from 'next-auth';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import getUsers from '@/app/queries/admin/getUser';

const ClientViewingPage = async ({ searchParams = {} }: { searchParams?: { query?: string } }) => {
  // Get session info
  const session = await getServerSession(authOptions);
  adminProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  // Extract search query from URL parameters
  const searchQuery = searchParams?.query?.toLowerCase() || '';

  // Fetch clients with the 'CLIENT' role and apply search filter
  const users = await getUsers();
  const clients = users.filter(user => user.role === 'CLIENT');

  const filteredClients = clients.filter(client => (searchQuery
    ? client.username.toLowerCase().includes(searchQuery)
        || client.email.toLowerCase().includes(searchQuery)
    : true));

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
            {clients.length === 0 ? (
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
                  {filteredClients.map((client) => (
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

export default ClientViewingPage;
