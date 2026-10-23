
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const { register: registerAccount } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState('');

  const onSubmit = async (data: FormData) => {
    setRegisterError('');

    try {
      // Create the account through the Spring Boot backend.
      await registerAccount(data.name, data.email, data.password);

      showToast('Account created successfully.');
      navigate('/', { replace: true });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          setRegisterError('This email is already registered. Please sign in.');
        } else if (error.response?.status === 400) {
          const responseData = error.response.data as {
            message?: string;
            detail?: string;
          };

          setRegisterError(
            responseData.message ??
              responseData.detail ??
              'Please check your details. Password must be at least 6 characters.'
          );
        } else if (!error.response) {
          setRegisterError(
            'Cannot connect to the server. Check that your backend is running.'
          );
        } else {
          setRegisterError(
            'Registration failed. Please try again.'
          );
        }
      } else {
        setRegisterError('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card wide">
        <div className="auth-logo">
          <span className="brand-mark">S</span>
          <strong>ShopSphere</strong>
        </div>

        <span className="eyebrow">Join the sphere</span>
        <h1>Create your account</h1>
        <p>Create an account to start shopping with ShopSphere.</p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="form-stack"
        >
          <label>
            Full name
            <input
              {...register('name', {
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Name must contain at least 2 characters',
                },
              })}
              placeholder="Your name"
              autoComplete="name"
            />
            {errors.name && (
              <small className="field-error">
                {errors.name.message}
              </small>
            )}
          </label>

          <label>
            Email
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email address',
                },
              })}
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
            />
            {errors.email && (
              <small className="field-error">
                {errors.email.message}
              </small>
            )}
          </label>

          <div className="form-two">
            <label>
              Password
              <input
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Use at least 6 characters',
                  },
                })}
                type="password"
                autoComplete="new-password"
              />
              {errors.password && (
                <small className="field-error">
                  {errors.password.message}
                </small>
              )}
            </label>

            <label>
              Confirm password
              <input
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) =>
                    value === watch('password') ||
                    'Passwords do not match',
                })}
                type="password"
                autoComplete="new-password"
              />
              {errors.confirmPassword && (
                <small className="field-error">
                  {errors.confirmPassword.message}
                </small>
              )}
            </label>
          </div>

          {registerError && (
            <p className="field-error" role="alert">
              {registerError}
            </p>
          )}

          <button
            className="button button-dark full-width"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}