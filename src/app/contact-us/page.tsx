import { Col, Row } from 'react-bootstrap';
import './page.css';

const ContactUs = () => (
  <main className="container py-5">
    <Row>
      <Col md={12}>
        <h2 className="header-font mb-4">Get In Touch with Us</h2>
        <p className="text-font mb-4">
          We’d love to hear from you! Whether you have questions about our services, need assistance,
          or want to provide feedback, feel free to reach out.
        </p>
      </Col>
    </Row>

    <Row className="mb-5">
      <Col md={12}>
        <h3 className="section-title mb-4">About Our Mission</h3>
        <p className="text-font">
          At
          {' '}
          <strong>FISC NAV</strong>
          , we are dedicated to providing organizations with the tools they need
          to navigate financial decision-making with confidence. The Fiscal Sustainability Model (FSM) was
          developed to help businesses, nonprofits, and government entities forecast financial trends, assess risk,
          and plan strategically for the future.
        </p>
      </Col>
    </Row>

    <Row className="mb-5">
      <Col md={12}>
        <h3 className="section-title mb-3">Why Were We Created?</h3>
        <p className="text-font">
          We were created to simplify data management by providing a seamless, web-based platform.
          Our solution addresses the inefficiencies of manual data entry and analysis,
          offering a user-friendly input interface, robust stress testing, and an intuitive dashboard for forecasting.
        </p>
      </Col>
    </Row>

    <Row className="mb-5">
      <Col md={12}>
        <h3 className="section-title">Contact Us Today</h3>
        <p className="text-font">
          Ready to learn more about how FSM can help your organization? Reach out to us, and let’s start
          a conversation about how we can work together toward a more sustainable financial future.
        </p>
        <p className="text-font">
          <strong>Email:</strong>
          {' '}
          contact@fiscnav.com
          <br />
          <strong>Support Email:</strong>
          {' '}
          support@fiscnav.com
          <br />
          <strong>Phone:</strong>
          {' '}
          (123) 456-7890
          <br />
          <strong>Office Line:</strong>
          {' '}
          (987) 654-3210
        </p>
      </Col>
    </Row>
  </main>
);

export default ContactUs;
