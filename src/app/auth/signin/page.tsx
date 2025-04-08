'use client';

import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import './page.css';
import { useEffect } from 'react';
import Image from 'next/image';

const SignIn = () => {
  const { data: session } = useSession();
  const router = useRouter();

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
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center background">
      <Row className="sign-in-container">
        <Col md={5} className="left-section d-flex align-items-center justify-content-center">
          <Image
            src="/spire.png"
            alt="Spire Logo"
            className="spire-logo"
            width={300}
            height={300}
            priority
          />
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
