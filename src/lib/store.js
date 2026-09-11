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
  
  // Organization / Auth State
  const [currentOrg, setCurrentOrg] = useState({
    id: "org-enterprise-1",
    name: "My Organization",
    slug: "my-org",
    plan: "Enterprise Pro",
    slaTarget: 99.95,
    region: "Global Edge"
  });

  const [currentUser, setCurrentUser] = useState({
    id: "usr-1",
    name: "Admin",
    email: "admin@bumblebee.io",
    role: "OWNER",
    organization: "My Organization",
    twoFactor: true
  });

  // Load and apply theme
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('bumblebee-theme') || 'dark';
      setThemeState(savedTheme);
      applyThemeToDom(savedTheme);
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

        setChecksCountToday((prev) => prev + prevMonitors.length);

        // Random micro-jitter on operational monitors to show living pulse
        const updated = prevMonitors.map((m) => {
          if (m.status === 'OPERATIONAL') {
            const jitter = Math.floor(Math.random() * 16) - 8;
            const newRt = Math.max(10, (m.responseTime || 200) + jitter);
            const newSpark = [...(m.sparkline || [200, 200, 200]).slice(1), newRt];
            return {
              ...m,
              responseTime: newRt,
              sparkline: newSpark,
              lastCheck: 'just now'
            };
          }
          return m;
        });

        // Add live activity entry from real monitors
        const randomMon = updated[Math.floor(Math.random() * updated.length)];
        const nowTime = new Date().toLocaleTimeString('en-US', { hour12: false });
        
        setActivityFeed((prev) => [
          {
            id: `act-${Date.now()}`,
            time: nowTime,
            text: `${randomMon.name} probe verified (${randomMon.url})`,
            type: randomMon.status === 'DOWN' ? 'error' : randomMon.status === 'DEGRADED' ? 'warning' : 'success',
            ms: randomMon.status === 'DOWN' ? 0 : randomMon.responseTime || 180,
            location: randomMon.location || "Global Quorum"
          },
          ...prev.slice(0, 19)
        ]);

        return updated;
      });

    }, 5000);

    return () => clearInterval(interval);
  }, [isLiveChecking]);

  // Trigger signature 🐝 BUZZ ALERT
  const triggerBuzzAlert = useCallback((incidentData) => {
    const alertPayload = incidentData || {
      id: `INC-BUZZ-${Date.now().toString().slice(-4)}`,
      title: "Payment Gateway API DOWN — HTTP 503",
      monitorName: "Stripe & Crypto Payment Gateway API",
      severity: "CRITICAL",
      errorMessage: "HTTP 503 Service Unavailable (3 consecutive failures across US-East, EU-Frankfurt, AP-Mumbai)",
      startedAt: new Date().toLocaleTimeString('en-US', { hour12: false }) + " IST",
      channels: ["Web Push", "Mobile PWA", "WhatsApp", "Email"]
    };

    setActiveBuzzAlert(alertPayload);
    playBuzzAlert();

    // Log notification delivery
    const nowTime = new Date().toLocaleTimeString('en-US', { hour12: false });
    const newNotif = {
      id: `notif-${Date.now()}`,
      timestamp: nowTime,
      service: alertPayload.monitorName,
      incident: alertPayload.id,
      channel: "BUZZ ALERT",
      recipient: "On-Call Engineering Team",
      status: "DELIVERED",
      isBuzz: true
    };
    setNotificationsHistory((prev) => [newNotif, ...prev]);

    // Record Audit Log
    setAuditLogs((prev) => [
      {
        id: `aud-${Date.now()}`,
        timestamp: nowTime,
        user: "Bumblebee Alert Engine",
        action: "BUZZ_ALERT_TRIGGERED",
        resource: alertPayload.monitorName,
        ip: "10.0.0.1 (Quorum Engine)",
        details: `Critical alarm broadcasted to Web Push, WhatsApp, and PWA.`
      },
      ...prev
    ]);
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
        user: currentUser.name,
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
        user: currentUser.name,
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
