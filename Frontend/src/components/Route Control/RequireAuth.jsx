import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UrlState } from "@/context";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function RequireAuth({ children }) {
  const { isAuthenticated, loading } = UrlState();
  const [redirect, setRedirect] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      const timer = setTimeout(() => setRedirect(true), 200);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, loading]);

  if (loading) {
    return (
      <div className="p-4">
        <Alert>
          <AlertTitle>Checking authentication...</AlertTitle>
          <AlertDescription>
            Please wait while we verify your session.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!isAuthenticated) {
    if (redirect) {
      return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }
    return (
      <div className="p-4">
        <Alert variant="destructive">
          <AlertTitle>Access Denied</AlertTitle>
          <AlertDescription>
            You must be logged in to access this page. Redirecting to login...
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return children;
}
