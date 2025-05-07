import { getServerSession } from 'next-auth';
import { adminProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import getUsers from '@/app/queries/admin/getUser';
import AdminUserManagementClient from '@/components/AdminUserManagementClient';

const UserManagementPage = async () => {
  const session = await getServerSession(authOptions);
  adminProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  const users = await getUsers();

  return <AdminUserManagementClient users={users} />;
};

export default UserManagementPage;
