import { useEffect } from "react";
import OtpSection from "../section/otp/otpSection";

const OtpPage = () => {
  useEffect(() => {
    document.title = "OTP";
  }, []);

  return (
    <>
      <OtpSection />
    </>
  );
};

export default OtpPage;
