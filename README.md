# 🐝 Bumblebee — Intelligent Digital Service Monitoring & Incident Intelligence Platform

> **"Know before your users do."**

Bumblebee is a high-performance, enterprise-grade digital service reliability and incident intelligence SaaS platform. It continuously observes websites, REST/GraphQL APIs, backend services, databases, SSL/TLS certificates, and synthetic user journeys. When anomalies arise, Bumblebee executes multi-region quorum verification, isolates anomalies through AI telemetry correlation (strictly distinguishing facts from inferences), and triggers high-urgency **Buzz Alerts** across browser push, mobile PWA, email, and WhatsApp Business API.

---

## 🏗️ Architecture & Core Components

```
BUMBLEBEE PLATFORM
├── src/
│   ├── app/                      # Next.js Fullstack SaaS App Router
│   │   ├── (auth)/               # Work Email Authentication, Verification, Reset & Security Consent
│   │   ├── onboarding/           # 7-Step Quick Provisioning Wizard
│   │   ├── app/                  # Authenticated Command Center
│   │   │   ├── overview/         # Real-time Live Watchdog Command Center
│   │   │   ├── monitors/         # 8-Step Wizard & Comprehensive Monitor Manager
│   │   │   ├── apis/             # REST/GraphQL API & TLS 1.3 Certificate Inspector
│   │   │   ├── incidents/        # Incident Triaging, Telemetry Evidence, Timeline & Recovery
│   │   │   ├── intelligence/     # Bumblebee AI Analyst (Fact vs. Inference, Pattern Radar, Daily Brief)
│   │   │   ├── synthetic/        # Visual Headless Playwright Journey Builder & Script Exporter
│   │   │   ├── observability/    # P50/P95/P99 Latency & Multi-Region Health Telemetry
│   │   │   ├── sla/              # Contractual SLA Target (99.9%, 99.95%, 99.99%) & Error Budget Burn
│   │   │   ├── status-pages/     # Public Status Page Configurator
│   │   │   ├── communication/    # Buzz Alert Hub, Routing Rules & Delivery Receipts
│   │   │   ├── team/             # Role-Based Access Control (Owner, Admin, Engineer, Viewer)
│   │   │   ├── audit-logs/       # Immutable Tamper-Evident Security Audit Trail
│   │   │   ├── settings/         # 3 Theme Modes, Zero-Exposition Vault & SSRF Controls
│   │   │   └── help/             # Engineering Specs & Direct Support Link
│   │   └── status/[slug]/        # Customer-Facing Public Status Page (90-day uptime bars)
│   ├── components/               # Modular UI, Navigation, Modals, Buzz Overlays & Charts
│   ├── lib/
│   │   ├── store.js              # Central State Store & Real-Time Background Ticker
│   │   ├── sound.js              # Web Audio API Synthesizer for Signature Buzz Alerts
│   │   ├── ssrf.js               # Hardened SSRF & Loopback/Metadata Defense Guard
│   │   └── ai-engine.js          # SRE Incident Telemetry & Root Cause Inference Engine
│   └── styles/
│       └── globals.css           # Design Tokens, Honeycomb Grid & 3 Theme Modes
├── backend/
│   ├── worker.py                 # Async Python Monitoring Engine with Multi-Region Quorum
│   ├── scheduler.py              # Continuous Interval & Job Queue Scheduler
│   ├── ssrf_guard.py             # Python SSRF Defense & DNS Rebinding Verification
│   ├── synthetic_runner.py       # Headless Playwright User Flow Executor
│   └── ai_engine.py              # Telemetry Correlation & Incident Analyzer
└── prisma/
    └── schema.prisma             # PostgreSQL Schema with 24 Enterprise Models
```

---

## ⚡ Quick Start

### 1. Prerequisites
- **Node.js**: v18.0.0+ (Tested on Node v24 LTS)
- **Python**: 3.10+ (Tested on Python 3.12)
- **npm** or **yarn**

### 2. Frontend & API Server Installation
```bash
# Clone the repository
cd bumble-bee

# Install NPM dependencies
npm install

# Run the Next.js development server
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 3. Production Build
```bash
# Build optimized production bundle
npm run build

# Start production server on port 3000
npm run start
```

### 4. Background Python Watchdog Worker Suite
```bash
# Install worker dependencies
pip install -r backend/requirements.txt

# Run standalone SSRF security validator
python backend/ssrf_guard.py

# Run standalone monitoring worker
python backend/worker.py
```

---

## 🎨 Three Distinctive Theme Modes
Bumblebee includes 3 full-stack themes selectable from the topbar or settings:
1. 🌙 **Dark Command Center** (Default): Obsidian black with honey amber glow accents.
2. ☀️ **Light / Bright Mode**: Clean alabaster with warm gold highlights for daytime operations.
3. 🐝 **Worker Mode / Bumblebee Mode**: Tactical high-visibility carbon with active energy pulses and dedicated worker activity indicators.

---

## 🛡️ Enterprise Security & SSRF Defense

- **SSRF Hardening**: Prohibits probes against loopbacks (`127.0.0.0/8`, `::1`), private RFC1918 subnets (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`), and cloud metadata services (`169.254.169.254`).
- **Zero-Knowledge Secret Vault**: Authentication tokens and passwords are encrypted with AES-256-GCM. Frontend UI only displays masked tokens (`••••••••82KQ`).
- **Cryptographic Tenant Isolation**: Multi-tenancy enforced at the database layer.

---

## 📞 Support & Maintenance
For enterprise inquiries, SLA guarantees, or technical support:
- **Email**: [kandulamohansaipranav9@gmail.com](mailto:kandulamohansaipranav9@gmail.com)

---
© 2026 Bumblebee Monitoring Inc. All rights reserved.
