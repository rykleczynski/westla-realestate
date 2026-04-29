/*
 * Terms & Conditions — static, hand-written terms for Ryan K Real Estate
 */
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO, { getBreadcrumbSchema, getWebPageSchema } from "@/components/SEO";

const LAST_UPDATED = "January 2025";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-[#111111]">
      <SEO
        title="Terms & Conditions"
        description="Terms and Conditions for Ryan K Real Estate — the rules and disclaimers that govern your use of ryanklosangeles.com and our real estate services."
        canonical="https://ryanklosangeles.com/terms-and-conditions"
        schema={[
          getWebPageSchema(
            "Terms & Conditions",
            "Terms and Conditions governing use of the Ryan K Real Estate website and services.",
            "https://ryanklosangeles.com/terms-and-conditions",
          ),
          getBreadcrumbSchema([
            { name: "Home", url: "https://ryanklosangeles.com/" },
            { name: "Terms & Conditions", url: "https://ryanklosangeles.com/terms-and-conditions" },
          ]),
        ]}
      />
      <Navigation />

      <section className="relative pt-28 pb-8 lg:pt-36 border-b border-white/5">
        <div className="container">
          <span className="section-label block mb-4">Legal</span>
          <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Terms &amp; Conditions
          </h1>
          <p className="text-white/50 max-w-2xl leading-relaxed">
            Please read these Terms carefully before using ryanklosangeles.com or engaging Ryan K
            Real Estate for services. By accessing this site you agree to be bound by these Terms.
          </p>
          <p className="text-white/40 text-sm mt-4">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container">
          <article className="max-w-3xl mx-auto text-white/70 leading-relaxed space-y-10">
            <div>
              <h2 className="text-xl lg:text-2xl font-semibold text-white mb-3">
                1. Acceptance of Terms
              </h2>
              <p>
                These Terms and Conditions (the &ldquo;Terms&rdquo;) govern your access to and use
                of the website located at{" "}
                <a
                  href="https://ryanklosangeles.com"
                  className="text-white underline underline-offset-4 hover:opacity-80"
                >
                  ryanklosangeles.com
                </a>{" "}
                (the &ldquo;Site&rdquo;) and any related services provided by Ryan Kleczynski, a
                licensed California real estate salesperson (DRE #02402858) affiliated with Keller
                Williams (collectively, &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;Ryan K Real
                Estate&rdquo;). By using the Site, you agree to these Terms. If you do not agree,
                please do not use the Site.
              </p>
            </div>

            <div>
              <h2 className="text-xl lg:text-2xl font-semibold text-white mb-3">
                2. No Brokerage or Fiduciary Relationship Without Written Agreement
              </h2>
              <p>
                Browsing this Site, downloading guides, requesting a home valuation, or submitting a
                contact form does not, by itself, create an agency, brokerage, or fiduciary
                relationship between you and Ryan K Real Estate. A representation relationship is
                formed only when both parties sign a written agreement (such as a buyer
                representation, listing, or referral agreement) as required by California law.
              </p>
            </div>

            <div>
              <h2 className="text-xl lg:text-2xl font-semibold text-white mb-3">
                3. Informational Content &amp; No Professional Advice
              </h2>
              <p>
                Content on this Site &mdash; including blog posts, neighborhood guides, market
                statistics, 1031 exchange materials, investor resources, and downloadable PDFs
                &mdash; is provided for general informational purposes only. It is not legal, tax,
                accounting, financial, or investment advice. Real estate, tax, and lending laws
                change frequently and vary by jurisdiction. You should consult a licensed attorney,
                CPA, qualified intermediary, or financial advisor before making any decision based
                on information found on this Site.
              </p>
            </div>

            <div>
              <h2 className="text-xl lg:text-2xl font-semibold text-white mb-3">
                4. Property Listings &amp; Market Data
              </h2>
              <p>
                Property information, photos, prices, and availability displayed on the Site are
                obtained from sources we believe to be reliable, including the CRMLS and other MLS
                feeds, public records, and listing brokers. We do not guarantee the accuracy or
                completeness of any listing or market figure. Listings may be withdrawn or change
                price at any time without notice. Buyers should independently verify all material
                facts (square footage, lot size, permits, rent rolls, school boundaries, zoning,
                etc.) before relying on them.
              </p>
            </div>

            <div>
              <h2 className="text-xl lg:text-2xl font-semibold text-white mb-3">
                5. Equal Housing Opportunity &amp; Fair Housing
              </h2>
              <p>
                Ryan K Real Estate is committed to the letter and spirit of U.S. policy for the
                achievement of equal housing opportunity. We do not discriminate on the basis of
                race, color, religion, sex, handicap, familial status, national origin, sexual
                orientation, gender identity, source of income, or any other class protected under
                federal, California, or local law.
              </p>
            </div>

            <div>
              <h2 className="text-xl lg:text-2xl font-semibold text-white mb-3">
                6. Permitted Use of the Site
              </h2>
              <p>You agree to use the Site only for lawful purposes. You will not:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Scrape, copy, or republish listings, photographs, or content for commercial use without written permission;</li>
                <li>Attempt to gain unauthorized access to any portion of the Site or its underlying systems;</li>
                <li>Upload viruses, malware, or any code intended to interfere with the Site;</li>
                <li>Use the Site to harass, defraud, or send unsolicited communications to any third party;</li>
                <li>Misrepresent your identity or licensing status when contacting us.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl lg:text-2xl font-semibold text-white mb-3">
                7. Intellectual Property
              </h2>
              <p>
                The Site, including its design, branding, photography, written content, and the
                &ldquo;Ryan K&rdquo; logo, is owned by Ryan Kleczynski or its licensors and is
                protected by U.S. and international copyright and trademark laws. MLS-sourced
                listing content remains the property of the originating broker and the applicable
                MLS. You may not reproduce, modify, or distribute Site content except for personal,
                non-commercial use.
              </p>
            </div>

            <div>
              <h2 className="text-xl lg:text-2xl font-semibold text-white mb-3">
                8. Third-Party Links &amp; Services
              </h2>
              <p>
                The Site may link to third-party websites, calculators, scheduling tools, IDX
                portals, or service providers. We do not control these third parties and are not
                responsible for their content, privacy practices, or terms. Your interactions with
                any third-party site are governed by that site&rsquo;s own terms.
              </p>
            </div>

            <div>
              <h2 className="text-xl lg:text-2xl font-semibold text-white mb-3">
                9. Communications &amp; Consent
              </h2>
              <p>
                When you submit your phone number or email through a contact form, booking widget,
                or guide download on this Site, you consent to receive communications from Ryan K
                Real Estate by phone, SMS, or email regarding your inquiry. Standard message and
                data rates may apply. You can opt out at any time by replying STOP to text messages
                or emailing{" "}
                <a
                  href="mailto:rkleczynski@kw.com"
                  className="text-white underline underline-offset-4 hover:opacity-80"
                >
                  rkleczynski@kw.com
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="text-xl lg:text-2xl font-semibold text-white mb-3">
                10. Disclaimer of Warranties
              </h2>
              <p>
                The Site and its content are provided &ldquo;as is&rdquo; and &ldquo;as
                available,&rdquo; without warranties of any kind, express or implied, including but
                not limited to warranties of merchantability, fitness for a particular purpose,
                accuracy, or non-infringement. We do not warrant that the Site will be
                uninterrupted, secure, or error-free.
              </p>
            </div>

            <div>
              <h2 className="text-xl lg:text-2xl font-semibold text-white mb-3">
                11. Limitation of Liability
              </h2>
              <p>
                To the fullest extent permitted by law, Ryan K Real Estate, its agents, and
                affiliates shall not be liable for any indirect, incidental, consequential, special,
                or punitive damages, or any loss of profits or revenue, arising out of your use of,
                or inability to use, the Site or its content. Our total aggregate liability for any
                claim arising from your use of the Site is limited to one hundred U.S. dollars
                ($100).
              </p>
            </div>

            <div>
              <h2 className="text-xl lg:text-2xl font-semibold text-white mb-3">
                12. Indemnification
              </h2>
              <p>
                You agree to indemnify and hold harmless Ryan K Real Estate and its affiliates from
                any claims, losses, or expenses (including reasonable attorneys&rsquo; fees) arising
                out of your misuse of the Site or violation of these Terms.
              </p>
            </div>

            <div>
              <h2 className="text-xl lg:text-2xl font-semibold text-white mb-3">
                13. Governing Law &amp; Venue
              </h2>
              <p>
                These Terms are governed by the laws of the State of California, without regard to
                its conflict-of-laws principles. Any dispute arising out of or relating to these
                Terms or the Site shall be brought exclusively in the state or federal courts
                located in Los Angeles County, California, and you consent to personal jurisdiction
                there.
              </p>
            </div>

            <div>
              <h2 className="text-xl lg:text-2xl font-semibold text-white mb-3">
                14. Changes to These Terms
              </h2>
              <p>
                We may update these Terms from time to time. The &ldquo;Last updated&rdquo; date at
                the top of this page reflects the latest revision. Continued use of the Site after
                an update constitutes acceptance of the revised Terms.
              </p>
            </div>

            <div>
              <h2 className="text-xl lg:text-2xl font-semibold text-white mb-3">15. Contact</h2>
              <p>
                Questions about these Terms? Contact Ryan Kleczynski, DRE #02402858, at{" "}
                <a
                  href="mailto:rkleczynski@kw.com"
                  className="text-white underline underline-offset-4 hover:opacity-80"
                >
                  rkleczynski@kw.com
                </a>{" "}
                or (224) 249-1004. See also our{" "}
                <a
                  href="/privacy-policy"
                  className="text-white underline underline-offset-4 hover:opacity-80"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </article>
        </div>
      </section>

      <Footer />
    </div>
  );
}
