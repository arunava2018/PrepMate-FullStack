import { Link } from 'react-router-dom';
import PolicyPage from '@/components/PolicyPage';

export default function PrivacyPolicy() {
  return (
    <PolicyPage
      title="Privacy policy"
      intro="How PrepMate handles information when you use the site and its study features">
      <section>
        <h2>1. Information we collect</h2>
        <p>We may collect information you provide or generate while using PrepMate, including:</p>
        <ul>
          <li>Account details such as your name, email address, and profile data.</li>
          <li>Usage data such as pages visited and interactions with study features.</li>
          <li>Information you choose to share, such as interview experiences or feedback.</li>
        </ul>
      </section>
      <section>
        <h2>2. How we use information</h2>
        <p>Information is used to provide and maintain PrepMate, support study progress and account features, communicate service or policy updates, and protect the platform.</p>
      </section>
      <section>
        <h2>3. Sharing</h2>
        <p>We do not sell or rent personal information. Information may be processed by service providers that help operate PrepMate, such as hosting and authentication providers.</p>
      </section>
      <section>
        <h2>4. Storage and security</h2>
        <p>PrepMate uses technical measures intended to protect account information. No method of transmission or storage can be guaranteed to be completely secure.</p>
      </section>
      <section>
        <h2>5. Your choices</h2>
        <p>You can review or update profile information through your account. For help with account information, please <Link to="/contact-us">contact us</Link>.</p>
      </section>
      <section>
        <h2>6. Cookies and local storage</h2>
        <p>PrepMate stores authentication and theme preferences in your browser. See the <Link to="/cookies">Cookie policy</Link> for details about browser storage.</p>
      </section>
      <section>
        <h2>7. Changes to this policy</h2>
        <p>This policy may be updated as PrepMate changes. The current version will be available on this page.</p>
      </section>
      <section>
        <h2>8. Contact</h2>
        <p>If you have a question about this policy, please <Link to="/contact-us">contact us</Link>.</p>
      </section>
    </PolicyPage>
  );
}
