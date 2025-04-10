'use client';

import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import swal from 'sweetalert';
import { Card, Col, Container, Button, Form, Row } from 'react-bootstrap';
import { changeUsername } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';

type ChangeUsernameForm = {
  newUsername: string;
  confirmUsername: string;
};

/** The change username page. */
const ChangeUsername = () => {
  const { data: session, status } = useSession();
  const email = session?.user?.email || '';

  const validationSchema = Yup.object().shape({
    newUsername: Yup.string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username must not exceed 20 characters'),
    confirmUsername: Yup.string()
      .required('Confirm Username is required')
      .oneOf([Yup.ref('newUsername'), ''], 'Usernames do not match'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangeUsernameForm>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: ChangeUsernameForm) => {
    await changeUsername({ email, ...data });
    await swal('Username Changed', 'Your username has been updated', 'success', { timer: 2000 });
    reset();
  };

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  return (
    <main>
      <Container>
        <Row className="justify-content-center">
          <Col xs={5}>
            <h1 className="text-center">Change Username</h1>
            <Card>
              <Card.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="form-group">
                    <Form.Label>New Username</Form.Label>
                    <input
                      type="text"
                      {...register('newUsername')}
                      className={`form-control ${errors.newUsername ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.newUsername?.message}</div>
                  </Form.Group>

                  <Form.Group className="form-group">
                    <Form.Label>Confirm Username</Form.Label>
                    <input
                      type="text"
                      {...register('confirmUsername')}
                      className={`form-control ${errors.confirmUsername ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.confirmUsername?.message}</div>
                  </Form.Group>

                  <Form.Group className="form-group py-3">
                    <Row>
                      <Col>
                        <Button type="submit" className="btn btn-primary">
                          Change
                        </Button>
                      </Col>
                      <Col>
                        <Button type="button" onClick={() => reset()} className="btn btn-warning float-right">
                          Reset
                        </Button>
                      </Col>
                    </Row>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ChangeUsername;
