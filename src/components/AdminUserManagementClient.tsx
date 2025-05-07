'use client';

import { useEffect, useState } from 'react';
import { Col, Container, Table, Row, Button, Modal, Form, ButtonGroup } from 'react-bootstrap';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';

interface User {
  id: number;
  email: string;
  username: string;
  role: string;
  status?: boolean;
}

const AdminUserManagementClient = ({
  users,
}: {
  users: User[];
}) => {
  const [allUsers, setAllUsers] = useState(users);
  const [displayedUsers, setDisplayedUsers] = useState(users);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editRole, setEditRole] = useState<string>('ANALYST');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setEditRole(user.role);
    setShowEditModal(true);
  };

  const handleDeleteClick = (user: User) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  // Handle role change
  const handleRoleChange = async () => {
    if (!selectedUser) return;

    setIsProcessing(true);

    try {
      const response = await fetch('/api/admin/update-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'manage form',
          data: [
            {
              userId: selectedUser.id,
              role: editRole,
            },
          ],
        }),
      });

      if (response.ok) {
        // Update the user in both state arrays
        const updatedUser = { ...selectedUser, role: editRole };
        const updatedUsers = allUsers.map(user => (user.id === selectedUser.id ? updatedUser : user));

        setAllUsers(updatedUsers);
        setDisplayedUsers(
          prevDisplayed => prevDisplayed.map(user => (user.id === selectedUser.id ? updatedUser : user)),
        );

        setShowEditModal(false);
      } else {
        const errorData = await response.json();
        console.error('Failed to update user role:', errorData.message);
      }
    } catch (error) {
      console.error('Error updating user role:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle user deletion
  const handleUserDelete = async () => {
    if (!selectedUser) return;

    setIsProcessing(true);

    try {
      const response = await fetch('/api/admin/update-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'manage form',
          data: [
            {
              userId: selectedUser.id,
              delete: true,
            },
          ],
        }),
      });

      if (response.ok) {
        // Remove the user from both state arrays
        const updatedUsers = allUsers.filter(user => user.id !== selectedUser.id);
        setAllUsers(updatedUsers);
        setDisplayedUsers(prevDisplayed => prevDisplayed.filter(user => user.id !== selectedUser.id));

        setShowDeleteModal(false);
      } else {
        const errorData = await response.json();
        console.error('Failed to delete user:', errorData.message);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filtered = allUsers.filter(user => user.username.toLowerCase().includes(searchTerm.toLowerCase())
    || user.email.toLowerCase().includes(searchTerm.toLowerCase()));
    setDisplayedUsers(filtered);
  }, [searchTerm, allUsers]);

  return (
    <main>
      <Container id="dashboard" fluid style={{ backgroundColor: '#051C2C', minHeight: '100vh', paddingTop: '30px' }}>
        <Row className="mb-3">
          <Col className="text-center">
            <h1 className="text-light">User Management</h1>
            <ButtonGroup>
              <Link href="/admin" passHref><Button variant="dark" className="mx-2">Admin Dashboard</Button></Link>
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

        <Row className="align-items-center mb-3">
          <Col md={6}>
            <h2 className="text-light">All Users</h2>
          </Col>
          <Col md={6}>
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
          </Col>
        </Row>

        <Row>
          <Col>
            {displayedUsers.length === 0 ? (
              <div className="text-center text-light">
                <p>No users found.</p>
              </div>
            ) : (
              <Table striped bordered hover className="shadow bg-white">
                <thead className="bg-secondary text-white">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td style={{
                        backgroundColor: user.status === false ? '#808080' : '#28a745',
                        color: 'black',
                      }}
                      >
                        {user.status === false ? 'Pending Approval' : 'Active'}
                      </td>
                      <td>
                        <Button
                          className="btn btn-sm btn-primary"
                          onClick={() => handleEditClick(user)}
                        >
                          Edit
                        </Button>
                        {' '}
                        <Button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDeleteClick(user)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      </Container>

      {/* Edit User Modal */}
      <Modal show={showEditModal} onHide={() => !isProcessing && setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={selectedUser?.email || ''} disabled />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={selectedUser?.username || ''} disabled />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Current Role</Form.Label>
              <Form.Control type="text" value={selectedUser?.role || ''} disabled />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>New Role</Form.Label>
              <Form.Select
                value={editRole}
                onChange={(e) => setEditRole(e.target.value)}
                disabled={isProcessing}
              >
                <option value="ADMIN">ADMIN</option>
                <option value="ANALYST">ANALYST</option>
                <option value="AUDITOR">AUDITOR</option>
                <option value="CLIENT">CLIENT</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)} disabled={isProcessing}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleRoleChange} disabled={isProcessing}>
            {isProcessing ? 'Saving...' : 'Save Changes'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete User Modal */}
      <Modal show={showDeleteModal} onHide={() => !isProcessing && setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete user
          {' '}
          <strong>{selectedUser?.username}</strong>
          {' '}
          (
          {selectedUser?.email}
          )
          ? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)} disabled={isProcessing}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleUserDelete} disabled={isProcessing}>
            {isProcessing ? 'Deleting...' : 'Delete User'}
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
};

export default AdminUserManagementClient;
