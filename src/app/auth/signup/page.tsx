'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Card, Col, Container, Button, Form, Row } from 'react-bootstrap';
import { createUser } from '@/lib/dbActions';
import './page.css';

type SignUpForm = {
  email: string;
  password: string;
  confirmPassword: string;
  role: string; // User role
};
/**This is the sign up page */
const SignUp = () => {
  const [signupSubmitted, setSignupSubmitted] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), ''], 'Confirm Password does not match'),
    role: Yup.string().required('Role is required'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: yupResolver(validationSchema),
  });

  const handleSignup = (data: SignUpForm) => {
    console.log('Signup request sent:', data);
    setSignupSubmitted(true);
  };

  return (
    <div className="background">
      <div className="sign-up-container">
        <div className="left-section">
          <h1>Sign Up</h1>
        </div>

        <div className="right-section">
          <div className="form">
            <form onSubmit={handleSubmit(handleSignup)}>
              <div className="input-group">
                <label>Email</label>
                <input type="text" {...register('email')} className={errors.email ? 'is-invalid' : ''} />
                <div className="error-message">{errors.email?.message}</div>
              </div>

              <div className="input-group">
                <label>Password</label>
                <input type="password" {...register('password')} className={errors.password ? 'is-invalid' : ''} />
                <div className="error-message">{errors.password?.message}</div>
              </div>

              <div className="input-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  {...register('confirmPassword')}
                  className={errors.confirmPassword ? 'is-invalid' : ''}
                />
                <div className="error-message">{errors.confirmPassword?.message}</div>
              </div>

              <div className="input-group">
                <select {...register('role')} className={errors.role ? 'is-invalid' : ''}>
                  <option value="">Select Role</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                <div className="error-message">{errors.role?.message}</div>
              </div>

              <button type="submit">Register</button>
            </form>

            {signupSubmitted && (
              <p className="success-message">
                Signup request submitted! Your account is pending admin approval.
              </p>
            )}

            <div className="signup-link">
              Already have an account?
              <a href="/auth/signin"> Sign in</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;