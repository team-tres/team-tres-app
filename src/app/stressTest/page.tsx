'use client';

import { useForm } from 'react-hook-form';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

const StressTestForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = (data: any) => {
    console.log('Submitted stress test data:', data);
    // You can send this to an API or process it as needed
  };

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">Stress Test Input</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* Stress Test 1 */}
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Stress Test 1</Card.Title>
            <Form.Group>
              <Form.Label>Present Value</Form.Label>
              <Form.Control type="number" {...register('stress1.presentValue')} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Drop in Interest Rate (%)</Form.Label>
              <Form.Control type="number" step="any" {...register('stress1.dropInInterestRate')} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Term (in years)</Form.Label>
              <Form.Control type="number" {...register('stress1.term')} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Reinvestment (%)</Form.Label>
              <Form.Control type="number" step="any" {...register('stress1.reinvestment')} />
            </Form.Group>
          </Card.Body>
        </Card>

        {/* Stress Test 2 */}
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Stress Test 2</Card.Title>
            <Form.Group>
              <Form.Label>Net Sales (from forecast)</Form.Label>
              <Form.Control type="number" {...register('stress2.netSales')} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Decrease in Revenue (%)</Form.Label>
              <Form.Control type="number" step="any" {...register('stress2.decreaseInRevenue')} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Term (in years)</Form.Label>
              <Form.Control type="number" {...register('stress2.term')} />
            </Form.Group>
          </Card.Body>
        </Card>

        {/* Stress Test 3 */}
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Stress Test 3</Card.Title>
            <Form.Group>
              <Form.Label>Increase in Expenses</Form.Label>
              <Form.Control type="number" {...register('stress3.increaseInExpenses')} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Year (event occurs)</Form.Label>
              <Form.Control type="number" {...register('stress3.year')} />
            </Form.Group>
          </Card.Body>
        </Card>

        {/* Stress Test 4 */}
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Stress Test 4</Card.Title>
            <Form.Group>
              <Form.Label>Total Operating Expenses (from forecast)</Form.Label>
              <Form.Control type="number" {...register('stress4.totalOperatingExpenses')} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Operating Expense Increase (%)</Form.Label>
              <Form.Control type="number" step="any" {...register('stress4.operatingExpenseIncrease')} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Term (in years)</Form.Label>
              <Form.Control type="number" {...register('stress4.term')} />
            </Form.Group>
          </Card.Body>
        </Card>

        {/* Stress Test 5 */}
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Stress Test 5</Card.Title>
            <Form.Group>
              <Form.Label>Present Value</Form.Label>
              <Form.Control type="number" {...register('stress5.presentValue')} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Interest Rate</Form.Label>
              <Form.Control type="number" step="any" {...register('stress5.interestRate')} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Term (in years)</Form.Label>
              <Form.Control type="number" {...register('stress5.term')} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Reinvestment (%)</Form.Label>
              <Form.Control type="number" step="any" {...register('stress5.reinvestment')} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Fully Funded (%)</Form.Label>
              <Form.Control type="number" step="any" {...register('stress5.fullyFunded')} />
            </Form.Group>
          </Card.Body>
        </Card>

        <Row className="pt-3">
          <Col>
            <Button type="submit" variant="primary">Submit</Button>
          </Col>
          <Col>
            <Button type="button" onClick={() => reset()} variant="secondary">Reset</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default StressTestForm;
