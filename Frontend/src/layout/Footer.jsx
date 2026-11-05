import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';
import { UrlState } from '@/context';
import { socialLinks } from '../constants.js';

const linkClass =
  'text-sm text-[#5e554a] transition-colors hover:text-[#1f1b16] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring dark:text-[#aaa398] dark:hover:text-[#efe9de]';

const groups = [
  {
    heading: 'Practice',
    links: [
      { label: 'Dashboard', to: '/dashboard' },
      { label: 'Features', to: '/features' },
      { label: 'Interview experiences', to: '/view-interview-experiences' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', to: '/about-us' },
      { label: 'Contact', to: '/contact-us' },
    ],
  },
  {
    heading: 'Policies',
    links: [
      { label: 'Privacy', to: '/privacy-policy' },
      { label: 'Terms of service', to: '/terms' },
      { label: 'Cookie policy', to: '/cookies' },
    ],
  },
];

export default function Footer() {
  const { user } = UrlState();
  const isAuthenticated = !!user?.id;

  return (
    <footer className="mt-12 border-t border-black/10 bg-[#f7f4ee] text-[#1f1b16] dark:border-white/10 dark:bg-[#161513] dark:text-[#efe9de]">
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-2 gap-x-8 gap-y-10 px-5 py-10 sm:px-6 sm:py-12 md:grid-cols-4 md:px-8">
        <div className="col-span-2 max-w-sm md:col-span-1">
          <Link
            to="/"
            aria-label="PrepMate home"
            className="inline-flex rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
            <Logo iconSize="h-8 w-8" />
          </Link>
          <p className="mt-4 text-sm leading-6 text-[#5e554a] dark:text-[#aaa398]">
            A steady place to practice computer science interviews and learn from shared experiences.
          </p>
          <div className="mt-5 flex items-center gap-2">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-black/10 text-[#5e554a] transition-colors hover:bg-[#efe9df] hover:text-[#1f1b16] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring dark:border-white/10 dark:text-[#aaa398] dark:hover:bg-[#262421] dark:hover:text-[#efe9de]">
                <Icon size={17} strokeWidth={1.7} />
              </a>
            ))}
          </div>
        </div>

        {groups.map(({ heading, links }) => (
          <nav key={heading} aria-label={heading}>
            <h2 className="mb-4 text-sm font-medium">{heading}</h2>
            <ul className="space-y-3">
              {links.map(({ label, to }) => (
                <li key={to}>
                  <Link className={linkClass} to={to}>{label}</Link>
                </li>
              ))}
              {heading === 'Practice' && !isAuthenticated && (
                <li>
                  <Link className={linkClass} to="/auth/signup">Create account</Link>
                </li>
              )}
              {heading === 'Practice' && isAuthenticated && (
                <li>
                  <Link className={linkClass} to={`/profile/${user.id}`}>My profile</Link>
                </li>
              )}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-black/10 dark:border-white/10">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start gap-2 px-5 py-5 text-xs text-[#776f65] dark:text-[#8a847a] sm:flex-row sm:items-center sm:justify-between sm:px-6 md:px-8">
          <span>© {new Date().getFullYear()} PrepMate</span>
          <span>
            Made by{' '}
            <a
              href="https://arunava-banerjee.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#5e554a] transition-colors hover:text-[#1f1b16] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring dark:text-[#aaa398] dark:hover:text-[#efe9de]">
              Arunava
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
