import React from "react";
import { SignIn } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const PatientLogin = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {!PUBLISHABLE_KEY ? (
        <div className="mt-3 text-sm text-emerald-700">
          Clerk sign-in is not configured for this environment. Add
          <span className="font-mono"> VITE_CLERK_PUBLISHABLE_KEY</span> to your
          `.env` and restart the dev server.
        </div>
      ) : (
        <div className="mt-4">
          <SignIn />
        </div>
      )}
    </div>
  );
};

export default PatientLogin;
