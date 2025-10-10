import { useLocation, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Login from '@/components/Auth/Login';
import Signup from '@/components/Auth/Signup';

export default function Auth() {
  const location = useLocation();
  const path = location.pathname.split('/').pop(); // "login" or "signup"
  const mode = path === 'signup' ? 'signup' : 'login';

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 px-4">
      <Card className="w-full max-w-md shadow-lg rounded-2xl border border-neutral-200 dark:border-neutral-800">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {mode === 'login' ? 'Welcome Back 👋' : 'Join PrepMate 🚀'}
          </CardTitle>
          <p className="text-center text-neutral-600 dark:text-neutral-400 mt-2">
            {mode === 'login'
              ? 'Log in to continue your preparation journey'
              : 'Create an account to start your preparation journey'}
          </p>
        </CardHeader>
        <CardContent>{mode === 'login' ? <Login /> : <Signup />}</CardContent>
      </Card>
    </div>
  );
}
