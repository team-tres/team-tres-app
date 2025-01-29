import { Col, Container, Row } from 'react-bootstrap';

/** The Home page. */
const Home = () => (
  <main>
    <Container id="landing-page" fluid className="py-3">
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '300px',
          top: '100px',
          backgroundImage: 'url("/ocean.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Row
          className="align-items-center justify-content-center"
          style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}
        >
          <Col className="d-flex flex-column justify-content-center">
            <h1 style={{ fontFamily: 'Open sans', color: 'white', textAlign: 'center' }}>
              <span style={{ fontFamily: 'cursive' }}>
                I ka wā ma mua, ka wā ma hope.
              </span>
              {' '}
              <br />
              The future is found in the past.
            </h1>
            <h3 style={{ fontFamily: 'Open sans', color: 'white', textAlign: 'center' }}>
              – Molokaʻi: Future of a Hawaiian Island, Sustainability Conference, July 2009
            </h3>
          </Col>
        </Row>
      </div>
      <Row className="align-items-center justify-content-center">
        <Col Col className="d-flex flex-column justify-content-center" style={{ padding: '200px' }}>
          <h2 style={{ fontFamily: 'sans-serif',
            fontSize: '2.5rem',
            fontWeight: '900',
            color: '#00243E',
            textAlign: 'center' }}
          >
            E komo mai! Welcome to FiscNav.
          </h2>
          <br />
          <h3 style={{ fontFamily: 'Open sans', color: '#00243D', textAlign: 'center' }}>
            In cooperation with
            {' '}
            <a
              href="https://www.spirehawaii.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontWeight: 'bold', color: '#00243D', textDecoration: 'none' }}
            >
              Spire
            </a>
            {' '}
            we leverage Fiscal Sustainability Models (FSMs) to support
            organizations in making informed financial and strategic decisions. FSMs utilize historical
            financial data, incorporate relevant variables, and provide future-forward financial forecasts
            and trend analyses. This integrated approach enables organizations to navigate today’s evolving
            economic landscape, enhancing their ability to make sound management decisions.
          </h3>
        </Col>
      </Row>
    </Container>
  </main>
);

export default Home;
