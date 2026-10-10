/**
 * Security and Anti-Cyber Attack Protection Utilities for HYDRA MOTORSPORT
 * Implements defenses against:
 * - XSS (Cross-Site Scripting)
 * - CRLF / Header Injection (Email / SMTP header splitting)
 * - Automated Bot Flooding & Spam (Honeypot + Time-based heuristics)
 * - Denial of Service / Request Flooding (Rate limiting & cooldown)
 * - Malicious URLs / Protocol Injection
 */

export interface SecurityValidationResult {
  isValid: boolean;
  sanitizedValue: string;
  errorMessage?: string;
}

// Memory-based rate limiter store (per session)
const submissionHistory: number[] = [];
const MAX_SUBMISSIONS_PER_WINDOW = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MINIMUM_SUBMISSION_INTERVAL_MS = 4000; // 4 seconds between submits
const MINIMUM_FORM_FILL_TIME_MS = 1200; // 1.2s to detect automated headless bots

/**
 * Strips HTML tags, script vectors, and dangerous attributes
 */
export function sanitizeText(input: string, maxLength: number = 2000): string {
  if (typeof input !== 'string') return '';

  let sanitized = input
    // Remove null bytes and invisible control characters (except space, tab, newline)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    // Normalize unicode
    .normalize('NFKC')
    // Remove script tags and content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove HTML tags
    .replace(/<\/?[^>]+(>|$)/g, '')
    // Remove javascript: and data: URI schemes
    .replace(/javascript:/gi, '')
    .replace(/data:text\/html/gi, '')
    // Remove DOM event handlers like onerror=, onclick=
    .replace(/on\w+\s*=/gi, '');

  if (sanitized.length > maxLength) {
    sanitized = sanitized.slice(0, maxLength);
  }

  return sanitized.trim();
}

/**
 * Strips CRLF characters (\r and \n) to prevent email header injection (Bcc/Cc injection)
 */
export function sanitizeHeaderField(input: string, maxLength: number = 120): string {
  const text = sanitizeText(input, maxLength);
  // Strictly remove all line breaks to prevent SMTP / CRLF injection
  return text.replace(/[\r\n\t]/g, ' ').replace(/\s+/g, ' ').trim();
}

/**
 * Validates email with RFC 5322 regex and prevents newline injection
 */
export function validateEmailSecure(email: string): SecurityValidationResult {
  const sanitized = sanitizeHeaderField(email, 254).toLowerCase();

  if (!sanitized) {
    return { isValid: false, sanitizedValue: '', errorMessage: 'Email address is required' };
  }

  // Strict email regex rejecting newlines, quotes, or dangerous characters
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  if (!emailRegex.test(sanitized)) {
    return { isValid: false, sanitizedValue: sanitized, errorMessage: 'Invalid email address format' };
  }

  // Prevent internal domain spoofing or common malicious injection patterns
  if (sanitized.includes('..') || sanitized.startsWith('.') || sanitized.endsWith('.')) {
    return { isValid: false, sanitizedValue: sanitized, errorMessage: 'Malformed email format detected' };
  }

  return { isValid: true, sanitizedValue: sanitized };
}

/**
 * Rate Limiter check: prevents brute-force spam or DDoS-style submission floods
 */
export function checkRateLimit(): { allowed: boolean; waitSeconds?: number } {
  const now = Date.now();

  // Purge old entries
  while (submissionHistory.length > 0 && now - submissionHistory[0] > RATE_LIMIT_WINDOW_MS) {
    submissionHistory.shift();
  }

  // Check frequency interval
  if (submissionHistory.length > 0) {
    const lastSubmission = submissionHistory[submissionHistory.length - 1];
    const diff = now - lastSubmission;
    if (diff < MINIMUM_SUBMISSION_INTERVAL_MS) {
      const waitSeconds = Math.ceil((MINIMUM_SUBMISSION_INTERVAL_MS - diff) / 1000);
      return { allowed: false, waitSeconds };
    }
  }

  // Check maximum requests in window
  if (submissionHistory.length >= MAX_SUBMISSIONS_PER_WINDOW) {
    const oldest = submissionHistory[0];
    const waitSeconds = Math.ceil((RATE_LIMIT_WINDOW_MS - (now - oldest)) / 1000);
    return { allowed: false, waitSeconds };
  }

  return { allowed: true };
}

/**
 * Record a valid submission in the rate-limiter
 */
export function recordSubmission(): void {
  submissionHistory.push(Date.now());
}

/**
 * Heuristic bot validation:
 * - Checks honeypot field (must be empty)
 * - Checks form completion duration (cannot be instantaneous)
 */
export function validateBotSecurity(
  honeypotValue: string,
  formMountedTimestamp: number
): { isHuman: boolean; reason?: string } {
  // If bot filled the hidden honeypot
  if (honeypotValue && honeypotValue.trim().length > 0) {
    return { isHuman: false, reason: 'Automated agent detected via trap parameter' };
  }

  // If submitted too fast (sub-human headless script)
  const elapsed = Date.now() - formMountedTimestamp;
  if (elapsed < MINIMUM_FORM_FILL_TIME_MS) {
    return { isHuman: false, reason: 'Request completed unnaturally fast' };
  }

  return { isHuman: true };
}

/**
 * Generates an audit verification reference token (e.g. HYD-SEC-2026-A89F)
 */
export function generateAuditReference(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let rand = '';
  for (let i = 0; i < 6; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const year = 2026;
  return `HYD-SEC-${year}-${rand}`;
}
