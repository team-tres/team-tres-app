import { getServerSession } from 'next-auth';
import { adminProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import AdminPageClient from '@/components/AdminPageClient';
import getUsers from '../queries/admin/getUser';

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  adminProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );
  const users = await getUsers();
  const pendingUsers = users.filter(user => user.status === false);

  return <AdminPageClient initialPendingUsers={pendingUsers} />;
};

export default AdminPage;
