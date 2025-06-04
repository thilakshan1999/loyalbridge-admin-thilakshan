import { useEffect } from "react";

const LoginPage = () => {
  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <>
      <h1>Login</h1>
    </>
  );
};

export default LoginPage;
