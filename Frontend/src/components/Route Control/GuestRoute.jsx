// GuestRoute.jsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UrlState } from "@/context";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function GuestRoute({ children }) {
  const { user, loading } = UrlState();
  const isAuthenticated = !!user?.id;
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!loading && isAuthenticated) {
      const timer = setTimeout(() => setRedirect(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [loading, isAuthenticated]);

  if (loading) return null; // ⏳ wait until auth state is checked

  if (isAuthenticated) {
    if (redirect) return <Navigate to="/dashboard" replace />;
    return (
      <div className="p-4">
        <Alert variant="destructive">
          <AlertTitle>Already Logged In</AlertTitle>
          <AlertDescription>
            You are already logged in, redirecting to your dashboard...
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return children;
}
