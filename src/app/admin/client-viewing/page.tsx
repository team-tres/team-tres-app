import { getServerSession } from 'next-auth';
import { Col, Container, Row, Table, Form, InputGroup } from 'react-bootstrap';
import { prisma } from '@/lib/prisma'; // Ensure your Prisma client is properly imported
import authOptions from '@/lib/authOptions'; // Import auth options for session management
import { adminProtectedPage } from '@/lib/page-protection';
import { Search } from 'react-bootstrap-icons'; // Import Search icon from react-bootstrap-icons
import { useState } from 'react';

const ClientViewingPage = async () => {
  // Get session info
  const session = await getServerSession(authOptions);
  adminProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  // Fetch clients with the 'CLIENT' role directly from the database
  const clients = await prisma.user.findMany({
    where: {
      role: 'CLIENT', // Only fetch users with the 'CLIENT' role
    },
  });

  // Handle the search functionality
  const [searchQuery, setSearchQuery] = useState('');

  // Filter clients based on search query
  const filteredClients = clients.filter(
    (client) => client.username.toLowerCase().includes(searchQuery.toLowerCase())
               || client.email.toLowerCase().includes(searchQuery.toLowerCase())
               || client.id.toString().includes(searchQuery),
  );

  return (
    <main style={{ backgroundColor: '#f5f5dc', minHeight: '100vh', paddingTop: '20px' }}>
      <Container id="list" fluid className="py-3">
        <Row className="align-items-center mb-3">
          <Col md={6}>
            <h1 className="text-dark">Clients</h1>
          </Col>

          {/* Search Bar */}
          <Col md={6}>
            <InputGroup>
              <InputGroup.Text>
                <Search />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search clients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
          </Col>
        </Row>

        <Row>
          <Col>
            {/* Show filtered clients in a table */}
            {filteredClients.length === 0 ? (
              <div className="text-center">
                <p>No clients found.</p>
              </div>
            ) : (
              <Table striped bordered hover className="shadow bg-white">
                <thead className="bg-secondary text-white">
                  <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.map((client) => (
                    <tr key={client.id}>
                      <td>{client.id}</td>
                      <td>{client.email}</td>
                      <td>{client.role}</td>
                      <td>{client.username}</td>
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
