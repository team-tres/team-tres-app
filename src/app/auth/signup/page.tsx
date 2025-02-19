'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Card, Col, Container, Button, Form, Row, Alert, ListGroup } from 'react-bootstrap';
import './page.css';

type SignUpForm = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  companyIni: string;
};

const SignUp = () => {
  const [signupSubmitted, setSignupSubmitted] = useState(false);
  const [companySuggestions, setCompanySuggestions] = useState<string[]>([]);
  const [typedCompany, setTypedCompany] = useState(''); // Stores user input for autocomplete

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), ''], 'Passwords must match'),
    // role: Yup.string().required('Role is required'),
    companyIni: Yup.string().required('Company Name is required'),
    username: Yup.string().required('Username is required'),

  });

  const {
    register,
    handleSubmit,
    reset,
    setValue, // Allows us to set value manually in React Hook Form
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: yupResolver(validationSchema),
  });

  // Simulated backend call for company suggestions
  const fetchCompanySuggestions = async (input: string) => {
    if (input.length < 2) {
      setCompanySuggestions([]);
      return;
    }

    const existingCompanies = ['Spire Hawaii', 'Tech Innovations', 'Aloha Solutions']; // Replace with API call later
    const filtered = existingCompanies.filter((company) => company.toLowerCase().startsWith(input.toLowerCase()));
    setCompanySuggestions(filtered);
  };

  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setTypedCompany(input); // Updates state for display
    setValue('companyIni', input); // Updates form field value
    fetchCompanySuggestions(input);
  };

  const handleCompanySelect = (name: string) => {
    setTypedCompany(name);
    setValue('companyIni', name); // Sets the selected name in the form
    setCompanySuggestions([]); // Hides suggestions
  };

  const handleSignup = async (data: SignUpForm) => {
    console.log('Signup request sent:', data);
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to signup, please contact Team-Tres to resolve');
      }
      const result = await response.json();
      console.log('Success', result.username);
      setSignupSubmitted(true);
      reset();
      setTypedCompany(''); // Reset typed company name
    } catch (err) {
      console.error('Error during signup', err);
    }
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
                    <Form.Control type="text" {...register('email')} isInvalid={!!errors.email} />
                    <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="username" className="mb-3">
                  <Form.Label column md={4}>Username</Form.Label>
                  <Col sm={8}>
                    <Form.Control type="text" {...register('username')} isInvalid={!!errors.username} />
                    <Form.Control.Feedback type="invalid">{errors.username?.message}</Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="password" className="mb-3">
                  <Form.Label column md={4}>Password</Form.Label>
                  <Col sm={8}>
                    <Form.Control type="password" {...register('password')} isInvalid={!!errors.password} />
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

                {/* <Form.Group as={Row} controlId="role" className="mb-3">
                  <Form.Label column md={4}>Role</Form.Label>
                  <Col sm={8}>
                    <Form.Select {...register('role')} isInvalid={!!errors.role}>
                      <option value="">Select Role</option>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">{errors.role?.message}</Form.Control.Feedback>
                  </Col>
                </Form.Group> */}

                {/* Company Name Input with Autocomplete */}
                <Form.Group as={Row} controlId="companyIni" className="mb-3">
                  <Form.Label column md={4}>Company Name</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      value={typedCompany} // Ensure displayed value updates correctly
                      onChange={handleCompanyChange}
                      placeholder="Ex: Spire, Walmart, etc"
                      isInvalid={!!errors.companyIni}
                    />
                    <Form.Control.Feedback type="invalid">{errors.companyIni?.message}</Form.Control.Feedback>

                    {/* Autocomplete Dropdown */}
                    {companySuggestions.length > 0 && (
                      <ListGroup className="autocomplete-dropdown">
                        {companySuggestions.map((company) => (
                          <ListGroup.Item
                            key={company} // Use company name as key
                            action
                            onClick={() => handleCompanySelect(company)}
                          >
                            {company}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    )}
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
