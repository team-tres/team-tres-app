/* eslint-disable max-len */

'use client';

import { useState } from 'react';
import { Col, Container, Row, Table, Form, InputGroup } from 'react-bootstrap';

const ClientViewingPage = () => {
  // Placeholder client data (no database)
  const users = [
    { id: 1, fullname: 'John Doe', company: 'Tech Corp', email: 'john@example.com', status: 'Active', role: 'CLIENT' },
    { id: 2, fullname: 'Jane Smith', company: 'Business Ltd.', email: 'jane@example.com', status: 'Inactive', role: 'CLIENT' },
    { id: 3, fullname: 'Alice Johnson', company: 'Marketing Inc.', email: 'alice@example.com', status: 'Active', role: 'CLIENT' },
    { id: 4, fullname: 'Bob Brown', company: 'Finance LLC', email: 'bob@example.com', status: 'Pending', role: 'CLIENT' },
    { id: 5, fullname: 'Charlie White', company: 'Healthcare Solutions', email: 'charlie@example.com', status: 'Active', role: 'ADMIN' }, // Not a CLIENT
  ];

  const [searchQuery, setSearchQuery] = useState('');

  // Filter users: Only show CLIENT roles & match search query
  const filteredUsers = users
    .filter((user) => user.role === 'CLIENT')
    .filter(
      (user) => user.fullname.toLowerCase().includes(searchQuery.toLowerCase())
        || user.company.toLowerCase().includes(searchQuery.toLowerCase())
        || user.email.toLowerCase().includes(searchQuery.toLowerCase())
        || user.status.toLowerCase().includes(searchQuery.toLowerCase()),
    );

  return (
    <main style={{ backgroundColor: '#f5f5dc', minHeight: '100vh', paddingTop: '20px' }}>
      <Container id="list" fluid className="py-3">
        <Row className="align-items-center mb-3">
          {/* Heading */}
          <Col md={6}>
            <h1 className="text-dark">Clients</h1>
          </Col>

          {/* Search Bar */}
          <Col md={6}>
            <InputGroup>
              <InputGroup.Text>🔍</InputGroup.Text>
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
            <Table striped bordered hover className="shadow bg-white">
              <thead className="bg-secondary text-white">
                <tr>
                  <th>Name</th>
                  <th>Company</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((client) => (
                    <tr key={client.id}>
                      <td>{client.fullname}</td>
                      <td>{client.company}</td>
                      <td>{client.email}</td>
                      <td>{client.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center">
                      No matching clients found.
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

export default ClientViewingPage;
