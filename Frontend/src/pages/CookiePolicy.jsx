import { Link } from "react-router-dom";

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="py-10 md:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-6 space-y-5">
          {/* What are cookies */}
          <div>
            <h2 className="text-2xl font-semibold mb-3">What are Cookies?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Cookies are small text files placed on your device when you visit
              a website. They help websites function properly, remember your
              preferences, and improve overall performance.
            </p>
          </div>

          {/* How we use cookies */}
          <div>
            <h2 className="text-2xl font-semibold mb-3">
              How We Use Cookies
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              PrepMate uses cookies to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Enable essential site features like authentication.</li>
              <li>Remember your preferences and settings.</li>
              <li>Improve platform performance and reliability.</li>
              <li>Analyze site traffic and usage trends.</li>
            </ul>
          </div>

          {/* Types of cookies */}
          <div>
            <h2 className="text-2xl font-semibold mb-3">Types of Cookies</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>
                <strong>Essential Cookies:</strong> Required for core site
                functionality such as login and navigation.
              </li>
              <li>
                <strong>Performance Cookies:</strong> Collect anonymous data to
                help us improve the platform.
              </li>
              <li>
                <strong>Preference Cookies:</strong> Store your choices such as
                theme and language.
              </li>
              <li>
                <strong>Analytics Cookies:</strong> Provide insights into how
                our services are used.
              </li>
            </ul>
          </div>

          {/* Managing cookies */}
          <div>
            <h2 className="text-2xl font-semibold mb-3">Managing Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              You can manage or disable cookies through your browser settings.
              Please note that disabling certain cookies may affect the
              functionality of PrepMate.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about our Cookie Policy, please{" "}
              <Link
                to="/contact-us"
                className="text-primary hover:underline"
              >
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
