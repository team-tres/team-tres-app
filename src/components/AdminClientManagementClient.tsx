'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Modal, Form } from 'react-bootstrap';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import { Role } from '@prisma/client';

type Company = {
  id: number;
  name: string;
};

type User = {
  id: number;
  role: Role;
  email: string;
  username: string;
  companyId: number | null;
  status: boolean;
  companyIni: string | null;
};

type Props = {
  initialClients: User[];
  companies: Company[];
};

const AdminClientManagementClient = ({ initialClients, companies }: Props) => {
  const [clients, setClients] = useState<User[]>(initialClients);
  const companiesState = companies;
  const [searchQuery, setSearchQuery] = useState('');

  const [showEditModal, setShowEditModal] = useState(false);
  const [currentClient, setCurrentClient] = useState<User | null>(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('/api/admin/update-user');
        if (response.ok) {
          const clientsData = await response.json();
          setClients(clientsData);
        } else {
          console.error('Failed to fetch clients');
        }
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };
    fetchClients();
  }, []);

  const openEditModal = (client: User) => {
    setCurrentClient(client);
    setSelectedCompanyId(client.companyId);
    setShowEditModal(true);
  };

  const handleUpdateClient = async () => {
    if (!currentClient) return;
    try {
      const response = await fetch('/api/admin/update-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update client',
          data: [
            {
              userId: currentClient.id,
              companyId: selectedCompanyId,
            },
          ],
        }),
      });
      if (response.ok) {
        setClients(
          clients.map(
            client => (
              client.id === currentClient.id ? { ...client, companyId: selectedCompanyId } : client),
          ),
        );
        setShowEditModal(false);
      } else {
        console.error('Failed to update client');
      }
    } catch (error) {
      console.error('Error updating client:', error);
    }
  };

  const handleDeleteClient = async (userId: number) => {
    try {
      const response = await fetch('/api/admin/update-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'pending form',
          data: [
            {
              userId,
            },
          ],
        }),
      });
      if (response.ok) {
        setClients(clients.filter(client => client.id !== userId));
      } else {
        console.error('Failed to delete client');
      }
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };

  const getCompanyName = (companyId: number | null) => {
    if (!companyId) return 'No Company';
    const company = companiesState.find(c => c.id === companyId);
    return company ? company.name : 'Unknown Company';
  };

  const filteredClients = clients.filter(
    client => client.username.toLowerCase().includes(searchQuery.toLowerCase())
      || client.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <main>
      <Container fluid style={{ backgroundColor: '#051C2C', minHeight: '100vh', paddingTop: '30px' }}>
        <Row className="mb-3">
          <Col className="text-center">
            <h1 className="text-light">Client Management</h1>
            <div className="d-flex justify-content-center mb-3">
              <Link href="/admin/user-management" passHref>
                <Button
                  variant="light"
                  className="mx-2"
                >
                  Manage All Users
                </Button>
              </Link>
              <Link href="/admin/company-management" passHref>
                <Button
                  variant="light"
                  className="mx-2"
                >
                  Manage Companies
                </Button>
              </Link>
              <Link href="/admin" passHref><Button variant="dark" className="mx-2">Admin Dashboard</Button></Link>
            </div>
          </Col>
        </Row>

        <Row className="align-items-center mb-3">
          <Col md={6}><h2 className="text-light">Manage Clients</h2></Col>
          <Col md={6}>
            <div className="d-flex">
              <div className="flex-grow-1">
                <SearchBar value={searchQuery} onChange={setSearchQuery} />
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <Table striped bordered hover className="shadow bg-white">
              <thead className="bg-secondary text-white">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Company (On Sign Up)</th>
                  <th>Company (Verified)</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.length > 0 ? filteredClients.map(client => (
                  <tr key={client.email}>
                    <td>{client.username}</td>
                    <td>{client.email}</td>
                    <td>{client.companyIni}</td>
                    <td>{getCompanyName(client.companyId)}</td>
                    <td>{client.status ? 'Active' : 'Inactive'}</td>
                    <td>
                      <Button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => openEditModal(client)}
                      >
                        Edit
                      </Button>
                      <Button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteClient(client.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan={5} className="text-center">No clients found.</td></tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton><Modal.Title>Edit Client</Modal.Title></Modal.Header>
        <Modal.Body>
          {currentClient && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={currentClient.username} disabled />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={currentClient.email} disabled />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Assign Company</Form.Label>
                <div className="d-flex">
                  <Form.Select
                    value={selectedCompanyId || ''}
                    onChange={(e) => setSelectedCompanyId(e.target.value ? parseInt(e.target.value, 10) : null)}
                    className="me-2"
                  >
                    <option value="">No Company</option>
                    {companies.map((company) => (
                      <option key={company.id} value={company.id}>{company.name}</option>
                    ))}
                  </Form.Select>
                </div>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleUpdateClient}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
};

export default AdminClientManagementClient;
