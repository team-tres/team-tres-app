'use client';

import { useState } from 'react';
import { Col, Container, Row, Table, Form, InputGroup } from 'react-bootstrap';

const ClientViewingPage = () => {
  const users = [
    {
      id: 1,
      fullname: 'John Doe',
      company: 'Tech Corp',
      email: 'john@example.com',
      status: 'Active',
      role: 'CLIENT',
    },
    {
      id: 2,
      fullname: 'Jane Smith',
      company: 'Business Ltd.',
      email: 'jane@example.com',
      status: 'Inactive',
      role: 'CLIENT',
    },
    {
      id: 3,
      fullname: 'Alice Johnson',
      company: 'Marketing Inc.',
      email: 'alice@example.com',
      status: 'Active',
      role: 'CLIENT',
    },
    {
      id: 4,
      fullname: 'Bob Brown',
      company: 'Finance LLC',
      email: 'bob@example.com',
      status: 'Pending',
      role: 'CLIENT',
    },
    {
      id: 5,
      fullname: 'Charlie White',
      company: 'Healthcare Solutions',
      email: 'charlie@example.com',
      status: 'Active',
      role: 'ADMIN',
    },
  ];

  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(({ role, fullname, company, email, status }) => (
    role === 'CLIENT'
    && [fullname, company, email, status].some(
      (field) => field.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  ));

  return (
    <main style={{ backgroundColor: '#f5f5dc', minHeight: '100vh', paddingTop: '20px' }}>
      <Container fluid className="py-3">
        <Row className="align-items-center mb-3">
          <Col md={6}>
            <h1 className="text-dark">Clients</h1>
          </Col>
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
                  filteredUsers.map(({ id, fullname, company, email, status }) => (
                    <tr key={id}>
                      <td>{fullname}</td>
                      <td>{company}</td>
                      <td>{email}</td>
                      <td>{status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center">No matching clients found.</td>
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
