'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import './page.css';

const SignIn = () => {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      console.error('Sign in failed: ', result.error);
    }

    await new Promise((resolve) => setTimeout(resolve, 500));

    const res = await fetch('/api/auth/session', { cache: 'no-store' });
    const session = await res.json();

    console.log(session?.user?.role); // Debugging

    if (session?.user?.role === 'admin') { // role is not working
      await router.push('/clientDashboard');
    } else {
      await router.push('/clientDashboard');
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
              <Form className="form" onSubmit={handleSubmit}>

                <Form.Group as={Row} controlId="email" className="mb-3">
                  <Form.Label column sm={4}>Email</Form.Label>
                  <Col md={8}>
                    <Form.Control type="text" name="email" required />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="password" className="mb-3">
                  <Form.Label column sm={4}>Password</Form.Label>
                  <Col md={8}>
                    <Form.Control type="password" name="password" required />
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
