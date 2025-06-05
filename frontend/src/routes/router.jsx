import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/loginPage";
import UnauthorizedPage from "../pages/unauthorizedPage";
import AdminPage from "../pages/adminPage";
import OtpPage from "../pages/otpPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/" element={<LoginPage />} />
      <Route path="/otp" element={<OtpPage />} />
      <Route path="/*" element={<UnauthorizedPage />} />
    </Routes>
  );
};
export default Router;
