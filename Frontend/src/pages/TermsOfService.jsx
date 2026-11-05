import { Link } from 'react-router-dom';
import PolicyPage from '@/components/PolicyPage';

export default function TermsOfService() {
  return (
    <PolicyPage
      title="Terms of service"
      intro={<>By accessing or using PrepMate, you agree to these terms. Please read them before using the platform. They cover your access to PrepMate, including its content, features, and services, and should be read alongside the <Link to="/privacy-policy">Privacy policy</Link>.</>}>
      <section>
        <h2>1. Acceptance of terms</h2>
        <p>By accessing or using PrepMate, you agree to comply with these terms and applicable laws. If you do not agree, do not use the service.</p>
      </section>
      <section>
        <h2>2. Use of service</h2>
        <p>You may use PrepMate for personal, non-commercial purposes. You agree not to misuse the service, attempt unauthorized access, or disrupt the platform.</p>
      </section>
      <section>
        <h2>3. Accounts and security</h2>
        <p>Some features require an account. You are responsible for keeping your login credentials confidential and for activity under your account.</p>
      </section>
      <section>
        <h2>4. Content and ownership</h2>
        <p>PrepMate content is for educational purposes. You may not reproduce, distribute, or sell it without written permission. User-contributed content remains the property of its respective contributors.</p>
      </section>
      <section>
        <h2>5. Limitation of liability</h2>
        <p>PrepMate is not responsible for direct, indirect, incidental, or consequential damages arising from your use of the service. We do not guarantee job placement or interview outcomes.</p>
      </section>
      <section>
        <h2>6. Changes to these terms</h2>
        <p>These terms may be updated from time to time. Continued use of PrepMate after changes means you accept the updated terms.</p>
      </section>
      <section>
        <h2>7. Governing law</h2>
        <p>These terms are governed by applicable laws. Disputes are subject to the jurisdiction of the courts in your region.</p>
      </section>
      <section>
        <h2>8. Contact</h2>
        <p>For questions about these terms, please <Link to="/contact-us">contact us</Link>.</p>
      </section>
    </PolicyPage>
  );
}
