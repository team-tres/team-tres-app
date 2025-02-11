'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
// import { addStuff } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddStuffSchema } from '@/lib/validationSchemas';


const onSubmit = async (data: any) => {
//   await addStuff(data);
  swal('Success', 'Your item has been added', 'success', {
    timer: 2000,
  });
};

const FinancialInputForm: React.FC = () => {
  const { data: session, status } = useSession();
  const currentUser = session?.user?.email || '';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddStuffSchema),
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
                  <Form.Label>Company Name</Form.Label>
                  <input
                    type="text"
                    {...register('name')}
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.name?.message}</div>
                </Form.Group>
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
                  <Form.Label>Interest</Form.Label>
                  <input
                    type="number"
                    {...register('interest')}
                    className={`form-control ${errors.interest ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.interest?.message}</div>
                </Form.Group>
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
                  <Form.Label>Cash and Cash Equivalents</Form.Label>
                  <input
                    type="number"
                    {...register('cashAndCashEquivalents')}
                    className={`form-control ${errors.cashAndCashEquivalents ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.cashAndCashEquivalents?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Accounts Receivable</Form.Label>
                  <input
                    type="number"
                    {...register('accountsReceivable')}
                    className={`form-control ${errors.accountsReceivable ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.accountsReceivable?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Inventory</Form.Label>
                  <input
                    type="number"
                    {...register('inventory')}
                    className={`form-control ${errors.inventory ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.inventory?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Property, Plant, and Equipment</Form.Label>
                  <input
                    type="number"
                    {...register('propertyPlantAndEquipment')}
                    className={`form-control ${errors.propertyPlantAndEquipment ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.propertyPlantAndEquipment?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Investment</Form.Label>
                  <input
                    type="number"
                    {...register('investment')}
                    className={`form-control ${errors.investment ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.investment?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Long Debt Service</Form.Label>
                  <input
                    type="number"
                    {...register('longDebtService')}
                    className={`form-control ${errors.longDebtService ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.longDebtService?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Current Debt Service</Form.Label>
                  <input
                    type="number"
                    {...register('currentDebtService')}
                    className={`form-control ${errors.currentDebtService ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.currentDebtService?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Loan Payable</Form.Label>
                  <input
                    type="number"
                    {...register('loanPayable')}
                    className={`form-control ${errors.loanPayable ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.loanPayable?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Equity Capital</Form.Label>
                  <input
                    type="number"
                    {...register('equityCapital')}
                    className={`form-control ${errors.equityCapital ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.equityCapital?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Retained Earnings</Form.Label>
                  <input
                    type="number"
                    {...register('retainedEarnings')}
                    className={`form-control ${errors.retainedEarnings ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.retainedEarnings?.message}</div>
                </Form.Group>
                <input type="hidden" {...register('owner')} value={currentUser} />
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
    </Container>
  );
};

export default FinancialInputForm;
