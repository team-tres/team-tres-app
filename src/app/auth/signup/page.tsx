'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

type SignUpForm = {
  email: string;
  password: string;
  confirmPassword: string;
  role: string; // User role
};

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
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div
        style={{
          backgroundColor: '#d9eaf4', // Light sky blue
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          width: '750px', // Increased width
        }}
      >
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Sign Up</h1>
        <form onSubmit={handleSubmit(handleSignup)}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
            <input
              type="text"
              {...register('email')}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
              }}
              className={errors.email ? 'is-invalid' : ''}
            />
            <div style={{ color: 'red', fontSize: '12px' }}>{errors.email?.message}</div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
            <input
              type="password"
              {...register('password')}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
              }}
              className={errors.password ? 'is-invalid' : ''}
            />
            <div style={{ color: 'red', fontSize: '12px' }}>{errors.password?.message}</div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Confirm Password</label>
            <input
              type="password"
              {...register('confirmPassword')}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
              }}
              className={errors.confirmPassword ? 'is-invalid' : ''}
            />
            <div style={{ color: 'red', fontSize: '12px' }}>{errors.confirmPassword?.message}</div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Role</label>
            <select
              {...register('role')}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
              }}
              className={errors.role ? 'is-invalid' : ''}
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <div style={{ color: 'red', fontSize: '12px' }}>{errors.role?.message}</div>
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
            Register
          </button>
        </form>
        {signupSubmitted && (
          <p style={{ marginTop: '15px', textAlign: 'center', color: 'green' }}>
            Signup request submitted! Your account is pending admin approval.
          </p>
        )}
      </div>
    </div>
  );
};

export default SignUp;
