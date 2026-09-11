'use client';

import React from 'react';
import { Shield, Lock, EyeOff, Server, FileCode, CheckCircle2, UserCheck, KeyRound } from 'lucide-react';

export default function SecurityTrustSection() {
  const securityItems = [
    {
      icon: Shield,
      title: "Hardened SSRF Defense Engine",
      desc: "Blocks loopbacks (127.0.0.1, ::1), private subnets (10.0.0.0/8, 192.168.0.0/16, 172.16.0.0/12), and cloud metadata endpoints (169.254.169.254) with DNS rebinding guards."
    },
    {
      icon: EyeOff,
      title: "Zero-Exposition Credential Vault",
      desc: "API keys and synthetic login credentials are encrypted with AES-256-GCM. Frontend UI only ever sees masked tokens (••••••••82KQ)."
    },
    {
      icon: Lock,
      title: "Multi-Tenant Cryptographic Isolation",
      desc: "Strict tenant isolation enforced at the PostgreSQL database schema level. Cross-tenant telemetry access is mathematically impossible."
    },
    {
      icon: UserCheck,
      title: "Role-Based Access Control (RBAC)",
      desc: "Granular permissions for Owner, Admin, Engineer, and Viewer roles with SSO/SAML and TOTP 2FA enforcement."
    },
    {
      icon: FileCode,
      title: "Tamper-Evident Audit Logging",
      desc: "Immutable recording of logins, monitor configurations, credential rotations, and alert rule modifications."
    },
    {
      icon: KeyRound,
      title: "Zero Secret Ingestion to AI",
      desc: "Bumblebee AI Analyst receives sanitized telemetry only. Passwords, auth tokens, and sensitive headers are strictly stripped before AI analysis."
    }
  ];

  return (
    <div id="security" className="py-20 border-b border-obsidian-800 bg-obsidian-950/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase text-emerald-400 font-bold tracking-widest px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
            Enterprise Security Core
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 tracking-tight">
            Security Is Not an Add-On. It's Our Primary Architecture.
          </h2>
          <p className="text-gray-400 text-base sm:text-lg mt-3">
            Designed from day one to protect enterprise infrastructure, API secrets, and sensitive customer environments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityItems.map((sec) => {
            const Icon = sec.icon;
            return (
              <div 
                key={sec.title}
                className="p-6 rounded-2xl bg-obsidian-900/90 border border-obsidian-800 hover:border-emerald-500/40 transition-all hover:bg-obsidian-850"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mt-4">
                  {sec.title}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm mt-2 leading-relaxed">
                  {sec.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
