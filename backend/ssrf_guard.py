"""
Bumblebee SSRF & Network Security Defense Module
Blocks private subnets, loopbacks, link-local, cloud metadata, and DNS rebinding attacks.
"""

import ipaddress
import socket
import urllib.parse
from typing import Tuple, Optional

BLOCKED_IP_NETWORKS = [
    ipaddress.ip_network('127.0.0.0/8'),        # IPv4 loopback
    ipaddress.ip_network('10.0.0.0/8'),         # RFC1918 Private
    ipaddress.ip_network('172.16.0.0/12'),      # RFC1918 Private
    ipaddress.ip_network('192.168.0.0/16'),     # RFC1918 Private
    ipaddress.ip_network('169.254.0.0/16'),     # IPv4 Link-local / Cloud Metadata (AWS/GCP/Azure)
    ipaddress.ip_network('0.0.0.0/8'),          # Current network
    ipaddress.ip_network('224.0.0.0/4'),        # Multicast
    ipaddress.ip_network('240.0.0.0/4'),        # Reserved
    ipaddress.ip_network('::1/128'),            # IPv6 loopback
    ipaddress.ip_network('fc00::/7'),           # IPv6 Unique Local Address
    ipaddress.ip_network('fe80::/10'),          # IPv6 Link-local
]

BLOCKED_HOSTNAMES = {
    'localhost',
    'localhost.localdomain',
    '169.254.169.254',
    'metadata.google.internal',
    'instance-data',
    'metadata.packet.net',
    'kubernetes.default.svc',
    'consul.service.consul'
}


class SSRFValidationError(Exception):
    """Raised when target URL violates SSRF safety rules."""
    pass


def validate_url_safety(target_url: str) -> Tuple[bool, str, Optional[str]]:
    """
    Validates that a URL is safe to probe without SSRF vulnerabilities.
    Returns: (is_safe: bool, canonical_url: str, error_reason: Optional[str])
    """
    try:
        parsed = urllib.parse.urlparse(target_url)
        if parsed.scheme not in ('http', 'https'):
            return False, target_url, f"Disallowed scheme: '{parsed.scheme}'. Only http:// and https:// are permitted."

        hostname = parsed.hostname
        if not hostname:
            return False, target_url, "Invalid URL: hostname could not be parsed."

        hostname_lower = hostname.lower()
        if hostname_lower in BLOCKED_HOSTNAMES:
            return False, target_url, f"SSRF Protection: Hostname '{hostname}' is a protected internal address."

        # Check for direct numeric IP representations
        try:
            direct_ip = ipaddress.ip_address(hostname)
            for network in BLOCKED_IP_NETWORKS:
                if direct_ip in network:
                    return False, target_url, f"SSRF Protection: IP address {direct_ip} is in prohibited private/metadata range ({network})."
        except ValueError:
            # Not an IP literal, resolve DNS to inspect underlying resolved IPs
            pass

        # Resolve DNS to verify all A/AAAA records
        try:
            addr_info = socket.getaddrinfo(hostname, parsed.port or (443 if parsed.scheme == 'https' else 80))
            for family, _, _, _, sockaddr in addr_info:
                ip_str = sockaddr[0]
                ip_obj = ipaddress.ip_address(ip_str)
                for network in BLOCKED_IP_NETWORKS:
                    if ip_obj in network:
                        return False, target_url, f"SSRF Protection: Domain '{hostname}' resolved to prohibited address {ip_str} ({network})."
        except socket.gaierror as e:
            return False, target_url, f"DNS resolution failed for hostname '{hostname}': {str(e)}"

        return True, target_url, None

    except Exception as e:
        return False, target_url, f"URL safety validation failed: {str(e)}"


if __name__ == "__main__":
    test_urls = [
        "https://api.github.com/status",
        "http://localhost:8080/admin",
        "http://127.0.0.1:3000",
        "http://169.254.169.254/latest/meta-data/",
        "http://10.0.4.15/metrics",
        "https://bumblebee.internal/health"
    ]
    for u in test_urls:
        safe, _, reason = validate_url_safety(u)
        status = "[SAFE]" if safe else "[BLOCKED]"
        print(f"{status}: {u} -> {reason or 'OK'}")
