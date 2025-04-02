'use client';

import { useState } from 'react';
import { Col, Form, Button } from 'react-bootstrap';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <main className="contact-container">
      <Col className="contact-content">
        <h1>Contact Us</h1>
        <h3>We look forward to hearing from you.</h3>
        <p>
          For a candid and confidential conversation, please reach out to us at your convenience,
          per the contact details listed below. Alternatively, you can complete the contact form,
          and a member of our team will get back to you in a timely fashion.
        </p>
        <p>(808) 536-0066</p>
        <p>ContactUs@spirehi.com</p>
        <h4>Headquarters</h4>
        <p>
          700 Bishop Street, Suite 2001
          <br />
          Honolulu, Hawai‘i 96813
        </p>
        <h4>New York Office</h4>
        <p>
          Port 100, 350 East Avenue
          <br />
          Rochester, New York 14604
        </p>
        <Form onSubmit={handleSubmit} className="contact-form">
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="email" className="mt-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="subject" className="mt-3">
            <Form.Label>Subject</Form.Label>
            <Form.Control type="text" name="subject" value={formData.subject} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="message" className="mt-3">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="dark" type="submit" className="mt-3">
            Submit
          </Button>
        </Form>
      </Col>
    </main>
  );
};

export default ContactUs;
