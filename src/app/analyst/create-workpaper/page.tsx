/* eslint-disable max-len */
import { getServerSession } from 'next-auth';
import { Container, Row, Button } from 'react-bootstrap';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import Link from 'next/link';

const CreateWorkpaperPage = async () => {
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  return (
    <main>
      <Container id="dashboard" fluid className="py-3 text-center">
        <h1>Create Workpaper</h1>
        <Row className="justify-content-center mt-4">
          <Link href="/analyst/create-workpaper" passHref>
            <Button style={{ backgroundColor: '#F5F5DC', borderColor: '#F5F5DC', color: '#000' }}>Create Workpaper</Button>
          </Link>
          <Link href="/analyst/create-scenario" passHref>
            <Button style={{ backgroundColor: '#F5F5DC', borderColor: '#F5F5DC', color: '#000' }}>Create Scenario</Button>
          </Link>
          <Link href="/analyst/create-forecast" passHref>
            <Button style={{ backgroundColor: '#F5F5DC', borderColor: '#F5F5DC', color: '#000' }}>Create Forecast</Button>
          </Link>
          <Link href="/analyst/create-stress-test" passHref>
            <Button style={{ backgroundColor: '#F5F5DC', borderColor: '#F5F5DC', color: '#000' }}>Create Stress Test</Button>
          </Link>
        </Row>
      </Container>
    </main>
  );
};

export default CreateWorkpaperPage;
