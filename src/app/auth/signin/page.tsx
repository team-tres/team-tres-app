'use client';

import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button, Card, Col, Container, Form, Row, Alert } from 'react-bootstrap';
import './page.css';
import { useEffect, useState } from 'react';

const SignIn = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (session?.user) {
      const userWithRole = session.user as { email: string; randomKey: string };
      const role = userWithRole?.randomKey;

      switch (role) {
        case 'CLIENT':
          router.push('/clientDashboard');
          break;
        case 'AUDITOR':
          router.push('/financial');
          break;
        case 'ANALYST':
          router.push('/analyst');
          break;
        case 'ADMIN':
          router.push('/admin');
          break;
        default:
          router.push('/clientDashboard');
      }
    }
  }, [session, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Clear any previous errors

    const result = await signIn('credentials', {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (result?.error) {
      console.error('Sign in failed: ', result.error);
      setError('Invalid email or password. Please try again.');
      // Clear the password field but keep the email for convenience
      setFormData(prev => ({
        ...prev,
        password: '',
      }));
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center background">
      <Row className="sign-in-container">
        <Col md={5} className="left-section d-flex align-items-center justify-content-center">
          <h1>Sign In</h1>
        </Col>

        <Col md={8}>
          <Card className="d-flex align-items-center">
            <Card.Body>
              {error && (
                <Alert variant="danger" className="mb-3">
                  {error}
                </Alert>
              )}
              <Form className="form" onSubmit={handleSubmit}>
                <Form.Group as={Row} controlId="email" className="mb-3">
                  <Form.Label column sm={4}>Email</Form.Label>
                  <Col md={8}>
                    <Form.Control
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="password" className="mb-3">
                  <Form.Label column sm={4}>Password</Form.Label>
                  <Col md={8}>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </Col>
                </Form.Group>

                <Button type="submit" className="w-100">Sign In</Button>
              </Form>
            </Card.Body>

            <Card.Footer className="text-center">
              Don&apos;t have an account?
              <a href="/auth/signup"> Sign up</a>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
