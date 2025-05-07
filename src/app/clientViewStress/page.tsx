'use client';

import { Container, Row, Col, Card } from 'react-bootstrap';

const StressTestResults = () => {
  // Static mock data for now – replace with actual props or fetched data later
  const data = {
    stress1: {
      presentValue: 100000,
      dropInInterestRate: 2.5,
      term: 10,
      reinvestment: 3,
    },
    stress2: {
      netSales: 500000,
      decreaseInRevenue: 10,
      term: 3,
    },
    stress3: {
      increaseInExpenses: 25000,
      year: 2027,
    },
    stress4: {
      totalOperatingExpenses: 150000,
      operatingExpenseIncrease: 5,
      term: 4,
    },
    stress5: {
      presentValue: 80000,
      interestRate: 4,
      term: 7,
      reinvestment: 2.5,
      fullyFunded: 90,
    },
  };

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Stress Test Results</h2>

      {/* Stress Test 1 */}
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Stress Test 1</Card.Title>
          <p>
            <strong>Present Value:</strong>
            {' '}
            $
            {data.stress1.presentValue}
          </p>
          <p>
            <strong>Drop in Interest Rate:</strong>
            {' '}
            {data.stress1.dropInInterestRate}
            %
          </p>
          <p>
            <strong>Term:</strong>
            {' '}
            {data.stress1.term}
            {' '}
            years
          </p>
          <p>
            <strong>Reinvestment:</strong>
            {' '}
            {data.stress1.reinvestment}
            %
          </p>
        </Card.Body>
      </Card>

      {/* Stress Test 2 */}
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Stress Test 2</Card.Title>
          <p>
            <strong>Net Sales:</strong>
            {' '}
            $
            {data.stress2.netSales}
          </p>
          <p>
            <strong>Decrease in Revenue:</strong>
            {' '}
            {data.stress2.decreaseInRevenue}
            %
          </p>
          <p>
            <strong>Term:</strong>
            {' '}
            {data.stress2.term}
            {' '}
            years
          </p>
        </Card.Body>
      </Card>

      {/* Stress Test 3 */}
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Stress Test 3</Card.Title>
          <p>
            <strong>Increase in Expenses:</strong>
            {' '}
            $
            {data.stress3.increaseInExpenses}
          </p>
          <p>
            <strong>Year Event Occurs:</strong>
            {' '}
            {data.stress3.year}
          </p>
        </Card.Body>
      </Card>

      {/* Stress Test 4 */}
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Stress Test 4</Card.Title>
          <p>
            <strong>Total Operating Expenses:</strong>
            {' '}
            $
            {data.stress4.totalOperatingExpenses}
          </p>
          <p>
            <strong>Operating Expense Increase:</strong>
            {' '}
            {data.stress4.operatingExpenseIncrease}
            %
          </p>
          <p>
            <strong>Term:</strong>
            {' '}
            {data.stress4.term}
            {' '}
            years
          </p>
        </Card.Body>
      </Card>

      {/* Stress Test 5 */}
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Stress Test 5</Card.Title>
          <p>
            <strong>Present Value:</strong>
            {' '}
            $
            {data.stress5.presentValue}
          </p>
          <p>
            <strong>Interest Rate:</strong>
            {' '}
            {data.stress5.interestRate}
            %
          </p>
          <p>
            <strong>Term:</strong>
            {' '}
            {data.stress5.term}
            {' '}
            years
          </p>
          <p>
            <strong>Reinvestment:</strong>
            {' '}
            {data.stress5.reinvestment}
            %
          </p>
          <p>
            <strong>Fully Funded:</strong>
            {' '}
            {data.stress5.fullyFunded}
            %
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default StressTestResults;
