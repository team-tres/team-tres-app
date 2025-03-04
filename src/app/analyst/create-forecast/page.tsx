'use client';

/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */

import { ToggleButtonGroup, ToggleButton, Container, Table } from 'react-bootstrap';
import './page.css';

const CreateForecastPage = () => (
  <main>
    <Container id="dashboard" fluid className="py-3 text-center">
      <h2 style={{ backgroundColor: '#F5F5DC' }}>Financial Forecast Table</h2>
      <Table borderless responsive>
        <thead>
          <tr>
            <th colSpan={15} className="title left">
              -company-name-
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
            <td style={{ fontSize: '8px' }}>
              Forecast Type
              <br />
              (M-Multiplier)(A-Average)
            </td>
            <td style={{ fontSize: '8px' }}>Enter % Multiplier</td>
            <td className="bold">
              Forecast
              <br />
              1
              <br />
              2025
            </td>
            <td className="bold">
              Forecast
              <br />
              2
              <br />
              2026
            </td>
            <td className="bold">
              Forecast
              <br />
              3
              <br />
              2027
            </td>
            <td className="bold">
              Forecast
              <br />
              4
              <br />
              2028
            </td>
            <td className="bold">
              Forecast
              <br />
              5
              <br />
              2029
            </td>
            <td className="bold">
              Forecast
              <br />
              6
              <br />
              2030
            </td>
            <td className="bold">
              Forecast
              <br />
              7
              <br />
              2031
            </td>
            <td className="bold">
              Forecast
              <br />
              8
              <br />
              2032
            </td>
            <td className="bold">
              Forecast
              <br />
              9
              <br />
              2033
            </td>
            <td className="bold">
              Forecast
              <br />
              10
              <br />
              2034
            </td>
            <td className="bold">
              Forecast
              <br />
              11
              <br />
              2035
            </td>
            <td className="bold">
              Forecast
              <br />
              12
              <br />
              2036
            </td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th colSpan={15} className="title left">
              Income Statement
            </th>
          </tr>
        </thead>
        <colgroup>
          <col style={{ width: '30%' }} />
          <col style={{ width: '6%' }} />
          <col style={{ width: '3%' }} />
          <col style={{ width: '6%' }} />
          <col style={{ width: '6%' }} />
          <col style={{ width: '6%' }} />
          <col style={{ width: '6%' }} />
          <col style={{ width: '6%' }} />
          <col style={{ width: '6%' }} />
          <col style={{ width: '6%' }} />
          <col style={{ width: '6%' }} />
          <col style={{ width: '6%' }} />
          <col style={{ width: '6%' }} />
          <col style={{ width: '6%' }} />
          <col style={{ width: '6%' }} />
        </colgroup>
        <tbody className="font">
          <tr>
            <td className="left">Revenue</td>
            <td className="green-type">
              <ToggleButtonGroup type="radio" name="revenue" defaultValue={1} size="sm">
                <ToggleButton variant="success" id="tbg-revenue-1" value={1} className="button">
                  M
                </ToggleButton>
                <ToggleButton variant="success" id="tbg-revenue-2" value={2} className="button">
                  A
                </ToggleButton>
              </ToggleButtonGroup>
            </td>
            <td className="green-input">
              <input type="text" style={{ width: '70%' }} />
              %
            </td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
          </tr>
          <tr className="bold">
            <td className="left">Net Sales</td>
            <td />
            <td />
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
          </tr>
          <tr>
            <td colSpan={1}>&nbsp;</td>
          </tr>
          <tr className="bold">
            <td className="left">Cost of goods sold:</td>
          </tr>
          <tr>
            <td className="left">Cost of Contracting</td>
            <td className="green-type">
              <ToggleButtonGroup type="radio" name="costOfContracting" defaultValue={2} size="sm">
                <ToggleButton variant="success" id="tbg-costOfContracting-1" value={1} className="button">
                  M
                </ToggleButton>
                <ToggleButton variant="success" id="tbg-costOfContracting-2" value={2} className="button">
                  A
                </ToggleButton>
              </ToggleButtonGroup>
            </td>
            <td className="green-input">
              <input type="text" style={{ width: '70%' }} />
              %
            </td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
          </tr>
          <tr>
            <td className="left">Overhead</td>
            <td className="green-type">
              <ToggleButtonGroup type="radio" name="overhead" defaultValue={2} size="sm">
                <ToggleButton variant="success" id="tbg-overhead-1" value={1} className="button">
                  M
                </ToggleButton>
                <ToggleButton variant="success" id="tbg-overhead-2" value={2} className="button">
                  A
                </ToggleButton>
              </ToggleButtonGroup>
            </td>
            <td className="green-input">
              <input type="text" style={{ width: '70%' }} />
              %
            </td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
          </tr>
          <tr className="bold">
            <td className="left">Cost of goods sold:</td>
            <td />
            <td />
            <td className="underline">-</td>
            <td className="underline">-</td>
            <td className="underline">-</td>
            <td className="underline">-</td>
            <td className="underline">-</td>
            <td className="underline">-</td>
            <td className="underline">-</td>
            <td className="underline">-</td>
            <td className="underline">-</td>
            <td className="underline">-</td>
            <td className="underline">-</td>
            <td className="underline">-</td>
          </tr>
          <tr className="bold">
            <td className="left">Gross profit</td>
            <td />
            <td />
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr className="bold">
            <td className="right">Gross margin %</td>
            <td />
            <td />
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <td colSpan={1}>&nbsp;</td>
          </tr>
          <tr className="bold">
            <td className="left">Operating expenses</td>
          </tr>
          <tr>
            <td className="left">Salaries and benefits</td>
            <td className="green-type">
              <ToggleButtonGroup type="radio" name="salariesAndBenefits" defaultValue={2} size="sm">
                <ToggleButton variant="success" id="tbg-salariesAndBenefits-1" value={1} className="button">
                  M
                </ToggleButton>
                <ToggleButton variant="success" id="tbg-salariesAndBenefits-2" value={2} className="button">
                  A
                </ToggleButton>
              </ToggleButtonGroup>
            </td>
            <td className="green-input">
              <input type="text" style={{ width: '70%' }} />
              %
            </td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
          </tr>
          <tr>
            <td className="left">Rent and Overhead</td>
            <td className="green-type">
              <ToggleButtonGroup type="radio" name="rentAndOverhead" defaultValue={2} size="sm">
                <ToggleButton variant="success" id="tbg-rentAndOverhead-1" value={1} className="button">
                  M
                </ToggleButton>
                <ToggleButton variant="success" id="tbg-rentAndOverhead-2" value={2} className="button">
                  A
                </ToggleButton>
              </ToggleButtonGroup>
            </td>
            <td className="green-input">
              <input type="text" style={{ width: '70%' }} />
              %
            </td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
          </tr>
          <tr>
            <td className="left">Depreciation and Amortization</td>
            <td className="green-type">
              <ToggleButtonGroup type="radio" name="depAndAmort" defaultValue={2} size="sm">
                <ToggleButton variant="success" id="tbg-depAndAmort-1" value={1} className="button">
                  M
                </ToggleButton>
                <ToggleButton variant="success" id="tbg-depAndAmort-2" value={2} className="button">
                  A
                </ToggleButton>
              </ToggleButtonGroup>
            </td>
            <td className="green-input">
              <input type="text" style={{ width: '70%' }} />
              %
            </td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
          </tr>
          <tr>
            <td className="left">Interest</td>
            <td className="green-type">
              <ToggleButtonGroup type="radio" name="interest" defaultValue={2} size="sm">
                <ToggleButton variant="success" id="tbg-interest-1" value={1} className="button">
                  M
                </ToggleButton>
                <ToggleButton variant="success" id="tbg-interest-2" value={2} className="button">
                  A
                </ToggleButton>
              </ToggleButtonGroup>
            </td>
            <td className="green-input">
              <input type="text" style={{ width: '70%' }} />
              %
            </td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
          </tr>
          <tr className="bold">
            <td className="left">Total operating expenses</td>
            <td />
            <td />
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr className="bold">
            <td className="right">Operating expenses %</td>
            <td />
            <td />
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <td colSpan={1}>&nbsp;</td>
          </tr>
          <tr className="bold">
            <td className="left">Profit (loss) from operations</td>
            <td className="green-type">
              <ToggleButtonGroup type="radio" name="operationsLoss" defaultValue={2} size="sm">
                <ToggleButton variant="success" id="tbg-operationsLoss-1" value={1} className="button">
                  M
                </ToggleButton>
                <ToggleButton variant="success" id="tbg-operationsLoss-2" value={2} className="button">
                  A
                </ToggleButton>
              </ToggleButtonGroup>
            </td>
            <td className="green-input">
              <input type="text" style={{ width: '70%' }} />
              %
            </td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
          </tr>
          <tr className="bold">
            <td className="right">Profit (loss) from operations %</td>
            <td />
            <td />
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <td colSpan={1}>&nbsp;</td>
          </tr>
          <tr className="bold">
            <td className="underline left">Other income (expense):</td>
          </tr>
          <tr>
            <td className="left">Interest income</td>
            <td className="green-type">
              <ToggleButtonGroup type="radio" name="interestIncome" defaultValue={2} size="sm">
                <ToggleButton variant="success" id="tbg-interestIncome-1" value={1} className="button">
                  M
                </ToggleButton>
                <ToggleButton variant="success" id="tbg-interestIncome-2" value={2} className="button">
                  A
                </ToggleButton>
              </ToggleButtonGroup>
            </td>
            <td className="green-input">
              <input type="text" style={{ width: '70%' }} />
              %
            </td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
          </tr>
          <tr>
            <td className="left">Interest expense</td>
            <td className="green-type">
              <ToggleButtonGroup type="radio" name="interestExpense" defaultValue={2} size="sm">
                <ToggleButton variant="success" id="tbg-interestExpense-1" value={1} className="button">
                  M
                </ToggleButton>
                <ToggleButton variant="success" id="tbg-interestExpense-2" value={2} className="button">
                  A
                </ToggleButton>
              </ToggleButtonGroup>
            </td>
            <td className="green-input">
              <input type="text" style={{ width: '70%' }} />
              %
            </td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
          </tr>
          <tr>
            <td className="left">Gain (loss) on disposal of assets</td>
            <td className="green-type">
              <ToggleButtonGroup type="radio" name="disposalAssets" defaultValue={2} size="sm">
                <ToggleButton variant="success" id="tbg-disposalAssets-1" value={1} className="button">
                  M
                </ToggleButton>
                <ToggleButton variant="success" id="tbg-disposalAssets-2" value={2} className="button">
                  A
                </ToggleButton>
              </ToggleButtonGroup>
            </td>
            <td className="green-input">
              <input type="text" style={{ width: '70%' }} />
              %
            </td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
          </tr>
          <tr>
            <td className="left">Other income (expense)</td>
            <td className="green-type">
              <ToggleButtonGroup type="radio" name="otherIncome" defaultValue={2} size="sm">
                <ToggleButton variant="success" id="tbg-otherIncome-1" value={1} className="button">
                  M
                </ToggleButton>
                <ToggleButton variant="success" id="tbg-otherIncome-2" value={2} className="button">
                  A
                </ToggleButton>
              </ToggleButtonGroup>
            </td>
            <td className="green-input">
              <input type="text" style={{ width: '70%' }} />
              %
            </td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
          </tr>
          <tr className="bold">
            <td className="left">Total other income (expense)</td>
            <td />
            <td />
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr className="bold">
            <td className="right">Total other income (expense) %</td>
            <td />
            <td />
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr className="bold">
            <td className="left">Income (loss) before income taxes</td>
            <td />
            <td />
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr className="bold">
            <td className="right">Pre-tax income %</td>
            <td />
            <td />
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <td className="left">Income taxes</td>
            <td className="green-type">
              <ToggleButtonGroup type="radio" name="incomeTaxes" defaultValue={2} size="sm">
                <ToggleButton variant="success" id="tbg-incomeTaxes-1" value={1} className="button">
                  M
                </ToggleButton>
                <ToggleButton variant="success" id="tbg-incomeTaxes-2" value={2} className="button">
                  A
                </ToggleButton>
              </ToggleButtonGroup>
            </td>
            <td className="green-input">
              <input type="text" style={{ width: '70%' }} />
              %
            </td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
          </tr>
          <tr className="bold">
            <td className="left">Net income (loss)</td>
            <td />
            <td />
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr className="bold">
            <td className="right">Net income (loss) %</td>
            <td />
            <td />
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <td colSpan={1}>&nbsp;</td>
          </tr>
          <tr>
            <td className="right" style={{ color: 'red' }}>check</td>
            <td />
            <td />
            <td style={{ color: 'red' }}>-</td>
            <td style={{ color: 'red' }}>-</td>
            <td style={{ color: 'red' }}>-</td>
            <td style={{ color: 'red' }}>-</td>
            <td style={{ color: 'red' }}>-</td>
            <td style={{ color: 'red' }}>-</td>
            <td style={{ color: 'red' }}>-</td>
            <td style={{ color: 'red' }}>-</td>
            <td style={{ color: 'red' }}>-</td>
            <td style={{ color: 'red' }}>-</td>
            <td style={{ color: 'red' }}>-</td>
            <td style={{ color: 'red' }}>-</td>
          </tr>
        </tbody>
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
        <tbody className="font">
          <tr className="bold left">
            <td>Current Assets</td>
          </tr>
          <tr>
            <td className="left">Cash and cash equivalents</td>
            <td className="green-type">
              <ToggleButtonGroup type="radio" name="cashEquivalent" defaultValue={2} size="sm">
                <ToggleButton variant="success" id="tbg-cashEquivalent-1" value={1} className="button">
                  M
                </ToggleButton>
                <ToggleButton variant="success" id="tbg-cashEquivalent-2" value={2} className="button">
                  A
                </ToggleButton>
              </ToggleButtonGroup>
            </td>
            <td className="green-input">
              <input type="text" style={{ width: '70%' }} />
              %
            </td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
          </tr>
          <tr>
            <td className="left">Accounts receivable</td>
            <td className="green-type">
              <ToggleButtonGroup type="radio" name="accountsReceive" defaultValue={2} size="sm">
                <ToggleButton variant="success" id="tbg-accountsReceive-1" value={1} className="button">
                  M
                </ToggleButton>
                <ToggleButton variant="success" id="tbg-accountsReceive-2" value={2} className="button">
                  A
                </ToggleButton>
              </ToggleButtonGroup>
            </td>
            <td className="green-input">
              <input type="text" style={{ width: '70%' }} />
              %
            </td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
          </tr>
          <tr>
            <td className="left">Inventory</td>
            <td className="green-type">
              <ToggleButtonGroup type="radio" name="inventory" defaultValue={2} size="sm">
                <ToggleButton variant="success" id="tbg-inventory-1" value={1} className="button">
                  M
                </ToggleButton>
                <ToggleButton variant="success" id="tbg-inventory-2" value={2} className="button">
                  A
                </ToggleButton>
              </ToggleButtonGroup>
            </td>
            <td className="green-input">
              <input type="text" style={{ width: '70%' }} />
              %
            </td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
          </tr>
          <tr className="bold">
            <td className="left">Total Current Assets</td>
            <td />
            <td />
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
          </tr>
          <tr>
            <td colSpan={1}>&nbsp;</td>
          </tr>
          <tr className="bold left">
            <td>Long-term Asset</td>
          </tr>
          <tr>
            <td className="left">Property, plant, and equipment</td>
            <td className="green-type">
              <ToggleButtonGroup type="radio" name="propPlantEquip" defaultValue={2} size="sm">
                <ToggleButton variant="success" id="tbg-propPlantEquip-1" value={1} className="button">
                  M
                </ToggleButton>
                <ToggleButton variant="success" id="tbg-propPlantEquip-2" value={2} className="button">
                  A
                </ToggleButton>
              </ToggleButtonGroup>
            </td>
            <td className="green-input">
              <input type="text" style={{ width: '70%' }} />
              %
            </td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
          </tr>
          <tr>
            <td className="left">Investment</td>
            <td className="green-type">
              <ToggleButtonGroup type="radio" name="investment" defaultValue={2} size="sm">
                <ToggleButton variant="success" id="tbg-investment-1" value={1} className="button">
                  M
                </ToggleButton>
                <ToggleButton variant="success" id="tbg-investment-2" value={2} className="button">
                  A
                </ToggleButton>
              </ToggleButtonGroup>
            </td>
            <td className="green-input">
              <input type="text" style={{ width: '70%' }} />
              %
            </td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
          </tr>
          <tr className="bold">
            <td className="left">Total long-term asset</td>
            <td />
            <td />
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
          </tr>
          <tr>
            <td colSpan={3}>&nbsp;</td>
            <td colSpan={12} className="bottom-border">&nbsp;</td>
          </tr>
          <tr>
            <th className="bold underline font left">
              TOTAL ASSETS
            </th>
            <td />
            <td />
            <td className="bottom-border underline">-</td>
            <td className="bottom-border underline">-</td>
            <td className="bottom-border underline">-</td>
            <td className="bottom-border underline">-</td>
            <td className="bottom-border underline">-</td>
            <td className="bottom-border underline">-</td>
            <td className="bottom-border underline">-</td>
            <td className="bottom-border underline">-</td>
            <td className="bottom-border underline">-</td>
            <td className="bottom-border underline">-</td>
            <td className="bottom-border underline">-</td>
            <td className="bottom-border underline">-</td>
          </tr>
          <tr>
            <td colSpan={1}>&nbsp;</td>
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
              <ToggleButtonGroup type="radio" name="accountsPayable" defaultValue={2} size="sm">
                <ToggleButton variant="success" id="tbg-accountsPayable-1" value={1} className="button">
                  M
                </ToggleButton>
                <ToggleButton variant="success" id="tbg-accountsPayable-2" value={2} className="button">
                  A
                </ToggleButton>
              </ToggleButtonGroup>
            </td>
            <td className="green-input">
              <input type="text" style={{ width: '70%' }} />
              %
            </td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
          </tr>
          <tr>
            <td className="left">Debt service</td>
            <td className="green-type">
              <ToggleButtonGroup type="radio" name="debtServiceWithin" defaultValue={2} size="sm">
                <ToggleButton variant="success" id="tbg-debtServiceWithin-1" value={1} className="button">
                  M
                </ToggleButton>
                <ToggleButton variant="success" id="tbg-debtServiceWithin-2" value={2} className="button">
                  A
                </ToggleButton>
              </ToggleButtonGroup>
            </td>
            <td className="green-input">
              <input type="text" style={{ width: '70%' }} />
              %
            </td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
          </tr>
          <tr>
            <td className="left">Taxes payable</td>
            <td className="green-type">
              <ToggleButtonGroup type="radio" name="taxesPayable" defaultValue={2} size="sm">
                <ToggleButton variant="success" id="tbg-taxesPayable-1" value={1} className="button">
                  M
                </ToggleButton>
                <ToggleButton variant="success" id="tbg-taxesPayable-2" value={2} className="button">
                  A
                </ToggleButton>
              </ToggleButtonGroup>
            </td>
            <td className="green-input">
              <input type="text" style={{ width: '70%' }} />
              %
            </td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
          </tr>
          <tr className="bold">
            <td className="left">Total Current Liabilities</td>
            <td />
            <td />
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
          </tr>
          <tr>
            <td colSpan={1}>&nbsp;</td>
          </tr>
          <tr className="bold left">
            <td>Long-term Liabilities (due after one year)</td>
          </tr>
          <tr>
            <td className="left">Debt Service</td>
            <td className="green-type">
              <ToggleButtonGroup type="radio" name="debtServiceAfter" defaultValue={2} size="sm">
                <ToggleButton variant="success" id="tbg-debtServiceAfter-1" value={1} className="button">
                  M
                </ToggleButton>
                <ToggleButton variant="success" id="tbg-debtServiceAfter-2" value={2} className="button">
                  A
                </ToggleButton>
              </ToggleButtonGroup>
            </td>
            <td className="green-input">
              <input type="text" style={{ width: '70%' }} />
              %
            </td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
          </tr>
          <tr>
            <td className="left">Loans payable</td>
            <td className="green-type">
              <ToggleButtonGroup type="radio" name="loansPayable" defaultValue={2} size="sm">
                <ToggleButton variant="success" id="tbg-loansPayable-1" value={1} className="button">
                  M
                </ToggleButton>
                <ToggleButton variant="success" id="tbg-loansPayable-2" value={2} className="button">
                  A
                </ToggleButton>
              </ToggleButtonGroup>
            </td>
            <td className="green-input">
              <input type="text" style={{ width: '70%' }} />
              %
            </td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
          </tr>
          <tr className="bold">
            <td className="left">Total long-term liabilities</td>
            <td />
            <td />
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
          </tr>
          <tr className="bold">
            <td className="left">Total Liabilities</td>
            <td />
            <td />
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
          </tr>
          <tr>
            <td colSpan={1}>&nbsp;</td>
          </tr>
          <tr className="bold left">
            <td>Stockholder&apos;s Equity</td>
          </tr>
          <tr>
            <td className="left">Equity Capital</td>
            <td className="green-type">
              <ToggleButtonGroup type="radio" name="equityCapital" defaultValue={2} size="sm">
                <ToggleButton variant="success" id="tbg-equityCapital-1" value={1} className="button">
                  M
                </ToggleButton>
                <ToggleButton variant="success" id="tbg-equityCapital-2" value={2} className="button">
                  A
                </ToggleButton>
              </ToggleButtonGroup>
            </td>
            <td className="green-input">
              <input type="text" style={{ width: '70%' }} />
              %
            </td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
          </tr>
          <tr>
            <td className="left">Retained earnings</td>
            <td className="green-type">
              <ToggleButtonGroup type="radio" name="retainedEarnings" defaultValue={2} size="sm">
                <ToggleButton variant="success" id="tbg-retainedEarnings-1" value={1} className="button">
                  M
                </ToggleButton>
                <ToggleButton variant="success" id="tbg-retainedEarnings-2" value={2} className="button">
                  A
                </ToggleButton>
              </ToggleButtonGroup>
            </td>
            <td className="green-input">
              <input type="text" style={{ width: '70%' }} />
              %
            </td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
            <td className="grey-bg">-</td>
          </tr>
          <tr className="bold">
            <td className="left">Total Stockholder&apos;s Equity</td>
            <td />
            <td />
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
            <td className="bottom-border">-</td>
          </tr>
          <tr>
            <td colSpan={3}>&nbsp;</td>
            <td colSpan={12} className="bottom-border">&nbsp;</td>
          </tr>
          <tr>
            <th className="bold underline font left">
              TOTAL LIABILITIES AND EQUITY
            </th>
            <td />
            <td />
            <td className="bottom-border underline">-</td>
            <td className="bottom-border underline">-</td>
            <td className="bottom-border underline">-</td>
            <td className="bottom-border underline">-</td>
            <td className="bottom-border underline">-</td>
            <td className="bottom-border underline">-</td>
            <td className="bottom-border underline">-</td>
            <td className="bottom-border underline">-</td>
            <td className="bottom-border underline">-</td>
            <td className="bottom-border underline">-</td>
            <td className="bottom-border underline">-</td>
            <td className="bottom-border underline">-</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  </main>
);

/* <tbody>
          {Array.from({ length: 80 }).map((_, rowIndex) => (
            // eslint-disable-next-line react/no-array-index-key
            <tr key={rowIndex}>
              <td>v</td>
              <td>x</td>
              <td>x</td>
              <td>x</td>
              <td>x</td>
              <td>x</td>
              <td><Form.Control type="text" /></td>
              <td><Form.Control type="text" /></td>
              <td><Form.Control type="text" /></td>
            </tr>
          ))}
        </tbody> */

export default CreateForecastPage;
