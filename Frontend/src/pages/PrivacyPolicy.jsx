import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl sm:text-5xl font-bold mb-6 text-center">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            At PrepMate, we value your privacy. This Privacy Policy explains how
            we collect, use, and safeguard your personal information when you
            use our platform.
          </p>
        </div>
      </section>

      {/* Content */}
      <section>
        <div className="max-w-4xl mx-auto px-6 space-y-10">
          {/* Information we collect */}
          <div>
            <h2 className="text-xl font-semibold mb-3">
              1. Information We Collect
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              We may collect the following types of information:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
              <li>
                Account details such as your name, email address, and profile
                data.
              </li>
              <li>
                Usage data including pages visited, time spent, and
                interactions.
              </li>
              <li>
                Information you voluntarily share, such as interview experiences
                or feedback.
              </li>
            </ul>
          </div>

          {/* How we use */}
          <div>
            <h2 className="text-xl font-semibold mb-3">
              2. How We Use Your Information
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We use the information collected to:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2 mt-2">
              <li>Provide and improve the PrepMate platform.</li>
              <li>
                Personalize your learning experience and progress tracking.
              </li>
              <li>Communicate important updates, offers, or policy changes.</li>
              <li>Ensure security and prevent fraudulent activity.</li>
            </ul>
          </div>

          {/* Sharing */}
          <div>
            <h2 className="text-xl font-semibold mb-3">
              3. Information Sharing
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We do not sell or rent your personal information. Data may be
              shared with trusted third-party service providers (e.g., hosting,
              analytics, email services) strictly to support our platform’s
              operations.
            </p>
          </div>

          {/* Storage */}
          <div>
            <h2 className="text-xl font-semibold mb-3">
              4. Data Storage & Security
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your data is securely stored and protected using industry-standard
              measures. While we strive to protect your information, no method
              of transmission over the Internet is 100% secure.
            </p>
          </div>

          {/* User rights */}
          <div>
            <h2 className="text-xl font-semibold mb-3">5. Your Rights</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Depending on your region, you may have rights to access, update,
              or delete your personal data. To exercise these rights, please{' '}
              <Link to="/contact-us" className="text-primary hover:underline">
                contact us
              </Link>
              .
            </p>
          </div>

          {/* Cookies */}
          <div>
            <h2 className="text-xl font-semibold mb-3">6. Cookies</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              PrepMate uses cookies to improve user experience, analyze traffic,
              and personalize content. For more details, please review our{' '}
              <Link
                to="/cookie-policy"
                className="text-primary hover:underline">
                Cookie Policy
              </Link>
              .
            </p>
          </div>

          {/* Updates */}
          <div>
            <h2 className="text-xl font-semibold mb-3">
              7. Updates to this Policy
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We may update this Privacy Policy periodically. Updates will be
              posted on this page with a revised "Last Updated" date. Continued
              use of our platform means you accept the updated policy.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-xl font-semibold mb-3">8. Contact Us</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              If you have questions about this Privacy Policy or our practices,
              please{' '}
              <Link to="/contact-us" className="text-primary hover:underline">
                contact us
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
