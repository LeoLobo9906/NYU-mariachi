import { NextResponse } from "next/server";
import { z } from "zod";
import { sendBookingEmail } from "@/lib/email";

const schema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  organization: z.string().max(200).optional().or(z.literal("")),
  inquiryType: z.enum(["Booking", "Join", "General"]),
  eventType: z.string().max(200).optional().or(z.literal("")),
  eventDate: z.string().max(40).optional().or(z.literal("")),
  eventTime: z.string().max(40).optional().or(z.literal("")),
  location: z.string().max(300).optional().or(z.literal("")),
  message: z.string().max(4000).optional().or(z.literal("")),
  company_website: z.string().optional(), // honeypot
});

// Tiny in-memory rate limit (per warm serverless instance). Good enough to blunt
// bursts; for production-grade limiting, back it with Upstash/Redis.
const hits = new Map<string, { count: number; ts: number }>();
const WINDOW = 60_000;
const MAX = 5;

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  const now = Date.now();
  const rec = hits.get(ip);
  if (rec && now - rec.ts < WINDOW) {
    if (rec.count >= MAX) {
      return NextResponse.json({ ok: false, error: "Too many requests. Try again shortly." }, { status: 429 });
    }
    rec.count += 1;
  } else {
    hits.set(ip, { count: 1, ts: now });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Please check the form and try again." }, { status: 422 });
  }

  // Honeypot filled → silently accept (pretend success, drop the message).
  if (parsed.data.company_website) {
    return NextResponse.json({ ok: true });
  }

  const d = parsed.data;

  // A booking must include the essentials so the club can actually plan.
  if (d.inquiryType === "Booking" && !(d.eventDate && d.eventTime && d.location && d.eventType)) {
    return NextResponse.json(
      { ok: false, error: "Bookings need event type, date, time, and location." },
      { status: 422 }
    );
  }
  if (d.inquiryType !== "Join" && !d.message && d.inquiryType === "General") {
    return NextResponse.json({ ok: false, error: "Please include a message." }, { status: 422 });
  }

  const result = await sendBookingEmail({
    name: d.name,
    email: d.email,
    organization: d.organization || undefined,
    inquiryType: d.inquiryType,
    eventType: d.eventType || undefined,
    eventDate: d.eventDate || undefined,
    eventTime: d.eventTime || undefined,
    location: d.location || undefined,
    message: d.message || undefined,
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error ?? "Could not send." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
