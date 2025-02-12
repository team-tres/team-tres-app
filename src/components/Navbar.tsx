/* eslint-disable react/jsx-indent, @typescript-eslint/indent */

'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Container, Nav, Navbar, NavDropdown, Image } from 'react-bootstrap';
import { BoxArrowRight, Lock, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';

const NavBar: React.FC = () => {
  const { data: session } = useSession();
  const currentUser = session?.user?.email;
  const userWithRole = session?.user as { email: string; randomKey: string };
  const role = userWithRole?.randomKey;
  const pathName = usePathname();

  return (
    <Navbar expand="sm" style={{ backgroundColor: 'white' }}>
      <Container fluid>
        <Navbar.Brand href="/" className="me-auto">
          <Image
            src="/logo.png"
            alt="Logo"
            style={{ height: '100px', width: 'auto' }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Centering the Nav items */}
          <Nav className="mx-auto justify-content-center">
            {currentUser && (
              <>
                <Nav.Link id="client-dashboard" href="/clientDashboard" active={pathName === '/clientDashboard'}>
                  Dashboard
                </Nav.Link>
                <Nav.Link id="add-stuff-nav" href="/add" active={pathName === '/add'}>
                  Add Stuff
                </Nav.Link>
                <Nav.Link id="list-stuff-nav" href="/list" active={pathName === '/list'}>
                  List Stuff
                </Nav.Link>
                <Nav.Link id="financial-stuff-nav" href="/financial" active={pathName === '/financial'}>
                  Input Financials
                </Nav.Link>
                <Nav.Link id="analyst-stuff-nav" href="/analyst" active={pathName === '/analyst'}>
                  Analyst
                </Nav.Link>
                {role === 'ADMIN' && (
                  <Nav.Link id="admin-stuff-nav" href="/admin" active={pathName === '/admin'}>
                    Admin
                  </Nav.Link>
                )}
              </>
            )}
          </Nav>
          {/* Move login section to the right */}
          <Nav className="ms-auto" style={{ paddingRight: '100px' }}>
            {session ? (
              <NavDropdown id="login-dropdown" title={currentUser}>
                <NavDropdown.Item id="login-dropdown-sign-out" href="/api/auth/signout">
                  <BoxArrowRight className="me-2" />
                  Sign Out
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-change-password" href="/auth/change-password">
                  <Lock className="me-2" />
                  Change Password
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="login-dropdown" title="Login">
                <NavDropdown.Item id="login-dropdown-sign-in" href="/auth/signin">
                  <PersonFill className="me-2" />
                  Sign in
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" href="/auth/signup">
                  <PersonPlusFill className="me-2" />
                  Sign up
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
