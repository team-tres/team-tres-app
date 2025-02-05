'use client';

import { signIn } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import './page.css';

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
    <div className="background">
      <div className="sign-in-container">
        <div className="left-section">
          <h1>Sign In</h1>
        </div>

        <div className="right-section">
          <div className="form">
            <form method="post" onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Email</label>
                <input name="email" type="text" />
              </div>

              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" />
              </div>

              <button type="submit">Sign In</button>
            </form>

            <div className="signup-link">
              Don&apos;t have an account?
              <a href="/auth/signup"> Sign up</a>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default SignIn;
