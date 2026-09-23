import React, { FormEvent, useEffect, useState } from 'react';
import { ArrowRightIcon, LockKeyholeIcon, MailIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../admin/AdminAuthContext';

export function AdminLogin() {
  const navigate = useNavigate();
  const { admin, loading, login } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && admin) navigate('/admin/dashboard', { replace: true });
  }, [admin, loading, navigate]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await login(email, password);
      navigate('/admin/dashboard', { replace: true });
    } catch {
      setError('Invalid email or password');
    } finally {
      setSubmitting(false);
    }
  };

  return <main className="flex min-h-screen items-center justify-center bg-[#111111] px-5 py-12 text-[#151515] sm:px-8">
    <section className="w-full max-w-md border border-[#c9a227]/30 bg-[#f2efe8] p-7 shadow-[0_24px_70px_rgba(0,0,0,0.28)] sm:p-10">
      <div className="mb-9 border-b border-[#c9a227]/25 pb-7">
        <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-[#a98232]">Chauhan Realtors</p>
        <h1 className="mt-4 font-display text-3xl font-medium tracking-[-0.02em] text-[#151515]">Admin Panel</h1>
        <p className="mt-3 text-sm leading-relaxed text-[#625d53]">Sign in to manage the private website workspace.</p>
      </div>

      <form className="space-y-5" onSubmit={submit}>
        <label className="block">
          <span className="mb-2 block text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[#625d53]">Email</span>
          <span className="flex items-center gap-3 border border-[#b48c32]/35 bg-[#f8f6f1] px-3.5 focus-within:border-[#c9a227]">
            <MailIcon className="h-4 w-4 shrink-0 text-[#a98232]" aria-hidden="true" />
            <input className="h-12 min-w-0 flex-1 bg-transparent text-sm outline-none" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </span>
        </label>
        <label className="block">
          <span className="mb-2 block text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[#625d53]">Password</span>
          <span className="flex items-center gap-3 border border-[#b48c32]/35 bg-[#f8f6f1] px-3.5 focus-within:border-[#c9a227]">
            <LockKeyholeIcon className="h-4 w-4 shrink-0 text-[#a98232]" aria-hidden="true" />
            <input className="h-12 min-w-0 flex-1 bg-transparent text-sm outline-none" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          </span>
        </label>
        {error ? <p role="alert" className="border border-red-900/20 bg-red-50 px-3 py-2.5 text-sm text-red-800">{error}</p> : null}
        <button type="submit" disabled={submitting} className="inline-flex h-12 w-full items-center justify-center gap-2 bg-[#c9a227] px-5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#111111] transition-colors hover:bg-[#d8b968] disabled:cursor-wait disabled:opacity-70">
          {submitting ? 'Loading...' : 'Login'}
          {!submitting ? <ArrowRightIcon className="h-4 w-4" aria-hidden="true" /> : null}
        </button>
      </form>
    </section>
  </main>;
}
