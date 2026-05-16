import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorAdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('demo@medicare.local');
  const [password, setPassword] = useState('demo123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:4000/api/doctors/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(payload?.message || 'Login failed');
      }

      if (payload?.token) {
        localStorage.setItem('doctorToken', payload.token);
      }
      if (payload?.data) {
        localStorage.setItem('doctorProfile', JSON.stringify(payload.data));
      }

      navigate('/');
    } catch (err) {
      setError(err?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-950 via-emerald-900 to-emerald-700 px-4 py-10 text-white">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-3xl border border-white/10 bg-white/8 p-8 shadow-2xl backdrop-blur">
          <p className="text-xs uppercase tracking-[0.35em] text-emerald-200">Doctor admin access</p>
          <h1 className="mt-4 text-4xl font-semibold">Sign in to manage hospital operations.</h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-emerald-100">
            This login uses the backend doctor auth endpoint. In local development it accepts the demo
            credentials shown on the form when MongoDB is unavailable.
          </p>
          <div className="mt-8 rounded-2xl border border-white/10 bg-black/15 p-5 text-sm text-emerald-50">
            <div className="font-medium text-white">Demo credentials</div>
            <div className="mt-2">Email: demo@medicare.local</div>
            <div>Password: demo123</div>
          </div>
        </section>

        <section className="rounded-3xl bg-white p-8 text-emerald-950 shadow-2xl">
          <h2 className="text-2xl font-semibold">Login</h2>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="mt-2 w-full rounded-2xl border border-emerald-200 px-4 py-3 outline-none focus:border-emerald-500"
                placeholder="demo@medicare.local"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="mt-2 w-full rounded-2xl border border-emerald-200 px-4 py-3 outline-none focus:border-emerald-500"
                placeholder="demo123"
              />
            </div>

            {error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default DoctorAdminLogin;