import type { NextRequest } from "next/server";

// Best-effort, per-instance rate limiting: serverless instances are reused
// between requests, so this stops a single client hammering the forms or the
// paid Gemini API from one browser/script, without needing an external store.
const hits = new Map<string, number[]>();

export function clientIp(req: NextRequest) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

export function isRateLimited(req: NextRequest, bucket: string, limit: number, windowMs: number) {
  const key = `${bucket}:${clientIp(req)}`;
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);

  if (hits.size > 5000) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= windowMs)) hits.delete(k);
    }
  }

  return recent.length > limit;
}

// Trims a user-supplied string and caps its length; non-strings become "".
export function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}
