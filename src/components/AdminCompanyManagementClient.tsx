'use client';

import { useState } from 'react';
import { Container, Row, Col, Table, Button, Modal, Form } from 'react-bootstrap';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';

type Company = {
  id: number;
  name: string;
};

type User = {
  id: number;
  email: string;
  username: string;
  role: string;
  companyId: number | null;
};

const AdminCompanyManagementClient = ({
  initialCompanies,
  users,
}: {
  initialCompanies: Company[],
  users: User[]
}) => {
  const [companies, setCompanies] = useState<Company[]>(initialCompanies);

  // Company modal state
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [companyName, setCompanyName] = useState('');

  // View users modal state
  const [showUsersModal, setShowUsersModal] = useState(false);
  const [currentCompanyId, setCurrentCompanyId] = useState<number | null>(null);

  // Apply search filter when search query changes

  const openCreateModal = () => {
    setEditingCompany(null);
    setCompanyName('');
    setShowCompanyModal(true);
  };

  const openEditModal = (company: Company) => {
    setEditingCompany(company);
    setCompanyName(company.name);
    setShowCompanyModal(true);
  };

  const openViewUsersModal = (companyId: number) => {
    setCurrentCompanyId(companyId);
    setShowUsersModal(true);
  };

  const handleSaveCompany = async () => {
    if (!companyName.trim()) return;

    try {
      const response = await fetch('/api/admin/update-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: editingCompany ? 'update company' : 'create company',
          data: editingCompany
            ? [
              {
                companyId: editingCompany.id,
                name: companyName,
              },
            ]
            : [
              {
                name: companyName,
              },
            ],
        }),
      });

      if (response.ok) {
        if (editingCompany) {
          setCompanies(companies.map(company => (company.id === editingCompany.id
            ? { ...company, name: companyName }
            : company)));
        } else {
          setCompanies([...companies, { id: Date.now(), name: companyName }]);
        }
        setShowCompanyModal(false);
      } else {
        console.error('Failed to save company');
      }
    } catch (error) {
      console.error('Error saving company:', error);
    }
  };

  const handleDeleteCompany = async (companyId: number) => {
    const associatedUsers = users.filter(user => user.companyId === companyId);

    if (associatedUsers.length > 0) {
      console.error(
        `Cannot delete company: ${associatedUsers.length} 
        user(s) are associated with it. Please reassign these users first.`,
      );
      return;
    }

    try {
      const response = await fetch('/api/admin/update-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'update company',
          data: [
            {
              companyId,
              delete: true,
            },
          ],
        }),
      });

      if (response.ok) {
        setCompanies(companies.filter(company => company.id !== companyId));
      } else {
        console.error('Failed to delete company');
      }
    } catch (error) {
      console.error('Error deleting company:', error);
    }
  };

  // Get users for a specific company
  const getCompanyUsers = (companyId: number) => users.filter(user => user.companyId === companyId);

  // Count users for a specific company
  const countCompanyUsers = (companyId: number) => users.filter(user => user.companyId === companyId).length;

  const [searchQuery, setSearchQuery] = useState('');

  const filteredCompanies = companies.filter(company => company.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <main>
      <Container
        id="company-management"
        fluid
        style={{
          backgroundColor: '#051C2C',
          minHeight: '100vh',
          paddingTop: '30px' }}
      >
        <Row className="mb-3">
          <Col className="text-center">
            <h1 className="text-light">Company Management</h1>
            <div className="d-flex justify-content-center mb-3">
              <Link href="/admin/user-management" passHref>
                <Button variant="light" className="mx-2">Manage All Users</Button>
              </Link>
              <Link href="/admin" passHref>
                <Button variant="dark" className="mx-2">Admin Dashboard</Button>
              </Link>
              <Link href="/admin/client-viewing" passHref>
                <Button variant="light" className="mx-2">Manage Clients</Button>
              </Link>
            </div>
          </Col>
        </Row>

        <Row className="align-items-center mb-3">
          <Col md={6}>
            <h2 className="text-light">Manage Companies</h2>
          </Col>
          <Col md={6}>
            <div className="d-flex">
              <div className="flex-grow-1 me-2">
                <SearchBar value={searchQuery} onChange={setSearchQuery} />
              </div>
              <Button variant="success" onClick={openCreateModal}>
                Create Company
              </Button>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <Table striped bordered hover className="shadow bg-white">
              <thead className="bg-secondary text-white">
                <tr>
                  <th>Company (Verified)</th>
                  <th>Users</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCompanies.length > 0 ? (
                  filteredCompanies.map((company) => (
                    <tr key={company.id}>
                      <td>{company.name}</td>
                      <td>
                        <Button
                          className="btn btn-sm btn-info"
                          onClick={() => openViewUsersModal(company.id)}
                        >
                          View Users (
                          {countCompanyUsers(company.id)}
                          )
                        </Button>
                      </td>
                      <td>
                        <Button
                          className="btn btn-sm btn-primary me-2"
                          onClick={() => openEditModal(company)}
                        >
                          Edit
                        </Button>
                        <Button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDeleteCompany(company.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center">
                      No companies found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>

      {/* Create/Edit Company Modal */}
      <Modal show={showCompanyModal} onHide={() => setShowCompanyModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingCompany ? 'Edit Company' : 'Create Company'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter company name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCompanyModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveCompany}>
            {editingCompany ? 'Update Company' : 'Create Company'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* View Company Users Modal */}
      <Modal
        show={showUsersModal}
        onHide={() => setShowUsersModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Company Users
            {currentCompanyId && ` - ${companies.find(c => c.id === currentCompanyId)?.name}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentCompanyId && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {getCompanyUsers(currentCompanyId).length > 0 ? (
                  getCompanyUsers(currentCompanyId).map((user) => (
                    <tr key={user.id}>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center">
                      No users associated with this company.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUsersModal(false)}>
            Close
          </Button>
          <Link href="/admin/client-viewing" passHref>
            <Button variant="primary">
              Manage Clients
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </main>
  );
};

export default AdminCompanyManagementClient;
