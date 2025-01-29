'use client';

import { signIn } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

/** The sign in page. */
const SignIn = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;
    const result = await signIn('credentials', {
      callbackUrl: '/list',
      email,
      password,
    });

    if (result?.error) {
      console.error('Sign in failed: ', result.error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#fff', // White background
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: '#d9eaf4', // Light sky blue
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          width: '700px', // Same width as the Sign Up box
        }}
      >
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Sign In</h1>
        <form method="post" onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
            <input
              name="email"
              type="text"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
            <input
              name="password"
              type="password"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              padding: '10px',
              border: 'none',
              borderRadius: '5px',
              width: '100%',
              cursor: 'pointer',
            }}
          >
            Sign In
          </button>
        </form>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          Don&apos;t have an account?{' '}
          <a href="/auth/signup" style={{ color: '#007bff', textDecoration: 'none' }}>
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;