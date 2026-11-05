import { Link } from 'react-router-dom';
import PolicyPage from '@/components/PolicyPage';

export default function CookiePolicy() {
  return (
    <PolicyPage
      title="Cookie policy"
      intro="How PrepMate uses browser storage to support sign-in and remember your theme preference">
      <section>
        <h2>What cookies and browser storage do</h2>
        <p>Cookies and browser storage are small pieces of data saved by your browser. They can help a site remember settings and support account features.</p>
      </section>
      <section>
        <h2>How PrepMate uses browser storage</h2>
        <ul>
          <li>Authentication data supports signed-in features.</li>
          <li>Your theme preference is saved so the site can reopen in your selected theme.</li>
        </ul>
      </section>
      <section>
        <h2>Managing stored data</h2>
        <p>You can clear browser storage through your browser settings. Removing authentication data signs you out; clearing the theme preference returns the site to its default or system theme.</p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>If you have a question about this policy, please <Link to="/contact-us">contact us</Link>.</p>
      </section>
    </PolicyPage>
  );
}
