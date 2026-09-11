// Bumblebee Core Mock & Seed Telemetry Store

export const INITIAL_MONITORS = [
  {
    id: "mon-1",
    name: "Production Customer Portal",
    url: "https://app.bumblebee.io/health",
    type: "WEBSITE",
    status: "OPERATIONAL",
    responseTime: 412,
    uptime: 99.98,
    lastCheck: "12s ago",
    interval: "30s",
    location: "US East (N. Virginia)",
    locationCode: "us-east",
    group: "Frontend Services",
    expectedStatus: 200,
    tags: ["prod", "frontend", "p1"],
    sparkline: [420, 390, 410, 430, 405, 415, 398, 412],
    sslExpiryDays: 84,
    sslIssuer: "Let's Encrypt Authority X3",
    tlsVersion: "TLSv1.3",
    consecutiveFails: 0
  },
  {
    id: "mon-2",
    name: "Stripe & Crypto Payment Gateway API",
    url: "https://api.bumblebee.io/v1/payments/charge",
    type: "API",
    status: "DOWN",
    responseTime: 0,
    uptime: 98.42,
    lastCheck: "6s ago",
    interval: "15s",
    location: "Multi-Region Quorum (3/3 Failed)",
    locationCode: "global-quorum",
    group: "Financial APIs",
    expectedStatus: 200,
    tags: ["prod", "payments", "critical", "p0"],
    sparkline: [320, 340, 1850, 4200, 6800, 0, 0, 0],
    sslExpiryDays: 142,
    sslIssuer: "DigiCert Global Root G2",
    tlsVersion: "TLSv1.3",
    consecutiveFails: 3,
    error: "HTTP 503 Service Unavailable — Connection Pool Exhausted"
  },
  {
    id: "mon-3",
    name: "User Authentication & OAuth2 Service",
    url: "https://auth.bumblebee.io/oauth/v2/token",
    type: "API",
    status: "DEGRADED",
    responseTime: 2450,
    uptime: 99.12,
    lastCheck: "18s ago",
    interval: "30s",
    location: "EU Central (Frankfurt)",
    locationCode: "eu-central",
    group: "Security & Auth",
    expectedStatus: 200,
    tags: ["prod", "auth", "p1"],
    sparkline: [310, 350, 890, 1400, 2100, 2600, 2450],
    sslExpiryDays: 61,
    sslIssuer: "Cloudflare Inc ECC CA-3",
    tlsVersion: "TLSv1.3",
    consecutiveFails: 1,
    error: "Abnormal Latency Spike (+480% over 15 min baseline)"
  },
  {
    id: "mon-4",
    name: "Primary PostgreSQL Database Cluster",
    url: "tcp://db-primary.bumblebee.internal:5432",
    type: "DATABASE",
    status: "DEGRADED",
    responseTime: 890,
    uptime: 99.85,
    lastCheck: "25s ago",
    interval: "30s",
    location: "US East (Internal VPC)",
    locationCode: "us-east",
    group: "Core Infrastructure",
    expectedStatus: 200,
    tags: ["infra", "postgres", "p0"],
    sparkline: [45, 52, 60, 180, 450, 720, 890],
    sslExpiryDays: 310,
    sslIssuer: "Internal CA",
    tlsVersion: "TLSv1.3",
    consecutiveFails: 0,
    error: "Connection pool utilization at 96.4%"
  },
  {
    id: "mon-5",
    name: "Global CDN Edge Cache (Cloudflare)",
    url: "https://assets.bumblebee.io/ping",
    type: "WEBSITE",
    status: "OPERATIONAL",
    responseTime: 38,
    uptime: 99.99,
    lastCheck: "10s ago",
    interval: "60s",
    location: "Anycast Edge (310 PoPs)",
    locationCode: "anycast",
    group: "Frontend Services",
    expectedStatus: 200,
    tags: ["edge", "cdn", "fast"],
    sparkline: [35, 42, 36, 40, 37, 39, 38, 38],
    sslExpiryDays: 190,
    sslIssuer: "Cloudflare Inc ECC CA-3",
    tlsVersion: "TLSv1.3",
    consecutiveFails: 0
  },
  {
    id: "mon-6",
    name: "Synthetic Checkout & License Purchase Journey",
    url: "https://app.bumblebee.io/checkout",
    type: "SYNTHETIC",
    status: "DOWN",
    responseTime: 5200,
    uptime: 97.80,
    lastCheck: "30s ago",
    interval: "2m",
    location: "US East (Headless Playwright Node)",
    locationCode: "us-east",
    group: "User Journeys",
    expectedStatus: 200,
    tags: ["synthetic", "playwright", "e2e"],
    sparkline: [2100, 2250, 3100, 4800, 5200, 0],
    sslExpiryDays: 84,
    sslIssuer: "Let's Encrypt Authority X3",
    tlsVersion: "TLSv1.3",
    consecutiveFails: 3,
    error: "Step 4 Failed: Timeout waiting for #payment-success-badge"
  },
  {
    id: "mon-7",
    name: "Redis Cache & Pub/Sub Cluster",
    url: "tcp://redis-cluster.bumblebee.internal:6379",
    type: "BACKEND_SERVICE",
    status: "OPERATIONAL",
    responseTime: 4,
    uptime: 100.0,
    lastCheck: "15s ago",
    interval: "30s",
    location: "US East (Internal VPC)",
    locationCode: "us-east",
    group: "Core Infrastructure",
    expectedStatus: 200,
    tags: ["infra", "redis", "cache"],
    sparkline: [3, 4, 4, 3, 5, 4, 4, 4],
    sslExpiryDays: 365,
    sslIssuer: "Internal CA",
    tlsVersion: "TLSv1.3",
    consecutiveFails: 0
  },
  {
    id: "mon-8",
    name: "Webhooks Delivery Worker Queue",
    url: "https://webhooks.bumblebee.io/health",
    type: "BACKEND_SERVICE",
    status: "OPERATIONAL",
    responseTime: 185,
    uptime: 99.95,
    lastCheck: "28s ago",
    interval: "30s",
    location: "AP South (Mumbai)",
    locationCode: "ap-south",
    group: "Async Services",
    expectedStatus: 200,
    tags: ["async", "queue", "kafka"],
    sparkline: [170, 190, 182, 178, 195, 185],
    sslExpiryDays: 112,
    sslIssuer: "Let's Encrypt Authority X3",
    tlsVersion: "TLSv1.3",
    consecutiveFails: 0
  },
  {
    id: "mon-9",
    name: "Enterprise Search & Elasticsearch Cluster",
    url: "https://search.bumblebee.internal/cluster/health",
    type: "BACKEND_SERVICE",
    status: "MAINTENANCE",
    responseTime: 0,
    uptime: 99.90,
    lastCheck: "45s ago",
    interval: "60s",
    location: "EU Central (Frankfurt)",
    locationCode: "eu-central",
    group: "Data Pipeline",
    expectedStatus: 200,
    tags: ["infra", "search", "planned-maint"],
    sparkline: [120, 115, 125, 0, 0],
    sslExpiryDays: 240,
    sslIssuer: "Internal CA",
    tlsVersion: "TLSv1.3",
    consecutiveFails: 0
  }
];

export const INITIAL_INCIDENTS = [
  {
    id: "INC-8F42A1",
    title: "Payment Gateway API Complete Outage (HTTP 503)",
    monitorId: "mon-2",
    monitorName: "Stripe & Crypto Payment Gateway API",
    status: "IDENTIFIED",
    severity: "CRITICAL",
    errorType: "HTTP 503 Service Unavailable",
    errorMessage: "The server is temporarily unable to service your request due to maintenance downtime or capacity problems.",
    consecutiveFailures: 3,
    startedAt: "18:42:31 IST",
    durationSeconds: 940,
    affectedImpact: "100% of user checkout and subscription upgrades failing.",
    isBuzzAlertTriggered: true,
    channelsNotified: ["BUZZ", "BROWSER_PUSH", "MOBILE_PWA", "WHATSAPP", "EMAIL"],
    aiFactSummary: {
      confirmed: [
        "HTTP 503 returned across all 3 probe regions (US-East, EU-Frankfurt, AP-Mumbai).",
        "3/3 consecutive verification retries failed with 0 byte payload responses.",
        "TLS 1.3 handshake negotiation completed successfully in 34ms."
      ],
      observed: [
        "Response latency rose exponentially from 320ms at 18:30 to 6,800ms at 18:41.",
        "Primary PostgreSQL connection pool utilization reached 96.4% concurrently.",
        "Auth service latency increased by 35% across the same 15-minute window."
      ],
      likely: [
        "Database transaction lock or pool exhaustion on payment charge worker threads.",
        "Upstream payment processor webhook backpressure cascading into synchronous handler exhaustion."
      ],
      unknown: [
        "Internal container pod CPU/memory thrashing without direct APM agent hooks.",
        "Downstream banking clearing network latency anomalies."
      ]
    },
    timeline: [
      { time: "18:42:31", title: "Initial Check Failed", desc: "US-East probe received HTTP 503 from /v1/payments/charge." },
      { time: "18:42:36", title: "Retry 1 (EU-Frankfurt) Failed", desc: "Recheck confirmed HTTP 503 (0 byte response)." },
      { time: "18:42:41", title: "Retry 2 (AP-Mumbai) Failed", desc: "Multi-region quorum reached. Incident confirmed." },
      { time: "18:42:42", title: "🐝 Bumblebee Buzz Alert Dispatched", desc: "Emergency alarm sent to Web Push, WhatsApp, and PWA." },
      { time: "18:44:10", title: "🧠 AI Analyst Initial Diagnosis", desc: "Root cause correlation completed: Database connection pool exhaustion likely." }
    ]
  },
  {
    id: "INC-8F42A2",
    title: "Synthetic Checkout Flow Step 4 Timeout Failure",
    monitorId: "mon-6",
    monitorName: "Synthetic Checkout & License Purchase Journey",
    status: "INVESTIGATING",
    severity: "CRITICAL",
    errorType: "Playwright Element Timeout",
    errorMessage: "Step 4: Timeout 5000ms waiting for selector '#payment-success-badge'",
    consecutiveFailures: 3,
    startedAt: "18:43:05 IST",
    durationSeconds: 906,
    affectedImpact: "End-to-end purchasing path blocked for automated health test.",
    isBuzzAlertTriggered: true,
    channelsNotified: ["BUZZ", "BROWSER_PUSH", "EMAIL"],
    aiFactSummary: {
      confirmed: [
        "Playwright headless browser timed out waiting for DOM element '#payment-success-badge'.",
        "Directly correlates with the Payment Gateway API HTTP 503 outage.",
        "Login step (Step 1-3) passed with valid masked test credentials."
      ],
      observed: [
        "Total journey execution time exceeded the 5000ms threshold by 200ms."
      ],
      likely: [
        "Secondary consequence of Incident INC-8F42A1."
      ],
      unknown: [
        "Whether client-side React error boundaries caught the error."
      ]
    },
    timeline: [
      { time: "18:43:05", title: "Synthetic Journey Step 4 Failed", desc: "Timeout waiting for DOM selector." },
      { time: "18:43:35", title: "Automated Retry Failed", desc: "Playwright node confirmed failure." },
      { time: "18:43:40", title: "Incident Linked to Payment API Outage", desc: "Bumblebee AI correlated synthetic failure with INC-8F42A1." }
    ]
  },
  {
    id: "INC-8F42A3",
    title: "Authentication Service Latency Degradation Spike",
    monitorId: "mon-3",
    monitorName: "User Authentication & OAuth2 Service",
    status: "MONITORING",
    severity: "MAJOR",
    errorType: "Latency Anomaly (+480%)",
    errorMessage: "Average latency exceeded 2000ms threshold (measured: 2450ms).",
    consecutiveFailures: 1,
    startedAt: "18:35:10 IST",
    durationSeconds: 1380,
    affectedImpact: "Token generation and login operations are unusually sluggish.",
    isBuzzAlertTriggered: false,
    channelsNotified: ["BROWSER_PUSH", "EMAIL"],
    aiFactSummary: {
      confirmed: [
        "Average TTFB rose from 310ms to 2450ms.",
        "HTTP status codes remained 200 OK (no dropped connections)."
      ],
      observed: [
        "Historical pattern: Authentication degrades during 18:00-20:00 window 6 out of 7 times in 30 days."
      ],
      likely: [
        "Increased token refresh load compounded by database pool queue backpressure."
      ],
      unknown: [
        "Redis session cache hit-ratio telemetry."
      ]
    },
    timeline: [
      { time: "18:35:10", title: "Latency Threshold Breached", desc: "Response exceeded 2000ms SLA target." },
      { time: "18:36:00", title: "Warning Notification Dispatched", desc: "Push notification and Email alert sent." }
    ]
  }
];

export const INITIAL_ACTIVITY_FEED = [
  { id: "act-1", time: "19:07:30", type: "success", text: "Global CDN Edge Cache check passed", ms: 38, location: "Anycast" },
  { id: "act-2", time: "19:07:15", type: "success", text: "Redis Cache cluster ping passed", ms: 4, location: "US-East" },
  { id: "act-3", time: "19:07:00", type: "warning", text: "Customer Portal response time fluctuated (+45ms)", ms: 412, location: "US-East" },
  { id: "act-4", time: "19:06:45", type: "error", text: "Payment API returned HTTP 503 (Attempt 3 confirmed)", ms: 0, location: "Quorum 3/3" },
  { id: "act-5", time: "19:06:30", type: "error", text: "Payment API returned HTTP 503 (Attempt 2)", ms: 0, location: "EU-Frankfurt" },
  { id: "act-6", time: "19:06:15", type: "error", text: "Payment API initial check failed", ms: 0, location: "US-East" },
  { id: "act-7", time: "19:06:00", type: "warning", text: "Auth Service latency exceeded 2000ms threshold", ms: 2450, location: "EU-Frankfurt" },
  { id: "act-8", time: "19:05:30", type: "success", text: "Webhooks Worker queue health OK", ms: 185, location: "AP-Mumbai" },
  { id: "act-9", time: "19:05:00", type: "success", text: "Production Website health probe passed", ms: 410, location: "US-East" },
];

export const INITIAL_NOTIFICATIONS_HISTORY = [
  { id: "notif-1", timestamp: "18:42:42", service: "Payment API", incident: "INC-8F42A1", channel: "BUZZ ALERT", recipient: "On-Call Engineering Team", status: "DELIVERED", isBuzz: true },
  { id: "notif-2", timestamp: "18:42:42", service: "Payment API", incident: "INC-8F42A1", channel: "Web Push", recipient: "All Active Admin Sessions (8 devices)", status: "DELIVERED", isBuzz: false },
  { id: "notif-3", timestamp: "18:42:43", service: "Payment API", incident: "INC-8F42A1", channel: "WhatsApp", recipient: "DevOps Emergency +1 (555) 019-2831", status: "DELIVERED", isBuzz: false },
  { id: "notif-4", timestamp: "18:42:44", service: "Payment API", incident: "INC-8F42A1", channel: "Email", recipient: "sre-alerts@bumblebee.io", status: "DELIVERED", isBuzz: false },
  { id: "notif-5", timestamp: "18:36:00", service: "Auth Service", incident: "INC-8F42A3", channel: "Email", recipient: "security-team@bumblebee.io", status: "DELIVERED", isBuzz: false }
];

export const INITIAL_TEAM_MEMBERS = [
  { id: "usr-1", name: "Alex Mercer", email: "alex.mercer@enterprise.io", role: "OWNER", status: "ACTIVE", assignedServices: ["ALL"], phone: "+1 (555) 234-5678", avatar: "AM" },
  { id: "usr-2", name: "Sarah Lin", email: "sarah.lin@enterprise.io", role: "ADMIN", status: "ACTIVE", assignedServices: ["Payment API", "Auth Service"], phone: "+1 (555) 345-6789", avatar: "SL" },
  { id: "usr-3", name: "Vikram Malhotra", email: "vikram.m@enterprise.io", role: "ENGINEER", status: "ACTIVE", assignedServices: ["PostgreSQL Cluster", "Redis"], phone: "+91 98765 43210", avatar: "VM" },
  { id: "usr-4", name: "Elena Rostova", email: "elena.r@enterprise.io", role: "VIEWER", status: "INVITED", assignedServices: ["Frontend Services"], phone: "+44 20 7946 0912", avatar: "ER" }
];

export const INITIAL_AUDIT_LOGS = [
  { id: "aud-1", timestamp: "19:04:12", user: "System Engine", action: "INCIDENT_VERIFIED", resource: "INC-8F42A1", ip: "10.0.0.1 (Internal Quorum)", details: "Multi-region confirmation 3/3 failed checks." },
  { id: "aud-2", timestamp: "18:42:42", user: "Bumblebee Alert Router", action: "BUZZ_ALERT_DISPATCHED", resource: "Payment Gateway API", ip: "10.0.0.4", details: "Dispatched to Web Push, WhatsApp, Email." },
  { id: "aud-3", timestamp: "17:15:00", user: "Sarah Lin", action: "SECRET_ROTATED", resource: "STRIPE_LIVE_KEY_VAULT", ip: "192.0.2.45", details: "Key rotated to mask ••••••••82KQ." },
  { id: "aud-4", timestamp: "16:00:22", user: "Alex Mercer", action: "MONITOR_CREATED", resource: "Synthetic Checkout Journey", ip: "198.51.100.14", details: "Playwright headless E2E monitor configured with 2m interval." },
  { id: "aud-5", timestamp: "14:30:10", user: "Alex Mercer", action: "USER_LOGIN_2FA", resource: "Workspace Session", ip: "198.51.100.14", details: "Successful authentication via Hardware Key / TOTP." }
];
