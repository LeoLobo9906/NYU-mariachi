// Delivers contact / booking submissions to the club inbox via Web3Forms
// (https://web3forms.com) — no domain or SMTP setup required. Create a free
// access key with your club email; Web3Forms then emails every submission to
// that address. Put the key in WEB3FORMS_ACCESS_KEY (see .env).

export interface BookingPayload {
  name: string;
  email: string;
  organization?: string;
  inquiryType: "Booking" | "Join" | "General";
  eventType?: string;
  eventDate?: string;
  eventTime?: string;
  location?: string;
  message?: string;
}

const SUBJECT_LABEL: Record<BookingPayload["inquiryType"], string> = {
  Booking: "Booking request",
  Join: "Audition / join",
  General: "General question",
};

export async function sendBookingEmail(
  payload: BookingPayload
): Promise<{ ok: boolean; error?: string }> {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    console.warn("[email] WEB3FORMS_ACCESS_KEY not set. Inquiry:", payload);
    return { ok: false, error: "Email is not configured yet." };
  }

  const label = SUBJECT_LABEL[payload.inquiryType];
  const subject =
    payload.inquiryType === "Booking"
      ? `Booking: ${payload.eventType || "event"} on ${payload.eventDate || "TBD"} (${payload.name})`
      : `${label}: ${payload.name}`;

  // Human-readable fields — Web3Forms renders these as the email body. Empty
  // fields are omitted so each email only shows what was actually filled in.
  const fields: Record<string, string> = {
    "Request type": label,
    Name: payload.name,
    Email: payload.email,
  };
  if (payload.organization) fields["Organization"] = payload.organization;
  if (payload.eventType) fields["Event type"] = payload.eventType;
  if (payload.eventDate) fields["Date"] = payload.eventDate;
  if (payload.eventTime) fields["Start time"] = payload.eventTime;
  if (payload.location) fields["Location"] = payload.location;
  if (payload.message) fields["Message"] = payload.message;

  const body = {
    access_key: accessKey,
    subject,
    from_name: `${payload.name} · NYU Mariachi Violetas site`,
    replyto: payload.email, // reply goes straight to the sender
    ...fields,
  };

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
    });
    const json = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string };
    if (!res.ok || !json.success) {
      console.error("[web3forms] rejected:", res.status, json);
      return { ok: false, error: json.message ?? `Web3Forms error (${res.status}).` };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Unknown error" };
  }
}
