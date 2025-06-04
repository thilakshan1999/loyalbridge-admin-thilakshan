import { useEffect } from "react";

const UnauthorizedPage = () => {
  useEffect(() => {
    document.title = "Unauthorized";
  }, []);

  return (
    <>
      <h1>Unauthorized</h1>
    </>
  );
};

export default UnauthorizedPage;
