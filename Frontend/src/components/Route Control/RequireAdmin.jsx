import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { isAdminUser } from "@/db/apiAdmin";
import { UrlState } from "@/context";

export default function RequireAdmin({ children }) {
  const { user, loading: userLoading } = UrlState();
  const [loading, setLoading] = useState(true);
  const [denied, setDenied] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const checkAdminStatus = async () => {
      try {
        const result = await isAdminUser();
        if (!result.admin) {
          setDenied(true);
        }
      } catch (err) {
        setDenied(true);
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [user]);

  // Trigger redirect 2s after denied
  useEffect(() => {
    if (denied) {
      const timer = setTimeout(() => setRedirect(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [denied]);

  if (userLoading || loading) {
    return (
      <div className="flex justify-center mt-10">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (!user || denied) {
    if (redirect || !user) return <Navigate to="/dashboard" replace />;

    return (
      <AlertDialog open={true}>
        <AlertDialogContent className="w-screen h-screen max-w-none max-h-none flex items-center justify-center">
          <AlertDialogHeader className="text-center">
            <AlertDialogTitle className="text-2xl">
              Access Denied
            </AlertDialogTitle>
            <AlertDialogDescription className="mt-4 text-lg">
              You don’t have permission to view this page.
              <br />
              Redirecting you to the dashboard...
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return children;
}
