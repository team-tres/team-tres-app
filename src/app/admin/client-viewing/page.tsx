/* eslint-disable max-len */

const ClientViewingPage = async () => {
  const session = await getServerSession(authOptions);
  adminProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );
  //   const stuff = await prisma.stuff.findMany({});
  const users = await prisma.user.findMany({});

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
