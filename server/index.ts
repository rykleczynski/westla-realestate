import dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

const GHL_API_URL = "https://services.leadconnectorhq.com";
const GHL_API_VERSION = "2021-07-28";

const ghlHeaders = (token: string) => ({
  Accept: "application/json",
  Version: GHL_API_VERSION,
  Authorization: `Bearer ${token}`,
});

// Resolve location ID: use env or fetch first location from API (works with Private Integration Token).
let cachedLocationId: string | null = null;

async function resolveLocationId(token: string): Promise<string | null> {
  if (process.env.GHL_LOCATION_ID) return process.env.GHL_LOCATION_ID;
  if (cachedLocationId) return cachedLocationId;
  try {
    const res = await fetch(`${GHL_API_URL}/locations/search?limit=1`, {
      headers: ghlHeaders(token),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { locations?: { id: string }[] };
    const id = data.locations?.[0]?.id ?? null;
    if (id) cachedLocationId = id;
    return id;
  } catch {
    return null;
  }
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json());

  // GoHighLevel CRM: submit contact form → create contact
  app.post("/api/contact", async (req, res) => {
    try {
      const token = process.env.GHL_API_TOKEN;
      if (!token) {
        res.status(503).json({ error: "Contact form is not configured. Set GHL_API_TOKEN." });
        return;
      }
      const locationId = await resolveLocationId(token);
      if (!locationId) {
        res.status(503).json({
          error:
            "Could not determine GoHighLevel location. Set GHL_LOCATION_ID in .env, or use a token that has access to at least one location.",
        });
        return;
      }

      const {
        firstName: rawFirst = "",
        lastName: rawLast = "",
        name: legacyName = "",
        email = "",
        phone = "",
        interest = "",
        inquiryType = "",
      } = req.body || {};
      const firstName = String(rawFirst).trim() || (legacyName ? String(legacyName).trim().split(/\s+/)[0] : "");
      const lastName = String(rawLast).trim() || (legacyName ? String(legacyName).trim().split(/\s+/).slice(1).join(" ") : "");
      const trimmedEmail = String(email).trim();
      const interestValue = inquiryType || interest;

      // Map inquiry type to lead_type label for CRM
      const leadType =
        inquiryType === "buying"
          ? "Buyer"
          : inquiryType === "selling"
          ? "Seller"
          : inquiryType === "investing"
          ? "Investor"
          : inquiryType === "leasing"
          ? "Leasing"
          : inquiryType === "valuation"
          ? "Info"
          : "Other";

      const trimmedPhone = phone ? String(phone).trim() : "";
      if (!firstName || !lastName || !trimmedEmail || !trimmedPhone) {
        res.status(400).json({ error: "First name, last name, email, and phone are required." });
        return;
      }

      const fullName = [firstName, lastName].filter(Boolean).join(" ");

      const customFields: { id?: string; key?: string; field_value: string }[] = [];
      if (process.env.GHL_INTEREST_FIELD_ID && interestValue) {
        customFields.push({
          id: process.env.GHL_INTEREST_FIELD_ID,
          field_value: interestValue,
        });
      }
      if (process.env.GHL_LEAD_TYPE_FIELD_ID && leadType) {
        customFields.push({
          id: process.env.GHL_LEAD_TYPE_FIELD_ID,
          field_value: leadType,
        });
      }
      if (process.env.GHL_CONVERSATIONAL_AI_STATUS_FIELD_ID) {
        customFields.push({
          id: process.env.GHL_CONVERSATIONAL_AI_STATUS_FIELD_ID,
          field_value: "AI On",
        });
      }

      const body = {
        locationId,
        firstName,
        lastName,
        name: fullName,
        email: trimmedEmail,
        phone: trimmedPhone,
        source: "Website",
        tags: interestValue ? [interestValue] : ["website"],
        ...(customFields.length > 0 && { customFields }),
      };

      const response = await fetch(`${GHL_API_URL}/contacts/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Version: GHL_API_VERSION,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const responseData = (await response.json().catch(() => null)) as
        | { id?: string; contact?: { id?: string } }
        | null;

      if (!response.ok) {
        const err = responseData && typeof responseData === "object" ? (responseData as any) : { message: response.statusText };
        const msg = err.message;
        const errMessage = Array.isArray(msg) ? msg.join(", ") : typeof msg === "string" ? msg : "Failed to submit.";
        console.error("GHL API error:", response.status, errMessage, responseData);
        res.status(response.status).json({ error: errMessage });
        return;
      }

      res.status(201).json({ ok: true });
    } catch (e) {
      const err = e instanceof Error ? e : new Error(String(e));
      console.error("Contact submit error:", err.message, err.stack);
      res.status(500).json({ error: "Something went wrong. Please try again." });
    }
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
