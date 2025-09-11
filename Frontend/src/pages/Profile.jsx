import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useNavigate} from "react-router-dom";
function Profile() {
  const navigate = useNavigate();
  setTimeout(() => navigate("/"), 3000);
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Alert
        variant="destructive"
        className="w-[28rem] flex flex-col items-center text-center"
      >
        <AlertTitle>This section is under development</AlertTitle>
        <AlertDescription>
          Redirecting you to home page...
        </AlertDescription>
      </Alert>
    </div>
  );
}

export default Profile;
