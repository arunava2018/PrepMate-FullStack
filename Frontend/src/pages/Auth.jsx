import { Link, useLocation } from 'react-router-dom';
import Login from '@/components/Auth/Login';
import Signup from '@/components/Auth/Signup';

export default function Auth() {
  const location = useLocation();
  const mode = location.pathname.endsWith('/signup') ? 'signup' : 'login';

  return (
    <section className="flex min-h-[620px] items-center justify-center bg-[#f7f4ee] px-5 py-12 text-[#1f1b16] dark:bg-[#161513] dark:text-[#efe9de]">
      <div className="w-full max-w-[520px] rounded-2xl border border-black/10 bg-[#fdfbf7] p-6 shadow-[0_12px_36px_rgba(48,42,34,0.08)] dark:border-white/10 dark:bg-[#1c1a18] sm:p-10">
        <Link className="inline-flex rounded-sm text-lg font-semibold text-[#2459a6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring dark:text-[#a8c7f3]" to="/" aria-label="PrepMate home">PrepMate</Link>
        <header className="mb-7 mt-7">
          <p className="mb-3 text-xs font-medium text-muted-foreground">Your study desk</p>
          <h1 className="text-3xl font-medium leading-tight tracking-tight">{mode === 'login' ? 'Pick up where you left off' : 'Make a place for your preparation'}</h1>
          <p className="mt-2 text-sm leading-6 text-[#5e554a] dark:text-[#aaa398]">{mode === 'login' ? 'Log in to continue your CS interview practice.' : 'Create an account to organize your CS interview practice.'}</p>
        </header>
        {mode === 'login' ? <Login /> : <Signup />}
      </div>
    </section>
  );
}
