import { Box } from "@mui/material";
import Logo from "../../components/logo/logo";
import LoginImgComponent from "./component/loginImg";
import LoginForm from "./component/loginForm";

const LoginSection = () => {
  return (
    <>
      <Box
        sx={{
          margin: "10px 20px",
        }}
      >
        <Box width="100%" display="flex" justifyContent="flex-start">
          <Logo />
        </Box>

        <Box
          sx={{
            display: "flex",
          }}
        >
          <LoginImgComponent />
          <LoginForm />
        </Box>
      </Box>
    </>
  );
};

export default LoginSection;
