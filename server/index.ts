import dotenv from "dotenv";
import express from "express";
import fs from "node:fs";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { isTcpaOptInTrue, submit1031PlaybookLead } from "../shared/submit1031PlaybookLead";
import { submitContactToZapier } from "../shared/submitContactZapier";
import { injectSeoIntoIndexHtml } from "./seoHtml";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json());

  // Contact form → Zapier Catch Hook (ZAPIER_CONTACT_WEBHOOK_URL)
  app.post("/api/contact", async (req, res) => {
    try {
      if (!process.env.ZAPIER_CONTACT_WEBHOOK_URL?.trim()) {
        res.status(503).json({
          error: "Contact form is not configured. Set ZAPIER_CONTACT_WEBHOOK_URL in .env.",
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
        source: rawSource = "",
      } = req.body || {};
      const firstName = String(rawFirst).trim() || (legacyName ? String(legacyName).trim().split(/\s+/)[0] : "");
      const lastName = String(rawLast).trim() || (legacyName ? String(legacyName).trim().split(/\s+/).slice(1).join(" ") : "");
      const trimmedEmail = String(email).trim();

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

      const zapResult = await submitContactToZapier({
        firstName,
        lastName,
        email: trimmedEmail,
        phoneRaw: trimmedPhone,
        inquiryType: String(inquiryType || "").trim(),
        interest: String(interest || "").trim(),
        leadType,
        source: String(rawSource || "").trim() || undefined,
      });
      if (!zapResult.ok) {
        res.status(zapResult.status).json({ error: zapResult.error });
        return;
      }

      res.status(201).json({ ok: true });
    } catch (e) {
      const err = e instanceof Error ? e : new Error(String(e));
      console.error("Contact submit error:", err.message, err.stack);
      res.status(500).json({ error: "Something went wrong. Please try again." });
    }
  });

  // West LA 1031 Playbook — Zapier → Airtable (+ email PDF in Zap)
  app.post("/api/1031-playbook-lead", async (req, res) => {
    try {
      const b = req.body || {};
      const tcpaOptIn = isTcpaOptInTrue(b.tcpaOptIn);

      const result = await submit1031PlaybookLead({
        firstName: String(b.firstName ?? ""),
        lastName: String(b.lastName ?? ""),
        email: String(b.email ?? ""),
        phone: String(b.phone ?? ""),
        tcpaOptIn,
        _hp: b._hp != null ? String(b._hp) : undefined,
      });
      if (!result.ok) {
        res.status(result.status).json({ error: result.error });
        return;
      }
      res.status(200).json({ ok: true });
    } catch (e) {
      const err = e instanceof Error ? e : new Error(String(e));
      console.error("1031 playbook lead error:", err.message, err.stack);
      res.status(500).json({ error: "Something went wrong. Please try again." });
    }
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  const auditLandingPath = path.join(staticPath, "1031-cash-flow-audit.html");
  const playbookLandingPath = path.join(staticPath, "1031-playbook-guide.html");

  app.use((req, res, next) => {
    const redirects: [string, string][] = [
      ["/1031-cash-flow-audit.html", "/1031-cash-flow-audit"],
      ["/1031-playbook-guide.html", "/1031-playbook-guide"],
    ];
    const qs = req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : "";
    const hit = redirects.find(([from]) => req.path === from);
    if (hit) {
      res.redirect(301, `${hit[1]}${qs}`);
      return;
    }
    next();
  });

  app.use(express.static(staticPath, { index: false }));

  app.get(["/1031-cash-flow-audit", "/1031-cash-flow-audit/"], (_req, res) => {
    res.sendFile(auditLandingPath);
  });

  app.get(["/1031-playbook-guide", "/1031-playbook-guide/"], (_req, res) => {
    res.sendFile(playbookLandingPath);
  });

  const indexPath = path.join(staticPath, "index.html");
  const indexHtmlTemplate = fs.readFileSync(indexPath, "utf-8");

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (req, res) => {
    let pathname = req.path || "/";
    if (pathname.length > 1 && pathname.endsWith("/")) pathname = pathname.slice(0, -1);
    const html = injectSeoIntoIndexHtml(indexHtmlTemplate, pathname);
    if (html !== indexHtmlTemplate) {
      res.type("html").send(html);
      return;
    }
    res.sendFile(indexPath);
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
