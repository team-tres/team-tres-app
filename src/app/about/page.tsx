import { Col } from 'react-bootstrap';
import Image from 'next/image';

const About = () => (
  <main className="container py-5">
    <Col className="text-center">
      <h1 style={{ fontFamily: 'sans-serif', fontSize: '3rem', fontWeight: '900', color: '#00243E' }}>
        Aloha kākou!
      </h1>
      <br />
      <h3 style={{ fontFamily: 'Open sans' }}>
        At FISC NAV, we are dedicated to providing organizations with the
        tools they need to navigate financial decision-making with confidence.
        The Fiscal Sustainability Model (FSM) was developed to help businesses,
        nonprofits, and government entities forecast financial trends, assess risk,
        and plan strategically for the future.
        <br />
        <br />
        In today’s rapidly changing economic landscape, it’s crucial to have a structured
        approach to financial planning. The FSM combines historical data with predictive modeling
        to help organizations make data-driven decisions.
      </h3>
      <br />
      <Image
        src="/about_fsm.png"
        alt="Fiscal Sustainability Model"
        layout="responsive"
        width={100}
        height={30}
        style={{
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <p />
      <Image
        src="/about_fsm2.png"
        alt="Fiscal Sustainability Model2"
        layout="responsive"
        width={100}
        height={30}
        style={{
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <br />
      <br />
      <br />
      <h3 style={{ fontFamily: 'sans-serif', fontSize: '2rem', fontWeight: '900', color: '#00243E' }}>
        Why were we created?
      </h3>
      <br />
      <br />
      <h3 style={{ fontFamily: 'Open sans' }}>
        We were created to simplify data management by providing a seamless,
        web-based platform. Our solution addresses the inefficiencies of manual
        data entry and analysis, offering a user-friendly input interface, robust
        stress testing, and an intuitive dashboard for forecasting. These features
        streamline processes, improve decision-making, and enhance efficiency,
        making data analysis more accessible and actionable.
      </h3>

    </Col>
  </main>
);

export default About;
