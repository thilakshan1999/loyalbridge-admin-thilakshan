import { useTheme } from "@emotion/react";
import { Alert, Box, Button, CircularProgress, TextField } from "@mui/material";
import CustomTypography from "../../../components/typography/customTypography";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProviderComponent from "../../../provider/formProviderComponent";

const LoginForm = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const logInSchema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format")
      .matches(
        /^[a-zA-Z0-9._%+-]+@loyalbridge\.io$/,
        "Email must be a @loyalbridge.io address"
      ),
    password: yup
      .string()
      .required("Password is required")
      .min(12, "Password must be at least 12 characters long")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
  });

  const defaultLogInValues = {
    password: "",
    email: "",
  };

  const logInMethods = useForm({
    resolver: yupResolver(logInSchema),
    defaultValues: defaultLogInValues,
  });

  const {
    register,
    handleSubmit: handleLoginSubmit,
    formState: { errors },
  } = logInMethods;

  const onSubmit = handleLoginSubmit(async (data) => {
    console.log(data);
    navigate("/otp");
    //setLoading(true);
    //setError("hi");
  });

  return (
    <FormProviderComponent onSubmit={onSubmit} methods={logInMethods}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "800px",
          width: { sm: "100%", md: "400px" },
        }}
      >
        {/* Tittle */}
        <CustomTypography
          text="LoyalBridge Admin Panel"
          align="center"
          sx={{
            fontWeight: "600",
            color: theme.palette.text.black,
            fontSize: "24px",
            marginBottom: "30px",
          }}
        />

        {/* Email Field */}
        <TextField
          label={"Email"}
          fullWidth
          {...register("email")}
          error={!!errors.email || error}
          helperText={errors.email?.message}
          disabled={loading}
        />

        <Box sx={{ height: "20px" }} />

        {/* Password Field */}
        <TextField
          label={"Password"}
          fullWidth
          type="password"
          {...register("password")}
          error={!!errors.password || error}
          helperText={errors.password?.message}
          disabled={loading}
        />

        {error && (
          <Alert severity="error" sx={{ width: "90%", marginTop: "20px" }}>
            {error}
          </Alert>
        )}

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{
            width: "100%",
            marginTop: "30px",
            marginBottom: "10px",
            backgroundColor: theme.palette.button.black,
            color: theme.palette.text.white,
            fontWeight: "bold",
            padding: "12px 18px",
            textTransform: "uppercase",
            fontSize: "14px",
            fontFamily: theme.typography.fontFamily,
            borderRadius: "8px",
          }}
        >
          {loading ? (
            <CircularProgress
              size={20}
              sx={{ margin: "4px 10px", color: "white" }}
            />
          ) : (
            "Login"
          )}
        </Button>
      </Box>
    </FormProviderComponent>
  );
};
export default LoginForm;
