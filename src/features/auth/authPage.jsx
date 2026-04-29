import React, { useState } from "react";
import SignIn from "./signin";
import SignUp from "./signup";
import ForgotPassword from "./forgotpassword";

export default function AuthPage() {
  const [mode, setMode] = useState("signin");

  return (
  <div className="min-h-screen flex items-center justify-center bg-[#F2F0EF] px-4 pt-32 pb-24">
  <div className="w-full max-w-xl">
    
    {/* Premium Heading */}
    <div className="text-center mb-12">
      <p className="text-xs uppercase tracking-[0.35em] text-[#1C2120]/55 mb-4">
        House Of Bivela
      </p>

      <h1
        className="text-4xl md:text-6xl text-[#1C2120] leading-tight"
        style={{ fontFamily: "TanAngleton, serif" }}
      >
        Private Access
      </h1>

      <p className="mt-5 text-sm text-[#1C2120]/65 tracking-wide">
        Sign in to your account and continue your journey.
      </p>
    </div>

    {/* Form Card */}
    <div className="bg-white border border-black/10 px-8 md:px-12 py-10 shadow-sm">
      {mode === "signin" && <SignIn setMode={setMode} />}
      {mode === "signup" && <SignUp setMode={setMode} />}
      {mode === "forgot" && <ForgotPassword setMode={setMode} />}
    </div>
    
  </div>
</div>
  );
}