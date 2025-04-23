'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';
import { FinancialCompilationSchema } from '@/lib/validationSchemas';

const onSubmit = async (data: any) => {
  const response = await fetch('/api/financial-compilation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Failed to save financial data');
  }
  swal('Success', 'Your item has been added', 'success', {
    timer: 2000,
  });
};

const FinancialInputForm: React.FC = () => {
  const { data: session, status } = useSession();
  const currentUserId = session?.user?.id || '';
  console.log('This is user Id', currentUserId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FinancialCompilationSchema),
  });

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center">
            <h2>Input Financials</h2>
          </Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                  <Form.Label>Year</Form.Label>
                  <input
                    type="number"
                    {...register('year')}
                    className={`form-control ${errors.year ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.year?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Revenue</Form.Label>
                  <input
                    type="number"
                    {...register('revenue')}
                    className={`form-control ${errors.revenue ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.revenue?.message}</div>
                </Form.Group>
                <Row className="pt-3">
                  <Col className="px-5">
                    <h3 className="text-center">Income Statement</h3>
                    <Card className="pt-3">
                      <Card.Title className="text-center">Cost of goods sold</Card.Title>
                      <Form.Group>
                        <Form.Label>Cost of Contracting</Form.Label>
                        <input
                          type="number"
                          {...register('costOfContracting')}
                          className={`form-control ${errors.costOfContracting ? 'is-invalid' : ''}`}
                        />
                        <div className="invalid-feedback">{errors.costOfContracting?.message}</div>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Overhead</Form.Label>
                        <input
                          type="number"
                          {...register('overhead')}
                          className={`form-control ${errors.overhead ? 'is-invalid' : ''}`}
                        />
                        <div className="invalid-feedback">{errors.overhead?.message}</div>
                      </Form.Group>
                    </Card>
                    <Card className="pt-3">
                      <Card.Title className="text-center">Operating expenses</Card.Title>
                      <Form.Group>
                        <Form.Label>Salaries and Benefits</Form.Label>
                        <input
                          type="number"
                          {...register('salariesAndBenefits')}
                          className={`form-control ${errors.salariesAndBenefits ? 'is-invalid' : ''}`}
                        />
                        <div className="invalid-feedback">{errors.salariesAndBenefits?.message}</div>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Rent and Overhead</Form.Label>
                        <input
                          type="number"
                          {...register('rentAndOverhead')}
                          className={`form-control ${errors.rentAndOverhead ? 'is-invalid' : ''}`}
                        />
                        <div className="invalid-feedback">{errors.rentAndOverhead?.message}</div>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Depreciation And Amortization</Form.Label>
                        <input
                          type="number"
                          {...register('depreciationAndAmortization')}
                          className={`form-control ${errors.depreciationAndAmortization ? 'is-invalid' : ''}`}
                        />
                        <div className="invalid-feedback">{errors.depreciationAndAmortization?.message}</div>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Interest</Form.Label>
                        <input
                          type="number"
                          {...register('interest')}
                          className={`form-control ${errors.interest ? 'is-invalid' : ''}`}
                        />
                        <div className="invalid-feedback">{errors.interest?.message}</div>
                      </Form.Group>
                    </Card>
                    <Card className="pt-3">
                      <Card.Title className="text-center">Other Income</Card.Title>
                      <Form.Group>
                        <Form.Label>Interest Income</Form.Label>
                        <input
                          type="number"
                          {...register('interestIncome')}
                          className={`form-control ${errors.interestIncome ? 'is-invalid' : ''}`}
                        />
                        <div className="invalid-feedback">{errors.interestIncome?.message}</div>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Interest Expense</Form.Label>
                        <input
                          type="number"
                          {...register('interestExpense')}
                          className={`form-control ${errors.interestExpense ? 'is-invalid' : ''}`}
                        />
                        <div className="invalid-feedback">{errors.interestExpense?.message}</div>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Gain on Disposal of Assets</Form.Label>
                        <input
                          type="number"
                          {...register('gainOnDisposalAssets')}
                          className={`form-control ${errors.gainOnDisposalAssets ? 'is-invalid' : ''}`}
                        />
                        <div className="invalid-feedback">{errors.gainOnDisposalAssets?.message}</div>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Other Income</Form.Label>
                        <input
                          type="number"
                          {...register('otherIncome')}
                          className={`form-control ${errors.otherIncome ? 'is-invalid' : ''}`}
                        />
                        <div className="invalid-feedback">{errors.otherIncome?.message}</div>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Income Taxes</Form.Label>
                        <input
                          type="number"
                          {...register('incomeTaxes')}
                          className={`form-control ${errors.incomeTaxes ? 'is-invalid' : ''}`}
                        />
                        <div className="invalid-feedback">{errors.incomeTaxes?.message}</div>
                      </Form.Group>
                    </Card>
                  </Col>
                </Row>
                <input type="hidden" {...register('userId')} value={currentUserId} />
                <Form.Group className="form-group">
                  <Row className="pt-3">
                    <Col>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Col>
                    <Col>
                      <Button type="button" onClick={() => reset()} variant="warning" className="float-right">
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
      {Object.keys(errors).length > 0 && (
        <div className="alert alert-danger mt-3">
          <h5>Form Errors:</h5>
          <ul>
            {Object.entries(errors).map(([fieldName, error]) => (
              <li key={fieldName}>
                {fieldName}: {error.message}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Container>
  );
};

export default FinancialInputForm;
