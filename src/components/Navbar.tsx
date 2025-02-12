/* eslint-disable react/jsx-indent, @typescript-eslint/indent */

'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Container, Nav, Navbar, NavDropdown, Image } from 'react-bootstrap';
import { BoxArrowRight, Lock, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';
import './component.css';

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
          <Nav className="ms-auto">
            {currentUser && (
              <>
                <Nav.Link id="client-dashboard" href="/clientDashboard" active={pathName === '/clientDashboard'} className="font-nav">
                  DASHBOARD
                </Nav.Link>
                <Nav.Link id="financial-stuff-nav" href="/financial" active={pathName === '/financial'} className="font-nav">
                  INPUT FINANCIALS
                </Nav.Link>
                <Nav.Link id="analyst-stuff-nav" href="/analyst" active={pathName === '/analyst'} className="font-nav">
                  ANALYST
                </Nav.Link>
                {role === 'ADMIN' && (
                  <Nav.Link id="admin-stuff-nav" href="/admin" active={pathName === '/admin' } className="font-nav">
                    ADMIN
                  </Nav.Link>
                )}
              </>
            )}
          </Nav>
          <Nav className="ms-auto" style={{ paddingRight: '100px' }}>
            {session ? (
              <NavDropdown id="login-dropdown" title={currentUser} className="font-nav">
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
              <NavDropdown id="login-dropdown" title="Login" className="font-nav">
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
