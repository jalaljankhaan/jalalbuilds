"use client";

import { useEffect, useState, type ReactNode } from "react";
import { isValidEmail } from "@/lib/utils/emailValidation";

type PackageOption = { id: string; label: string };

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
  packageId: "",
};

/** Visual + a11y “required” marker used across the form. */
function RequiredLabel({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-semibold text-[#173126]">
      {children}{" "}
      <span className="font-semibold text-[#8b281e]" aria-hidden>
        *
      </span>
      <span className="sr-only"> (required)</span>
    </label>
  );
}

export function Contact() {
  const [form, setForm] = useState(initialForm);
  const [packages, setPackages] = useState<PackageOption[]>([]);
  const [packagesLoading, setPackagesLoading] = useState(true);
  const [packagesError, setPackagesError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    subject?: string;
    packageId?: string;
    message?: string;
  }>({});

  useEffect(() => {
    let cancelled = false;
    const ac = new AbortController();

    (async () => {
      try {
        const res = await fetch("/api/contact-packages", {
          signal: ac.signal,
          headers: { Accept: "application/json" },
          cache: "no-store",
        });

        const text = await res.text();
        let parsed: { packages?: unknown; error?: string } = {};
        try {
          parsed = text ? (JSON.parse(text) as typeof parsed) : {};
        } catch {
          if (!cancelled) {
            setPackages([]);
            setPackagesError(
              "Could not load packages. The server returned an unexpected response.",
            );
          }
          return;
        }

        if (cancelled) return;

        const list = parsed.packages;
        setPackages(Array.isArray(list) ? (list as PackageOption[]) : []);

        if (!res.ok) {
          setPackagesError("Could not load packages. Refresh or try again later.");
        } else if (parsed.error === "failed_to_load") {
          setPackagesError(
            "Could not load packages. Apply D1 migrations (`npm run db:migrate:local`) and retry.",
          );
        } else {
          setPackagesError(null);
        }
      } catch (e) {
        if (cancelled) return;
        if (e instanceof DOMException && e.name === "AbortError") return;
        setPackages([]);
        setPackagesError("Could not load packages. Check your connection.");
      } finally {
        if (!cancelled) setPackagesLoading(false);
      }
    })();

    return () => {
      cancelled = true;
      ac.abort();
    };
  }, []);

  function validateForm(): boolean {
    const next: typeof fieldErrors = {};
    if (!form.name.trim()) next.name = "Name is required.";
    const em = form.email.trim();
    if (!em) next.email = "Email is required.";
    else if (!isValidEmail(em)) next.email = "Enter a valid email address.";
    if (!form.subject.trim()) next.subject = "Subject is required.";
    if (!form.packageId) next.packageId = "Please select a package.";
    if (form.message.trim().length < 10) {
      next.message = "Message must be at least 10 characters.";
    }
    setFieldErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);
    if (!validateForm()) {
      setStatus("idle");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
          packageId: form.packageId,
        }),
      });

      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
      };

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setForm(initialForm);
      setFieldErrors({});
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Check your connection and try again.");
    }
  }

  const inputRing =
    "mt-2 w-full border bg-[#f6fff8] py-3.5 text-[#06110d] outline-none transition-colors placeholder:text-[#6e8b79] focus:ring-2";
  const inputPad = "px-4";
  /** Extra 10px on the right so text clears the native dropdown arrow. */
  const selectPad = "pl-4 pr-[calc(1rem+10px)]";
  const inputOk = `${inputRing} ${inputPad} border-[#8cb49b] focus:border-[#173126] focus:ring-[#55ed88]/35`;
  const inputErr = `${inputRing} ${inputPad} border-[#a83a2c] focus:border-[#8b281e] focus:ring-[#a83a2c]/20`;
  const selectOk = `${inputRing} ${selectPad} border-[#8cb49b] focus:border-[#173126] focus:ring-[#55ed88]/35`;
  const selectErr = `${inputRing} ${selectPad} border-[#a83a2c] focus:border-[#8b281e] focus:ring-[#a83a2c]/20`;

  return (
    <section
      id="contact"
      className="border-t border-[#29483b] bg-[#8cfbb0] py-20 text-[#06110d]"
    >
      <div className="shell grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
        <div>
          <h2 className="section-title">Build what moves your business forward.</h2>
          <p className="mt-7 max-w-md text-base leading-7 text-[#244738] sm:text-lg">
            Tell us where the product is today, what needs to change, and what a strong
            next step looks like.
          </p>
        </div>

        <div>
          <form
            onSubmit={handleSubmit}
            className="border border-[#4f8f69] bg-[#e5f7eb] p-6 sm:p-8 md:p-10"
            noValidate
          >
            <p className="mb-6 text-sm text-[#365f4c]">
              <span className="font-semibold text-[#8b281e]">*</span> All fields are
              required.
            </p>

            <div className="space-y-5">
              <div>
                <RequiredLabel htmlFor="lead-name">Name</RequiredLabel>
                <input
                  id="lead-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  aria-required="true"
                  aria-invalid={Boolean(fieldErrors.name)}
                  maxLength={120}
                  value={form.name}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, name: e.target.value }));
                    if (fieldErrors.name)
                      setFieldErrors((fe) => ({ ...fe, name: undefined }));
                  }}
                  className={fieldErrors.name ? inputErr : inputOk}
                  placeholder="Your name"
                />
                {fieldErrors.name && (
                  <p className="mt-1 text-sm text-[#8b281e]" role="alert">
                    {fieldErrors.name}
                  </p>
                )}
              </div>

              <div>
                <RequiredLabel htmlFor="lead-email">Email</RequiredLabel>
                <input
                  id="lead-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  required
                  aria-required="true"
                  aria-invalid={Boolean(fieldErrors.email)}
                  maxLength={255}
                  value={form.email}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, email: e.target.value }));
                    if (fieldErrors.email)
                      setFieldErrors((fe) => ({ ...fe, email: undefined }));
                  }}
                  onBlur={(e) => {
                    const v = e.target.value.trim();
                    if (v && !isValidEmail(v)) {
                      setFieldErrors((fe) => ({
                        ...fe,
                        email: "Enter a valid email address.",
                      }));
                    }
                  }}
                  className={fieldErrors.email ? inputErr : inputOk}
                  placeholder="you@company.com"
                />
                {fieldErrors.email && (
                  <p className="mt-1 text-sm text-[#8b281e]" role="alert">
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              <div>
                <RequiredLabel htmlFor="lead-subject">Subject</RequiredLabel>
                <input
                  id="lead-subject"
                  name="subject"
                  type="text"
                  required
                  aria-required="true"
                  aria-invalid={Boolean(fieldErrors.subject)}
                  maxLength={200}
                  value={form.subject}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, subject: e.target.value }));
                    if (fieldErrors.subject)
                      setFieldErrors((fe) => ({ ...fe, subject: undefined }));
                  }}
                  className={fieldErrors.subject ? inputErr : inputOk}
                  placeholder="e.g. Flutter app for iOS & Android"
                />
                {fieldErrors.subject && (
                  <p className="mt-1 text-sm text-[#8b281e]" role="alert">
                    {fieldErrors.subject}
                  </p>
                )}
              </div>

              <div>
                <RequiredLabel htmlFor="lead-package">Select Package</RequiredLabel>
                <select
                  id="lead-package"
                  name="packageId"
                  required
                  aria-required="true"
                  aria-invalid={Boolean(fieldErrors.packageId)}
                  disabled={packagesLoading || packages.length === 0}
                  value={form.packageId}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, packageId: e.target.value }));
                    if (fieldErrors.packageId) {
                      setFieldErrors((fe) => ({ ...fe, packageId: undefined }));
                    }
                  }}
                  className={fieldErrors.packageId ? selectErr : selectOk}
                >
                  <option value="">
                    {packagesLoading ? "Loading packages…" : "Select a package"}
                  </option>
                  {packages.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label}
                    </option>
                  ))}
                </select>
                {packagesError && (
                  <p className="mt-1 text-sm text-[#6b4b00]" role="status">
                    {packagesError}
                  </p>
                )}
                {!packagesLoading && packages.length === 0 && !packagesError && (
                  <p className="mt-1 text-sm text-[#6b4b00]" role="status">
                    No packages in the database yet. Run{" "}
                    <code className="bg-[#eef0a4] px-1 text-xs">
                      npm run db:migrate:local
                    </code>{" "}
                    to seed contact packages.
                  </p>
                )}
                {fieldErrors.packageId && (
                  <p className="mt-1 text-sm text-[#8b281e]" role="alert">
                    {fieldErrors.packageId}
                  </p>
                )}
              </div>

              <div>
                <RequiredLabel htmlFor="lead-message">Message</RequiredLabel>
                <textarea
                  id="lead-message"
                  name="message"
                  required
                  aria-required="true"
                  aria-invalid={Boolean(fieldErrors.message)}
                  rows={5}
                  minLength={10}
                  maxLength={4000}
                  value={form.message}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, message: e.target.value }));
                    if (fieldErrors.message)
                      setFieldErrors((fe) => ({ ...fe, message: undefined }));
                  }}
                  className={fieldErrors.message ? inputErr : inputOk}
                  placeholder="Tell us about the product, timeline, and goals…"
                />
                <p className="mt-1 text-xs text-[#587563]">Minimum 10 characters.</p>
                {fieldErrors.message && (
                  <p className="mt-1 text-sm text-[#8b281e]" role="alert">
                    {fieldErrors.message}
                  </p>
                )}
              </div>
            </div>

            {status === "error" && errorMessage && (
              <p
                className="mt-5 border border-[#a83a2c] bg-[#fff0eb] px-4 py-3 text-sm text-[#792117]"
                role="alert"
              >
                {errorMessage}
              </p>
            )}

            {status === "success" && (
              <p
                className="mt-5 border border-[#2b7650] bg-[#d5f7e1] px-4 py-3 text-sm text-[#174c33]"
                role="status"
              >
                Message sent. Our product team will review it and get back to you.
              </p>
            )}

            <button
              type="submit"
              disabled={
                status === "submitting" || packagesLoading || packages.length === 0
              }
              className="focus-ring mt-8 w-full bg-[#06110d] px-7 py-4 text-sm font-bold text-[#effff5] transition-colors hover:bg-[#173126] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting" ? "Sending…" : "Send message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
