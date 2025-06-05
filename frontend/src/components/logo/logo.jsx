import { Box, Typography } from "@mui/material";

const Logo = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src="/bridge.svg"
        alt="Icon"
        style={{ width: 40, height: 40 }} // Adjust size as needed
      />
      <Typography
        sx={{ fontSize: "32px", marginLeft: "5px", marginTop: "4px" }}
      >
        LB
      </Typography>
    </Box>
  );
};
export default Logo;
