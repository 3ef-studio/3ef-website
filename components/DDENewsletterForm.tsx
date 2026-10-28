"use client";
import { useId, useState } from "react";
import { track } from "@/lib/analytics";

export default function NewsletterForm({ source = "DDE Newsletter" }: { source?: string }) {
  const uid = useId();
  const honeypotId = `${uid}-referenceId`;
  const [email, setEmail] = useState("");
  // Honeypot — not a real form field. A real visitor never sees or fills
  // this (see the hidden <select> below); any non-empty value tells the
  // server to silently discard the submission. Pattern borrowed from the
  // 531 Workshop site's contact form, where it was validated against
  // real observed bot behavior.
  const [honeypot, setHoneypot] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    track("newsletter_subscribe_attempt", { source });
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source, honeypot }),
    });
    setBusy(false);
    if (res.ok) {
      setDone(true);
      track("newsletter_subscribe_success", { source });
    } else {
      track("newsletter_subscribe_error", { source });
      alert("Sorry—couldn’t subscribe right now.");
    }
  }

  if (done) return <p className="text-sm text-muted-foreground">Thanks! You’re on the list.</p>;

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      {/* Honeypot — a <select>, not a text <input>. Browsers don't guess-fill
          arbitrary hidden dropdowns the way they do text fields, and it's
          only visually hidden (not display:none, which some bots skip). */}
      <div
        style={{ position: "absolute", left: "-9999px", top: "auto", width: "1px", height: "1px", overflow: "hidden" }}
        aria-hidden="true"
      >
        <select
          id={honeypotId}
          name="referenceId"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        >
          <option value=""></option>
          <option value="1"></option>
        </select>
      </div>

      <input
        type="email"
        required
        placeholder="you@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-xl bg-card px-3 py-2"
      />
      <button disabled={busy} className="rounded-xl px-4 py-2 bg-accent text-black">
        {busy ? "Adding..." : "Subscribe"}
      </button>
    </form>
  );
}
