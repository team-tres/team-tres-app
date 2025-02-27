'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddFinancialCompilationSchema } from '@/lib/validationSchemas';
import { addFinancialCompilation } from '@/lib/dbActions';

interface FinancialFormData {
  companyId: number;
  year: number;
  revenue: number;
  netSales: number;
  costOfContracting: number;
  overhead: number;
  costOfGoodsSold: number;
  grossProfit: number;
  grossMarginPercentage: number;
  salariesAndBenefits: number;
  rentAndOverhead: number;
  depreciationAndAmortization: number;
  interest: number;
  totalOperatingExpenses: number;
  operatingExpensesPercentage: number;
  profitFromOperations: number;
  profitFromOperationsPercentage: number;
  interestIncome: number;
  interestExpense: number;
  gainOnDisposalOfAssets: number;
  otherIncome: number;
  totalOtherIncome: number;
  totalOtherIncomePercentage: number;
  incomeBeforeIncomeTaxes: number;
  pretaxIncomePercentage: number;
  incomeTaxes: number;
  netIncome: number;
  netIncomePercentage: number;
  cashAndCashEquivalents: number;
  accountsReceivable: number;
  inventory: number;
  totalCurrentAssets: number;
  propertyPlantAndEquipment: number;
  investment: number;
  totalLongTermAsset: number;
  accountsPayable: number;
  longDebtService: number;
  taxesPayable: number;
  totalCurrentLiabilities: number;
  currentDebtService: number;
  loansPayable: number;
  totalLongTermLiabilities: number;
  totalLiabilities: number;
  equityCapital: number;
  retainedEarnings: number;
  totalStockholdersEquity: number;
  totalLiabilitiesAndEquity: number;
}

const FinancialInputForm: React.FC = () => {
  const { data: session, status } = useSession();
  const user = session?.user as { companyId?: number } | undefined;
  const companyId = user?.companyId;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FinancialFormData>({
    resolver: yupResolver(AddFinancialCompilationSchema),
  });

  const onSubmit = async (data: FinancialFormData) => {
    if (!companyId) {
      swal('Error', 'No company associated with user', 'error');
      return;
    }

    try {
      await addFinancialCompilation({
        ...data,
        companyId,
      });
      swal('Success', 'Financial data has been added', 'success', {
        timer: 2000,
      });
      reset();
    } catch (error) {
      swal('Error', 'Failed to add financial data', 'error');
    }
  };

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  if (!companyId) {
    return (
      <Container className="py-3">
        <div className="text-center">
          <h2>No Company Associated</h2>
          <p>Please contact an administrator to associate your account with a company.</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center">
            <h2>Input Financial Data</h2>
          </Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                {/* Year */}
                <Form.Group>
                  <Form.Label>Year</Form.Label>
                  <input
                    type="number"
                    {...register('year')}
                    className={`form-control ${errors.year ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.year?.message}</div>
                </Form.Group>

                {/* Income Statement Section */}
                <h4 className="mt-4">Income Statement</h4>

                {/* Add form fields for all income statement items */}
                {/* Example of one field - repeat for all fields */}
                <Form.Group>
                  <Form.Label>Revenue</Form.Label>
                  <input
                    type="number"
                    {...register('revenue')}
                    className={`form-control ${errors.revenue ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.revenue?.message}</div>
                </Form.Group>

                {/* Balance Sheet Section */}
                <h4 className="mt-4">Balance Sheet</h4>

                {/* Add form fields for all balance sheet items */}
                {/* Example of one field - repeat for all fields */}
                <Form.Group>
                  <Form.Label>Cash and Cash Equivalents</Form.Label>
                  <input
                    type="number"
                    {...register('cashAndCashEquivalents')}
                    className={`form-control ${errors.cashAndCashEquivalents ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.cashAndCashEquivalents?.message}</div>
                </Form.Group>

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
