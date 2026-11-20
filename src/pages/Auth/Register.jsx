import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/useAuth';
import { post } from '../../utils/api';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!terms) {
      setError('You must agree to the Terms & Conditions.');
      return;
    }
    setLoading(true);
    try {
      await post('/auth/register', { fullName, email, password });
      const loginData = await post('/auth/login', { email, password });
      auth.login(loginData.user, loginData.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-accent shadow-md">
            <svg
              className="h-7 w-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
          </div>
          <h1 className="mt-4 text-3xl font-extrabold text-text">Create your SkillBridge account</h1>
          <p className="mt-2 text-sm text-text-secondary">Join a community of learners and mentors building real skills</p>
        </div>

        <Card className="border border-border bg-surface">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>
            )}
            <div className="space-y-4">
              <Input
                label="Full Name"
                type="text"
                placeholder="Jane Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                autoComplete="name"
                required
              />
              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
              <Input
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
            </div>

            <label className="flex items-start gap-2 cursor-pointer">
              <input
                id="terms"
                type="checkbox"
                className="mt-0.5 h-4 w-4 rounded border-border text-accent focus:ring-accent"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
              />
              <span className="text-sm text-text-secondary">
                I agree to the{' '}
                <Link to="/terms" className="font-medium text-accent hover:text-orange-600 transition-colors">
                  Terms &amp; Conditions
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="font-medium text-accent hover:text-orange-600 transition-colors">
                  Privacy Policy
                </Link>
              </span>
            </label>

            <Button
              type="submit"
              variant="brand"
              size="lg"
              className="w-full font-semibold rounded-xl hover:bg-orange-600 transition-all duration-200"
              disabled={loading}
            >
              {loading ? 'Creating account…' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-text-secondary">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-accent hover:text-orange-600 transition-colors">
              Sign in
            </Link>
          </div>
        </Card>

        <p className="text-center text-xs text-text-secondary">
          By creating an account, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </main>
  );
};

export default Register;
