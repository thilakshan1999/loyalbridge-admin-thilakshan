import { Box } from "@mui/material";
import LoginIcon from "../../../assets/images/login/loginImg.jpg";
const LoginImgComponent = () => {
  return (
    <Box
      sx={{
        display: {
          xs: "none",
          md: "flex",
        },
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img src={LoginIcon} alt="Icon" style={{ width: "100%" }} />
    </Box>
  );
};
export default LoginImgComponent;
