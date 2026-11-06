import { Link, useLocation } from 'react-router-dom';
import { UrlState } from '@/context';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export default function RequireAuth({ children }) {
  const { isAuthenticated, loading } = UrlState();
  const location = useLocation();

  if (loading) return <div className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-6" role="status" aria-label="Checking your session"><div className="h-7 w-48 animate-pulse rounded bg-[#efe9df] dark:bg-[#262421]" /><div className="mt-3 h-4 w-72 max-w-full animate-pulse rounded bg-[#efe9df] dark:bg-[#262421]" /></div>;

  if (!isAuthenticated) return <div className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-6"><Alert variant="destructive"><AlertTitle>Your session may have expired</AlertTitle><AlertDescription>Sign in again to continue to this page. Your destination will be kept after login.</AlertDescription></Alert><Link to="/auth/login" state={{ from: location, sessionExpired: true }} className="mt-5 inline-flex h-10 items-center rounded-md bg-[#2459a6] px-4 text-sm font-medium text-white hover:bg-[#1d4a8a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring dark:bg-[#a8c7f3] dark:text-[#111a27]">Sign in to continue</Link></div>;

  return children;
}
