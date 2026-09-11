// Bumblebee SSRF Guard for JavaScript / Node.js runtime

const BLOCKED_HOSTS = new Set([
  'localhost',
  'localhost.localdomain',
  '127.0.0.1',
  '0.0.0.0',
  '169.254.169.254',
  'metadata.google.internal',
  'instance-data',
  'metadata.packet.net',
  'kubernetes.default.svc',
  'consul.service.consul'
]);

export function validateSafeUrl(urlString) {
  try {
    const url = new URL(urlString);
    if (!['http:', 'https:'].includes(url.protocol)) {
      return {
        isValid: false,
        error: `Prohibited protocol "${url.protocol}". Only http: and https: are allowed.`
      };
    }

    const host = url.hostname.toLowerCase();

    if (BLOCKED_HOSTS.has(host)) {
      return {
        isValid: false,
        error: `SSRF Block: Host "${host}" points to internal/cloud metadata addresses.`
      };
    }

    // Check private IPv4 ranges (10.x, 192.168.x, 172.16-31.x, 127.x, 169.254.x)
    const ipv4Regex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
    const match = host.match(ipv4Regex);
    if (match) {
      const [_, o1, o2] = match.map(Number);
      if (o1 === 127) return { isValid: false, error: "SSRF Block: Loopback 127.0.0.0/8 address prohibited." };
      if (o1 === 10) return { isValid: false, error: "SSRF Block: Private RFC1918 10.0.0.0/8 address prohibited." };
      if (o1 === 192 && o2 === 168) return { isValid: false, error: "SSRF Block: Private RFC1918 192.168.0.0/16 address prohibited." };
      if (o1 === 172 && o2 >= 16 && o2 <= 31) return { isValid: false, error: "SSRF Block: Private RFC1918 172.16.0.0/12 address prohibited." };
      if (o1 === 169 && o2 === 254) return { isValid: false, error: "SSRF Block: Link-local 169.254.0.0/16 metadata address prohibited." };
      if (o1 === 0) return { isValid: false, error: "SSRF Block: Current network 0.0.0.0/8 prohibited." };
    }

    // Check IPv6 loopbacks
    if (host === '::1' || host.startsWith('fc00:') || host.startsWith('fe80:')) {
      return { isValid: false, error: "SSRF Block: IPv6 private/link-local address prohibited." };
    }

    return { isValid: true, normalizedUrl: url.toString() };
  } catch (err) {
    return { isValid: false, error: "Invalid URL syntax. Please enter a valid http:// or https:// address." };
  }
}
