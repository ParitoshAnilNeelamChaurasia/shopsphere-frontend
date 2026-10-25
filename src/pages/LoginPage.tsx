
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

interface FormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: { email: 'demo@shopsphere.com' },
  });

  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [loginError, setLoginError] = useState('');

  const onSubmit = async (data: FormData) => {
    setLoginError('');

    try {
      // Send the actual email and password to the Spring Boot backend.
      await login(data.email, data.password);

      showToast('Welcome back to ShopSphere.');

      const from = (location.state as { from?: string } | null)?.from;
      const destination =
        from ??
        (data.email.toLowerCase() === 'admin@shopsphere.com'
          ? '/admin'
          : '/');

      navigate(destination, { replace: true });
    } catch (error) {
      // Do not create a session when the backend rejects the credentials.
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setLoginError('Invalid email or password. Please try again.');
        } else if (error.response?.status === 400) {
          setLoginError('Please check your email and password.');
        } else if (!error.response) {
          setLoginError(
            'Cannot connect to the server. Check that your backend is running.'
          );
        } else {
          setLoginError('Login failed. Please try again.');
        }
      } else {
        setLoginError('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <span className="brand-mark">S</span>
          <strong>ShopSphere</strong>
        </div>

        <span className="eyebrow">Welcome back</span>
        <h1>Sign in</h1>
        <p>Sign in with the account you registered with ShopSphere.</p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="form-stack"
        >
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

          <label>
            Password
            <input
              {...register('password', {
                required: 'Password is required',
              })}
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
            />
            {errors.password && (
              <small className="field-error">
                {errors.password.message}
              </small>
            )}
          </label>

          {loginError && (
            <p className="field-error" role="alert">
              {loginError}
            </p>
          )}

          <button
            className="button button-dark full-width"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="auth-footer">
          New here? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
}