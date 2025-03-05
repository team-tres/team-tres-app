'use client';

import { useEffect, useRef, useState } from 'react';
import { Container, Table, Spinner } from 'react-bootstrap';
import Chart from 'chart.js/auto'
import './page.css';

const Forecast = () => {
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

  const chartRef = useRef<HTMLCanvasElement>(null);

  const chartInstance = useRef<Chart>();

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

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        const response = await fetch('/api/forecast-generation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            companyId: '1', // Company ID is set to 1
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

  useEffect(() => {
    if (forecast.length === 0 || !chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels: forecast.map((item) => item.year.toString()),
        datasets: [
          {
            label: 'Revenue',
            data: forecast.map((item) => item.revenue),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
            pointHoverBackgroundColor: '#05AFCA',
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, [forecast]);

  return (
    <main>
      <Container id="dashboard" fluid className="py-3 text-center">
        <h1>Financial Forecast</h1>
        <canvas ref={chartRef} />
        <h2 className="left">12-YEAR FORECAST</h2>
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
              <th colSpan={15} className="company left">
                COMPANY NAME
              </th>
            </tr>
          </thead>
          <tbody className="font">
            <tr>
              <td className="bold">
                Financial Compilation (FC)
                <br />
                12 Year Forecast Output
              </td>
              {forecast.map((data, i) => (
                <td className="bold" key={i}>
                  Forecast
                  <br />
                  {i + 1}
                  <br />
                  {data.year}
                </td>
              ))}
            </tr>
          </tbody>
          <thead>
            <tr>
              <th colSpan={15} className="income-statement left">
                INCOME STATEMENT
              </th>
            </tr>
          </thead>
          <colgroup>
            <col style={{ width: '27%' }} />
            <col style={{ width: '6%' }} />
            <col style={{ width: '6%' }} />
            {forecast.map(() => (
              <col style={{ width: '6%' }} />
            ))}
          </colgroup>
          <tbody className="font">
            <tr>
              <td className="left">Revenue</td>
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
              <td colSpan={1} aria-label="Empty cell">&nbsp;</td>
            </tr>
            <tr className="bold">
              <td className="left">Cost of goods sold:</td>
            </tr>
            <tr>
              <td className="left">Cost of Contracting</td>
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
              <td colSpan={1} aria-label="Empty cell">&nbsp;</td>
            </tr>
            <tr className="bold">
              <td className="left">Operating expenses</td>
            </tr>
            <tr>
              <td className="left">Salaries and benefits</td>
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
              <td colSpan={1} aria-label="Empty cell">&nbsp;</td>
            </tr>
            <tr className="bold">
              <td className="left">Profit (loss) from operations</td>
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
              <td colSpan={1} aria-label="Empty cell">&nbsp;</td>
            </tr>
            <tr className="bold">
              <td className="underline left">Other income (expense):</td>
            </tr>
            <tr>
              <td className="left">Interest income</td>
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
              <td colSpan={1} aria-label="Empty cell">&nbsp;</td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th colSpan={15} className="balance-sheet left">
                BALANCE SHEET
              </th>
            </tr>
            <tr>
              <th className="bold underline font">
                ASSETS
              </th>
            </tr>
          </thead>
          <tbody className="font">
            <tr className="bold left">
              <td>Current Assets</td>
            </tr>
            <tr>
              <td className="left">Cash and cash equivalents</td>
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
              <td colSpan={1} aria-label="Empty cell">&nbsp;</td>
            </tr>
            <tr className="bold left">
              <td>Long-term Asset</td>
            </tr>
            <tr>
              <td className="left">Property, plant, and equipment</td>
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
              <td colSpan={3} aria-label="Empty cell">&nbsp;</td>
              <td colSpan={12} className="bottom-border" aria-label="Empty cell">&nbsp;</td>
            </tr>
            <tr>
              <th className="bold underline font left">
                TOTAL ASSETS
              </th>
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
              <td colSpan={1} aria-label="Empty cell">&nbsp;</td>
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
              <td colSpan={1} aria-label="Empty cell">&nbsp;</td>
            </tr>
            <tr className="bold left">
              <td>Long-term Liabilities (due after one year)</td>
            </tr>
            <tr>
              <td className="left">Debt Service</td>
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
              <td colSpan={1} aria-label="Empty cell">&nbsp;</td>
            </tr>
            <tr className="bold left">
              <td>Stockholder&apos;s Equity</td>
            </tr>
            <tr>
              <td className="left">Equity Capital</td>
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
              <td colSpan={3} aria-label="Empty cell">&nbsp;</td>
              <td colSpan={12} aria-label="Empty cell">&nbsp;</td>
            </tr>
            <tr>
              <th className="bold underline font left">
                TOTAL LIABILITIES AND EQUITY
              </th>
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
      </Container>
    </main>
  );
};

export default Forecast;
