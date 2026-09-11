'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  INITIAL_MONITORS, 
  INITIAL_INCIDENTS, 
  INITIAL_ACTIVITY_FEED, 
  INITIAL_NOTIFICATIONS_HISTORY,
  INITIAL_TEAM_MEMBERS,
  INITIAL_AUDIT_LOGS
} from './mock-data';
import { playBuzzAlert, playRecoverySound, playClickSound } from './sound';

export function getInitials(name) {
  if (!name || typeof name !== 'string') return 'BB';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export const DOMAIN_ADMIN_USER = {
  id: "usr-admin-domain",
  name: "Domain Administrator",
  email: "admin@bumblebee.io",
  role: "DOMAIN ADMIN",
  organization: "Bumblebee Global Cloud",
  avatar: "DA",
  twoFactor: true,
  isDomainAdmin: true
};

export const DOMAIN_ADMIN_ORG = {
  id: "org-bumblebee-domain",
  name: "Bumblebee Global Cloud",
  slug: "bumblebee-domain",
  plan: "Enterprise Pro (Root Domain)",
  slaTarget: 99.99,
  region: "Global Quorum"
};

export const DEFAULT_USER = DOMAIN_ADMIN_USER;
export const DEFAULT_ORG = DOMAIN_ADMIN_ORG;

const BumblebeeContext = createContext(null);

export function BumblebeeProvider({ children }) {
  // Theme state ('dark', 'light', 'worker')
  const [theme, setThemeState] = useState('dark');
  
  // Core Entities
  const [monitors, setMonitors] = useState(INITIAL_MONITORS);
  const [incidents, setIncidents] = useState(INITIAL_INCIDENTS);
  const [activityFeed, setActivityFeed] = useState(INITIAL_ACTIVITY_FEED);
  const [notificationsHistory, setNotificationsHistory] = useState(INITIAL_NOTIFICATIONS_HISTORY);
  const [teamMembers, setTeamMembers] = useState(INITIAL_TEAM_MEMBERS);
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS);
  
  // Real-time Engine State
  const [isLiveChecking, setIsLiveChecking] = useState(true);
  const [checksCountToday, setChecksCountToday] = useState(0);
  const [lastCheckTimestamp, setLastCheckTimestamp] = useState(new Date());
  
  // Buzz Alert Modal & Notification
  const [activeBuzzAlert, setActiveBuzzAlert] = useState(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  
  // Organization / Auth State (Hydrated from localStorage)
  const [currentOrg, setCurrentOrg] = useState(DEFAULT_ORG);
  const [currentUser, setCurrentUser] = useState(DEFAULT_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Load and apply session + theme on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Theme
      const savedTheme = localStorage.getItem('bumblebee-theme') || 'dark';
      setThemeState(savedTheme);
      applyThemeToDom(savedTheme);

      // Auth Session
      try {
        const savedUser = localStorage.getItem('bumblebee_session_user');
        const savedOrg = localStorage.getItem('bumblebee_session_org');
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          if (!parsedUser.avatar) {
            parsedUser.avatar = getInitials(parsedUser.name);
          }
          setCurrentUser(parsedUser);
          setIsAuthenticated(true);
        }
        if (savedOrg) {
          setCurrentOrg(JSON.parse(savedOrg));
        }
      } catch (err) {
        console.error('Error hydrating session:', err);
      }
    }
  }, []);

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('bumblebee-theme', newTheme);
      applyThemeToDom(newTheme);
    }
  };

  const applyThemeToDom = (t) => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    const body = document.body;
    root.setAttribute('data-theme', t);
    root.classList.remove('dark', 'light-mode', 'worker-mode');
    if (body) {
      body.setAttribute('data-theme', t);
      body.classList.remove('dark', 'light-mode', 'worker-mode');
    }
    
    if (t === 'dark') {
      root.classList.add('dark');
      if (body) body.classList.add('dark');
    } else if (t === 'light') {
      root.classList.add('light-mode');
      if (body) body.classList.add('light-mode');
    } else if (t === 'worker') {
      root.classList.add('worker-mode', 'dark');
      if (body) body.classList.add('worker-mode', 'dark');
    }
  };

  // Keyboard shortcut Ctrl+K / Cmd+K for Command Palette
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
        setActiveBuzzAlert(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Background Live Check Simulator (runs continuous real-time checks when monitors exist)
  useEffect(() => {
    if (!isLiveChecking) return;

    const interval = setInterval(() => {
      setLastCheckTimestamp(new Date());

      setMonitors((prevMonitors) => {
        if (prevMonitors.length === 0) return prevMonitors;

        const jitter = Math.floor(Math.random() * 25) - 12;
        return prevMonitors.map((mon) => {
          if (mon.status === 'PAUSED' || mon.status === 'DOWN') return mon;
          
          const newResp = Math.max(45, Math.min(850, (mon.responseTime || 200) + jitter));
          const newSparkline = [...(mon.sparkline || [200, 210, 220, 205, 215]).slice(1), newResp];

          return {
            ...mon,
            responseTime: newResp,
            sparkline: newSparkline,
            lastCheck: 'just now'
          };
        });
      });

      setChecksCountToday((prev) => prev + 1);

      // Only push random telemetry items if user actually has monitors configured
      setMonitors((current) => {
        if (current.length > 0 && Math.random() < 0.20) {
          const target = current[Math.floor(Math.random() * current.length)];
          if (target) {
            const nowTime = new Date().toLocaleTimeString('en-US', { hour12: false });
            setActivityFeed((prev) => [
              {
                id: `act-${Date.now()}`,
                timestamp: `${nowTime} IST`,
                monitorName: target.name,
                type: "HEALTH_CHECK_PASS",
                message: `TLS 1.3 handshake verified • ${target.responseTime || 180}ms probe passed`,
                region: "US-East (Virginia Edge)",
                status: "PASS"
              },
              ...prev.slice(0, 30)
            ]);
          }
        }
        return current;
      });

    }, 3500);

    return () => clearInterval(interval);
  }, [isLiveChecking]);

  // Trigger Buzz Alert (Sound + Critical modal)
  const triggerBuzzAlert = useCallback((customPayload) => {
    const alertPayload = customPayload || {
      id: `buzz-${Date.now()}`,
      title: "CRITICAL OUTAGE DETECTED",
      monitorName: monitors[0]?.name || "Production Gateway Service",
      message: "Socket hang-up received from Quorum Probes (4/4 regions unreachable). PagerDuty alert triggered.",
      severity: "CRITICAL",
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }) + " IST",
      recommendedAction: "Verify upstream BGP routes or failover DNS records immediately to secondary CDN.",
      autoAiDiagnosis: "Probable SSL Certificate Expiry or Reverse Proxy 502 Bad Gateway loop."
    };

    setActiveBuzzAlert(alertPayload);
    playBuzzAlert();

    const nowTime = new Date().toLocaleTimeString('en-US', { hour12: false });
    setAuditLogs((prev) => [
      {
        id: `aud-${Date.now()}`,
        timestamp: nowTime,
        user: currentUser?.name || "System Sentinel",
        action: "BUZZ_ALERT_DISPATCHED",
        resource: alertPayload.monitorName,
        ip: "10.0.0.1 (Quorum Engine)",
        details: `Critical alarm broadcasted to Web Push, WhatsApp, and PWA.`
      },
      ...prev
    ]);
  }, [monitors, currentUser]);

  // Auth: Login
  const loginUser = useCallback(({ email, password, isDomainAdmin = false }) => {
    let user;
    let org;

    if (isDomainAdmin || (email && (email.toLowerCase().includes('admin@') || email.toLowerCase() === 'admin'))) {
      user = DOMAIN_ADMIN_USER;
      org = DOMAIN_ADMIN_ORG;
    } else {
      // Check registered users in localStorage
      let registered = [];
      try {
        if (typeof window !== 'undefined') {
          registered = JSON.parse(localStorage.getItem('bumblebee_registered_users') || '[]');
        }
      } catch (e) {}

      const found = registered.find(u => u.email.toLowerCase() === (email || '').toLowerCase());
      if (found) {
        user = found;
        org = {
          id: `org-${found.id}`,
          name: found.organization || `${found.name}'s Workspace`,
          slug: (found.organization || found.name).toLowerCase().replace(/[^a-z0-9]/g, '-'),
          plan: "Enterprise Pro",
          slaTarget: 99.95,
          region: "Global Edge"
        };
      } else {
        // Auto initialize account for the entered email/name
        const cleanName = email ? email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : "Personal User";
        user = {
          id: `usr-${Date.now()}`,
          name: cleanName,
          email: email || "user@example.com",
          role: "OWNER",
          organization: `${cleanName}'s Workspace`,
          avatar: getInitials(cleanName),
          twoFactor: true,
          isDomainAdmin: false
        };
        org = {
          id: `org-${Date.now()}`,
          name: `${cleanName}'s Workspace`,
          slug: cleanName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
          plan: "Enterprise Pro",
          slaTarget: 99.95,
          region: "Global Edge"
        };
      }
    }

    setCurrentUser(user);
    setCurrentOrg(org);
    setIsAuthenticated(true);

    if (typeof window !== 'undefined') {
      localStorage.setItem('bumblebee_session_user', JSON.stringify(user));
      localStorage.setItem('bumblebee_session_org', JSON.stringify(org));
    }

    return { success: true, user, org };
  }, []);

  // Auth: Sign Up (Personal Account Creation)
  const signupUser = useCallback(({ name, email, organization, password, phone }) => {
    const cleanName = name?.trim() || 'Personal User';
    const cleanEmail = email?.trim() || 'user@example.com';
    const orgName = organization?.trim() || `${cleanName}'s Workspace`;
    const userAvatar = getInitials(cleanName);

    const newUser = {
      id: `usr-${Date.now()}`,
      name: cleanName,
      email: cleanEmail,
      role: "OWNER",
      organization: orgName,
      avatar: userAvatar,
      phone: phone || '+1 (555) 000-0000',
      twoFactor: true,
      isDomainAdmin: false
    };

    const newOrg = {
      id: `org-${Date.now()}`,
      name: orgName,
      slug: orgName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      plan: "Enterprise Pro",
      slaTarget: 99.95,
      region: "Global Edge"
    };

    if (typeof window !== 'undefined') {
      try {
        const existing = JSON.parse(localStorage.getItem('bumblebee_registered_users') || '[]');
        const updated = [newUser, ...existing.filter(u => u.email.toLowerCase() !== cleanEmail.toLowerCase())];
        localStorage.setItem('bumblebee_registered_users', JSON.stringify(updated));
        localStorage.setItem('bumblebee_session_user', JSON.stringify(newUser));
        localStorage.setItem('bumblebee_session_org', JSON.stringify(newOrg));
      } catch (e) {
        console.error('Error saving registered user', e);
      }
    }

    setCurrentUser(newUser);
    setCurrentOrg(newOrg);
    setIsAuthenticated(true);

    return { success: true, user: newUser, org: newOrg };
  }, []);

  // Auth: Logout
  const logoutUser = useCallback(() => {
    playClickSound();
    if (typeof window !== 'undefined') {
      localStorage.removeItem('bumblebee_session_user');
      localStorage.removeItem('bumblebee_session_org');
    }
    setCurrentUser(DEFAULT_USER);
    setCurrentOrg(DEFAULT_ORG);
    setIsAuthenticated(false);
  }, []);

  // Auth: Profile Updates
  const updateUserProfile = useCallback((updates) => {
    setCurrentUser((prev) => {
      const updated = { ...prev, ...updates };
      if (updates.name) {
        updated.avatar = getInitials(updates.name);
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('bumblebee_session_user', JSON.stringify(updated));
        try {
          const existing = JSON.parse(localStorage.getItem('bumblebee_registered_users') || '[]');
          const listUpdated = existing.map(u => u.email === updated.email ? updated : u);
          localStorage.setItem('bumblebee_registered_users', JSON.stringify(listUpdated));
        } catch (e) {}
      }
      return updated;
    });
  }, []);

  // Auth: Org Updates
  const updateOrgProfile = useCallback((updates) => {
    setCurrentOrg((prev) => {
      const updated = { ...prev, ...updates };
      if (typeof window !== 'undefined') {
        localStorage.setItem('bumblebee_session_org', JSON.stringify(updated));
      }
      return updated;
    });
  }, []);

  // Add Monitor
  const addMonitor = useCallback((newMonitor) => {
    playClickSound();
    const created = {
      ...newMonitor,
      id: `mon-${Date.now()}`,
      uptime: 100.0,
      status: "OPERATIONAL",
      lastCheck: "just now",
      responseTime: newMonitor.responseTime || 240,
      sparkline: [210, 230, 245, 220, 240],
      sslExpiryDays: 90,
      tlsVersion: "TLSv1.3",
      consecutiveFails: 0
    };
    setMonitors((prev) => [created, ...prev]);

    // Record Audit
    const nowTime = new Date().toLocaleTimeString('en-US', { hour12: false });
    setAuditLogs((prev) => [
      {
        id: `aud-${Date.now()}`,
        timestamp: nowTime,
        user: currentUser?.name || "System Admin",
        action: "MONITOR_CREATED",
        resource: created.name,
        ip: "198.51.100.14",
        details: `Configured ${created.type} monitor on ${created.url} with ${created.interval} interval.`
      },
      ...prev
    ]);

    return created;
  }, [currentUser]);

  // Delete Monitor
  const deleteMonitor = useCallback((monitorId) => {
    playClickSound();
    setMonitors((prev) => prev.filter((m) => m.id !== monitorId));
  }, []);

  // Clear All Monitors
  const clearAllMonitors = useCallback(() => {
    playClickSound();
    setMonitors([]);
    setIncidents([]);
    setActivityFeed([]);
    setNotificationsHistory([]);
  }, []);

  // Toggle Monitor Pause / Resume
  const toggleMonitorPause = useCallback((monitorId) => {
    playClickSound();
    setMonitors((prev) => 
      prev.map((m) => {
        if (m.id === monitorId) {
          const isPaused = m.status === 'PAUSED';
          return {
            ...m,
            status: isPaused ? 'OPERATIONAL' : 'PAUSED'
          };
        }
        return m;
      })
    );
  }, []);

  // Resolve Incident (Simulate Service Recovery)
  const resolveIncident = useCallback((incidentId) => {
    playRecoverySound();
    let resolvedMonitorId = null;

    setIncidents((prev) => 
      prev.map((inc) => {
        if (inc.id === incidentId) {
          resolvedMonitorId = inc.monitorId;
          return {
            ...inc,
            status: "RESOLVED",
            resolvedAt: new Date().toLocaleTimeString('en-US', { hour12: false }) + " IST",
            durationSeconds: inc.durationSeconds || 940
          };
        }
        return inc;
      })
    );

    // If monitor was linked, restore monitor status to OPERATIONAL
    if (resolvedMonitorId) {
      setMonitors((prev) => 
        prev.map((m) => {
          if (m.id === resolvedMonitorId) {
            return {
              ...m,
              status: "OPERATIONAL",
              responseTime: 310,
              sparkline: [...(m.sparkline || []).slice(1), 310],
              consecutiveFails: 0,
              error: null
            };
          }
          return m;
        })
      );
    }

    // Add Audit Log
    const nowTime = new Date().toLocaleTimeString('en-US', { hour12: false });
    setAuditLogs((prev) => [
      {
        id: `aud-${Date.now()}`,
        timestamp: nowTime,
        user: currentUser?.name || "System Admin",
        action: "INCIDENT_RESOLVED",
        resource: incidentId,
        ip: "198.51.100.14",
        details: `Incident marked RESOLVED. Recovery notifications dispatched.`
      },
      ...prev
    ]);
  }, [currentUser]);

  // Run On-Demand Check
  const runManualCheck = useCallback((monitorId) => {
    playClickSound();
    setMonitors((prev) => 
      prev.map((m) => {
        if (m.id === monitorId) {
          return {
            ...m,
            lastCheck: "just now",
            responseTime: m.status === 'DOWN' ? 0 : Math.floor(Math.random() * 80) + 220
          };
        }
        return m;
      })
    );
  }, []);

  // Computed Dashboard Metrics
  const totalMonitored = monitors.length;
  const operationalCount = monitors.filter(m => m.status === 'OPERATIONAL').length;
  const degradedCount = monitors.filter(m => m.status === 'DEGRADED').length;
  const downCount = monitors.filter(m => m.status === 'DOWN').length;
  const activeIncidentsCount = incidents.filter(i => i.status !== 'RESOLVED').length;
  
  const activeMonitorsCount = operationalCount + degradedCount;
  const avgResponseTime = activeMonitorsCount > 0 
    ? Math.round(
        monitors
          .filter(m => m.status === 'OPERATIONAL' || m.status === 'DEGRADED')
          .reduce((acc, m) => acc + (m.responseTime || 0), 0) / activeMonitorsCount
      )
    : 0;

  const overallUptime = totalMonitored > 0
    ? (monitors.reduce((acc, m) => acc + (m.uptime || 100), 0) / totalMonitored).toFixed(2)
    : "100.00";

  return (
    <BumblebeeContext.Provider
      value={{
        theme,
        setTheme,
        monitors,
        incidents,
        activityFeed,
        notificationsHistory,
        teamMembers,
        auditLogs,
        currentOrg,
        currentUser,
        isAuthenticated,
        loginUser,
        signupUser,
        logoutUser,
        updateUserProfile,
        updateOrgProfile,
        checksCountToday,
        lastCheckTimestamp,
        isLiveChecking,
        setIsLiveChecking,
        activeBuzzAlert,
        setActiveBuzzAlert,
        triggerBuzzAlert,
        addMonitor,
        deleteMonitor,
        clearAllMonitors,
        toggleMonitorPause,
        resolveIncident,
        runManualCheck,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        metrics: {
          totalMonitored,
          operationalCount,
          degradedCount,
          downCount,
          activeIncidentsCount,
          avgResponseTime,
          overallUptime,
          checksCountToday
        }
      }}
    >
      {children}
    </BumblebeeContext.Provider>
  );
}

export function useBumblebee() {
  const context = useContext(BumblebeeContext);
  if (!context) {
    throw new Error("useBumblebee must be used within a BumblebeeProvider");
  }
  return context;
}
