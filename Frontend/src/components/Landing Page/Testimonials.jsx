import { testimonials } from '@/constants.js';

export default function Testimonials() {
  return (
    <section className="landing-section landing-section-muted">
      <div className="landing-section-inner">
        <header className="landing-section-heading">
          <h2>Notes from learners</h2>
          <p>How people use PrepMate to organize their interview preparation.</p>
        </header>
        <div className="landing-testimonials">
          {testimonials.slice(0, 3).map((item) => (
            <figure className="landing-quote" key={item.name}>
              <blockquote>“{item.feedback}”</blockquote>
              <figcaption>{item.name}<span>{item.role}</span></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
