/* eslint-disable max-len */

'use client';

import { useState } from 'react';
import { Col, Container, Table, Form, InputGroup, Row, Button } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';

const AdminPage = () => {
  // Placeholder user data (no database)
  const users = [
    { id: 1, fullname: 'Alice Johnson', role: 'ADMIN', email: 'alice@company.com', approver: 'Alice' },
    { id: 2, fullname: 'Bob Brown', role: 'ANALYST', email: 'bob@company.com', approver: 'Alice' },
    { id: 3, fullname: 'Charlie White', role: 'AUDITOR', email: 'charlie@company.com', approver: 'Alice' },
    { id: 4, fullname: 'David Green', role: 'ANALYST', email: 'david@company.com', approver: 'Alice' },
    { id: 5, fullname: 'Emma Black', role: 'CLIENT', email: 'emma@company.com', approver: 'Alice' },
  ];

  const [searchQuery, setSearchQuery] = useState('');

  // Filter users: Only show ADMIN, ANALYST, and AUDITOR & match search query
  const filteredUsers = users
    .filter((user) => ['ADMIN', 'ANALYST', 'AUDITOR'].includes(user.role))
    .filter(
      (user) => user.fullname.toLowerCase().includes(searchQuery.toLowerCase())
        || user.role.toLowerCase().includes(searchQuery.toLowerCase())
        || user.email.toLowerCase().includes(searchQuery.toLowerCase())
        || user.approver.toLowerCase().includes(searchQuery.toLowerCase()),
    );

  return (
    <main style={{ backgroundColor: '#f5f5dc', minHeight: '100vh', paddingTop: '20px' }}>
      <Container id="list" fluid className="py-3">
        <Row className="align-items-center mb-3">
          {/* Heading */}
          <Col md={6}>
            <h1 className="text-dark">Users</h1>
          </Col>

          {/* Search Bar */}
          <Col md={6}>
            <InputGroup>
              <InputGroup.Text>
                <Search />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
          </Col>
        </Row>

        <Col>
          <Table striped bordered hover className="shadow bg-white">
            <thead className="bg-secondary text-white">
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Email</th>
                <th>Approver</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.fullname}</td>
                    <td>{user.role}</td>
                    <td>{user.email}</td>
                    <td>{user.approver}</td>
                    <td>
                      <Button className="btn btn-sm btn-primary">Edit</Button>
                      {' '}
                      <Button className="btn btn-sm btn-danger">Delete</Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center">
                    No matching users found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Container>
    </main>
  );
};

export default AdminPage;
