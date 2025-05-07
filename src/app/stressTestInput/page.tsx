'use client';

import { useForm } from 'react-hook-form';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useState } from 'react';
import './page.css';

const StressTestInputPage: React.FC = () => {
  const { register, handleSubmit, reset } = useForm();
  const [selectedTests, setSelectedTests] = useState({
    stress1: false,
    stress2: false,
    stress3: false,
    stress4: false,
    stress5: false,
  });

  const onSubmit = (data: any) => {
    console.log('Submitted stress test data:', data);
  };

  const toggleTest = (key: keyof typeof selectedTests) => {
    setSelectedTests({ ...selectedTests, [key]: !selectedTests[key] });
  };

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">Stress Test Input</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* Checkbox to activate each stress test */}
        {Object.entries(selectedTests).map(([key, value]) => (
          <Form.Check
            key={key}
            type="checkbox"
            label={`Enable ${key.replace('stress', 'Stress Test ')}`}
            checked={value}
            onChange={() => toggleTest(key as keyof typeof selectedTests)}
            className="mb-3"
          />
        ))}

        {/* Stress Test 1 */}
        {selectedTests.stress1 && (
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Stress Test 1</Card.Title>
              <Form.Group>
                <Form.Label>Present Value</Form.Label>
                <Form.Control type="number" {...register('stress1.presentValue', { required: true })} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Drop in Interest Rate (%)</Form.Label>
                <Form.Control type="number" {...register('stress1.dropInInterestRate', { required: true })} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Term (in years)</Form.Label>
                <Form.Control type="number" {...register('stress1.term', { required: true })} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Reinvestment (%)</Form.Label>
                <Form.Control type="number" {...register('stress1.reinvestment', { required: true })} />
              </Form.Group>
            </Card.Body>
          </Card>
        )}

        {/* Stress Test 2 */}
        {selectedTests.stress2 && (
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Stress Test 2</Card.Title>
              <Form.Group>
                <Form.Label>Net Sales</Form.Label>
                <Form.Control type="number" {...register('stress2.netSales', { required: true })} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Decrease in Revenue (%)</Form.Label>
                <Form.Control type="number" {...register('stress2.decreaseInRevenue', { required: true })} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Term (in years)</Form.Label>
                <Form.Control type="number" {...register('stress2.term', { required: true })} />
              </Form.Group>
            </Card.Body>
          </Card>
        )}

        {/* Stress Test 3 */}
        {selectedTests.stress3 && (
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Stress Test 3</Card.Title>
              <Form.Group>
                <Form.Label>Increase in Expenses</Form.Label>
                <Form.Control type="number" {...register('stress3.increaseInExpenses', { required: true })} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Year (event occurs)</Form.Label>
                <Form.Control type="number" {...register('stress3.year', { required: true })} />
              </Form.Group>
            </Card.Body>
          </Card>
        )}

        {/* Stress Test 4 */}
        {selectedTests.stress4 && (
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Stress Test 4</Card.Title>
              <Form.Group>
                <Form.Label>Total Operating Expenses</Form.Label>
                <Form.Control type="number" {...register('stress4.totalOperatingExpenses', { required: true })} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Operating Expense Increase (%)</Form.Label>
                <Form.Control type="number" {...register('stress4.operatingExpenseIncrease', { required: true })} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Term (in years)</Form.Label>
                <Form.Control type="number" {...register('stress4.term', { required: true })} />
              </Form.Group>
            </Card.Body>
          </Card>
        )}

        {/* Stress Test 5 */}
        {selectedTests.stress5 && (
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Stress Test 5</Card.Title>
              <Form.Group>
                <Form.Label>Present Value</Form.Label>
                <Form.Control type="number" {...register('stress5.presentValue', { required: true })} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Interest Rate</Form.Label>
                <Form.Control type="number" {...register('stress5.interestRate', { required: true })} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Term (in years)</Form.Label>
                <Form.Control type="number" {...register('stress5.term', { required: true })} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Reinvestment (%)</Form.Label>
                <Form.Control type="number" {...register('stress5.reinvestment', { required: true })} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Fully Funded (%)</Form.Label>
                <Form.Control type="number" {...register('stress5.fullyFunded', { required: true })} />
              </Form.Group>
            </Card.Body>
          </Card>
        )}

        <Row className="pt-3">
          <Col>
            <Button type="submit" variant="primary">Submit</Button>
          </Col>
          <Col>
            <Button type="button" variant="secondary" onClick={() => reset()}>Reset</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default StressTestInputPage;
