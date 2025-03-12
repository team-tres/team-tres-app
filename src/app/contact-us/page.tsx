import { Container, Row, Col, Card } from 'react-bootstrap';

const ContactUs = () => (
  <Container className="py-5">
    <Row className="justify-content-center">
      <Col md={8}>
        <Card>
          <Card.Body>
            <h2 className="text-center">Contact Us</h2>
            <p className="text-center">
              We look forward to hearing from you.
            </p>
            <p className="text-center">
              For a candid and confidential conversation, please reach out to us at your
              convenience, per the contact details listed below. Alternatively, you can
              complete the contact form, and a member of our team will get back to you in a timely fashion.
            </p>

            <h4>Phone</h4>
            <p>
              <a href="tel:+18085360066">(808) 536-0066</a>
            </p>

            <h4>Email</h4>
            <p>
              <a href="mailto:ContactUs@spirehi.com">ContactUs@spirehi.com</a>
            </p>

            <h4>Headquarters</h4>
            <p>700 Bishop Street, Suite 2001</p>
            <p>Honolulu, Hawai‘i 96813</p>

            <h4>New York Office</h4>
            <p>Port 100, 350 East Avenue</p>
            <p>Rochester, New York 14604</p>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default ContactUs;
