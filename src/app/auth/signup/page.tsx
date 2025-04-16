'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
  Card,
  Col,
  Container,
  Button,
  Form,
  Row,
  Alert,
  ListGroup,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import './page.css';
import Image from 'next/image';

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
  const [typedCompany, setTypedCompany] = useState('');

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), ''], 'Passwords must match'),
    companyIni: Yup.string().required('Company Name is required'),
    username: Yup.string().required('Username is required'),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: yupResolver(validationSchema),
  });

  const fetchCompanySuggestions = async (input: string) => {
    if (input.length < 2) {
      setCompanySuggestions([]);
      return;
    }

    const existingCompanies = ['Spire Hawaii', 'Tech Innovations', 'Aloha Solutions'];
    const filtered = existingCompanies.filter((company) => company.toLowerCase().startsWith(input.toLowerCase()));
    setCompanySuggestions(filtered);
  };

  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setTypedCompany(input);
    setValue('companyIni', input);
    fetchCompanySuggestions(input);
  };

  const handleCompanySelect = (name: string) => {
    setTypedCompany(name);
    setValue('companyIni', name);
    setCompanySuggestions([]);
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
      setTypedCompany('');
    } catch (err) {
      console.error('Error during signup', err);
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center background">
      <div className="sign-up-wrapper">
        <div className="sign-up-container">
          <Row className="sign-up-inner">
            <Col
              md={5}
              className="left-section d-flex flex-column align-items-center justify-content-center"
            >
              <Image
                src="/spire.png"
                alt="Spire Logo"
                className="logo mb-3"
                style={{ maxWidth: '80%', height: 'auto' }}
                width={300}
                height={300}
                priority
              />
            </Col>
            <Col md={7}>
              <Card className="dflex align-items-center">
                <Card.Body>
                  <Form className="form" onSubmit={handleSubmit(handleSignup)}>
                    <Form.Group as={Row} controlId="email" className="mb-3">
                      <Form.Label column md={4}>Email</Form.Label>
                      <Col sm={8}>
                        <Form.Control type="text" {...register('email')} isInvalid={!!errors.email} />
                        <Form.Control.Feedback type="invalid">
                          {errors.email?.message}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="username" className="mb-3">
                      <Form.Label column md={4}>Username</Form.Label>
                      <Col sm={8}>
                        <Form.Control type="text" {...register('username')} isInvalid={!!errors.username} />
                        <Form.Control.Feedback type="invalid">
                          {errors.username?.message}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="password" className="mb-3">
                      <Form.Label column md={4}>Password</Form.Label>
                      <Col sm={8}>
                        <Form.Control type="password" {...register('password')} isInvalid={!!errors.password} />
                        <Form.Control.Feedback type="invalid">
                          {errors.password?.message}
                        </Form.Control.Feedback>
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
                        <Form.Control.Feedback type="invalid">
                          {errors.confirmPassword?.message}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="companyIni" className="mb-3">
                      <Form.Label column md={4}>Company Name</Form.Label>
                      <Col sm={8}>
                        <OverlayTrigger
                          placement="right"
                          overlay={<Tooltip id="company-tooltip">Ex: Spire, Walmart, etc</Tooltip>}
                          trigger={['focus']}
                        >
                          <Form.Control
                            type="text"
                            value={typedCompany}
                            onChange={handleCompanyChange}
                            isInvalid={!!errors.companyIni}
                          />
                        </OverlayTrigger>
                        <Form.Control.Feedback type="invalid">
                          {errors.companyIni?.message}
                        </Form.Control.Feedback>

                        {companySuggestions.length > 0 && (
                          <ListGroup className="autocomplete-dropdown">
                            {companySuggestions.map((company) => (
                              <ListGroup.Item
                                key={company}
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
                  <br />
                  <a href="/auth/signin">Sign in</a>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </Container>
  );
};

export default SignUp;
