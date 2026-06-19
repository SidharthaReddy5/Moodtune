import { useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await API.post('/auth/signup', { username, email, password });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.detail || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-dark-secondary rounded-2xl p-8 border border-white/5 text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-semibold text-white mb-2">Account created!</h2>
          <p className="text-gray-400 mb-6">You can now log in with your credentials.</p>
          <Link
            to="/login"
            className="inline-block px-6 py-3 bg-accent hover:bg-accent/80 text-white font-semibold rounded-xl transition-colors"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">🎵 MoodTune</h1>
          <p className="text-gray-400">Join the mood-music revolution</p>
        </div>

        <div className="bg-dark-secondary rounded-2xl p-8 border border-white/5 shadow-2xl">
          <h2 className="text-2xl font-semibold text-white mb-6">Create account</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 bg-dark-bg border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-accent transition-colors"
                placeholder="yourname"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-dark-bg border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-accent transition-colors"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 bg-dark-bg border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-accent transition-colors"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-accent hover:bg-accent/80 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-accent hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
