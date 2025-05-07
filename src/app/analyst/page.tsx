/* eslint-disable react/no-array-index-key */

import getCompanies from '@/app/queries/admin/getCompanies';
import './page.css';
import FinancialModel from '@/components/FinancialModel';

const ClientDashboard = async () => {
  const companies = await getCompanies();

  return <FinancialModel companies={companies} />;
};
export default ClientDashboard;
