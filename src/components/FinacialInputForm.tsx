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
  console.log('This is compId', currentUserId);

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
                  <Form.Label>costOfContracting</Form.Label>
                  <input
                    type="number"
                    {...register('costOfContracting')}
                    className={`form-control ${errors.costOfContracting ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.costOfContracting?.message}</div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>overhead</Form.Label>
                  <input
                    type="number"
                    {...register('overhead')}
                    className={`form-control ${errors.overhead ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.overhead?.message}</div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>salariesAndBenefits</Form.Label>
                  <input
                    type="number"
                    {...register('salariesAndBenefits')}
                    className={`form-control ${errors.salariesAndBenefits ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.salariesAndBenefits?.message}</div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>rentAndOverhead</Form.Label>
                  <input
                    type="number"
                    {...register('rentAndOverhead')}
                    className={`form-control ${errors.rentAndOverhead ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.rentAndOverhead?.message}</div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>depreciationAndAmortization</Form.Label>
                  <input
                    type="number"
                    {...register('depreciationAndAmortization')}
                    className={`form-control ${errors.depreciationAndAmortization ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.depreciationAndAmortization?.message}</div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Income</Form.Label>
                  <input
                    type="number"
                    {...register('income')}
                    className={`form-control ${errors.income ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.income?.message}</div>
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

                <Form.Group>
                  <Form.Label>Expenses</Form.Label>
                  <input
                    type="number"
                    {...register('expenses')}
                    className={`form-control ${errors.expenses ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.expenses?.message}</div>
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
                  <Form.Label>gainOnDisposalOfAssets</Form.Label>
                  <input
                    type="number"
                    {...register('gainOnDisposalOfAssets')}
                    className={`form-control ${errors.gainOnDisposalOfAssets ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.gainOnDisposalOfAssets?.message}</div>
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
                  <Form.Label>incomeTaxes</Form.Label>
                  <input
                    type="number"
                    {...register('incomeTaxes')}
                    className={`form-control ${errors.incomeTaxes ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.incomeTaxes?.message}</div>
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
                  <Form.Label>accountsPayable</Form.Label>
                  <input
                    type="number"
                    {...register('accountsPayable')}
                    className={`form-control ${errors.accountsPayable ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.accountsPayable?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>taxesPayable</Form.Label>
                  <input
                    type="number"
                    {...register('taxesPayable')}
                    className={`form-control ${errors.taxesPayable ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.taxesPayable?.message}</div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>loansPayable</Form.Label>
                  <input
                    type="number"
                    {...register('loansPayable')}
                    className={`form-control ${errors.loansPayable ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.loansPayable?.message}</div>
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
              {fieldName}
              :
              {' '}
              {error.message}
            </li>
          ))}
        </ul>
      </div>
      )}
    </Container>
  );
};

export default FinancialInputForm;
