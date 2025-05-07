import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import AuditedDataTable from '@/components/AuditedDataTable';
import { Container } from 'react-bootstrap';

const AuditedDataPage = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );
  return (
    <main>
      <Container>
        <AuditedDataTable />
      </Container>
    </main>
  );
};

export default AuditedDataPage;
