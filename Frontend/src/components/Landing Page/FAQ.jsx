import { faqs } from '@/constants.js';

export default function FAQ() {
  return (
    <section id="faq" className="landing-section">
      <div className="landing-section-inner">
        <header className="landing-section-heading">
          <h2>Frequently asked questions</h2>
          <p>What to expect when you prepare with PrepMate.</p>
        </header>
        <div className="landing-faq-grid">
          {faqs.map((faq) => (
            <article className="landing-faq" key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
