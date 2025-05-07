import { getServerSession } from 'next-auth';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';

/** Render a list of stuff for the logged in user. */
const AuditedDataTable = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );
  // const owner = (session && session.user && session.user.email) || '';
  const ForecastData = await prisma.financialCompilation.findMany({
    orderBy: {
      year: 'asc', // or 'desc' for descending
    },
  });
  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row>
          <Col>
            <h1>Audited data</h1>
            <h3 className="text-center">Income Statement</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th style={{ width: '250px' }}>{}</th>
                  {ForecastData.map((item) => (
                    <th key={item.id}>{item.year}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Revenue</td>
                  {ForecastData.map((item) => (
                    <td key={item.id}>{item.revenue}</td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">Cost of goods sold</th>
                </tr>
                <tr>
                  <td>Cost of Contracting</td>
                  {ForecastData.map((item) => (
                    <td key={item.id}>{item.costOfContracting}</td>
                  ))}
                </tr>
                <tr>
                  <td>Overhead</td>
                  {ForecastData.map((item) => (
                    <td key={item.id}>{item.overhead}</td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">Operating expenses</th>
                </tr>
                <tr>
                  <td>Salaries and Benefits</td>
                  {ForecastData.map((item) => (
                    <td key={item.id}>{item.salariesAndBenefits}</td>
                  ))}
                </tr>
                <tr>
                  <td>Rent and Overhead</td>
                  {ForecastData.map((item) => (
                    <td key={item.id}>{item.rentAndOverhead}</td>
                  ))}
                </tr>
                <tr>
                  <td>Depreciation and Amortization</td>
                  {ForecastData.map((item) => (
                    <td key={item.id}>{item.depreciationAndAmortization}</td>
                  ))}
                </tr>
                <tr>
                  <td>Interest</td>
                  {ForecastData.map((item) => (
                    <td key={item.id}>{item.interest}</td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">Other Income</th>
                </tr>
                <tr>
                  <td>Interest Income</td>
                  {ForecastData.map((item) => (
                    <td key={item.id}>{item.interestIncome}</td>
                  ))}
                </tr>
                <tr>
                  <td>Interest Expense</td>
                  {ForecastData.map((item) => (
                    <td key={item.id}>{item.interestExpense}</td>
                  ))}
                </tr>
                <tr>
                  <td>Gain on Disposal of Assets</td>
                  {ForecastData.map((item) => (
                    <td key={item.id}>{item.gainOnDisposalOfAssets}</td>
                  ))}
                </tr>
                <tr>
                  <td>Other Income</td>
                  {ForecastData.map((item) => (
                    <td key={item.id}>{item.otherIncome}</td>
                  ))}
                </tr>
                <tr>
                  <td>Income Taxes</td>
                  {ForecastData.map((item) => (
                    <td key={item.id}>{item.incomeTaxes}</td>
                  ))}
                </tr>
              </tbody>
            </Table>
            <h3 className="text-center">Balance Sheet</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th style={{ width: '250px' }}>{}</th>
                  {ForecastData.map((item) => (
                    <th key={item.id}>{item.year}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Current Assets</th>
                </tr>
                <tr>
                  <td>Cash and Cash Equivalents</td>
                  {ForecastData.map((item) => (
                    <td key={item.id}>{item.cashAndCashEquivalents}</td>
                  ))}
                </tr>
                <tr>
                  <td>Accounts Receivable</td>
                  {ForecastData.map((item) => (
                    <td key={item.id}>{item.accountsReceivable}</td>
                  ))}
                </tr>
                <tr>
                  <td>Inventory</td>
                  {ForecastData.map((item) => (
                    <td key={item.id}>{item.inventory}</td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">Long-term Assets</th>
                </tr>
                <tr>
                  <td>Property, Plant and Equipment</td>
                  {ForecastData.map((item) => (
                    <td key={item.id}>{item.propertyPlantAndEquipment}</td>
                  ))}
                </tr>
                <tr>
                  <td>Investment</td>
                  {ForecastData.map((item) => (
                    <td key={item.id}>{item.investment}</td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">Current Liabilities</th>
                </tr>
                <tr>
                  <td>Accounts Payable</td>
                  {ForecastData.map((item) => (
                    <td key={item.id}>{item.accountsPayable}</td>
                  ))}
                </tr>
                <tr>
                  <td>Debt Service</td>
                  {ForecastData.map((item) => (
                    <td key={item.id}>{item.currentDebtService}</td>
                  ))}
                </tr>
                <tr>
                  <td>Taxes Payable</td>
                  {ForecastData.map((item) => (
                    <td key={item.id}>{item.taxesPayable}</td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">Long-term Liabilities</th>
                </tr>
                <tr>
                  <td>Debt Service</td>
                  {ForecastData.map((item) => (
                    <td key={item.id}>{item.longDebtService}</td>
                  ))}
                </tr>
                <tr>
                  <th scope="row"> Shareholders&apos; Equity</th>
                </tr>
                <tr>
                  <td>Equity Capital</td>
                  {ForecastData.map((item) => (
                    <td key={item.id}>{item.equityCapital}</td>
                  ))}
                </tr>
                <tr>
                  <td>Retained Earnings</td>
                  {ForecastData.map((item) => (
                    <td key={item.id}>{item.retainedEarnings}</td>
                  ))}
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default AuditedDataTable;
