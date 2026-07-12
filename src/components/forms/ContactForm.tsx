"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";
type Inquiry = "Booking" | "General";

export function ContactForm() {
 const [inquiry, setInquiry] = useState<Inquiry>("Booking");
 const [status, setStatus] = useState<Status>("idle");
 const [error, setError] = useState<string>("");

 async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
 e.preventDefault();
 setStatus("sending");
 setError("");
 const form = e.currentTarget;
 const key = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
 if (!key) {
 setStatus("error");
 setError("Email is not configured yet (missing access key).");
 return;
 }

 const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
 const label = inquiry === "Booking" ? "Booking request" : "General question";
 const subject =
 inquiry === "Booking"
 ? `Booking: ${data.eventType || "event"} on ${data.eventDate || "TBD"} (${data.name})`
 : `${label}: ${data.name}`;

 // Labeled fields Web3Forms will render in the email (only non-empty ones).
 const payload: Record<string, string> = {
 access_key: key,
 subject,
 from_name: `${data.name} · NYU Mariachi Violetas site`,
 botcheck: "",
 "Request type": label,
 name: data.name,
 email: data.email, // Web3Forms uses this as reply-to
 };
 for (const [k, v] of [
 ["Organization", data.organization],
 ["Event type", data.eventType],
 ["Date", data.eventDate],
 ["Start time", data.eventTime],
 ["Location", data.location],
 ["Message", data.message],
 ] as const) {
 if (v) payload[k] = v;
 }

 try {
 const res = await fetch("https://api.web3forms.com/submit", {
 method: "POST",
 headers: { "Content-Type": "application/json", Accept: "application/json" },
 body: JSON.stringify(payload),
 });
 const json = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string };
 if (!json.success) throw new Error(json.message || `Could not send (${res.status}).`);
 setStatus("sent");
 form.reset();
 } catch (err) {
 setStatus("error");
 setError(err instanceof Error ? err.message : "Something went wrong.");
 }
 }

 const field =
 "w-full border border-violet/25 bg-violet/[0.04] px-4 py-3 text-bone placeholder:text-bone-dim/60 outline-none transition-colors focus:border-gold";
 const label = "mb-1.5 block text-xs font-medium uppercase tracking-widest text-gold-300";

 if (status === "sent") {
 return (
 <div className=" border border-gold/40 bg-gold/5 p-10 text-center">
 <p className="font-display text-3xl text-bone">¡Gracias!</p>
 <p className="mt-2 text-bone-dim">Your message is on its way. We&apos;ll be in touch soon.</p>
 <button onClick={() => setStatus("idle")} className="mt-6 text-sm uppercase tracking-widest text-gold">
 Send another →
 </button>
 </div>
 );
 }

 return (
 <form onSubmit={onSubmit} className="space-y-6">
 {/* Honeypot (spam trap) — hidden from humans */}
 <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

 {/* What is this about */}
 <div>
 <label htmlFor="reason" className={label}>
 What can we help with?
 </label>
 <select
 id="reason"
 value={inquiry}
 onChange={(e) => setInquiry(e.target.value as Inquiry)}
 className={`${field} appearance-none bg-[length:12px] bg-[right_1rem_center] bg-no-repeat`}
 style={{
 backgroundImage:
 "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%2357068c' d='M6 8 0 0h12z'/%3E%3C/svg%3E\")",
 }}
 >
 <option value="Booking">Book us for an event</option>
 <option value="General">General question</option>
 </select>
 </div>

 {/* Always: who are you */}
 <div className="grid gap-5 md:grid-cols-2">
 <div>
 <label className={label}>Your name *</label>
 <input name="name" required placeholder="Full name" className={field} />
 </div>
 <div>
 <label className={label}>Email *</label>
 <input name="email" type="email" required placeholder="you@email.com" className={field} />
 </div>
 </div>

 {/* Booking — event details required */}
 {inquiry === "Booking" && (
 <div className="space-y-5 border border-violet/20 bg-violet/[0.03] p-5">
 <p className="text-xs uppercase tracking-widest text-gold">Event details</p>
 <div className="grid gap-5 md:grid-cols-2">
 <div>
 <label className={label}>Type of event *</label>
 <input
 name="eventType"
 required
 placeholder="Wedding, quinceañera, campus event…"
 className={field}
 />
 </div>
 <div>
 <label className={label}>Organization</label>
 <input name="organization" placeholder="Company / department (optional)" className={field} />
 </div>
 </div>
 <div className="grid gap-5 md:grid-cols-2">
 <div>
 <label className={label}>Date *</label>
 <input name="eventDate" type="date" required className={field} />
 </div>
 <div>
 <label className={label}>Start time *</label>
 <input name="eventTime" type="time" required className={field} />
 </div>
 </div>
 <div>
 <label className={label}>Location / venue *</label>
 <input name="location" required placeholder="Venue name & address" className={field} />
 </div>
 <div>
 <label className={label}>Details *</label>
 <textarea
 name="message"
 required
 rows={4}
 placeholder="Set length, headcount, song requests, anything else we should know…"
 className={field}
 />
 </div>
 </div>
 )}

 {/* General */}
 {inquiry === "General" && (
 <div>
 <label className={label}>Message *</label>
 <textarea name="message" required rows={5} placeholder="How can we help?" className={field} />
 </div>
 )}

 {status === "error" && <p className="text-sm text-red-500">{error}</p>}

 <button
 type="submit"
 disabled={status === "sending"}
 className="btn-glow w-full bg-gold px-8 py-4 text-sm font-medium uppercase tracking-widest text-white transition-transform hover:scale-[1.01] disabled:opacity-60 md:w-auto"
 >
 {status === "sending" ? "Sending…" : "Send inquiry"}
 </button>
 </form>
 );
}
