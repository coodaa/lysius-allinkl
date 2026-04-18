/**
 * Simple API middleware: enforces GET-only and adds basic security headers.
 * Note: in-memory rate limiting is per serverless instance (best-effort).
 */
const rateLimitMap = new Map();

export function withMiddleware(handler, { methods = ["GET"] } = {}) {
  return async function (req, res) {
    // Method check
    if (!methods.includes(req.method)) {
      res.setHeader("Allow", methods.join(", "));
      return res.status(405).json({ error: "Method not allowed" });
    }

    // Basic rate limiting: 60 requests per IP per minute
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
      req.socket?.remoteAddress ||
      "unknown";
    const now = Date.now();
    const window = 60_000;
    const limit = 60;

    const entry = rateLimitMap.get(ip);
    if (!entry || now - entry.start > window) {
      rateLimitMap.set(ip, { count: 1, start: now });
    } else if (entry.count >= limit) {
      res.setHeader("Retry-After", "60");
      return res.status(429).json({ error: "Too many requests" });
    } else {
      entry.count++;
    }

    // Security headers
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");

    return handler(req, res);
  };
}
