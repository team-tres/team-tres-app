import { getServerSession } from 'next-auth';
import { adminProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import getUsers from '@/app/queries/admin/getUser';
import getCompanies from '@/app/queries/admin/getCompanies';
import AdminCompanyManagementClient from '@/components/AdminCompanyManagementClient';

const CompanyManagementPage = async () => {
  const session = await getServerSession(authOptions);
  adminProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  // Fetch all users
  const users = await getUsers();

  // Fetch all companies
  const companies = await getCompanies();

  return <AdminCompanyManagementClient initialCompanies={companies} users={users} />;
};

export default CompanyManagementPage;
