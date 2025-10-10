import { Mail, Phone, MapPin, Twitter, Github, Linkedin } from 'lucide-react';

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="py-10 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl sm:text-5xl font-bold mb-3">Contact Us</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Have questions, feedback, or partnership ideas? We’d love to hear
            from you. Reach out through the form below or use the contact
            details provided.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-10">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-6">
            Send us a message
          </h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                rows="5"
                placeholder="Write your message..."
                className="w-full rounded-lg border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground font-medium rounded-lg px-6 py-3 hover:bg-primary/90 transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Socials */}
      <section className="py-12 border-t border-border">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h3 className="text-lg font-semibold mb-4">Connect with us</h3>
          <div className="flex justify-center gap-4">
            {[
              { href: 'https://twitter.com/Arunava17818355', icon: Twitter },
              { href: 'https://github.com/arunava2018', icon: Github },
              {
                href: 'https://www.linkedin.com/in/arunava-banerjee1/',
                icon: Linkedin,
              },
            ].map(({ href, icon: Icon }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-border hover:bg-primary hover:text-primary-foreground transition">
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
