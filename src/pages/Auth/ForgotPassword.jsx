import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Logo / Brand */}
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-accent shadow-md">
            <svg
              className="h-7 w-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M12 14l9-5-9-5-9 5 9 5z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
              />
            </svg>
          </div>
          <h1 className="mt-4 text-3xl font-extrabold text-text">
            Reset your password
          </h1>
          <p className="mt-2 text-sm text-text-secondary">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

        {/* Form Card */}
        <Card className="border border-border bg-surface">
          <div className="space-y-6">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />

            <Button
              variant="brand"
              size="lg"
              className="w-full font-semibold rounded-xl hover:bg-orange-600 active:translate-y-0 active:shadow-md transition-all duration-200"
            >
              Send Reset Link
            </Button>
          </div>

          <div className="mt-6 text-center text-sm text-text-secondary">
            Remember your password?{' '}
            <a
              href="/login"
              className="font-medium text-accent hover:text-orange-600 transition-colors"
            >
              Sign in
            </a>
          </div>
        </Card>

        <p className="text-center text-xs text-text-secondary">
          You will receive an email with instructions to reset your password.
        </p>
      </div>
    </main>
  );
};

export default ForgotPassword;
