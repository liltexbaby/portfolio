#!/usr/bin/env bash
# ============================================================
# scripts/audit-production.sh
#
# Quick sanity-check for "ClickFix" / clipboard-hijack malware
# injected into the live production site.
#
# Usage:
#   chmod +x scripts/audit-production.sh
#   ./scripts/audit-production.sh [https://jonathanpinto.net]
#
# What it does:
#  1. Fetches the raw HTML of your production site
#  2. Scans it for patterns used by "paste-this-into-terminal" attacks
#  3. Prints the response headers so you can verify CSP is active
#  4. Shows you the <script> tags present so you can spot unknowns
# ============================================================

set -euo pipefail

URL="${1:-https://jonathanpinto.net}"
TMPFILE=$(mktemp)
HEADERFILE=$(mktemp)

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo ""
echo -e "${CYAN}========================================"
echo " Portfolio Production Security Audit"
echo -e "========================================${NC}"
echo " Target: $URL"
echo ""

# ── 1. Fetch page + headers ──────────────────────────────────
echo -e "${CYAN}[1/4] Fetching $URL ...${NC}"
HTTP_CODE=$(curl -s -o "$TMPFILE" -D "$HEADERFILE" -w "%{http_code}" \
  --max-time 15 \
  -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) SecurityAudit/1.0" \
  "$URL" || true)

if [[ "$HTTP_CODE" != "200" ]]; then
  echo -e "${RED}  ✗ Got HTTP $HTTP_CODE — cannot proceed with content scan.${NC}"
  exit 1
fi
echo -e "${GREEN}  ✓ HTTP 200 OK${NC}"

# ── 2. Check security headers ────────────────────────────────
echo ""
echo -e "${CYAN}[2/4] Response security headers:${NC}"

check_header() {
  local header="$1"
  local value
  value=$(grep -i "^${header}:" "$HEADERFILE" | head -1 | sed 's/^[^:]*: //' | tr -d '\r' || true)
  if [[ -n "$value" ]]; then
    echo -e "  ${GREEN}✓${NC} $header: $value"
  else
    echo -e "  ${YELLOW}⚠${NC} $header: NOT SET"
  fi
}

check_header "content-security-policy"
check_header "x-content-type-options"
check_header "x-frame-options"
check_header "x-xss-protection"
check_header "strict-transport-security"
check_header "referrer-policy"
check_header "permissions-policy"

# ── 3. Scan HTML for malware patterns ───────────────────────
echo ""
echo -e "${CYAN}[3/4] Scanning HTML for ClickFix / clipboard-hijack patterns:${NC}"

FOUND_ISSUES=0

scan_pattern() {
  local label="$1"
  local pattern="$2"
  local hits
  hits=$(grep -oiE "$pattern" "$TMPFILE" 2>/dev/null | head -5 || true)
  if [[ -n "$hits" ]]; then
    echo -e "  ${RED}✗ FOUND — $label:${NC}"
    echo "$hits" | sed 's/^/      /'
    FOUND_ISSUES=$((FOUND_ISSUES + 1))
  else
    echo -e "  ${GREEN}✓${NC} $label — clean"
  fi
}

scan_pattern "Clipboard write (copy attack)"      "navigator\.clipboard|execCommand\(['\"]copy"
scan_pattern "Fake CAPTCHA / verification UI"     "(verify you are human|im not a robot|cloudflare.*verify|press.*win.*r)"
scan_pattern "Terminal / PowerShell prompt"       "(open.*terminal|press.*win\+r|powershell|cmd\.exe)"
scan_pattern "curl/wget pipe to shell"            "curl[^<\"']{0,80}\| ?(sh|bash)|wget[^<\"']{0,80}\| ?(sh|bash)"
scan_pattern "eval() with encoded payload"        "eval\(atob\(|eval\(unescape\(|eval\(String\.fromCharCode"
scan_pattern "atob / base64 decode"               "atob\(['\"]"
scan_pattern "document.write injection"           "document\.write\("
scan_pattern "innerHTML assignment"               "innerHTML\s*="
scan_pattern "iwr / Invoke-WebRequest"            "iwr |Invoke-WebRequest"

# ── 4. List <script> tags ────────────────────────────────────
echo ""
echo -e "${CYAN}[4/4] External <script> tags found:${NC}"
SCRIPTS=$(grep -oiE '<script[^>]*src="[^"]*"[^>]*>' "$TMPFILE" 2>/dev/null || true)
if [[ -z "$SCRIPTS" ]]; then
  echo -e "  ${GREEN}✓${NC} No external scripts — only inline/self-hosted bundles"
else
  echo "$SCRIPTS" | while IFS= read -r line; do
    echo "  $line"
  done
fi

# ── Summary ─────────────────────────────────────────────────
echo ""
echo -e "${CYAN}========================================${NC}"
if [[ "$FOUND_ISSUES" -eq 0 ]]; then
  echo -e "${GREEN}  ✓ All pattern checks passed — no injected malware found${NC}"
else
  echo -e "${RED}  ✗ $FOUND_ISSUES suspicious pattern(s) detected above!${NC}"
  echo -e "${YELLOW}  The raw HTML has been saved to: $TMPFILE${NC}"
  echo "  Open it to inspect the full source:"
  echo "    cat $TMPFILE | less"
fi
echo ""
echo "  Raw HTML: $TMPFILE"
echo "  Headers:  $HEADERFILE"
echo -e "${CYAN}========================================${NC}"
echo ""
