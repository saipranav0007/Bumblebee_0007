'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Mail, User, Building, Phone, ArrowRight, CheckCircle2, XCircle, ShieldCheck } from 'lucide-react';
import { playClickSound } from '../../../lib/sound';

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: 'Alex Mercer',
    email: 'alex.mercer@enterprise.io',
    organization: 'Acme Cloud Technologies',
    phone: '+1 (555) 234-5678',
    password: '',
    confirmPassword: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  // Password Validation Rules
  const password = formData.password;
  const hasMinLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const passwordsMatch = password.length > 0 && password === formData.confirmPassword;
  const isPasswordValid = hasMinLength && hasUpper && hasLower && hasNumber && hasSpecial && passwordsMatch;

  const handleSubmit = (e) => {
    e.preventDefault();
    playClickSound();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push(`/auth/verify?email=${encodeURIComponent(formData.email)}`);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-obsidian-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-honeycomb-pattern relative">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-bee-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        <Link href="/" className="inline-flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-bee-400 to-bee-600 flex items-center justify-center text-xl shadow-glow-amber group-hover:scale-105 transition-transform">
            🐝
          </div>
          <span className="text-2xl font-black tracking-tight text-white font-mono">
            BUMBLEBEE
          </span>
        </Link>
        <h2 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Create Your Monitoring Workspace
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-gray-400 font-mono">
          "Know before your users do."
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-obsidian-900 border border-obsidian-700/80 py-8 px-6 sm:px-10 rounded-2xl shadow-2xl backdrop-blur-xl text-white">
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-300 font-mono uppercase">
                Full Name <span className="text-red-400">*</span>
              </label>
              <div className="mt-1 relative rounded-xl">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <User className="h-4 w-4 text-bee-400" />
                </div>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-obsidian-950 border border-obsidian-700 rounded-xl pl-10 pr-3 py-2 text-sm text-white focus:outline-none focus:border-bee-500 transition-colors font-mono"
                  placeholder="Jane Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 font-mono uppercase">
                Work Email <span className="text-red-400">*</span>
              </label>
              <div className="mt-1 relative rounded-xl">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Mail className="h-4 w-4 text-bee-400" />
                </div>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-obsidian-950 border border-obsidian-700 rounded-xl pl-10 pr-3 py-2 text-sm text-white focus:outline-none focus:border-bee-500 transition-colors font-mono"
                  placeholder="jane@company.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-300 font-mono uppercase">
                  Organization <span className="text-gray-500">(Optional)</span>
                </label>
                <div className="mt-1 relative rounded-xl">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                    <Building className="h-3.5 w-3.5 text-bee-400" />
                  </div>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full bg-obsidian-950 border border-obsidian-700 rounded-xl pl-9 pr-2 py-2 text-xs text-white focus:outline-none focus:border-bee-500 font-mono"
                    placeholder="Acme Inc."
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 font-mono uppercase">
                  Phone (WhatsApp Alert)
                </label>
                <div className="mt-1 relative rounded-xl">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                    <Phone className="h-3.5 w-3.5 text-bee-400" />
                  </div>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-obsidian-950 border border-obsidian-700 rounded-xl pl-9 pr-2 py-2 text-xs text-white focus:outline-none focus:border-bee-500 font-mono"
                    placeholder="+1 555 0192"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 font-mono uppercase">
                Password <span className="text-red-400">*</span>
              </label>
              <div className="mt-1 relative rounded-xl">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Lock className="h-4 w-4 text-bee-400" />
                </div>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-obsidian-950 border border-obsidian-700 rounded-xl pl-10 pr-3 py-2 text-sm text-white focus:outline-none focus:border-bee-500 font-mono"
                  placeholder="Min 8 chars, 1 upper, 1 special"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 font-mono uppercase">
                Confirm Password <span className="text-red-400">*</span>
              </label>
              <div className="mt-1 relative rounded-xl">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Lock className="h-4 w-4 text-bee-400" />
                </div>
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full bg-obsidian-950 border border-obsidian-700 rounded-xl pl-10 pr-3 py-2 text-sm text-white focus:outline-none focus:border-bee-500 font-mono"
                  placeholder="Re-enter password"
                />
              </div>
            </div>

            {/* Password Requirements Checklist */}
            <div className="p-3 bg-obsidian-950 rounded-xl border border-obsidian-800 text-[11px] font-mono space-y-1">
              <span className="text-gray-400 font-bold block mb-1">PASSWORD REQUIREMENTS:</span>
              <div className="grid grid-cols-2 gap-1">
                <span className={`flex items-center gap-1.5 ${hasMinLength ? 'text-emerald-400' : 'text-gray-500'}`}>
                  {hasMinLength ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />} 8+ Characters
                </span>
                <span className={`flex items-center gap-1.5 ${hasUpper ? 'text-emerald-400' : 'text-gray-500'}`}>
                  {hasUpper ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />} Uppercase (A-Z)
                </span>
                <span className={`flex items-center gap-1.5 ${hasLower ? 'text-emerald-400' : 'text-gray-500'}`}>
                  {hasLower ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />} Lowercase (a-z)
                </span>
                <span className={`flex items-center gap-1.5 ${hasNumber ? 'text-emerald-400' : 'text-gray-500'}`}>
                  {hasNumber ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />} Number (0-9)
                </span>
                <span className={`flex items-center gap-1.5 ${hasSpecial ? 'text-emerald-400' : 'text-gray-500'}`}>
                  {hasSpecial ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />} Special Symbol
                </span>
                <span className={`flex items-center gap-1.5 ${passwordsMatch ? 'text-emerald-400' : 'text-gray-500'}`}>
                  {passwordsMatch ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />} Passwords Match
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !isPasswordValid}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-bee-400 to-bee-500 hover:from-bee-300 hover:to-bee-400 disabled:opacity-50 text-black font-black text-sm py-3 rounded-xl shadow-glow-amber transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? 'Creating Workspace...' : 'Create Account & Verify'} <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-gray-400">
            Already have an account?{' '}
            <Link href="/auth/signin" className="text-bee-400 hover:text-bee-300 font-bold ml-1">
              Sign In
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
