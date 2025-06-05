import { useEffect } from "react";
import AdminSection from "../section/admin/adminSection";

const AdminPage = () => {
  useEffect(() => {
    document.title = "Admin";
  }, []);

  return (
    <>
      <AdminSection />
    </>
  );
};

export default AdminPage;
