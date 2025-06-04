import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/loginPage";
import UnauthorizedPage from "../pages/unauthorizedPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/*" element={<UnauthorizedPage />} />
    </Routes>
  );
};
export default Router;
