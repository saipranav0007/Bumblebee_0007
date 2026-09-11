'use client';

import React, { useState, useEffect } from 'react';
import { useBumblebee, getInitials } from '../../../lib/store';
import { playClickSound, playRecoverySound } from '../../../lib/sound';
import { 
  Users, 
  UserPlus, 
  ShieldCheck, 
  Mail, 
  Phone, 
  CheckCircle2, 
  Trash2, 
  KeyRound, 
  MoreVertical,
  Crown
} from 'lucide-react';

export default function TeamPage() {
  const { teamMembers, currentUser } = useBumblebee();
  const [members, setMembers] = useState([]);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('ENGINEER');

  useEffect(() => {
    const ownerMember = {
      id: currentUser?.id || 'usr-owner',
      name: currentUser?.name || 'Workspace Owner',
      email: currentUser?.email || 'owner@domain.com',
      role: currentUser?.role || 'OWNER',
      status: 'ACTIVE',
      assignedServices: ['ALL'],
      avatar: currentUser?.avatar || getInitials(currentUser?.name),
      phone: currentUser?.phone || '+1 (555) 019-2834'
    };

    // Filter out mock owner from teamMembers if present
    const otherMembers = teamMembers.filter(m => m.id !== 'usr-1' && m.email !== currentUser?.email);
    setMembers([ownerMember, ...otherMembers]);
  }, [currentUser, teamMembers]);

  const handleInvite = (e) => {
    e.preventDefault();
    playClickSound();
    const newMember = {
      id: `usr-${Date.now()}`,
      name: inviteName,
      email: inviteEmail,
      role: inviteRole,
      status: 'INVITED',
      assignedServices: ['ALL'],
      avatar: getInitials(inviteName),
      phone: '+1 (555) 000-0000'
    };
    setMembers([newMember, ...members]);
    playRecoverySound();
    setIsInviteModalOpen(false);
    setInviteName('');
    setInviteEmail('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight flex items-center gap-2 font-mono">
              <span>Team & RBAC Permissions</span>
              <span className="p-1 rounded-lg bg-bee-500/20 text-bee-500 border border-bee-500/30 text-xs">
                <Users className="w-4 h-4" />
              </span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1 font-mono">
            Enforce granular tenant isolation and role permissions across Owner, Admin, Engineer, and Viewer accounts.
          </p>
        </div>

        <button
          onClick={() => { playClickSound(); setIsInviteModalOpen(true); }}
          className="flex items-center gap-1.5 bg-bee-500 hover:bg-bee-400 text-black font-bold text-xs px-4 py-2 rounded-xl shadow-glow-amber transition-all hover:scale-105 cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          <span>Invite Member</span>
        </button>
      </div>

      {/* Team Members List */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-xl overflow-hidden">
        <div className="p-4 border-b border-[var(--border-subtle)] flex items-center justify-between">
          <h3 className="text-sm font-bold text-[var(--text-primary)] font-mono uppercase tracking-wider">
            Workspace Members ({members.length})
          </h3>
          <span className="text-xs text-[var(--text-muted)] font-mono flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            2FA Hardware Token Enforcement: ACTIVE
          </span>
        </div>

        <div className="divide-y divide-[var(--border-subtle)]">
          {members.map((member, index) => (
            <div key={member.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[var(--bg-surface)] transition-colors">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-bee-500/20 text-bee-500 border border-bee-500/30 font-bold text-sm flex items-center justify-center font-mono shrink-0">
                  {member.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-[var(--text-primary)]">{member.name}</h4>
                    {index === 0 && (
                      <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-bee-500/20 text-bee-400 border border-bee-500/30 font-bold flex items-center gap-1">
                        <Crown className="w-3 h-3 text-bee-400" /> ACTIVE USER
                      </span>
                    )}
                    <span className={`text-[10px] font-mono px-2 py-0.2 rounded border ${
                      member.role === 'OWNER' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' :
                      member.role === 'DOMAIN ADMIN' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                      member.role === 'ADMIN' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                      member.role === 'ENGINEER' ? 'bg-bee-500/20 text-bee-400 border-bee-500/30' :
                      'bg-gray-800 text-gray-400 border-gray-700'
                    }`}>
                      {member.role}
                    </span>
                  </div>
                  <div className="text-xs text-[var(--text-muted)] font-mono mt-0.5 flex items-center gap-3">
                    <span>{member.email}</span>
                    <span>•</span>
                    <span>{member.phone}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${
                  member.status === 'ACTIVE' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                }`}>
                  {member.status}
                </span>

                <select
                  value={member.role}
                  onChange={(e) => {
                    const newRole = e.target.value;
                    setMembers(members.map(m => m.id === member.id ? { ...m, role: newRole } : m));
                  }}
                  className="bg-[var(--bg-surface)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] rounded-lg px-2.5 py-1 font-mono focus:outline-none focus:border-bee-500"
                >
                  <option value="OWNER">Owner</option>
                  <option value="DOMAIN ADMIN">Domain Admin</option>
                  <option value="ADMIN">Admin</option>
                  <option value="ENGINEER">Engineer</option>
                  <option value="VIEWER">Viewer</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invite Member Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-6 rounded-2xl max-w-md w-full text-[var(--text-primary)] shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-[var(--text-primary)] font-mono uppercase">
              Invite Team Member
            </h3>

            <form onSubmit={handleInvite} className="space-y-3">
              <div>
                <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  placeholder="e.g. David Zhao"
                  className="w-full bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none focus:border-bee-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">Work Email</label>
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="david@company.com"
                  className="w-full bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none focus:border-bee-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">Role & Permissions</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none focus:border-bee-500 font-mono"
                >
                  <option value="ADMIN">Admin (Full Monitor & Secret Control)</option>
                  <option value="ENGINEER">Engineer (Triage Incidents & Run Checks)</option>
                  <option value="VIEWER">Viewer (Read-Only Dashboards)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsInviteModalOpen(false)}
                  className="px-3.5 py-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-bee-500 hover:bg-bee-400 text-black font-bold text-xs px-4 py-2 rounded-xl shadow-glow-amber cursor-pointer"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
