import { useEffect } from "react";
import LoginSection from "../section/login/loginSection";

const LoginPage = () => {
  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <>
      <LoginSection />
    </>
  );
};

export default LoginPage;
