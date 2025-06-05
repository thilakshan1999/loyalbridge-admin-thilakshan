import { Box, Button, TextField, Alert, useTheme } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useState } from "react";
import CustomTypography from "../../components/typography/customTypography";
import PrimaryLoadingBtn from "../../components/button/primaryLoadingButton";
import { useNavigate } from "react-router-dom";

const OtpSection = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleSubmit = () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length < 6 || otp.includes("")) {
      setError("Please enter all 6 digits.");
      return;
    }

    if (enteredOtp !== "123456") {
      setError("Invalid OTP. Please try again.");
    } else {
      setError("");
      navigate("/admin");
    }
  };

  return (
    <Box
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      gap={3}
      bgcolor="#f9f9f9"
    >
      <LockIcon color="primary" fontSize="large" />
      <CustomTypography
        variant="h5"
        text="Verify Your Account"
        align="center"
        sx={{
          color: theme.palette.text.black,
        }}
      />
      <CustomTypography
        text=" Enter the 6-digit OTP sent to your email."
        align="center"
        sx={{
          color: theme.palette.text.grey,
        }}
      />

      <Box display="flex" gap={1}>
        {otp.map((digit, index) => (
          <TextField
            key={index}
            id={`otp-${index}`}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            inputProps={{ maxLength: 1, style: { textAlign: "center" } }}
            sx={{ width: 50 }}
            variant="outlined"
          />
        ))}
      </Box>

      {error && (
        <Alert severity="error" sx={{ width: "100%", maxWidth: 300 }}>
          {error}
        </Alert>
      )}

      <PrimaryLoadingBtn
        text="Verify Email"
        onClick={handleSubmit}
        sx={{
          backgroundColor: theme.palette.button.black,
          textTransform: "none",
        }}
        loading={loading}
      />
    </Box>
  );
};

export default OtpSection;
