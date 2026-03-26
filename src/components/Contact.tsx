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
    <label htmlFor={htmlFor} className="block text-sm font-medium text-slate-700">
      {children}{" "}
      <span className="font-semibold text-red-600" aria-hidden>
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
            "Could not load packages. Check Supabase env vars and that the contact_packages table exists.",
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
    "mt-1.5 w-full rounded-xl border bg-white py-3 text-slate-900 outline-none transition-shadow placeholder:text-slate-400 focus:ring-2";
  const inputPad = "px-4";
  /** Extra 10px on the right so text clears the native dropdown arrow. */
  const selectPad = "pl-4 pr-[calc(1rem+10px)]";
  const inputOk = `${inputRing} ${inputPad} border-slate-200 focus:border-indigo-300 focus:ring-indigo-400/30`;
  const inputErr = `${inputRing} ${inputPad} border-red-300 focus:border-red-400 focus:ring-red-400/25`;
  const selectOk = `${inputRing} ${selectPad} border-slate-200 focus:border-indigo-300 focus:ring-indigo-400/30`;
  const selectErr = `${inputRing} ${selectPad} border-red-300 focus:border-red-400 focus:ring-red-400/25`;

  return (
    <section
      id="contact"
      className="border-t border-slate-100 bg-slate-50/40 px-6 py-24 sm:py-32"
    >
      <div
        className="mx-auto max-w-5xl"
        style={{ animation: "fade-in-up 0.7s ease-out both" }}
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Let&apos;s Build Your App
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-500 sm:text-lg">
            Have a project in mind? Let&apos;s discuss how we can bring your mobile app
            vision to life.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-2xl">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 md:p-10"
            noValidate
          >
            <p className="mb-6 text-sm text-slate-500">
              <span className="font-semibold text-red-600">*</span> All fields are
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
                  <p className="mt-1 text-sm text-red-600" role="alert">
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
                  <p className="mt-1 text-sm text-red-600" role="alert">
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
                  <p className="mt-1 text-sm text-red-600" role="alert">
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
                  <p className="mt-1 text-sm text-amber-700" role="status">
                    {packagesError}
                  </p>
                )}
                {!packagesLoading && packages.length === 0 && !packagesError && (
                  <p className="mt-1 text-sm text-amber-700" role="status">
                    No packages in the database yet. Run{" "}
                    <code className="rounded bg-amber-100 px-1 text-xs">
                      scripts/sql/contact_packages.sql
                    </code>{" "}
                    in the Supabase SQL editor.
                  </p>
                )}
                {fieldErrors.packageId && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
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
                  placeholder="Tell me about your app, timeline, and goals…"
                />
                <p className="mt-1 text-xs text-slate-400">Minimum 10 characters.</p>
                {fieldErrors.message && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {fieldErrors.message}
                  </p>
                )}
              </div>
            </div>

            {status === "error" && errorMessage && (
              <p
                className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                role="alert"
              >
                {errorMessage}
              </p>
            )}

            {status === "success" && (
              <p
                className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
                role="status"
              >
                Thanks -- we received your message. We&apos;ll soon contact you back!
              </p>
            )}

            <button
              type="submit"
              disabled={
                status === "submitting" || packagesLoading || packages.length === 0
              }
              className="mt-8 w-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:from-blue-700 hover:to-purple-700 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting" ? "Sending…" : "Send message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
