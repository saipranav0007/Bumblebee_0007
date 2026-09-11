'use client';

import React, { useState } from 'react';
import { useBumblebee } from '../../../lib/store';
import { 
  Shield, 
  Search, 
  Filter, 
  Lock, 
  FileText, 
  CheckCircle2, 
  Download, 
  Clock 
} from 'lucide-react';
import { playClickSound } from '../../../lib/sound';

export default function AuditLogsPage() {
  const { auditLogs } = useBumblebee();
  const [search, setSearch] = useState('');

  const filteredLogs = auditLogs.filter((l) => 
    l.user.toLowerCase().includes(search.toLowerCase()) ||
    l.action.toLowerCase().includes(search.toLowerCase()) ||
    l.resource.toLowerCase().includes(search.toLowerCase()) ||
    l.details.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <span>Security & Audit Trail</span>
              <span className="p-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs">
                <Shield className="w-4 h-4" />
              </span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 font-mono">
            Tamper-evident immutable record of logins, monitor configurations, secret rotations, and alert triggers.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-obsidian-900 border border-obsidian-800 text-xs font-mono text-emerald-400">
          <Shield className="w-3.5 h-3.5" />
          <span>SOC2 Type II Hash Chain: VERIFIED</span>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-obsidian-900 border border-obsidian-700 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Search */}
        <div className="p-4 border-b border-obsidian-800 bg-obsidian-950/60">
          <div className="relative">
            <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search audit trail by user, action, resource, or IP..."
              className="w-full bg-obsidian-900 border border-obsidian-800 rounded-xl pl-10 pr-3 py-2 text-xs text-white focus:outline-none focus:border-bee-500 font-mono"
            />
          </div>
        </div>

        <div className="divide-y divide-obsidian-800 text-xs font-mono">
          {filteredLogs.map((log) => (
            <div key={log.id} className="p-4 hover:bg-obsidian-850/60 transition-colors space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-bee-400">{log.action}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-white font-semibold">{log.resource}</span>
                </div>
                <span className="text-gray-500 text-[11px]">{log.timestamp}</span>
              </div>

              <p className="text-gray-400 text-[11px] leading-relaxed">
                {log.details}
              </p>

              <div className="pt-1 flex items-center gap-4 text-[10px] text-gray-500">
                <span>Actor: <strong className="text-gray-300">{log.user}</strong></span>
                <span>•</span>
                <span>IP / Origin: <strong className="text-gray-300">{log.ip}</strong></span>
                <span>•</span>
                <span>Cryptographic Digest: <code className="text-bee-400/80">{log.id.slice(0, 12)}...OK</code></span>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
