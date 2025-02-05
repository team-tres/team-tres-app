'use client';

/* import { signIn } from 'next-auth/react'; */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Card, Col, Container, Button, Form, Row, Alert } from 'react-bootstrap';
/* import { createUser } from '@/lib/dbActions'; */
import './page.css';

type SignUpForm = {
  email: string;
  password: string;
  confirmPassword: string;
  role: string; // User role
};

const SignUp = () => {
  const [signupSubmitted, setSignupSubmitted] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), ''], 'Confirm Password does not match'),
    role: Yup.string().required('Role is required'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: yupResolver(validationSchema),
  });

  const handleSignup = (data: SignUpForm) => {
    console.log('Signup request sent:', data);
    setSignupSubmitted(true);
    reset();
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center background">
      <Row className="sign-up-container">
        <Col md={5} className="left-section d-flex align-items-center justify-content-center">
          <h1>Sign Up</h1>
        </Col>
        <Col md={8}>
          <Card className="dflex align-items-center">
            <Card.Body>
              <Form className="form" onSubmit={handleSubmit(handleSignup)}>

                <Form.Group as={Row} controlId="email" className="mb-3">
                  <Form.Label column md={4}>Email</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      {...register('email')}
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="password" className="mb-3">
                  <Form.Label column md={4}>Password</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="password"
                      {...register('password')}
                      isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="confirmPassword" className="mb-3">
                  <Form.Label column md={4}>Confirm Password</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="password"
                      {...register('confirmPassword')}
                      isInvalid={!!errors.confirmPassword}
                    />
                    <Form.Control.Feedback type="invalid">{errors.confirmPassword?.message}</Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="role" className="mb-3">
                  <Form.Label column md={4}>Role</Form.Label>
                  <Col sm={8}>
                    <Form.Select {...register('role')} isInvalid={!!errors.role}>
                      <option value="">Select Role</option>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">{errors.role?.message}</Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Button type="submit" className="w-100">Register</Button>
              </Form>

              {signupSubmitted && (
                <Alert variant="success" className="mt-3 text-center">
                  Signup request submitted! Your account is pending admin approval.
                </Alert>
              )}
            </Card.Body>
            <Card.Footer>
              Already have an account?
              <a href="/auth/signin"> Sign in</a>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
