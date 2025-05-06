/* eslint-disable react/no-array-index-key */

'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Container, Table, Spinner, Image, Dropdown, Form } from 'react-bootstrap';
import { Chart } from 'chart.js/auto';
import './page.css';
import zoomPlugin from 'chartjs-plugin-zoom';
import { useSession } from 'next-auth/react';

const SM = () => {
  const { data: session, status } = useSession();
  interface StressTestResults {
    stressTestResults: {
      data: Array<{
        stressEffects: number[];
        residualEffects?: number[];
      }>;
    };
  }

  const [stressTest, setStressTest] = useState<StressTestResults | null>(null);
  const [loading2, setLoading2] = useState(true);
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

  const [multipliers] = useState({
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

  const [settings] = useState<Record<string, 'average' | 'multiplier'>>({
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

  Chart.register(zoomPlugin);

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

  // Phat's new useEffect for fetching stresstest data

  useEffect(() => {
    if (status !== 'authenticated') return;
    const fetchStressTestData = async () => {
      const res = await fetch('/api/sustainability-model', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: Number(session.user.id) }),
      });
      const data: any = await res.json();
      setStressTest(data);
      setLoading2(false);
    };
    fetchStressTestData();
  }, [status, session?.user?.id]);

  useEffect(() => {
    console.log('stressTest state updated →', stressTest);
  }, [stressTest]);

  const [showStressEffect1, setShowStressEffect1] = useState(false);
  const [showResidualEffect1, setShowResidualEffect1] = useState(false);
  const [showStressEffect2, setShowStressEffect2] = useState(false);
  const [showResidualEffect2, setShowResidualEffect2] = useState(false);
  const [showResidualEffect3, setShowResidualEffect3] = useState(false);
  const [showResidualEffect4, setShowResidualEffect4] = useState(false);
  const [showResidualEffect5, setShowResidualEffect5] = useState(false);
  const [showStressEffect3, setShowStressEffect3] = useState(false);
  const [showStressEffect4, setShowStressEffect4] = useState(false);
  const [showStressEffect5, setShowStressEffect5] = useState(false);

  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!stressTest?.stressTestResults?.data?.length) return;
    const ctx = document.getElementById('stressChart') as HTMLCanvasElement;
    // Destroy previous chart instance if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    const labels = forecast.map((d) => d.year);
    const visibilityFlags = [
      { showStress: showStressEffect1, showResidual: showResidualEffect1 },
      { showStress: showStressEffect2, showResidual: showResidualEffect2 },
      { showStress: showStressEffect3, showResidual: showResidualEffect3 },
      { showStress: showStressEffect4, showResidual: showResidualEffect4 },
      { showStress: showStressEffect5, showResidual: showResidualEffect5 },
    ];
    const datasets = stressTest.stressTestResults.data.flatMap((scenario, index) => {
      const baseHue = (index * 60) % 360;
      const scenarioFlags = visibilityFlags[index];
      const scenarioDatasets = [];
      if (scenarioFlags?.showStress) {
        scenarioDatasets.push({
          label: `Scenario ${index + 1} - Stress`,
          data: scenario.stressEffects,
          borderColor: `hsl(${baseHue}, 70%, 50%)`,
          backgroundColor: `hsl(${baseHue}, 70%, 80%)`,
          tension: 0.4,
          fill: false,
        });
      }
      if (scenarioFlags?.showResidual && scenario.residualEffects) {
        scenarioDatasets.push({
          label: `Scenario ${index + 1} - Residual`,
          data: scenario.residualEffects,
          borderColor: `hsl(${(baseHue + 30) % 360}, 70%, 50%)`,
          backgroundColor: `hsl(${(baseHue + 30) % 360}, 70%, 80%)`,
          tension: 0.4,
          fill: false,
        });
      }
      return scenarioDatasets;
    });
    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets,
      },
      options: {
        responsive: true,
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false,
        },
        plugins: {
          zoom: {
            zoom: {
              wheel: { enabled: true },
              pinch: { enabled: true },
              mode: 'y',
            },
            pan: {
              enabled: true,
              mode: 'y',
            },
          },
          title: {
            display: true,
            text: 'Stress and Residual Effects Over Time',
            font: { size: 25, weight: 700 },
            color: 'white',
          },
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              color: 'white',
              font: {
                size: 18,
              },
              usePointStyle: true,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: 'white',
            },
            title: {
              display: true,
              text: 'Year',
              font: { size: 20 },
              color: 'white',
            },
          },
          y: {
            ticks: {
              color: 'white',
            },
            beginAtZero: true,
            title: {
              display: true,
              text: 'Dollars ($)',
              font: { size: 20 },
              color: 'white',
            },
          },
        },
      },
    });
  }, [
    stressTest,
    forecast,
    showStressEffect1,
    showResidualEffect1,
    showStressEffect2,
    showResidualEffect2,
    showStressEffect3,
    showResidualEffect3,
    showStressEffect4,
    showResidualEffect4,
    showStressEffect5,
    showResidualEffect5,
  ]);

  return (
    <main>
      <Container id="dashboard" fluid className="text-center">
        <div className="justify-content-center py-4">
          <h1>Sustainability Model</h1>
          <Image
            src="/spirebar.png"
            alt="Spire Bar"
            width={70}
            height={5}
            className="spire-logo"
          />
        <h3>To visualize the stress and residual effects of each scenario, select them from the dropdowns below.</h3>
        <div className="dark-background rounded-3">
          <canvas id="stressChart" />
        </div>
        <div className="d-flex justify-content-center py-4 grey-bg rounded-3">
          <Table striped="columns" bordered responsive hover className="financial-table w-85">
            <thead>
              {(loading && loading2) && (
                <tr>
                  <td colSpan={forecast.length + 1} className="text-center px-4">
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </td>
                </tr>
              )}
              <tr className="table-primary">
                <th colSpan={forecast.length + 1} className="company left text-center">
                  Company Name
                </th>
              </tr>
            </thead>

            <tbody className="font">
              <tr className="table-secondary">
                <td className="bold px-4">Financial Compilation</td>
                {forecast.map((data) => (
                  <td className="bold px-4 text-center">
                    {data.year}
                  </td>
                ))}
              </tr>
            </tbody>

            <thead>
              <tr className="table-success">
                <th colSpan={forecast.length + 1} className="income-statement left text-center">
                  Income Statement
                </th>
              </tr>
            </thead>

            <colgroup>
              <col style={{ width: '30%' }} />
              {forecast.map(() => (
                <col style={{ width: `${70 / forecast.length}%` }} />
              ))}
            </colgroup>

            <tbody className="font">
              <tr className="table-light">
                <td className="px-4 left">Revenue</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.revenue
                      ? data.revenue.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>

              {showStressEffect1 && stressTest?.stressTestResults?.data?.[0] && (
                <tr className="table-primary">
                  <td className="px-4 left">Scenario 1 - Stress Effect</td>
                  {stressTest.stressTestResults.data[0].stressEffects.map((value, index) => (
                    <td key={index} className="px-4 grey-bg text-end">
                      {value
                        ? value.toLocaleString('en-US', {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })
                        : '-'}
                    </td>
                  ))}
                </tr>
              )}

              {showResidualEffect1 && stressTest?.stressTestResults?.data?.[0] && (
                <tr className="table-primary">
                  <td className="px-4 left">Scenario 1 - Residual Effect</td>
                  {stressTest.stressTestResults.data[0].residualEffects?.map((value, index) => (
                    <td key={index} className="px-4 grey-bg text-end">
                      {value
                        ? value.toLocaleString('en-US', {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })
                        : '-'}
                    </td>
                  ))}
                </tr>
              )}

              {showStressEffect2 && stressTest?.stressTestResults?.data?.[1] && (
                <tr className="table-primary">
                  <td className="px-4 left">Scenario 2 - Stress Effect</td>
                  {stressTest.stressTestResults.data[1].stressEffects.map((value, index) => (
                    <td key={index} className="px-4 grey-bg text-end">
                      {value
                        ? value.toLocaleString('en-US', {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })
                        : '-'}
                    </td>
                  ))}
                </tr>
              )}

              {showResidualEffect2 && stressTest?.stressTestResults?.data?.[1] && (
                <tr className="table-primary">
                  <td className="px-4 left">Scenario 2 - Residual Effect</td>
                  {stressTest.stressTestResults.data[1].residualEffects?.map((value, index) => (
                    <td key={index} className="px-4 grey-bg text-end">
                      {value
                        ? value.toLocaleString('en-US', {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })
                        : '-'}
                    </td>
                  ))}
                </tr>
              )}

              {showResidualEffect3 && stressTest?.stressTestResults?.data?.[2] && (
                <tr className="table-primary">
                  <td className="px-4 left">Scenario 3 - Residual Effect</td>
                  {stressTest.stressTestResults.data[2].residualEffects?.map((value, index) => (
                    <td key={index} className="px-4 grey-bg text-end">
                      {value
                        ? value.toLocaleString('en-US', {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })
                        : '-'}
                    </td>
                  ))}
                </tr>
              )}

              {showResidualEffect4 && stressTest?.stressTestResults?.data?.[3] && (
                <tr className="table-primary">
                  <td className="px-4 left">Scenario 4 - Residual Effect</td>
                  {stressTest.stressTestResults.data[3].residualEffects?.map((value, index) => (
                    <td key={index} className="px-4 grey-bg text-end">
                      {value
                        ? value.toLocaleString('en-US', {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })
                        : '-'}
                    </td>
                  ))}
                </tr>
              )}

              {showResidualEffect5 && stressTest?.stressTestResults?.data?.[4] && (
                <tr className="table-primary">
                  <td className="px-4 left">Scenario 5 - Residual Effect</td>
                  {stressTest.stressTestResults.data[4].residualEffects?.map((value, index) => (
                    <td key={index} className="px-4 grey-bg text-end">
                      {value
                        ? value.toLocaleString('en-US', {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })
                        : '-'}
                    </td>
                  ))}
                </tr>
              )}

              <tr className="table-striped bold">
                <td className="px-4 left">Net Sales</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.netSales
                      ? data.netSales.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="d-flex justify-content-center py-4 grey-bg">
          <Dropdown>
            <Dropdown.Toggle className="custom_dropdown" variant="secondary" id="dropdown-basic">
              Show Stress or Residual Effect
            </Dropdown.Toggle>
            <Dropdown.Menu className="px-3 custom_dropdown">
              <Form.Check
                type="checkbox"
                id="toggle-contracting"
                label="Scenario 1 - Stress Effect"
                checked={showStressEffect1}
                onChange={() => setShowStressEffect1((prev) => !prev)}
              />
              <Form.Check
                type="checkbox"
                id="toggle-contracting"
                label="Scenario 1 - Residual Effect"
                checked={showResidualEffect1}
                onChange={() => setShowResidualEffect1((prev) => !prev)}
              />
              <Form.Check
                type="checkbox"
                id="toggle-contracting"
                label="Scenario 2 - Stress Effect"
                checked={showStressEffect2}
                onChange={() => setShowStressEffect2((prev) => !prev)}
              />
              <Form.Check
                type="checkbox"
                id="toggle-contracting"
                label="Scenario 2 - Residual Effect"
                checked={showResidualEffect2}
                onChange={() => setShowResidualEffect2((prev) => !prev)}
              />
              <Form.Check
                type="checkbox"
                id="toggle-contracting"
                label="Scenario 3 - Residual Effect"
                checked={showResidualEffect3}
                onChange={() => setShowResidualEffect3((prev) => !prev)}
              />
              <Form.Check
                type="checkbox"
                id="toggle-contracting"
                label="Scenario 4 - Residual Effect"
                checked={showResidualEffect4}
                onChange={() => setShowResidualEffect4((prev) => !prev)}
              />
              <Form.Check
                type="checkbox"
                id="toggle-contracting"
                label="Scenario 5 - Residual Effect"
                checked={showResidualEffect5}
                onChange={() => setShowResidualEffect5((prev) => !prev)}
              />
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="d-flex justify-content-center py-4 grey-bg">
          <Table striped="columns" responsive hover bordered className="financial-table rounded w-85">
            <thead>
              <tr />
            </thead>
            <tbody>
              <tr className="table-dark">
                <td className="bold px-4">Cost of goods sold:</td>
                {forecast.map((data) => (
                  <td key={`header-${data.year}`} className="bold px-4 text-center">
                    {data.year}
                  </td>
                ))}
              </tr>
              <tr className="table-light">
                <td className="px-4 left">Cost of Contracting</td>
                {forecast.map((data) => (
                  <td key={`contracting-${data.year}`} className="px-4 grey-bg text-end">
                    {data.costOfContracting
                      ? data.costOfContracting.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light">
                <td className="px-4 left">Overhead</td>
                {forecast.map((data) => (
                  <td key={`overhead-${data.year}`} className="px-4 grey-bg text-end">
                    {data.overhead
                      ? data.overhead.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light bold">
                <td className="px-4 left">Cost of Goods Sold:</td>
                {forecast.map((data) => (
                  <td key={`cogs-${data.year}`} className="px-4 grey-bg text-end">
                    {data.costOfGoodsSold
                      ? data.costOfGoodsSold.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light bold">
                <td className="px-4 left">Gross Profit:</td>
                {forecast.map((data) => (
                  <td key={`gp-${data.year}`} className="px-4 grey-bg text-end">
                    {data.grossProfit
                      ? data.grossProfit.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light bold">
                <td className="px-4 right">Gross Margin %</td>
                {forecast.map((data) => (
                  <td key={`gm-${data.year}`} className="px-4 grey-bg text-end">
                    {data.grossMarginPercentage
                      ? data.grossMarginPercentage.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="d-flex justify-content-center py-4 grey-bg">
          <Table striped="columns" responsive hover bordered className="financial-table rounded w-85">
            <thead>
              <tr />
            </thead>
            <tbody>
              <tr className="table-dark">
                <td className="bold px-4">Operating Expenses:</td>
                {forecast.map((data) => (
                  <td className="bold px-4 text-center">
                    {data.year}
                  </td>
                ))}
              </tr>
              <tr className="table-light">
                <td className="px-4 left">Salaries and Benefits</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.salariesAndBenefits
                      ? data.salariesAndBenefits.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light">
                <td className="px-4 left">Rent and Overhead</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.rentAndOverhead
                      ? data.rentAndOverhead.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light">
                <td className="px-4 left">Deprecation and Amortization</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.depreciationAndAmortization
                      ? data.depreciationAndAmortization.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light">
                <td className="px-4 left">Interest</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.interest
                      ? data.interest.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>

              {showStressEffect3 && stressTest?.stressTestResults?.data?.[2] && (
                <tr className="table-primary">
                  <td className="px-4 left">Scenario 3 - Stress Effect</td>
                  {stressTest.stressTestResults.data[2].stressEffects.map((value, index) => (
                    <td key={index} className="px-4 grey-bg text-end">
                      {value
                        ? value.toLocaleString('en-US', {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })
                        : '-'}
                    </td>
                  ))}
                </tr>
              )}

              {showStressEffect4 && stressTest?.stressTestResults?.data?.[3] && (
                <tr className="table-primary">
                  <td className="px-4 left">Scenario 4 - Stress Effect</td>
                  {stressTest.stressTestResults.data[3].stressEffects.map((value, index) => (
                    <td key={index} className="px-4 grey-bg text-end">
                      {value
                        ? value.toLocaleString('en-US', {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })
                        : '-'}
                    </td>
                  ))}
                </tr>
              )}

              {showStressEffect5 && stressTest?.stressTestResults?.data?.[4] && (
                <tr className="table-primary">
                  <td className="px-4 left">Scenario 5 - Stress Effect</td>
                  {stressTest.stressTestResults.data[4].stressEffects.map((value, index) => (
                    <td key={index} className="px-4 grey-bg text-end">
                      {value
                        ? value.toLocaleString('en-US', {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })
                        : '-'}
                    </td>
                  ))}
                </tr>
              )}

              <tr className="table-light bold">
                <td className="px-4 left">Total Operating Expenses:</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.totalOperatingExpenses
                      ? data.totalOperatingExpenses.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light bold">
                <td className="px-4 right">Operating Expense %</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.operatingExpensesPercentage
                      ? data.operatingExpensesPercentage.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light bold">
                <td className="px-4 left">Profit (loss) from Operations</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.profitFromOperations
                      ? data.profitFromOperations.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light bold">
                <td className="px-4 right">Profit (loss) from Operations %</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.profitFromOperationsPercentage
                      ? data.profitFromOperationsPercentage.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="d-flex justify-content-center py-4 grey-bg">
          <Dropdown>
            <Dropdown.Toggle className="custom_dropdown" variant="secondary" id="dropdown-basic">
              Show Stress or Residual Effect
            </Dropdown.Toggle>
            <Dropdown.Menu className="px-3 custom_dropdown">
              <Form.Check
                type="checkbox"
                id="toggle-contracting"
                label="Scenario 3 - Stress Effect"
                checked={showStressEffect3}
                onChange={() => setShowStressEffect3((prev) => !prev)}
              />
              <Form.Check
                type="checkbox"
                id="toggle-contracting"
                label="Scenario 4 - Stress Effect"
                checked={showStressEffect4}
                onChange={() => setShowStressEffect4((prev) => !prev)}
              />
              <Form.Check
                type="checkbox"
                id="toggle-contracting"
                label="Scenario 5 - Stress Effect"
                checked={showStressEffect5}
                onChange={() => setShowStressEffect5((prev) => !prev)}
              />
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="d-flex justify-content-center py-4 grey-bg">
          <Table striped="columns" responsive hover bordered className="financial-table rounded w-85">
            <thead>
              <tr />
            </thead>
            <tbody>
              <tr className="table-dark">
                <td className="bold px-4">Other Income (Expense):</td>
                {forecast.map((data) => (
                  <td className="bold px-4 text-center">
                    {data.year}
                  </td>
                ))}
              </tr>
              <tr className="table-light bold">
                <td className="px-4 left">Total Other Income (expense)</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.totalOtherIncome
                      ? data.totalOtherIncome.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light bold">
                <td className="px-4 right">Total Other Income (expense) %</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.totalOtherIncomePercentage
                      ? data.totalOtherIncomePercentage.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light bold">
                <td className="px-4 left">Income (loss) Before Income Taxes</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.incomeBeforeIncomeTaxes
                      ? data.incomeBeforeIncomeTaxes.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light bold">
                <td className="px-4 right">Pre-tax income %</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.pretaxIncomePercentage
                      ? data.pretaxIncomePercentage.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light">
                <td className="px-4 left">Income Taxes</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.incomeTaxes
                      ? data.incomeTaxes.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light bold">
                <td className="px-4 left">Net Income (loss)</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.netIncome
                      ? data.netIncome.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light bold">
                <td className="px-4 right">Net Income (loss) %</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.netIncomePercentage
                      ? data.netIncomePercentage.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="d-flex justify-content-center py-4 grey-bg">
          <Table striped="columns" responsive hover bordered className="financial-table rounded w-85">
            <thead>
              <tr className="table-primary">
                <th colSpan={forecast.length + 1} className="balance-sheet left text-center">
                  Balance Sheet
                </th>
              </tr>
            </thead>
            <tbody className="font">
              <tr className="table-dark">
                <td className="bold px-4">Assets</td>
                {forecast.map((data) => (
                  <td className="bold px-4 text-center">
                    {data.year}
                  </td>
                ))}
              </tr>
              <tr>
                <th className="bold font">
                  Current Assets
                </th>
              </tr>
              <tr className="table-light">
                <td className="px-4 left">Cash and Cash Equivalents</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.cashAndCashEquivalents
                      ? data.cashAndCashEquivalents.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light">
                <td className="px-4 left">Account Receivable</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.accountsReceivable
                      ? data.accountsReceivable.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light">
                <td className="px-4 left">Inventory</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.inventory
                      ? data.inventory.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              {showStressEffect3 && stressTest?.stressTestResults?.data?.[2] && (
                <tr className="table-primary">
                  <td className="px-4 left">Scenario 3 - Stress Effect</td>
                  {stressTest.stressTestResults.data[2].stressEffects.map((value, index) => (
                    <td key={index} className="px-4 grey-bg text-end">
                      {value
                        ? value.toLocaleString('en-US', {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })
                        : '-'}
                    </td>
                  ))}
                </tr>
              )}

              {showStressEffect4 && stressTest?.stressTestResults?.data?.[3] && (
                <tr className="table-primary">
                  <td className="px-4 left">Scenario 4 - Stress Effect</td>
                  {stressTest.stressTestResults.data[3].stressEffects.map((value, index) => (
                    <td key={index} className="px-4 grey-bg text-end">
                      {value
                        ? value.toLocaleString('en-US', {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })
                        : '-'}
                    </td>
                  ))}
                </tr>
              )}
              <tr className="table-light bold">
                <td className="px-4 left">Total Current Assets</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
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
                <th className="bold font">
                  Long-term Assets
                </th>
              </tr>
              <tr className="table-light">
                <td className="px-4 left">Property, Plant, and Equiptment</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.propertyPlantAndEquipment
                      ? data.propertyPlantAndEquipment.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light">
                <td className="px-4 left">Investment</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.investment
                      ? data.investment.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              {showStressEffect1 && stressTest?.stressTestResults?.data?.[0] && (
                <tr className="table-primary">
                  <td className="px-4 left">Scenario 1 - Stress Effect</td>
                  {stressTest.stressTestResults.data[0].stressEffects.map((value, index) => (
                    <td key={index} className="px-4 grey-bg text-end">
                      {value
                        ? value.toLocaleString('en-US', {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })
                        : '-'}
                    </td>
                  ))}
                </tr>
              )}

              {showStressEffect2 && stressTest?.stressTestResults?.data?.[1] && (
                <tr className="table-primary">
                  <td className="px-4 left">Scenario 2 - Stress Effect</td>
                  {stressTest.stressTestResults.data[1].stressEffects.map((value, index) => (
                    <td key={index} className="px-4 grey-bg text-end">
                      {value
                        ? value.toLocaleString('en-US', {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })
                        : '-'}
                    </td>
                  ))}
                </tr>
              )}
              <tr className="table-light bold">
                <td className="px-4 left">Total Long-term Asset</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.totalLongTermAssets
                      ? data.totalLongTermAssets.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="bold">
                <td className="px-4 center">TOTAL ASSETS</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.totalAssets
                      ? data.totalAssets.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="d-flex justify-content-center py-4 grey-bg">
          <Dropdown>
            <Dropdown.Toggle className="custom_dropdown" variant="secondary" id="dropdown-basic">
              Show Stress or Residual Effect
            </Dropdown.Toggle>
            <Dropdown.Menu className="px-3 custom_dropdown">
              <Form.Check
                type="checkbox"
                id="toggle-contracting"
                label="Scenario 3 - Stress Effect"
                checked={showStressEffect3}
                onChange={() => setShowStressEffect3((prev) => !prev)}
              />
              <Form.Check
                type="checkbox"
                id="toggle-contracting"
                label="Scenario 4 - Stress Effect"
                checked={showStressEffect4}
                onChange={() => setShowStressEffect4((prev) => !prev)}
              />
              <Form.Check
                type="checkbox"
                id="toggle-contracting"
                label="Scenario 1 - Stress Effect"
                checked={showStressEffect1}
                onChange={() => setShowStressEffect1((prev) => !prev)}
              />
              <Form.Check
                type="checkbox"
                id="toggle-contracting"
                label="Scenario 2 - Stress Effect"
                checked={showStressEffect2}
                onChange={() => setShowStressEffect2((prev) => !prev)}
              />
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="d-flex justify-content-center py-4 grey-bg">
          <Table striped="columns" responsive hover bordered className="financial-table rounded w-85">
            <thead>
              <tr />
            </thead>
            <tbody>
              <tr className="table-dark">
                <td className="bold underline px-4">LIABILITIES AND EQUITY</td>
                {forecast.map((data) => (
                  <td className="bold px-4 text-center">
                    {data.year}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="bold left">Current Liabilities (due within 1 year)</td>
              </tr>
              <tr className="table-light">
                <td className="px-4 left">Accounts Payable</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.accountsPayable
                      ? data.accountsPayable.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light">
                <td className="px-4 left">Debt Service</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.currentDebtService
                      ? data.currentDebtService.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light">
                <td className="px-4 left">Taxes Payable</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.taxesPayable
                      ? data.taxesPayable.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light bold">
                <td className="px-4 left">Total Current Liabilities</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.totalCurrentLiabilities
                      ? data.totalCurrentLiabilities.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="bold left">
                <td>Long-term Liabilities (due after one year)</td>
              </tr>
              <tr className="table-light">
                <td className="px-4 left">Debt Service</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.longDebtService
                      ? data.longDebtService.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light">
                <td className="px-4 left">Loans Payable</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.loansPayable
                      ? data.loansPayable.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              {showStressEffect5 && stressTest?.stressTestResults?.data?.[4] && (
                <tr className="table-primary">
                  <td className="px-4 left">Scenario 5 - Stress Effect</td>
                  {stressTest.stressTestResults.data[4].stressEffects.map((value, index) => (
                    <td key={index} className="px-4 grey-bg text-end">
                      {value
                        ? value.toLocaleString('en-US', {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })
                        : '-'}
                    </td>
                  ))}
                </tr>
              )}
              <tr className="table-light bold">
                <td className="px-4 left">Total Long-term Liabilities</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.totalLongTermLiabilities
                      ? data.totalLongTermLiabilities.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light bold">
                <td className="px-4 left">Total Liabilities</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.totalLiabilities
                      ? data.totalLiabilities.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="bold left">
                <td>Stockholder&apos;s Equity</td>
              </tr>
              <tr className="table-light">
                <td className="px-4 left">Equity Capital</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.equityCapital
                      ? data.equityCapital.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light">
                <td className="px-4 left">Retained Earnings</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.retainedEarnings
                      ? data.retainedEarnings.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light bold">
                <td className="px-4 left">Total Stockholder&apos;s Equity</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.totalStockholdersEquity
                      ? data.totalStockholdersEquity.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="bold underline">
                <td className="px-4 left">TOTAL LIABILITIES AND EQUITY</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
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
        </div>
        <div className="d-flex justify-content-center py-3 grey-bg">
          <Dropdown>
            <Dropdown.Toggle className="custom_dropdown" variant="secondary" id="dropdown-basic">
              Show Stress or Residual Effect
            </Dropdown.Toggle>
            <Dropdown.Menu className="px-3 custom_dropdown">
              <Form.Check
                type="checkbox"
                id="toggle-contracting"
                label="Scenario 5 - Stress Effect"
                checked={showStressEffect5}
                onChange={() => setShowStressEffect5((prev) => !prev)}
              />
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    </main>
  );
};

export default SM;
