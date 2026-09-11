'use client';

import React from 'react';
import { 
  Globe, 
  Code, 
  Workflow, 
  Layers, 
  Database, 
  Server, 
  Lock, 
  Gauge, 
  ShieldCheck, 
  Zap, 
  Activity, 
  BellRing 
} from 'lucide-react';

export default function Features() {
  const capabilities = [
    {
      icon: Globe,
      title: "Websites & Endpoints",
      desc: "Uptime, DNS resolution, HTTP 4xx/5xx codes, redirects, SSL certificates and DOM content assertions every 30 seconds."
    },
    {
      icon: Code,
      title: "REST & GraphQL APIs",
      desc: "Method validation (GET, POST, PUT, DELETE), JSONPath response payloads, token auth, and sub-millisecond TTFB latency tracking."
    },
    {
      icon: Workflow,
      title: "Synthetic User Journeys",
      desc: "Headless Playwright workflows simulating real logins, shopping carts, checkouts, and dashboard element clicks."
    },
    {
      icon: Database,
      title: "Databases & Queues",
      desc: "TCP connection health for PostgreSQL, MySQL, Redis, Kafka, and background worker queues."
    },
    {
      icon: Lock,
      title: "SSL / TLS Expiration & Chains",
      desc: "Proactive certificate expiry warnings (30, 14, 7 days), hostname mismatch detection, and TLS 1.3 protocol validation."
    },
    {
      icon: Gauge,
      title: "Performance & SLA Telemetry",
      desc: "99.9%, 99.95%, and 99.99% uptime target tracking, downtime budget burn-down, and compliance PDF generation."
    }
  ];

  return (
    <div id="capabilities" className="py-20 border-b border-obsidian-800 bg-obsidian-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase text-bee-400 font-bold tracking-widest px-3 py-1 rounded-full bg-bee-500/10 border border-bee-500/30">
            Full-Spectrum Observability
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 tracking-tight">
            What Bumblebee Watches
          </h2>
          <p className="text-gray-400 text-base sm:text-lg mt-3">
            Bumblebee is not simply asking "Is the server responding?". It asks: "Is the digital service actually healthy, fast, and usable?"
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div 
                key={cap.title}
                className="group p-6 rounded-2xl bg-obsidian-900/70 border border-obsidian-800 hover:border-bee-500/40 hover:bg-obsidian-850 transition-all duration-200 hover:-translate-y-1 hover:shadow-glow-amber"
              >
                <div className="w-12 h-12 rounded-xl bg-bee-500/10 border border-bee-500/30 flex items-center justify-center text-bee-400 group-hover:scale-110 group-hover:bg-bee-500 group-hover:text-black transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mt-5 group-hover:text-bee-300 transition-colors">
                  {cap.title}
                </h3>
                <p className="text-gray-400 text-sm mt-2.5 leading-relaxed">
                  {cap.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
