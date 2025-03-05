import './page.css';

const data = [
  { name: <strong>INCOME STATEMENT</strong>, type: '', mult: '', values: Array(12).fill('') },
  { name: 'Revenue', type: 'MULTIPLIER', mult: '1.5%', values: Array(12).fill('') },
  { name: <strong>Cost of goods sold:</strong>, type: '', mult: '', values: Array(12).fill('') },
  { name: 'Cost of Contracting', type: 'AVERAGE', mult: '1.5%', values: Array(12).fill('') },
  { name: 'Overhead', type: 'AVERAGE', mult: '1.5%', values: Array(12).fill('') },
  { name: <strong>Cost of goods sold:</strong>, type: '', mult: '', values: Array(12).fill('') },
  { name: <strong>Gross profit</strong>, type: '', mult: '', values: Array(12).fill('') },
  { name: <strong>Gross margin %</strong>, type: '', mult: '', values: Array(12).fill('') },
  { name: <strong>Operating expenses</strong>, type: '', mult: '', values: Array(12).fill('') },
  { name: 'Salaries and wages', type: 'AVERAGE', mult: '1.5%', values: Array(12).fill('') },
  { name: 'Rent and Overhead', type: 'AVERAGE', mult: '1.5%', values: Array(12).fill('') },
  { name: 'Depreciation and Amortization', type: 'AVERAGE', mult: '1.5%', values: Array(12).fill('') },
  { name: 'Interest', type: 'AVERAGE', mult: '1.5%', values: Array(12).fill('') },
  { name: <strong>Total operating expenses</strong>, type: '', mult: '', values: Array(12).fill('') },
  { name: <strong>Operating expenses %</strong>, type: '', mult: '', values: Array(12).fill('') },
  { name: <strong>Profit (loss) from operations</strong>, type: '', mult: '', values: Array(12).fill('') },
  { name: <strong>Profit (loss) from operations %</strong>, type: '', mult: '', values: Array(12).fill('') },
  { name: <strong>Other income (expense):</strong>, type: '', mult: '', values: Array(12).fill('') },
  { name: 'Interest income', type: 'AVERAGE', mult: '1.5%', values: Array(12).fill('') },
  { name: 'Interest expense', type: 'AVERAGE', mult: '1.5%', values: Array(12).fill('') },
  { name: 'Gain (loss) on disposal of assets', type: 'AVERAGE', mult: '1.5%', values: Array(12).fill('') },
  { name: 'Other income (expense)', type: 'AVERAGE', mult: '1.5%', values: Array(12).fill('') },
  { name: <strong>Total other income (expense)</strong>, type: '', mult: '', values: Array(12).fill('') },
  { name: <strong>Total other income (expense) %</strong>, type: '', mult: '', values: Array(12).fill('') },
  { name: <strong>Income (loss) before income taxes</strong>, type: '', mult: '', values: Array(12).fill('') },
  { name: <strong>Pre-tax income %</strong>, type: '', mult: '', values: Array(12).fill('') },
  { name: 'Income taxes', type: 'AVERAGE', mult: '1.5%', values: Array(12).fill('') },
  { name: <strong>Net income (loss)</strong>, type: '', mult: '', values: Array(12).fill('') },
  { name: <strong>Net income (loss) %</strong>, type: '', mult: '', values: Array(12).fill('') },
  { name: <strong>BALANCE SHEET</strong>, type: '', mult: '', values: Array(12).fill('') },
  { name: <strong>ASSETS</strong>, type: '', mult: '', values: Array(12).fill('') },
  { name: <strong>Current Assets</strong>, type: '', mult: '', values: Array(12).fill('') },
  { name: 'Cash and cash equivalents', type: 'AVERAGE', mult: '1.5%', values: Array(12).fill('') },
  { name: 'Accounts receivable', type: 'AVREAGE', mult: '1.5%', values: Array(12).fill('') },
  { name: 'Inventory', type: 'AVERAGE', mult: '1.5%', values: Array(12).fill('') },
  { name: <strong>Total Current Assets</strong>, type: '', mult: '', values: Array(12).fill('') },
  { name: <strong>Long-term Asset</strong>, type: '', mult: '', values: Array(12).fill('') },
  { name: 'Property, plant, and equipment', type: 'AVERAGE', mult: '1.5%', values: Array(12).fill('') },
  { name: 'Investment', type: 'AVERAGE', mult: '1.5%', values: Array(12).fill('') },
  { name: <strong>Total long-term asset</strong>, type: '', mult: '', values: Array(12).fill('') },
  { name: <strong>TOTAL ASSETS</strong>, type: '', mult: '', values: Array(12).fill('') },
  { name: <strong>LIABILITIES AND EQUITY</strong>, type: '', mult: '', values: Array(12).fill('') },
  { name: <strong>Current Liabilities (due within 1 year)</strong>, type: '', mult: '', values: Array(12).fill('') },
  { name: 'Accounts payable', type: 'AVERAGE', mult: '1.5%', values: Array(12).fill('') },
  { name: 'Debt service', type: 'AVERAGE', mult: '1.5%', values: Array(12).fill('') },
  { name: 'Taxes payable', type: 'AVERAGE', mult: '1.5%', values: Array(12).fill('') },
  { name: <strong>Total Current Liabilities</strong>, type: '', mult: '', values: Array(12).fill('') },
  { name: <strong>Long-term Liabilities (due after one year)</strong>, type: '', mult: '', values: Array(12).fill('') },
  { name: 'Debt service', type: 'AVERAGE', mult: '1.5%', values: Array(12).fill('') },
  { name: 'Loans payable', type: 'AVERAGE', mult: '1.5%', values: Array(12).fill('') },
  { name: <strong>Total Long-term Liabilities</strong>, type: '', mult: '', values: Array(12).fill('') },
  { name: <strong>Total Liabilities</strong>, type: '', mult: '', values: Array(12).fill('') },
  { name: <strong>Stockholder&apos;s Equity</strong>, type: '', mult: '', values: Array(12).fill('') },
  { name: 'Equity Capital', type: 'AVERAGE', mult: '1.5%', values: Array(12).fill('') },
  { name: 'Retained earnings', type: 'AVERAGE', mult: '1.5%', values: Array(12).fill('') },
  { name: <strong>Total Stockholder&apos;s Equity</strong>, type: '', mult: '', values: Array(12).fill('') },
  { name: <strong>TOTAL LIABILITIES AND EQUITY</strong>, type: '', mult: '', values: Array(12).fill('') },
];

const Forecasts = () => (
  <div className="page">
    <table>
      <thead>
        <tr>
          <th>12 Year Forecast</th>
          <th>Forecast Type</th>
          <th>Enter Multiplier</th>
          {Array.from({ length: 12 }, (_, i) => (
            <th key={i}>
              Forecast
              {' '}
              {i + 1}
              <br />
              (
              {2025 + i}
              )
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.name.toString()}>
            <td>{row.name}</td>
            <td>
              {row.type ? (
                <select defaultValue={row.type}>
                  <option value="AVERAGE">AVERAGE</option>
                  <option value="MULTIPLIER">MULTIPLIER</option>
                </select>
              ) : (
                ''
              )}
            </td>
            <td>
              {row.type ? (
                <input type="text" defaultValue={row.mult} placeholder="1.5%" />
              ) : (
                ''
              )}
            </td>
            {row.values.map((value) => (
              <td key={`${row.name.toString()}-${value}`}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Forecasts;
