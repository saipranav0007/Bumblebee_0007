// Bumblebee AI Monitoring Analyst Engine

export function generateAIIncidentAnalysis(incident, monitor) {
  const serviceName = monitor?.name || incident.monitorName || "Service";
  const errorType = incident.errorType || "HTTP 503";

  return {
    incidentId: incident.id,
    serviceName,
    summary: `Bumblebee AI identified persistent critical failure on ${serviceName}. Multi-location retry quorum confirmed outage.`,
    facts: {
      confirmed: [
        `Received ${errorType} response during verification check cycles.`,
        `Failure confirmed across 3 independent geographical probe regions (US-East, EU-Frankfurt, AP-Mumbai).`,
        `3/3 consecutive probe attempts failed with 0 byte payload responses.`,
        `TLS 1.3 handshake completed successfully in 34ms before HTTP layer rejection.`
      ],
      observed: [
        `Response latency began drifting 14 minutes prior to failure (from 320ms baseline to 6,800ms).`,
        `Error rate on primary /v1/charge endpoints spiked from 0.02% to 100% at 18:42 IST.`,
        `PostgreSQL primary database cluster connection pool utilization reached 96.4% at the same timestamp.`
      ],
      likely: [
        `Database connection pool exhaustion or unindexed query lock contention on payment worker threads.`,
        `Upstream payment provider webhook backpressure caused cascading synchronous connection starvation.`
      ],
      unknown: [
        `Internal container pod memory/CPU limits without direct APM agent telemetry hooks.`,
        `Whether client-side mobile SDK retried idempotently.`
      ]
    },
    investigationSteps: [
      "Check PostgreSQL active lock queries: SELECT * FROM pg_stat_activity WHERE state != 'idle';",
      "Verify connection pooler (PgBouncer/Prisma) max connection limit saturation.",
      "Review any production deployments or config changes deployed in the last 60 minutes.",
      "Check third-party payment gateway status for upstream webhook processing delays."
    ],
    recommendation: "Perform rolling restart of API worker pods or increase connection pool ceiling by 25% while investigating slow queries."
  };
}

export function generateAIChatResponse(prompt, context) {
  const p = prompt.toLowerCase();
  const { monitors, incidents, activity } = context;

  if (p.includes("why did the api fail") || p.includes("payment api")) {
    return {
      text: "Based on Bumblebee telemetry, the Stripe & Crypto Payment Gateway API failed due to HTTP 503 Service Unavailable.",
      breakdown: {
        confirmed: "HTTP 503 returned across US, EU, and AP probe locations.",
        observed: "Latency spiked from 320ms to 6,800ms 14 minutes before complete outage. Concurrently, PostgreSQL connection pool hit 96.4%.",
        likely: "Database connection starvation on transaction handler threads.",
        unknown: "Underlying query execution plans without APM slow query logs."
      },
      nextStep: "Inspect active database queries and consider restarting affected payment worker pods."
    };
  }

  if (p.includes("what happened today") || p.includes("summary") || p.includes("today")) {
    return {
      text: "Here is your Bumblebee reliability breakdown for today:",
      breakdown: {
        confirmed: "3 total incidents detected. 1 Critical (Payment API), 1 Synthetic Failure (Checkout E2E), 1 Major (Auth latency).",
        observed: "Overall system uptime is currently at 99.94%. All core edge assets and Redis caches maintained 100.0% uptime.",
        likely: "Synthetic checkout failure is directly caused by the primary Payment API outage.",
        unknown: "Customer churn impact during the 7-minute outage window."
      },
      nextStep: "Prioritize resolving INC-8F42A1 to automatically clear the dependent Synthetic test failure."
    };
  }

  if (p.includes("slower") || p.includes("latency") || p.includes("degraded")) {
    return {
      text: "Bumblebee AI telemetry indicates that the User Authentication Service is currently experiencing a +480% latency increase (2,450ms vs 310ms baseline).",
      breakdown: {
        confirmed: "Average TTFB rose from 310ms to 2450ms across European and North American probes.",
        observed: "Historical pattern shows authentication latency rises during 18:00-20:00 UTC due to evening traffic peaks.",
        likely: "JWT verification / Redis token session lookup cache misses under heavy concurrency.",
        unknown: "Redis memory fragmentation ratio."
      },
      nextStep: "Review Redis session cache TTL and scale read replicas for the evening window."
    };
  }

  if (p.includes("most incidents") || p.includes("top failing")) {
    return {
      text: "Historical analysis over the last 30 days reveals:",
      breakdown: {
        confirmed: "Payment Gateway API has the highest downtime (18.4 minutes total across 4 incidents).",
        observed: "Authentication Service experienced the most frequent transient performance warnings (7 degraded events).",
        likely: "Shared dependency on the primary PostgreSQL cluster makes Payment API and Auth Service vulnerable to concurrent database load.",
        unknown: "Specific client retry rates during degradations."
      },
      nextStep: "Implement read/write database split for Auth and decouple payment processing with an async job queue."
    };
  }

  return {
    text: `Bumblebee AI is actively monitoring ${monitors?.length || 9} services across 4 global regions. Telemetry shows 1 active Critical incident and 1 Degraded service.`,
    breakdown: {
      confirmed: "Current active incidents: INC-8F42A1 (Payment API DOWN), INC-8F42A2 (Synthetic Checkout FAIL).",
      observed: "Edge CDN and Redis cache infrastructure are operating at nominal baseline latency (<40ms).",
      likely: "No external DNS or SSL degradation detected.",
      unknown: "Upstream third-party banking status."
    },
    nextStep: "Ask me anything about specific service latencies, historical patterns, or root-cause evidence."
  };
}

export const AI_PATTERNS = [
  {
    id: "pat-1",
    title: "Recurring Peak-Hour Latency Spike",
    service: "User Authentication & OAuth2 Service",
    severity: "WARNING",
    evidence: "7 degraded-performance incidents detected in the last 30 days. 6 occurred strictly between 18:00 and 20:00 IST. Average latency during this window is 2.7x baseline (2,450ms vs 350ms).",
    rootCauseInference: "Likely caused by token refresh micro-bursts and Redis session cache miss amplification.",
    recommendedAction: "Pre-scale application pods at 17:45 IST and configure Redis read replicas."
  },
  {
    id: "pat-2",
    title: "Payment Gateway Database Contention Cascade",
    service: "Stripe & Crypto Payment Gateway API",
    severity: "CRITICAL",
    evidence: "Every Payment API outage was preceded by an exponential latency rise beginning 12-15 minutes earlier, synchronized with PostgreSQL connection pool saturation (>90%).",
    rootCauseInference: "Cascading thread starvation where unindexed payment query locks exhaust connection pool capacity.",
    recommendedAction: "Add connection pooling timeout safeguards and migrate heavy reporting queries to analytical replica."
  },
  {
    id: "pat-3",
    title: "SSL/TLS Certificate Expiration Window",
    service: "Customer Portal & Production APIs",
    severity: "INFO",
    evidence: "Let's Encrypt certificates for 4 domains will reach 30-day renewal threshold in 14 days.",
    rootCauseInference: "Normal ACME automated rotation cycle pending.",
    recommendedAction: "Verify automated DNS-01 challenge renewer cron is active on certbot worker."
  }
];

export const AI_PREDICTIONS = [
  {
    id: "pred-1",
    service: "Primary PostgreSQL Database Cluster",
    status: "RISK INCREASING",
    severity: "HIGH",
    metric: "Connection Pool Saturation",
    currentValue: "96.4%",
    threshold: "95.0%",
    predictionText: "Trend suggests potential connection exhaustion within 18 minutes if incoming transaction rate continues at current velocity.",
    evidenceConfidence: "87% confidence based on 30-day historical load curves.",
    action: "Increase max_connections parameter or enable aggressive idle-client reaping."
  },
  {
    id: "pred-2",
    service: "User Authentication Service",
    status: "POTENTIAL DEGRADATION",
    severity: "MEDIUM",
    metric: "P99 Latency Drift",
    currentValue: "2,450 ms",
    threshold: "2,000 ms",
    predictionText: "Latency has climbed continuously for 18 minutes. Breaches SLA response budget in 12 minutes.",
    evidenceConfidence: "92% confidence based on current TTFB slope.",
    action: "Clear expired session caches and verify upstream auth database latency."
  }
];
