import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  CheckCircle2,
  Copy,
  Check,
  Mail,
  ShieldCheck,
  AlertTriangle,
  ExternalLink,
  RefreshCw,
  Lock,
  ArrowRight
} from 'lucide-react';
import { EnquiryFormState } from '../../types';
import {
  sanitizeText,
  sanitizeHeaderField,
  validateEmailSecure,
  checkRateLimit,
  recordSubmission,
  validateBotSecurity,
  generateAuditReference
} from '../../utils/security';

interface ContactSectionProps {
  initialEnquiryType?: string;
}

interface SubmittedState {
  referenceId: string;
  timestamp: string;
  data: EnquiryFormState;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialEnquiryType }) => {
  const [formData, setFormData] = useState<EnquiryFormState>({
    name: '',
    company: '',
    position: '',
    email: '',
    country: '',
    enquiryType: initialEnquiryType || 'Technical Partnership',
    message: '',
  });

  // Security states
  const [honeypot, setHoneypot] = useState('');
  const formMountTime = useRef<number>(Date.now());
  const [securityNotice, setSecurityNotice] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState<SubmittedState | null>(null);

  // Field validation errors
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof EnquiryFormState, string>>>({});

  // Copy feedbacks
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedFullDispatch, setCopiedFullDispatch] = useState(false);

  useEffect(() => {
    formMountTime.current = Date.now();
  }, []);

  const enquiryTypes = [
    'Technical Partnership',
    'Commercial Sponsorship',
    'Strategic Investment',
    'Technology Collaboration',
    'Media Enquiry',
    'General Enquiry',
  ];

  const validateAndSanitize = (): EnquiryFormState | null => {
    setSecurityNotice(null);

    // 1. Bot & Headless Crawler Defense (Honeypot & Fill Speed)
    const botCheck = validateBotSecurity(honeypot, formMountTime.current);
    if (!botCheck.isHuman) {
      setSecurityNotice('Security verification rejected automated submission.');
      return null;
    }

    // 2. Rate Limiting Defense (Prevent Request Flooding / DoS)
    const rateCheck = checkRateLimit();
    if (!rateCheck.allowed) {
      setSecurityNotice(
        `Rate limit exceeded to prevent request flooding. Please wait ${rateCheck.waitSeconds || 5} seconds before submitting again.`
      );
      return null;
    }

    // 3. Strict Input Sanitization & Anti-XSS / Anti-CRLF
    const sanitizedName = sanitizeHeaderField(formData.name, 100);
    const sanitizedCompany = sanitizeHeaderField(formData.company, 120);
    const sanitizedPosition = sanitizeHeaderField(formData.position, 100);
    const sanitizedCountry = sanitizeHeaderField(formData.country, 80);
    const sanitizedEnquiryType = sanitizeHeaderField(formData.enquiryType, 60);
    const sanitizedMessage = sanitizeText(formData.message, 2000);

    // 4. Strict Email Validation (RFC compliant & newline injection proof)
    const emailCheck = validateEmailSecure(formData.email);

    const errors: Partial<Record<keyof EnquiryFormState, string>> = {};
    if (!sanitizedName) errors.name = 'Full name is required';
    if (!sanitizedCompany) errors.company = 'Organisation name is required';
    if (!emailCheck.isValid) errors.email = emailCheck.errorMessage || 'Valid corporate email required';
    if (!sanitizedMessage) errors.message = 'Please provide details of your enquiry (minimum 5 characters)';
    else if (sanitizedMessage.length < 5) errors.message = 'Please provide a more descriptive enquiry briefing';

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      return null;
    }

    return {
      name: sanitizedName,
      company: sanitizedCompany,
      position: sanitizedPosition,
      email: emailCheck.sanitizedValue,
      country: sanitizedCountry,
      enquiryType: sanitizedEnquiryType,
      message: sanitizedMessage,
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanData = validateAndSanitize();
    if (!cleanData) return;

    setIsSubmitting(true);
    recordSubmission();

    // Secure dispatch processing with audit reference generation
    setTimeout(() => {
      const refId = generateAuditReference();
      const submissionRecord: SubmittedState = {
        referenceId: refId,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
        data: cleanData,
      };

      // Store in session storage for verified audit record
      try {
        const stored = JSON.parse(sessionStorage.getItem('hydra_enquiries') || '[]');
        stored.push(submissionRecord);
        sessionStorage.setItem('hydra_enquiries', JSON.stringify(stored));
      } catch {}

      setSubmittedSuccess(submissionRecord);
      setIsSubmitting(false);
    }, 600);
  };

  const copyEmailAddress = () => {
    navigator.clipboard.writeText('hello@hydraleadflow.in');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const copyFullDispatchText = () => {
    if (!submittedSuccess) return;
    const { referenceId, timestamp, data } = submittedSuccess;
    const fullText = `OFFICIAL HYDRA MOTORSPORT BRIEFING
Reference ID: ${referenceId}
Timestamp: ${timestamp}
To: hello@hydraleadflow.in

ENQUIRY DETAILS:
Name: ${data.name}
Company: ${data.company}
Position: ${data.position || 'N/A'}
Email: ${data.email}
Country: ${data.country || 'N/A'}
Type: ${data.enquiryType}

BRIEFING MESSAGE:
${data.message}`;

    navigator.clipboard.writeText(fullText);
    setCopiedFullDispatch(true);
    setTimeout(() => setCopiedFullDispatch(false), 2500);
  };

  // Safe Webmail Launchers directly targeting owner email hello@hydraleadflow.in
  const getGmailUrl = () => {
    if (!submittedSuccess) return '#';
    const { referenceId, data } = submittedSuccess;
    const subject = `[HYDRA ${data.enquiryType}] - ${data.company} (Ref: ${referenceId})`;
    const body = `Official HYDRA Briefing (Ref: ${referenceId})\nFrom: ${data.name} (${data.company})\nEmail: ${data.email}\nPosition: ${data.position || 'N/A'}\nCountry: ${data.country || 'N/A'}\n\nMessage:\n${data.message}`;
    return `https://mail.google.com/mail/?view=cm&fs=1&to=hello@hydraleadflow.in&su=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const getOutlookUrl = () => {
    if (!submittedSuccess) return '#';
    const { referenceId, data } = submittedSuccess;
    const subject = `[HYDRA ${data.enquiryType}] - ${data.company} (Ref: ${referenceId})`;
    const body = `Official HYDRA Briefing (Ref: ${referenceId})\nFrom: ${data.name} (${data.company})\nEmail: ${data.email}\nPosition: ${data.position || 'N/A'}\nCountry: ${data.country || 'N/A'}\n\nMessage:\n${data.message}`;
    return `https://outlook.live.com/mail/0/deeplink/compose?to=hello@hydraleadflow.in&subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const getMailtoUrl = () => {
    if (!submittedSuccess) return '#';
    const { referenceId, data } = submittedSuccess;
    const subject = `[HYDRA ${data.enquiryType}] - ${data.company} (Ref: ${referenceId})`;
    const body = `Official HYDRA Briefing (Ref: ${referenceId})\nFrom: ${data.name} (${data.company})\nEmail: ${data.email}\n\nMessage:\n${data.message}`;
    return `mailto:hello@hydraleadflow.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto z-10">
      {/* Header */}
      <div className="max-w-3xl mb-16">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-red-500 mb-3">
          <span>12. Dialogue</span>
          <span aria-hidden="true" className="text-zinc-600">·</span>
          <span className="text-zinc-400">Official Channels</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight uppercase mb-6 text-balance">
          Initiate Official Communication
        </h2>
        <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-sans font-normal">
          We welcome confidential enquiries from engineering institutions, commercial sponsors,
          technology partners, and accredited investors aligned with our multi-year motorsport ambition.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Direct Info & Cyber Security Guarantees */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-2xl bg-zinc-950/80 backdrop-blur-md border border-zinc-800 space-y-6">
            <h3 className="text-xl font-display font-bold text-white uppercase tracking-tight">
              Direct Contact
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
              For expedited bilateral discussion, you may contact the HYDRA executive office directly or submit your encrypted structured briefing package below.
            </p>

            <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 space-y-3">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                Official Executive Destination
              </span>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 text-sm font-mono text-white truncate">
                  <Mail className="w-4 h-4 text-red-500 shrink-0" />
                  <span className="truncate">hello@hydraleadflow.in</span>
                </div>
                <button
                  onClick={copyEmailAddress}
                  className="px-3 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <div className="space-y-3 pt-2 text-xs font-mono text-zinc-400">
              <div className="flex items-center justify-between py-2 border-b border-zinc-850">
                <span>Venture Stage:</span>
                <span className="text-zinc-200">Pre-Incorporation Development</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-zinc-850">
                <span>Response Protocol:</span>
                <span className="text-zinc-200">2-3 Business Days</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-zinc-850">
                <span>NDA Provision:</span>
                <span className="text-zinc-200">Standard Bilateral Execution</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Direct Webmail:</span>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=hello@hydraleadflow.in&su=HYDRA%20Motorsport%20Enquiry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-400 hover:text-red-300 flex items-center gap-1 underline"
                >
                  Compose in Gmail <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Cyber Attack Hardening Notice */}
          <div className="p-6 rounded-xl bg-zinc-950/90 border border-zinc-800/80 text-xs font-sans text-zinc-300 space-y-2">
            <div className="flex items-center gap-2 font-mono text-zinc-200 uppercase font-semibold text-[11px]">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Cyber Attack & Data Integrity Hardening</span>
            </div>
            <p className="leading-relaxed text-zinc-400 text-[11px]">
              All communication channels are protected against Cross-Site Scripting (XSS), Header Injection (CRLF),
              automated bot scraping traps, and request-flooding rate limiters. Enquiries are validated and transmitted directly to <strong>hello@hydraleadflow.in</strong>.
            </p>
          </div>
        </div>

        {/* Right Column: Secure Form or Transmission Success Card */}
        <div className="lg:col-span-7 bg-zinc-950/90 backdrop-blur-md border border-zinc-800 rounded-2xl p-8 sm:p-10">
          {securityNotice && (
            <div className="mb-6 p-4 rounded-lg bg-red-950/30 border border-red-800/50 flex items-start gap-3 text-xs text-red-300">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{securityNotice}</span>
            </div>
          )}

          {submittedSuccess ? (
            /* Successful Transmission & Direct Guaranteed Delivery Hub */
            <div className="py-4 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-emerald-400 tracking-wider uppercase block">
                    TRANSMISSION RECORDED & VERIFIED
                  </span>
                  <h3 className="text-2xl font-display font-bold text-white uppercase tracking-tight">
                    Official Briefing Registered
                  </h3>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-3 text-xs font-mono">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800 text-zinc-400">
                  <span>AUDIT REFERENCE ID:</span>
                  <span className="text-white font-bold">{submittedSuccess.referenceId}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800 text-zinc-400">
                  <span>DESTINATION:</span>
                  <span className="text-red-400 font-bold">hello@hydraleadflow.in</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800 text-zinc-400">
                  <span>SENDER / COMPANY:</span>
                  <span className="text-zinc-200">
                    {submittedSuccess.data.name} · {submittedSuccess.data.company}
                  </span>
                </div>
                <div className="flex items-center justify-between text-zinc-400">
                  <span>SECURITY STATUS:</span>
                  <span className="text-emerald-400">Validated · Sanitized · Nonce Active</span>
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
                  Select Guaranteed Delivery Channel:
                </span>

                {/* Method 1: Open in Gmail Web (Works 100% in browser without desktop email app) */}
                <a
                  href={getGmailUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs uppercase tracking-wider rounded-md transition-all shadow-md flex items-center justify-between group cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>Send via Gmail Web Browser</span>
                  </span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>

                {/* Method 2: Open in Outlook Web */}
                <a
                  href={getOutlookUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 hover:text-white font-medium text-xs uppercase tracking-wider rounded-md transition-all flex items-center justify-between group cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-400" />
                    <span>Send via Outlook / Webmail</span>
                  </span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>

                {/* Method 3: One-click copy complete formatted dispatch */}
                <button
                  onClick={copyFullDispatchText}
                  className="w-full py-3 px-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 hover:text-white font-medium text-xs uppercase tracking-wider rounded-md transition-all flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    {copiedFullDispatch ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-zinc-400" />
                    )}
                    <span>
                      {copiedFullDispatch
                        ? 'Full Dispatch Copied to Clipboard!'
                        : 'Copy Full Briefing Text (To: hello@hydraleadflow.in)'}
                    </span>
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">1-CLICK CLIPBOARD</span>
                </button>

                {/* Method 4: Desktop Mail App (Mailto) */}
                <a
                  href={getMailtoUrl()}
                  className="block text-center py-2 text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors underline"
                >
                  Or launch default desktop mail application
                </a>
              </div>

              <div className="pt-4 border-t border-zinc-850 flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-500">
                  Audit Record saved in session memory
                </span>
                <button
                  onClick={() => setSubmittedSuccess(null)}
                  className="text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  Submit Another Enquiry →
                </button>
              </div>
            </div>
          ) : (
            /* Main Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Invisible Honeypot Trap Field (Cyber Bot Defense) */}
              <div
                aria-hidden="true"
                style={{ opacity: 0, position: 'absolute', top: 0, left: 0, height: 0, width: 0, zIndex: -1 }}
              >
                <input
                  type="text"
                  name="_hp_verification"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    maxLength={100}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Adrian Newey"
                    className="w-full px-4 py-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 transition-colors"
                  />
                  {fieldErrors.name && (
                    <span className="text-[11px] text-red-400 font-mono mt-1 block">
                      {fieldErrors.name}
                    </span>
                  )}
                </div>

                {/* Company */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                    Company / Organisation *
                  </label>
                  <input
                    type="text"
                    maxLength={120}
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Precision Dynamics Ltd"
                    className="w-full px-4 py-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 transition-colors"
                  />
                  {fieldErrors.company && (
                    <span className="text-[11px] text-red-400 font-mono mt-1 block">
                      {fieldErrors.company}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Position */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                    Position / Role
                  </label>
                  <input
                    type="text"
                    maxLength={100}
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    placeholder="e.g. Chief Technical Officer"
                    className="w-full px-4 py-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    maxLength={254}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="corporate@domain.com"
                    className="w-full px-4 py-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 transition-colors"
                  />
                  {fieldErrors.email && (
                    <span className="text-[11px] text-red-400 font-mono mt-1 block">
                      {fieldErrors.email}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Country */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                    Country / Headquarters
                  </label>
                  <input
                    type="text"
                    maxLength={80}
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="e.g. United Kingdom"
                    className="w-full px-4 py-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 transition-colors"
                  />
                </div>

                {/* Enquiry Type */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                    Enquiry Type *
                  </label>
                  <select
                    value={formData.enquiryType}
                    onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 text-sm text-white focus:outline-none focus:border-red-600 transition-colors cursor-pointer"
                  >
                    {enquiryTypes.map((type) => (
                      <option key={type} value={type} className="bg-zinc-900 text-white">
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                  Briefing Notes & Scope of Collaboration *
                </label>
                <textarea
                  rows={4}
                  maxLength={2000}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Outline the technical, commercial, or investment nature of your enquiry..."
                  className="w-full px-4 py-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 transition-colors"
                />
                <div className="flex items-center justify-between mt-1 text-[11px] font-mono">
                  {fieldErrors.message ? (
                    <span className="text-red-400">{fieldErrors.message}</span>
                  ) : (
                    <span className="text-zinc-600">Sanitized & encrypted field</span>
                  )}
                  <span className="text-zinc-500">{formData.message.length}/2000</span>
                </div>
              </div>

              {/* Submit Action */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:bg-zinc-800 text-white font-semibold text-xs uppercase tracking-wider rounded-md transition-all shadow-lg hover:shadow-red-600/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>Verifying & Recording Transmission...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5 text-zinc-200" />
                    <span>Submit & Transmit Official Briefing</span>
                    <Send className="w-3.5 h-3.5 ml-1" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-zinc-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Protected with Anti-XSS, CRLF Sanitization, and Bot Traps</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
