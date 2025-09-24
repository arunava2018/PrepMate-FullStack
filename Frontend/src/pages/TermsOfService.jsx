import { Link } from "react-router-dom";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="pt-15">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-center">
            Terms of Service
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Welcome to{" "}
            <span className="font-semibold text-foreground">PrepMate</span>! By
            accessing or using our platform, you agree to comply with and be
            bound by the following terms and conditions. These Terms of Service
            govern your access to and use of PrepMate, including any content,
            features, and services offered through the platform.
            <br />
            <br />
            Please read these terms carefully before using our services. If you
            do not agree to these terms, you must not access or use PrepMate. By
            creating an account, accessing our resources, or contributing
            content, you acknowledge that you have read, understood, and
            accepted these terms, as well as our
            <Link to="/privacy-policy" className="text-primary hover:underline">
              {" "}
              Privacy Policy
            </Link>
            .
            <br />
            <br />
            These terms may be updated from time to time, and continued use of
            the platform after updates will signify your acceptance of the
            revised terms.
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6 space-y-10 text-sm">
          {/* Acceptance */}
          <div>
            <h2 className="text-xl font-semibold mb-3">
              1. Acceptance of Terms
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using PrepMate, you agree to comply with these
              Terms of Service and all applicable laws. If you do not agree,
              please do not use our services.
            </p>
          </div>

          {/* Use of service */}
          <div>
            <h2 className="text-xl font-semibold mb-3">2. Use of Service</h2>
            <p className="text-muted-foreground leading-relaxed">
              You may use PrepMate for personal, non-commercial purposes only.
              You agree not to misuse our services, attempt unauthorized access,
              or engage in activities that disrupt our platform.
            </p>
          </div>

          {/* Accounts */}
          <div>
            <h2 className="text-xl font-semibold mb-3">
              3. Accounts & Security
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              To access certain features, you must create an account. You are
              responsible for maintaining the confidentiality of your login
              credentials and for all activities under your account.
            </p>
          </div>

          {/* Content ownership */}
          <div>
            <h2 className="text-xl font-semibold mb-3">
              4. Content & Ownership
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              All content provided by PrepMate is for educational purposes. You
              may not reproduce, distribute, or sell our content without written
              permission. User-contributed content remains the property of the
              respective contributors.
            </p>
          </div>

          {/* Limitations */}
          <div>
            <h2 className="text-xl font-semibold mb-3">
              5. Limitations of Liability
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              PrepMate is not responsible for any direct, indirect, incidental,
              or consequential damages arising from your use of our services. We
              do not guarantee job placement or interview outcomes.
            </p>
          </div>

          {/* Changes */}
          <div>
            <h2 className="text-xl font-semibold mb-3">6. Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update these Terms from time to time. Continued use of the
              platform after changes means you accept the updated Terms.
            </p>
          </div>

          {/* Governing Law */}
          <div>
            <h2 className="text-xl font-semibold mb-3">7. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms shall be governed by and interpreted in accordance
              with applicable laws. Any disputes shall be subject to the
              jurisdiction of the courts in your region.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-xl font-semibold mb-3">8. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions regarding these Terms, please{" "}
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
