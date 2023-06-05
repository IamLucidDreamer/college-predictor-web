import React, { useEffect } from "react";

const LoginSuccess = () => {
  const searchParams = new URLSearchParams(document.location.search);
  const authToken = searchParams.get("auth_token");
  const userId = searchParams.get("user_id");
  useEffect(() => {
    window.postMessage(
      JSON.stringify({
        message: "login-success",
        authToken: authToken,
        userId: userId,
      }),
      "*"
    );
    return () => {};
  }, []);


  

  return (
    <div className="flex min-h-screen flex-col gap-4 items-center justify-center">
      <div className="border-2 border-b-0 animate-spin border-primary h-8 w-8 rounded-full"></div>
      <h1 className="text-center">Login Success</h1>
      <h1 className="text-center">Redirecting to Next Screen....</h1>
    </div>
  );
};

export default LoginSuccess;
