import './page.css';

const data = [
  { name: 'Other income (expense):', type: '', mult: '', values: Array(12).fill('') },
  { name: 'Interest income', type: '', mult: '', values: Array(12).fill('') },
  { name: 'Interest expense', type: '', mult: '', values: Array(12).fill('') },
  { name: 'Gain (loss) on disposal of assets', type: '', mult: '', values: Array(12).fill('') },
  { name: 'Other income (expense)', type: '', mult: '', values: Array(12).fill('') },
  { name: 'Total other income (expense)', type: '', mult: '', values: Array(12).fill('') },
  { name: 'Total other income (expense) %', type: '', mult: '', values: Array(12).fill('') },
  { name: 'Income (loss) before income taxes', type: '', mult: '', values: Array(12).fill('') },
  { name: 'Pre-tax income %', type: '', mult: '', values: Array(12).fill('') },
  { name: 'Income taxes', type: '', mult: '', values: Array(12).fill('') },
  { name: 'Net income (loss)', type: '', mult: '', values: Array(12).fill('') },
  { name: 'Net income (loss) %', type: '', mult: '', values: Array(12).fill('') },
  { name: 'check', type: '', mult: '', values: Array(12).fill('') },
  { name: 'BALANCE SHEET', type: '', mult: '', values: Array(12).fill('') },
  { name: 'ASSETS', type: '', mult: '', values: Array(12).fill('') },
  { name: 'Current Assets', type: '', mult: '', values: Array(12).fill('') },
  { name: 'Cash and cash equivalents', type: '', mult: '', values: Array(12).fill('') },
  { name: 'Accounts receivable', type: '', mult: '', values: Array(12).fill('') },
  { name: 'Inventory', type: '', mult: '', values: Array(12).fill('') },
  { name: 'Total Current Assets', type: '', mult: '', values: Array(12).fill('') },
  { name: 'Long-term Asset', type: '', mult: '', values: Array(12).fill('') },
  { name: 'Property, plant, and equipment', type: '', mult: '', values: Array(12).fill('') },
  { name: 'Investment', type: '', mult: '', values: Array(12).fill('') },
  { name: 'Total long-term asset', type: '', mult: '', values: Array(12).fill('') },
  { name: 'TOTAL ASSETS', type: '', mult: '', values: Array(12).fill('') },
  { name: 'LIABILITIES AND EQUITY', type: '', mult: '', values: Array(12).fill('') },
  { name: 'Current Liabilities (due within 1 year)', type: '', mult: '', values: Array(12).fill('') },
  { name: 'Accounts payable', type: '', mult: '', values: Array(12).fill('') },
  { name: 'Debt service', type: '', mult: '', values: Array(12).fill('') },
  { name: 'Taxes payable', type: '', mult: '', values: Array(12).fill('') },
  { name: 'Total Current Liabilities', type: '', mult: '', values: Array(12).fill('') },
  { name: 'Long-term Liabilities (due after one year)', type: '', mult: '', values: Array(12).fill('') },
  { name: 'Debt service', type: '', mult: '', values: Array(12).fill('') },
  { name: 'Loans payable', type: '', mult: '', values: Array(12).fill('') },
  { name: 'Total Long-term Liabilities', type: '', mult: '', values: Array(12).fill('') },
  { name: 'Total Liabilities', type: '', mult: '', values: Array(12).fill('') },
  { name: 'Stockholder\'s Equity', type: '', mult: '', values: Array(12).fill('') },
  { name: 'Equity Capital', type: '', mult: '', values: Array(12).fill('') },
  { name: 'Retained earnings', type: '', mult: '', values: Array(12).fill('') },
  { name: 'Total Stockholder\'s Equity', type: '', mult: '', values: Array(12).fill('') },
  { name: 'TOTAL LIABILITIES AND EQUITY', type: '', mult: '', values: Array(12).fill('') },
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
        {data.map((dat) => (
          <tr key={dat.name}>
            <td>
              {dat.name}
            </td>
            <td>{dat.type}</td>
            <td>{dat.mult}</td>
            {dat.values.map((val) => (
              <td key={`${dat.name}-${val}`}>{val}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Forecasts;
