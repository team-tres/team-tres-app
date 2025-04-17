/* eslint-disable max-len */

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Nav, Navbar, NavDropdown, Image } from 'react-bootstrap';
import { BoxArrowRight, Lock, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';
import './component.css';

const NavBar: React.FC = () => {
  const { data: session } = useSession();
  const currentUser = session?.user?.email;
  const userWithRole = session?.user as { email: string; randomKey: string };
  const role = userWithRole?.randomKey;
  const pathName = usePathname();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // Change state when scrolled more than 50px
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Navbar className={`custom-navbar ${scrolled ? 'scrolled' : ''}`} fixed="top">
      <Nav.Link
        id="welcome-page"
        href="/"
        active={pathName === '/'}
        className="font-nav"
      >
        <Image
          src="/spire.png"
          alt="2x size"
          width={scrolled ? 100 : 125} // Shrink logo when scrolled
          height={scrolled ? 34.1 : 42.6}
          className="img-logo"
        />
      </Nav.Link>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          {currentUser && (
            <>
              {role === 'CLIENT' && (
                <Nav.Link
                  id="client-dashboard"
                  href="/clientDashboard"
                  active={pathName === '/clientDashboard'}
                  className="font-nav"
                >
                  DASHBOARD
                </Nav.Link>
              )}
              {role === 'AUDITOR' && (
                <>
                  <Nav.Link
                    id="financial-stuff-nav"
                    href="/financial"
                    active={pathName === '/financial'}
                    className="font-nav"
                  >
                    INPUT FINANCIALS
                  </Nav.Link>
                  <Nav.Link
                    id="audited-data-nav"
                    href="/auditor"
                    active={pathName === '/auditor'}
                    className="font-nav"
                  >
                    AUDITED DATA
                  </Nav.Link>
                </>
              )}
              {role === 'ANALYST' && (
                <Nav.Link
                  id="analyst-stuff-nav"
                  href="/analyst"
                  active={pathName === '/analyst'}
                  className="font-nav"
                >
                  ANALYST
                </Nav.Link>
              )}
              {role === 'ADMIN' && (
                <Nav.Link
                  id="admin-stuff-nav"
                  href="/admin"
                  active={pathName === '/admin'}
                  className="font-nav"
                >
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
    </Navbar>
  );
};

export default NavBar;
