"use server";

export type WaitlistState = {
  status: "idle" | "success" | "error";
  message: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Runs on the server when the waitlist form is submitted.
 *
 * Sign-ups are forwarded as JSON ({ email, list, joinedAt }) to the URL in the
 * WAITLIST_WEBHOOK_URL environment variable. That URL can be anything that
 * accepts a POST: a Zapier / Make webhook, a Google Sheets Apps Script,
 * Formspree, etc. Set it in .env.local (and in your host's settings).
 */
export async function joinWaitlist(
  _previous: WaitlistState,
  formData: FormData,
): Promise<WaitlistState> {
  // Honeypot: real visitors never see this field, so only bots fill it in.
  // Pretend it worked so they don't try again.
  if (formData.get("company")) {
    return { status: "success", message: "You're on the list." };
  }

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const list = String(formData.get("list") ?? "general");

  if (!EMAIL_PATTERN.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const webhookUrl = process.env.WAITLIST_WEBHOOK_URL;

  if (!webhookUrl) {
    // Nowhere to save the email yet. Never tell a real visitor they're on the
    // list when they aren't: only succeed here while developing locally.
    if (process.env.NODE_ENV === "development") {
      console.log(`[waitlist] (not saved, no webhook set) ${list}: ${email}`);
      return { status: "success", message: "You're on the list." };
    }
    console.error("[waitlist] WAITLIST_WEBHOOK_URL is not set.");
    return {
      status: "error",
      message: "The waitlist isn't open yet. Please try again soon.",
    };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        list,
        joinedAt: new Date().toISOString(),
      }),
    });
    if (!response.ok) throw new Error(`Webhook replied ${response.status}`);
  } catch (error) {
    console.error("[waitlist] Could not save sign-up:", error);
    return {
      status: "error",
      message: "Something went wrong. Please try again.",
    };
  }

  return { status: "success", message: "You're on the list." };
}
