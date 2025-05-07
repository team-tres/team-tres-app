'use client';

import { Col, Container, Button, Row, Form, Spinner, Table, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import './page.css';

const ClientDashboard = () => {
  const { data: session } = useSession();
  const [currentDate, setCurrentDate] = useState('');
  const [showIncomeStatement, setShowIncomeStatement] = useState(true);
  const [showBalanceSheet, setShowBalanceSheet] = useState(true);
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setCurrentDate(formattedDate);
  }, []);

  interface ForecastData {
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
    totalLongTermAssets: number;
    totalAssets: number;
    accountsPayable: number;
    currentDebtService: number;
    taxesPayable: number;
    totalCurrentLiabilities: number;
    longDebtService: number;
    loansPayable: number;
    totalLongTermLiabilities: number;
    totalLiabilities: number;
    equityCapital: number;
    retainedEarnings: number;
    totalStockholdersEquity: number;
    totalLiabilitiesAndEquity: number;
  }

  interface ForecastResponse {
    forecast: ForecastData[];
  }

  const [forecast, setForecast] = useState<ForecastData[]>([]);

  const [loading, setLoading] = useState(true);

  const [multipliers, setMultipliers] = useState({
    revenue: 0.015,
    costOfContracting: 0.015,
    overhead: 0.015,
    salariesAndBenefits: 0.015,
    rentAndOverhead: 0.015,
    depreciationAndAmortization: 0.015,
    interest: 0.015,
    profitFromOperations: 0.015,
    interestIncome: 0.015,
    interestExpense: 0.015,
    gainOnDisposalOfAssets: 0.015,
    otherIncome: 0.015,
    incomeTaxes: 0.015,
    cashAndCashEquivalents: 0.015,
    accountsReceivable: 0.015,
    inventory: 0.015,
    propertyPlantAndEquipment: 0.015,
    investment: 0.015,
    accountsPayable: 0.015,
    taxesPayable: 0.015,
    currentDebtService: 0.015,
    loansPayable: 0.015,
    longDebtService: 0.015,
    equityCapital: 0.015,
    retainedEarnings: 0.015,
  });

  const [settings, setSettings] = useState<Record<string, 'average' | 'multiplier'>>({
    revenue: 'multiplier',
    costOfContracting: 'average',
    overhead: 'average',
    salariesAndBenefits: 'average',
    rentAndOverhead: 'average',
    depreciationAndAmortization: 'average',
    interest: 'average',
    profitFromOperations: 'average',
    interestIncome: 'average',
    interestExpense: 'average',
    gainOnDisposalOfAssets: 'average',
    otherIncome: 'average',
    incomeTaxes: 'average',
    cashAndCashEquivalents: 'average',
    accountsReceivable: 'average',
    inventory: 'average',
    propertyPlantAndEquipment: 'average',
    investment: 'average',
    accountsPayable: 'average',
    taxesPayable: 'average',
    currentDebtService: 'average',
    loansPayable: 'average',
    longDebtService: 'average',
    equityCapital: 'average',
    retainedEarnings: 'average',
  });

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        const response = await fetch('/api/forecast-generation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            companyId: '1',
            settings,
            multipliers,
          }),
        });

        const data: ForecastResponse = await response.json();
        console.log('Fetched data:', data);
        if (data.forecast) {
          setForecast(data.forecast);
        }
      } catch (error) {
        console.error('Error fetching forecast data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchForecastData();
  }, [settings, multipliers]);

  const handleSettingChange = (key: string, value: number) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [key]: value === 1 ? 'multiplier' : 'average',
    }));
  };

  const handleMultiplierChange = (key: keyof typeof multipliers, value: string) => {
    const numericValue = parseFloat(value);
    setMultipliers((prev) => ({
      ...prev,
      [key]: Number.isNaN(numericValue) ? 0 : numericValue / 100,
    }));
  };

  return (
    <main>
      <Container fluid id="client-dashboard">
        <Row className="full-height">
          <Col xs={12} sm={4} md={3} lg={2} className="left-section">
            <h1 className="heading-left">
              Welcome
              {' '}
              {session?.user?.email }
            </h1>
            <p className="date-text">{currentDate}</p>
            <Button className="white-button">Manage Account</Button>
            <br />
            <Button className="white-button">Account Summary</Button>
            <br />
            <Button className="white-button">Select Executive</Button>
          </Col>
          <Col xs={12} sm={8} md={9} lg={10} className="right-section">
            <div className="dashboard">
              <h2 className="h2">Financial Forecast</h2>
              <div className="mb-3 text-start">
                <Row className="mb-3 text-start checkboxes">
                  <Col xs="auto">
                    <Form.Check
                      type="checkbox"
                      id="income-statement-toggle"
                      label="Income Statement"
                      checked={showIncomeStatement}
                      onChange={() => setShowIncomeStatement(!showIncomeStatement)}
                    />
                  </Col>
                  <Col xs="auto">
                    <Form.Check
                      type="checkbox"
                      id="balance-sheet-toggle"
                      label="Balance Sheet"
                      checked={showBalanceSheet}
                      onChange={() => setShowBalanceSheet(!showBalanceSheet)}
                    />
                  </Col>
                </Row>
              </div>
              <Table borderless responsive>
                <thead>
                  {loading && (
                    <tr>
                      <td colSpan={15}>
                        <Spinner animation="border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                      </td>
                    </tr>
                  )}
                  <tr>
                    <th colSpan={15} className="title left">
                      -companyName=
                    </th>
                  </tr>
                </thead>
                <colgroup>
                  <col style={{ width: '11%' }} />
                  <col style={{ width: '6.3%' }} />
                  <col style={{ width: '7%' }} />
                  {forecast.map(() => (
                    <col style={{ width: '6.3%' }} />
                  ))}
                </colgroup>
                <tbody className="font">
                  <tr>
                    <td className="bold">
                      12 Year Forecast Output
                    </td>
                    <td style={{ fontSize: '8px' }}>
                      Forecast Type
                      <br />
                      (M-Multiplier)(A-Average)
                    </td>
                    <td style={{ fontSize: '8px' }}>Enter % Multiplier</td>
                    {forecast.map((data, i) => (
                      <td className="bold">
                        Forecast
                        <br />
                        {i + 1}
                        <br />
                        {data.year}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </Table>
              {showIncomeStatement && (
              <Table borderless responsive>
                <thead>
                  <tr>
                    <th colSpan={15} className="title left">
                      Income Statement
                    </th>
                  </tr>
                </thead>
                <colgroup>
                  <col style={{ width: '11%' }} />
                  <col style={{ width: '6.3%' }} />
                  <col style={{ width: '7%' }} />
                  {forecast.map(() => (
                    <col style={{ width: '6.3%' }} />
                  ))}
                </colgroup>
                <tbody className="font">
                  <tr>
                    <td className="left">Revenue</td>
                    <td className="green-type">
                      <ToggleButtonGroup
                        type="radio"
                        name="revenue"
                        value={settings.revenue === 'multiplier' ? 1 : 2}
                        onChange={(value) => handleSettingChange('revenue', value)}
                        size="sm"
                      >
                        <ToggleButton variant="success" id="tbg-revenue-1" value={1} className="button">
                          M
                        </ToggleButton>
                        <ToggleButton variant="success" id="tbg-revenue-2" value={2} className="button">
                          A
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </td>
                    <td className="green-input">
                      <Form.Control
                        type="number"
                        className="button"
                        style={{ width: '100%' }}
                        value={(multipliers.revenue * 100)}
                        onChange={(e) => handleMultiplierChange('revenue', e.target.value)}
                      />
                      %
                    </td>
                    {forecast.map((entry) => (
                      <td className="grey-bg">
                        {entry.revenue
                          ? entry.revenue.toLocaleString('en-US', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })
                          : '-'}
                      </td>
                    ))}
                  </tr>
                  <tr className="bold">
                    <td className="left">Net Sales</td>
                    <td aria-label="blank" />
                    <td aria-label="blank" />
                    {forecast.map((data) => (
                      <td className="bottom-border">
                        {data.netSales
                          ? data.netSales.toLocaleString('en-US', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })
                          : '-'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td aria-label="blank" colSpan={1}>&nbsp;</td>
                  </tr>
                  <tr className="bold">
                    <td className="left">Cost of goods sold:</td>
                  </tr>
                  <tr>
                    <td className="left">Cost of Contracting</td>
                    <td className="green-type">
                      <ToggleButtonGroup
                        type="radio"
                        name="costOfContracting"
                        value={settings.costOfContracting === 'multiplier' ? 1 : 2}
                        onChange={(value) => handleSettingChange('costOfContracting', value)}
                        size="sm"
                      >
                        <ToggleButton variant="success" id="tbg-costOfContracting-1" value={1} className="button">
                          M
                        </ToggleButton>
                        <ToggleButton variant="success" id="tbg-costOfContracting-2" value={2} className="button">
                          A
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </td>
                    <td className="green-input">
                      <Form.Control
                        type="number"
                        className="button"
                        style={{ width: '100%', display: 'inline-block' }}
                        value={(multipliers.costOfContracting * 100)}
                        onChange={(e) => handleMultiplierChange('costOfContracting', e.target.value)}
                      />
                      <span style={{ display: 'inline-block' }}>%</span>
                    </td>
                    {forecast.map((data) => (
                      <td className="grey-bg">
                        {data.costOfContracting
                          ? data.costOfContracting.toLocaleString('en-US', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })
                          : '-'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="left">Overhead</td>
                    <td className="green-type">
                      <ToggleButtonGroup
                        type="radio"
                        name="overhead"
                        value={settings.overhead === 'multiplier' ? 1 : 2}
                        onChange={(value) => handleSettingChange('overhead', value)}
                        size="sm"
                      >
                        <ToggleButton variant="success" id="tbg-overhead-1" value={1} className="button">
                          M
                        </ToggleButton>
                        <ToggleButton variant="success" id="tbg-overhead-2" value={2} className="button">
                          A
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </td>
                    <td className="green-input">
                      <Form.Control
                        type="number"
                        className="button"
                        style={{ width: '100%', display: 'inline-block' }}
                        value={(multipliers.overhead * 100)}
                        onChange={(e) => handleMultiplierChange('overhead', e.target.value)}
                      />
                      <span style={{ display: 'inline-block' }}>%</span>
                    </td>
                    {forecast.map((data) => (
                      <td className="grey-bg">
                        {data.overhead
                          ? data.overhead.toLocaleString('en-US', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })
                          : '-'}
                      </td>
                    ))}
                  </tr>
                  <tr className="bold">
                    <td className="left">Cost of goods sold:</td>
                    <td aria-label="blank" />
                    <td aria-label="blank" />
                    {forecast.map((data) => (
                      <td className="underline">
                        {data.costOfGoodsSold
                          ? data.costOfGoodsSold.toLocaleString('en-US', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })
                          : '-'}
                      </td>
                    ))}
                  </tr>
                  <tr className="bold">
                    <td className="left">Gross profit</td>
                    <td aria-label="blank" />
                    <td aria-label="blank" />
                    {forecast.map((data) => (
                      <td>
                        {data.grossProfit
                          ? data.grossProfit.toLocaleString('en-US', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })
                          : '-'}
                      </td>
                    ))}
                  </tr>
                  <tr className="bold">
                    <td className="right">Gross margin %</td>
                    <td aria-label="blank" />
                    <td aria-label="blank" />
                    {forecast.map((data) => (
                      <td>
                        {data.grossMarginPercentage
                          ? (data.grossMarginPercentage * 100).toLocaleString('en-US', {
                            minimumFractionDigits: 1,
                            maximumFractionDigits: 1,
                          })
                          : '-'}
                        %
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td aria-label="blank" colSpan={1}>&nbsp;</td>
                  </tr>
                  <tr className="bold">
                    <td className="left">Operating expenses</td>
                  </tr>
                  <tr>
                    <td className="left">Salaries and benefits</td>
                    <td className="green-type">
                      <ToggleButtonGroup
                        type="radio"
                        name="salariesAndBenefits"
                        value={settings.salariesAndBenefits === 'multiplier' ? 1 : 2}
                        onChange={(value) => handleSettingChange('salariesAndBenefits', value)}
                        size="sm"
                      >
                        <ToggleButton variant="success" id="tbg-salariesAndBenefits-1" value={1} className="button">
                          M
                        </ToggleButton>
                        <ToggleButton variant="success" id="tbg-salariesAndBenefits-2" value={2} className="button">
                          A
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </td>
                    <td className="green-input">
                      <Form.Control
                        type="number"
                        className="button"
                        style={{ width: '100%', display: 'inline-block' }}
                        value={(multipliers.salariesAndBenefits * 100)}
                        onChange={(e) => handleMultiplierChange('salariesAndBenefits', e.target.value)}
                      />
                      <span style={{ display: 'inline-block' }}>%</span>
                    </td>
                    {forecast.map((data) => (
                      <td className="grey-bg">
                        {data.salariesAndBenefits
                          ? data.salariesAndBenefits.toLocaleString('en-US', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })
                          : '-'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="left">Rent and Overhead</td>
                    <td className="green-type">
                      <ToggleButtonGroup
                        type="radio"
                        name="rentAndOverhead"
                        value={settings.rentAndOverhead === 'multiplier' ? 1 : 2}
                        onChange={(value) => handleSettingChange('rentAndOverhead', value)}
                        size="sm"
                      >
                        <ToggleButton variant="success" id="tbg-rentAndOverhead-1" value={1} className="button">
                          M
                        </ToggleButton>
                        <ToggleButton variant="success" id="tbg-rentAndOverhead-2" value={2} className="button">
                          A
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </td>
                    <td className="green-input">
                      <Form.Control
                        type="number"
                        className="button"
                        style={{ width: '100%', display: 'inline-block' }}
                        value={(multipliers.rentAndOverhead * 100)}
                        onChange={(e) => handleMultiplierChange('rentAndOverhead', e.target.value)}
                      />
                      <span style={{ display: 'inline-block' }}>%</span>
                    </td>
                    {forecast.map((data) => (
                      <td className="grey-bg">
                        {data.rentAndOverhead
                          ? data.rentAndOverhead.toLocaleString('en-US', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })
                          : '-'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="left">Depreciation and Amortization</td>
                    <td className="green-type">
                      <ToggleButtonGroup
                        type="radio"
                        name="depreciationAndAmortization"
                        value={settings.depreciationAndAmortization === 'multiplier' ? 1 : 2}
                        onChange={(value) => handleSettingChange('depreciationAndAmortization', value)}
                        size="sm"
                      >
                        <ToggleButton
                          variant="success"
                          id="tbg-depreciationAndAmortization-1"
                          value={1}
                          className="button"
                        >
                          M
                        </ToggleButton>
                        <ToggleButton
                          variant="success"
                          id="tbg-depreciationAndAmortization-2"
                          value={2}
                          className="button"
                        >
                          A
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </td>
                    <td className="green-input">
                      <Form.Control
                        type="number"
                        className="button"
                        style={{ width: '100%', display: 'inline-block' }}
                        value={(multipliers.depreciationAndAmortization * 100)}
                        onChange={(e) => handleMultiplierChange('depreciationAndAmortization', e.target.value)}
                      />
                      <span style={{ display: 'inline-block' }}>%</span>
                    </td>
                    {forecast.map((data) => (
                      <td className="grey-bg">
                        {data.depreciationAndAmortization
                          ? data.depreciationAndAmortization.toLocaleString('en-US', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })
                          : '-'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="left">Interest</td>
                    <td className="green-type">
                      <ToggleButtonGroup
                        type="radio"
                        name="interest"
                        value={settings.interest === 'multiplier' ? 1 : 2}
                        onChange={(value) => handleSettingChange('interest', value)}
                        size="sm"
                      >
                        <ToggleButton variant="success" id="tbg-interest-1" value={1} className="button">
                          M
                        </ToggleButton>
                        <ToggleButton variant="success" id="tbg-interest-2" value={2} className="button">
                          A
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </td>
                    <td className="green-input">
                      <Form.Control
                        type="number"
                        className="button"
                        style={{ width: '100%', display: 'inline-block' }}
                        value={(multipliers.interest * 100)}
                        onChange={(e) => handleMultiplierChange('interest', e.target.value)}
                      />
                      <span style={{ display: 'inline-block' }}>%</span>
                    </td>
                    {forecast.map((data) => (
                      <td className="grey-bg">
                        {data.interest
                          ? data.interest.toLocaleString('en-US', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })
                          : '-'}
                      </td>
                    ))}
                  </tr>
                  <tr className="bold">
                    <td className="left">Total operating expenses</td>
                    <td aria-label="blank" />
                    <td aria-label="blank" />
                    {forecast.map((data) => (
                      <td>
                        {data.totalOperatingExpenses
                          ? data.totalOperatingExpenses.toLocaleString('en-US', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })
                          : '-'}
                      </td>
                    ))}
                  </tr>
                  <tr className="bold">
                    <td className="right">Operating expenses %</td>
                    <td aria-label="blank" />
                    <td aria-label="blank" />
                    {forecast.map((data) => (
                      <td>
                        {data.operatingExpensesPercentage
                          ? (data.operatingExpensesPercentage * 100).toLocaleString('en-US', {
                            minimumFractionDigits: 1,
                            maximumFractionDigits: 1,
                          })
                          : '-'}
                        %
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td aria-label="blank" colSpan={1}>&nbsp;</td>
                  </tr>
                  <tr className="bold">
                    <td className="left">Profit (loss) from operations</td>
                    <td className="green-type">
                      <ToggleButtonGroup
                        type="radio"
                        name="profitFromOperations"
                        value={settings.profitFromOperations === 'multiplier' ? 1 : 2}
                        onChange={(value) => handleSettingChange('profitFromOperations', value)}
                        size="sm"
                      >
                        <ToggleButton variant="success" id="tbg-profitFromOperations-1" value={1} className="button">
                          M
                        </ToggleButton>
                        <ToggleButton variant="success" id="tbg-profitFromOperations-2" value={2} className="button">
                          A
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </td>
                    <td className="green-input">
                      <Form.Control
                        type="number"
                        className="button"
                        style={{ width: '100%', display: 'inline-block' }}
                        value={(multipliers.profitFromOperations * 100)}
                        onChange={(e) => handleMultiplierChange('profitFromOperations', e.target.value)}
                      />
                      <span style={{ display: 'inline-block' }}>%</span>
                    </td>
                    {forecast.map((data) => (
                      <td className="grey-bg">
                        {data.profitFromOperations
                          ? data.profitFromOperations.toLocaleString('en-US', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })
                          : '-'}
                      </td>
                    ))}
                  </tr>
                  <tr className="bold">
                    <td className="right">Profit (loss) from operations %</td>
                    <td aria-label="blank" />
                    <td aria-label="blank" />
                    {forecast.map((data) => (
                      <td>
                        {data.profitFromOperationsPercentage
                          ? (data.profitFromOperationsPercentage * 100).toLocaleString('en-US', {
                            minimumFractionDigits: 1,
                            maximumFractionDigits: 1,
                          })
                          : '-'}
                        %
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td aria-label="blank" colSpan={1}>&nbsp;</td>
                  </tr>
                  <tr className="bold">
                    <td className="underline left">Other income (expense):</td>
                  </tr>
                  <tr>
                    <td className="left">Interest income</td>
                    <td className="green-type">
                      <ToggleButtonGroup
                        type="radio"
                        name="interestIncome"
                        value={settings.interestIncome === 'multiplier' ? 1 : 2}
                        onChange={(value) => handleSettingChange('interestIncome', value)}
                        size="sm"
                      >
                        <ToggleButton variant="success" id="tbg-interestIncome-1" value={1} className="button">
                          M
                        </ToggleButton>
                        <ToggleButton variant="success" id="tbg-interestIncome-2" value={2} className="button">
                          A
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </td>
                    <td className="green-input">
                      <Form.Control
                        type="number"
                        className="button"
                        style={{ width: '100%', display: 'inline-block' }}
                        value={(multipliers.interestIncome * 100)}
                        onChange={(e) => handleMultiplierChange('interestIncome', e.target.value)}
                      />
                      <span style={{ display: 'inline-block' }}>%</span>
                    </td>
                    {forecast.map((data) => (
                      <td className="grey-bg">
                        {data.interestIncome
                          ? data.interestIncome.toLocaleString('en-US', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })
                          : '-'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="left">Interest expense</td>
                    <td className="green-type">
                      <ToggleButtonGroup
                        type="radio"
                        name="interestExpense"
                        value={settings.interestExpense === 'multiplier' ? 1 : 2}
                        onChange={(value) => handleSettingChange('interestExpense', value)}
                        size="sm"
                      >
                        <ToggleButton variant="success" id="tbg-interestExpense-1" value={1} className="button">
                          M
                        </ToggleButton>
                        <ToggleButton variant="success" id="tbg-interestExpense-2" value={2} className="button">
                          A
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </td>
                    <td className="green-input">
                      <Form.Control
                        type="number"
                        className="button"
                        style={{ width: '100%', display: 'inline-block' }}
                        value={(multipliers.interestExpense * 100)}
                        onChange={(e) => handleMultiplierChange('interestExpense', e.target.value)}
                      />
                      <span style={{ display: 'inline-block' }}>%</span>
                    </td>
                    {forecast.map((data) => (
                      <td className="grey-bg">
                        {data.interestExpense
                          ? data.interestExpense.toLocaleString('en-US', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })
                          : '-'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="left">Gain (loss) on disposal of assets</td>
                    <td className="green-type">
                      <ToggleButtonGroup
                        type="radio"
                        name="gainOnDisposalOfAssets"
                        value={settings.gainOnDisposalOfAssets === 'multiplier' ? 1 : 2}
                        onChange={(value) => handleSettingChange('gainOnDisposalOfAssets', value)}
                        size="sm"
                      >
                        <ToggleButton variant="success" id="tbg-gainOnDisposalOfAssets-1" value={1} className="button">
                          M
                        </ToggleButton>
                        <ToggleButton variant="success" id="tbg-gainOnDisposalOfAssets-2" value={2} className="button">
                          A
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </td>
                    <td className="green-input">
                      <Form.Control
                        type="number"
                        className="button"
                        style={{ width: '100%', display: 'inline-block' }}
                        value={(multipliers.gainOnDisposalOfAssets * 100)}
                        onChange={(e) => handleMultiplierChange('gainOnDisposalOfAssets', e.target.value)}
                      />
                      <span style={{ display: 'inline-block' }}>%</span>
                    </td>
                    {forecast.map((data) => (
                      <td className="grey-bg">
                        {data.gainOnDisposalOfAssets
                          ? data.gainOnDisposalOfAssets.toLocaleString('en-US', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })
                          : '-'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="left">Other income (expense)</td>
                    <td className="green-type">
                      <ToggleButtonGroup
                        type="radio"
                        name="otherIncome"
                        value={settings.otherIncome === 'multiplier' ? 1 : 2}
                        onChange={(value) => handleSettingChange('otherIncome', value)}
                        size="sm"
                      >
                        <ToggleButton variant="success" id="tbg-otherIncome-1" value={1} className="button">
                          M
                        </ToggleButton>
                        <ToggleButton variant="success" id="tbg-otherIncome-2" value={2} className="button">
                          A
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </td>
                    <td className="green-input">
                      <Form.Control
                        type="number"
                        className="button"
                        style={{ width: '100%', display: 'inline-block' }}
                        value={(multipliers.otherIncome * 100)}
                        onChange={(e) => handleMultiplierChange('otherIncome', e.target.value)}
                      />
                      <span style={{ display: 'inline-block' }}>%</span>
                    </td>
                    {forecast.map((data) => (
                      <td className="grey-bg">
                        {data.otherIncome
                          ? data.otherIncome.toLocaleString('en-US', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })
                          : '-'}
                      </td>
                    ))}
                  </tr>
                  <tr className="bold">
                    <td className="left">Total other income (expense)</td>
                    <td aria-label="blank" />
                    <td aria-label="blank" />
                    {forecast.map((data) => (
                      <td>
                        {data.totalOtherIncome
                          ? data.totalOtherIncome.toLocaleString('en-US', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })
                          : '-'}
                      </td>
                    ))}
                  </tr>
                  <tr className="bold">
                    <td className="right">Total other income (expense) %</td>
                    <td aria-label="blank" />
                    <td aria-label="blank" />
                    {forecast.map((data) => (
                      <td>
                        {data.totalOtherIncomePercentage
                          ? (data.totalOtherIncomePercentage * 100).toLocaleString('en-US', {
                            minimumFractionDigits: 1,
                            maximumFractionDigits: 1,
                          })
                          : '-'}
                        %
                      </td>
                    ))}
                  </tr>
                  <tr className="bold">
                    <td className="left">Income (loss) before income taxes</td>
                    <td aria-label="blank" />
                    <td aria-label="blank" />
                    {forecast.map((data) => (
                      <td>
                        {data.incomeBeforeIncomeTaxes
                          ? data.incomeBeforeIncomeTaxes.toLocaleString('en-US', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })
                          : '-'}
                      </td>
                    ))}
                  </tr>
                  <tr className="bold">
                    <td className="right">Pre-tax income %</td>
                    <td aria-label="blank" />
                    <td aria-label="blank" />
                    {forecast.map((data) => (
                      <td>
                        {data.pretaxIncomePercentage
                          ? (data.pretaxIncomePercentage * 100).toLocaleString('en-US', {
                            minimumFractionDigits: 1,
                            maximumFractionDigits: 1,
                          })
                          : '-'}
                        %
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="left">Income taxes</td>
                    <td className="green-type">
                      <ToggleButtonGroup
                        type="radio"
                        name="incomeTaxes"
                        value={settings.incomeTaxes === 'multiplier' ? 1 : 2}
                        onChange={(value) => handleSettingChange('incomeTaxes', value)}
                        size="sm"
                      >
                        <ToggleButton variant="success" id="tbg-incomeTaxes-1" value={1} className="button">
                          M
                        </ToggleButton>
                        <ToggleButton variant="success" id="tbg-incomeTaxes-2" value={2} className="button">
                          A
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </td>
                    <td className="green-input">
                      <Form.Control
                        type="number"
                        className="button"
                        style={{ width: '100%', display: 'inline-block' }}
                        value={(multipliers.incomeTaxes * 100)}
                        onChange={(e) => handleMultiplierChange('incomeTaxes', e.target.value)}
                      />
                      <span style={{ display: 'inline-block' }}>%</span>
                    </td>
                    {forecast.map((data) => (
                      <td className="grey-bg">
                        {data.incomeTaxes
                          ? data.incomeTaxes.toLocaleString('en-US', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })
                          : '-'}
                      </td>
                    ))}
                  </tr>
                  <tr className="bold">
                    <td className="left">Net income (loss)</td>
                    <td aria-label="blank" />
                    <td aria-label="blank" />
                    {forecast.map((data) => (
                      <td>
                        {data.netIncome
                          ? data.netIncome.toLocaleString('en-US', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })
                          : '-'}
                      </td>
                    ))}
                  </tr>
                  <tr className="bold">
                    <td className="right">Net income (loss) %</td>
                    <td aria-label="blank" />
                    <td aria-label="blank" />
                    {forecast.map((data) => (
                      <td className="grey-bg">
                        {data.netIncomePercentage
                          ? (data.netIncomePercentage * 100).toLocaleString('en-US', {
                            minimumFractionDigits: 1,
                            maximumFractionDigits: 1,
                          })
                          : '-'}
                        %
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td aria-label="blank" colSpan={1}>&nbsp;</td>
                  </tr>
                </tbody>
              </Table>
              )}
              {showBalanceSheet && (
              <Table borderless responsive>
                <thead>
                  <tr>
                    <th colSpan={15} className="title left">
                      Balance Sheet
                    </th>
                  </tr>
                  <tr>
                    <th className="bold underline font">
                      ASSETS
                    </th>
                  </tr>
                </thead>
                <colgroup>
                  <col style={{ width: '11%' }} />
                  <col style={{ width: '6.3%' }} />
                  <col style={{ width: '7%' }} />
                  {forecast.map(() => (
                    <col style={{ width: '6.3%' }} />
                  ))}
                </colgroup>
                <tbody className="font">
                  <tr className="bold left">
                    <td>Current Assets</td>
                  </tr>
                  <tr>
                    <td className="left">Cash and cash equivalents</td>
                    <td className="green-type">
                      <ToggleButtonGroup
                        type="radio"
                        name="cashAndCashEquivalents"
                        value={settings.cashAndCashEquivalents === 'multiplier' ? 1 : 2}
                        onChange={(value) => handleSettingChange('cashAndCashEquivalents', value)}
                        size="sm"
                      >
                        <ToggleButton variant="success" id="tbg-cashAndCashEquivalents-1" value={1} className="button">
                          M
                        </ToggleButton>
                        <ToggleButton variant="success" id="tbg-cashAndCashEquivalents-2" value={2} className="button">
                          A
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </td>
                    <td className="green-input">
                      <Form.Control
                        type="number"
                        className="button"
                        style={{ width: '100%', display: 'inline-block' }}
                        value={(multipliers.cashAndCashEquivalents * 100)}
                        onChange={(e) => handleMultiplierChange('cashAndCashEquivalents', e.target.value)}
                      />
                      <span style={{ display: 'inline-block' }}>%</span>
                    </td>
                    {forecast.map((data) => (
                      <td className="grey-bg">
                        {data.cashAndCashEquivalents
                          ? data.cashAndCashEquivalents.toLocaleString('en-US', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })
                          : '-'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="left">Accounts receivable</td>
                    <td className="green-type">
                      <ToggleButtonGroup
                        type="radio"
                        name="accountsReceivable"
                        value={settings.accountsReceivable === 'multiplier' ? 1 : 2}
                        onChange={(value) => handleSettingChange('accountsReceivable', value)}
                        size="sm"
                      >
                        <ToggleButton variant="success" id="tbg-accountsReceivable-1" value={1} className="button">
                          M
                        </ToggleButton>
                        <ToggleButton variant="success" id="tbg-accountsReceivable-2" value={2} className="button">
                          A
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </td>
                    <td className="green-input">
                      <Form.Control
                        type="number"
                        className="button"
                        style={{ width: '100%', display: 'inline-block' }}
                        value={(multipliers.accountsReceivable * 100)}
                        onChange={(e) => handleMultiplierChange('accountsReceivable', e.target.value)}
                      />
                      <span style={{ display: 'inline-block' }}>%</span>
                    </td>
                    {forecast.map((data) => (
                      <td className="grey-bg">
                        {data.accountsReceivable
                          ? data.accountsReceivable.toLocaleString('en-US', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })
                          : '-'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="left">Inventory</td>
                    <td className="green-type">
                      <ToggleButtonGroup
                        type="radio"
                        name="inventory"
                        value={settings.inventory === 'multiplier' ? 1 : 2}
                        onChange={(value) => handleSettingChange('inventory', value)}
                        size="sm"
                      >
                        <ToggleButton variant="success" id="tbg-inventory-1" value={1} className="button">
                          M
                        </ToggleButton>
                        <ToggleButton variant="success" id="tbg-inventory-2" value={2} className="button">
                          A
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </td>
                    <td className="green-input">
                      <Form.Control
                        type="number"
                        className="button"
                        style={{ width: '100%', display: 'inline-block' }}
                        value={(multipliers.inventory * 100)}
                        onChange={(e) => handleMultiplierChange('inventory', e.target.value)}
                      />
                      <span style={{ display: 'inline-block' }}>%</span>
                    </td>
                    {forecast.map((data) => (
                      <td className="grey-bg">
                        {data.inventory
                          ? data.inventory.toLocaleString('en-US', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })
                          : '-'}
                      </td>
                    ))}
                  </tr>
                  <tr className="bold">
                    <td className="left">Total Current Assets</td>
                    <td aria-label="blank" />
                    <td aria-label="blank" />
                    {forecast.map((data) => (
                      <td className="bottom-border">
                        {data.totalCurrentAssets
                          ? data.totalCurrentAssets.toLocaleString('en-US', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })
                          : '-'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td aria-label="blank" colSpan={1}>&nbsp;</td>
                  </tr>
                  <tr className="bold left">
                    <td>Long-term Asset</td>
                  </tr>
                  <tr>
                    <td className="left">Property, plant, and equipment</td>
                    <td className="green-type">
                      <ToggleButtonGroup
                        type="radio"
                        name="propertyPlantAndEquipment"
                        value={settings.propertyPlantAndEquipment === 'multiplier' ? 1 : 2}
                        onChange={(value) => handleSettingChange('propertyPlantAndEquipment', value)}
                        size="sm"
                      >
                        <ToggleButton
                          variant="success"
                          id="tbg-propertyPlantAndEquipment-1"
                          value={1}
                          className="button"
                        >
                          M
                        </ToggleButton>
                        <ToggleButton
                          variant="success"
                          id="tbg-propertyPlantAndEquipment-2"
                          value={2}
                          className="button"
                        >
                          A
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </td>
                    <td className="green-input">
                      <Form.Control
                        type="number"
                        className="button"
                        style={{ width: '100%', display: 'inline-block' }}
                        value={(multipliers.propertyPlantAndEquipment * 100)}
                        onChange={(e) => handleMultiplierChange('propertyPlantAndEquipment', e.target.value)}
                      />
                      <span style={{ display: 'inline-block' }}>%</span>
                    </td>
                    {forecast.map((data) => (
                      <td className="grey-bg">
                        {data.propertyPlantAndEquipment
                          ? data.propertyPlantAndEquipment.toLocaleString('en-US', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })
                          : '-'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="left">Investment</td>
                    <td className="green-type">
                      <ToggleButtonGroup
                        type="radio"
                        name="investment"
                        value={settings.investment === 'multiplier' ? 1 : 2}
                        onChange={(value) => handleSettingChange('investment', value)}
                        size="sm"
                      >
                        <ToggleButton variant="success" id="tbg-investment-1" value={1} className="button">
                          M
                        </ToggleButton>
                        <ToggleButton variant="success" id="tbg-investment-2" value={2} className="button">
                          A
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </td>
                    <td className="green-input">
                      <Form.Control
                        type="number"
                        className="button"
                        style={{ width: '100%', display: 'inline-block' }}
                        value={(multipliers.investment * 100)}
                        onChange={(e) => handleMultiplierChange('investment', e.target.value)}
                      />
                      <span style={{ display: 'inline-block' }}>%</span>
                    </td>
                    {forecast.map((data) => (
                      <td className="grey-bg">
                        {data.investment
                          ? data.investment.toLocaleString('en-US', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })
                          : '-'}
                      </td>
                    ))}
                  </tr>
                  <tr className="bold">
                    <td className="left">Total long-term asset</td>
                    <td aria-label="blank" />
                    <td aria-label="blank" />
                    {forecast.map((data) => (
                      <td className="bottom-border">
                        {data.totalLongTermAssets
                          ? data.totalLongTermAssets.toLocaleString('en-US', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })
                          : '-'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td aria-label="blank" colSpan={3}>&nbsp;</td>
                    <td aria-label="blank" colSpan={12} className="bottom-border">&nbsp;</td>
                  </tr>
                  <tr>
                    <th className="bold underline font left">
                      TOTAL ASSETS
                    </th>
                    <td aria-label="blank" />
                    <td aria-label="blank" />
                    {forecast.map((data) => (
                      <td className="bottom-border underline bold">
                        {data.totalAssets
                          ? data.totalAssets.toLocaleString('en-US', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })
                          : '-'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td aria-label="blank" colSpan={1}>&nbsp;</td>
                  </tr>
                  <tr>
                    <th className="bold underline font">
                      LIABILITIES AND EQUITY
                    </th>
                  </tr>
                  <tr>
                    <td className="bold left">
                      Current Liabilities (due within 1 year)
                    </td>
                  </tr>
                  <tr>
                    <td className="left">Accounts payable</td>
                    <td className="green-type">
                      <ToggleButtonGroup
                        type="radio"
                        name="accountsPayable"
                        value={settings.accountsPayable === 'multiplier' ? 1 : 2}
                        onChange={(value) => handleSettingChange('accountsPayable', value)}
                        size="sm"
                      >
                        <ToggleButton variant="success" id="tbg-accountsPayable-1" value={1} className="button">
                          M
                        </ToggleButton>
                        <ToggleButton variant="success" id="tbg-accountsPayable-2" value={2} className="button">
                          A
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </td>
                    <td className="green-input">
                      <Form.Control
                        type="number"
                        className="button"
                        style={{ width: '100%', display: 'inline-block' }}
                        value={(multipliers.accountsPayable * 100)}
                        onChange={(e) => handleMultiplierChange('accountsPayable', e.target.value)}
                      />
                      <span style={{ display: 'inline-block' }}>%</span>
                    </td>
                    {forecast.map((data) => (
                      <td className="grey-bg">
                        {data.accountsPayable
                          ? data.accountsPayable.toLocaleString('en-US', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })
                          : '-'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="left">Debt service</td>
                    <td className="green-type">
                      <ToggleButtonGroup
                        type="radio"
                        name="currentDebtService"
                        value={settings.currentDebtService === 'multiplier' ? 1 : 2}
                        onChange={(value) => handleSettingChange('currentDebtService', value)}
                        size="sm"
                      >
                        <ToggleButton variant="success" id="tbg-currentDebtService-1" value={1} className="button">
                          M
                        </ToggleButton>
                        <ToggleButton variant="success" id="tbg-currentDebtService-2" value={2} className="button">
                          A
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </td>
                    <td className="green-input">
                      <Form.Control
                        type="number"
                        className="button"
                        style={{ width: '100%', display: 'inline-block' }}
                        value={(multipliers.currentDebtService * 100)}
                        onChange={(e) => handleMultiplierChange('currentDebtService', e.target.value)}
                      />
                      <span style={{ display: 'inline-block' }}>%</span>
                    </td>
                    {forecast.map((data) => (
                      <td className="grey-bg">
                        {data.currentDebtService
                          ? data.currentDebtService.toLocaleString('en-US', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })
                          : '-'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="left">Taxes payable</td>
                    <td className="green-type">
                      <ToggleButtonGroup
                        type="radio"
                        name="taxesPayable"
                        value={settings.taxesPayable === 'multiplier' ? 1 : 2}
                        onChange={(value) => handleSettingChange('taxesPayable', value)}
                        size="sm"
                      >
                        <ToggleButton variant="success" id="tbg-taxesPayable-1" value={1} className="button">
                          M
                        </ToggleButton>
                        <ToggleButton variant="success" id="tbg-taxesPayable-2" value={2} className="button">
                          A
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </td>
                    <td className="green-input">
                      <Form.Control
                        type="number"
                        className="button"
                        style={{ width: '100%', display: 'inline-block' }}
                        value={(multipliers.taxesPayable * 100)}
                        onChange={(e) => handleMultiplierChange('taxesPayable', e.target.value)}
                      />
                      <span style={{ display: 'inline-block' }}>%</span>
                    </td>
                    {forecast.map((data) => (
                      <td className="grey-bg">
                        {data.taxesPayable
                          ? data.taxesPayable.toLocaleString('en-US', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })
                          : '-'}
                      </td>
                    ))}
                  </tr>
                  <tr className="bold">
                    <td className="left">Total Current Liabilities</td>
                    <td aria-label="blank" />
                    <td aria-label="blank" />
                    {forecast.map((data) => (
                      <td className="bottom-border">
                        {data.totalCurrentLiabilities
                          ? data.totalCurrentLiabilities.toLocaleString('en-US', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })
                          : '-'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td aria-label="blank" colSpan={1}>&nbsp;</td>
                  </tr>
                  <tr className="bold left">
                    <td>Long-term Liabilities (due after one year)</td>
                  </tr>
                  <tr>
                    <td className="left">Debt Service</td>
                    <td className="green-type">
                      <ToggleButtonGroup
                        type="radio"
                        name="longDebtService"
                        value={settings.longDebtService === 'multiplier' ? 1 : 2}
                        onChange={(value) => handleSettingChange('longDebtService', value)}
                        size="sm"
                      >
                        <ToggleButton variant="success" id="tbg-longDebtService-1" value={1} className="button">
                          M
                        </ToggleButton>
                        <ToggleButton variant="success" id="tbg-longDebtService-2" value={2} className="button">
                          A
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </td>
                    <td className="green-input">
                      <Form.Control
                        type="number"
                        className="button"
                        style={{ width: '100%', display: 'inline-block' }}
                        value={(multipliers.longDebtService * 100)}
                        onChange={(e) => handleMultiplierChange('longDebtService', e.target.value)}
                      />
                      <span style={{ display: 'inline-block' }}>%</span>
                    </td>
                    {forecast.map((data) => (
                      <td className="grey-bg">
                        {data.longDebtService
                          ? data.longDebtService.toLocaleString('en-US', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })
                          : '-'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="left">Loans payable</td>
                    <td className="green-type">
                      <ToggleButtonGroup
                        type="radio"
                        name="loansPayable"
                        value={settings.loansPayable === 'multiplier' ? 1 : 2}
                        onChange={(value) => handleSettingChange('loansPayable', value)}
                        size="sm"
                      >
                        <ToggleButton variant="success" id="tbg-loansPayable-1" value={1} className="button">
                          M
                        </ToggleButton>
                        <ToggleButton variant="success" id="tbg-loansPayable-2" value={2} className="button">
                          A
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </td>
                    <td className="green-input">
                      <Form.Control
                        type="number"
                        className="button"
                        style={{ width: '100%', display: 'inline-block' }}
                        value={(multipliers.loansPayable * 100)}
                        onChange={(e) => handleMultiplierChange('loansPayable', e.target.value)}
                      />
                      <span style={{ display: 'inline-block' }}>%</span>
                    </td>
                    {forecast.map((data) => (
                      <td className="grey-bg">
                        {data.loansPayable
                          ? data.loansPayable.toLocaleString('en-US', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })
                          : '-'}
                      </td>
                    ))}
                  </tr>
                  <tr className="bold">
                    <td className="left">Total long-term liabilities</td>
                    <td aria-label="blank" />
                    <td aria-label="blank" />
                    {forecast.map((data) => (
                      <td className="bottom-border">
                        {data.totalLongTermLiabilities
                          ? data.totalLongTermLiabilities.toLocaleString('en-US', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })
                          : '-'}
                      </td>
                    ))}
                  </tr>
                  <tr className="bold">
                    <td className="left">Total Liabilities</td>
                    <td aria-label="blank" />
                    <td aria-label="blank" />
                    {forecast.map((data) => (
                      <td className="bottom-border">
                        {data.totalLiabilities
                          ? data.totalLiabilities.toLocaleString('en-US', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })
                          : '-'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td aria-label="blank" colSpan={1}>&nbsp;</td>
                  </tr>
                  <tr className="bold left">
                    <td>Stockholder&apos;s Equity</td>
                  </tr>
                  <tr>
                    <td className="left">Equity Capital</td>
                    <td className="green-type">
                      <ToggleButtonGroup
                        type="radio"
                        name="equityCapital"
                        value={settings.equityCapital === 'multiplier' ? 1 : 2}
                        onChange={(value) => handleSettingChange('equityCapital', value)}
                        size="sm"
                      >
                        <ToggleButton variant="success" id="tbg-equityCapital-1" value={1} className="button">
                          M
                        </ToggleButton>
                        <ToggleButton variant="success" id="tbg-equityCapital-2" value={2} className="button">
                          A
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </td>
                    <td className="green-input">
                      <Form.Control
                        type="number"
                        className="button"
                        style={{ width: '100%', display: 'inline-block' }}
                        value={(multipliers.equityCapital * 100)}
                        onChange={(e) => handleMultiplierChange('equityCapital', e.target.value)}
                      />
                      <span style={{ display: 'inline-block' }}>%</span>
                    </td>
                    {forecast.map((data) => (
                      <td className="grey-bg">
                        {data.equityCapital
                          ? data.equityCapital.toLocaleString('en-US', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })
                          : '-'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="left">Retained earnings</td>
                    <td className="green-type">
                      <ToggleButtonGroup
                        type="radio"
                        name="retainedEarnings"
                        value={settings.retainedEarnings === 'multiplier' ? 1 : 2}
                        onChange={(value) => handleSettingChange('retainedEarnings', value)}
                        size="sm"
                      >
                        <ToggleButton variant="success" id="tbg-retainedEarnings-1" value={1} className="button">
                          M
                        </ToggleButton>
                        <ToggleButton variant="success" id="tbg-retainedEarnings-2" value={2} className="button">
                          A
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </td>
                    <td className="green-input">
                      <Form.Control
                        type="number"
                        className="button"
                        style={{ width: '100%', display: 'inline-block' }}
                        value={(multipliers.retainedEarnings * 100)}
                        onChange={(e) => handleMultiplierChange('retainedEarnings', e.target.value)}
                      />
                      <span style={{ display: 'inline-block' }}>%</span>
                    </td>
                    {forecast.map((data) => (
                      <td className="grey-bg">
                        {data.retainedEarnings
                          ? data.retainedEarnings.toLocaleString('en-US', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })
                          : '-'}
                      </td>
                    ))}
                  </tr>
                  <tr className="bold">
                    <td className="left">Total Stockholder&apos;s Equity</td>
                    <td aria-label="blank" />
                    <td aria-label="blank" />
                    {forecast.map((data) => (
                      <td className="bottom-border">
                        {data.totalStockholdersEquity
                          ? data.totalStockholdersEquity.toLocaleString('en-US', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })
                          : '-'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td aria-label="blank" colSpan={3}>&nbsp;</td>
                    <td aria-label="blank" colSpan={12} className="bottom-border">&nbsp;</td>
                  </tr>
                  <tr>
                    <th className="bold underline font left">
                      TOTAL LIABILITIES AND EQUITY
                    </th>
                    <td aria-label="blank" />
                    <td aria-label="blank" />
                    {forecast.map((data) => (
                      <td className="bottom-border underline bold">
                        {data.totalLiabilitiesAndEquity
                          ? data.totalLiabilitiesAndEquity.toLocaleString('en-US', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })
                          : '-'}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </Table>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ClientDashboard;
