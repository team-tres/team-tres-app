import { Col } from 'react-bootstrap';
import Image from 'next/image';
import './page.css';

const About = () => (
  <main className="container py-5">
    <Col className="text-center">
      <h1 className="header-font">
        Aloha kākou!
      </h1>
      <h4 className="text-font">
        At Spire, we are dedicated to providing organizations with the
        tools they need to navigate financial decision-making with confidence.
        The Fiscal Sustainability Model (FSM) was developed to help businesses,
        nonprofits, and government entities forecast financial trends, assess risk,
        and plan strategically for the future.
      </h4>
      <h4 className="text-font">
        In today’s rapidly changing economic landscape, it’s crucial to have a structured
        approach to financial planning. The FSM combines historical data with predictive modeling
        to help organizations make data-driven decisions.
      </h4>
      <br />
      <Image
        src="/about_fsm.png"
        alt="Fiscal Sustainability Model"
        layout="responsive"
        width={100}
        height={30}
        className="fiscal-image"
      />
      <Image
        src="/about_fsm2.png"
        alt="Fiscal Sustainability Model2"
        layout="responsive"
        width={100}
        height={30}
        className="fiscal-image"
      />
      <h3 className="sub-sec-font">
        What is our purpose?
      </h3>
      <h4 className="text-font">
        This application was created to simplify data management by providing a seamless,
        web-based platform. Our solution addresses the inefficiencies of manual
        data entry and analysis, offering a user-friendly input interface, robust
        stress testing, and an intuitive dashboard for forecasting. These features
        streamline processes, improve decision-making, and enhance efficiency,
        making data analysis more accessible and actionable.
      </h4>

    </Col>
  </main>
);

export default About;
