import { Box, Divider, Menu, MenuItem, useTheme } from "@mui/material";
import CustomTypography from "../../../components/typography/customTypography";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";

const AdminProfileMenu = ({
  user,
  anchorEl,
  handleCloseMenu,
  setOpenLogout,
}) => {
  const theme = useTheme();
  const handleLogout = () => {
    handleCloseMenu();
    setOpenLogout(true);
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleCloseMenu}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      sx={{
        "& .MuiPaper-root": {
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          border: `1px solid ${theme.palette.grey[300]}`,
          minWidth: "150px",
        },
      }}
    >
      <MenuItem
        disabled
        sx={{
          display: "flex",
          alignItems: "flex-start",
          "&.Mui-disabled": {
            opacity: 1,
          },
        }}
      >
        <BadgeOutlinedIcon
          sx={{
            fontSize: 26,
            color: theme.palette.text.black,
            marginRight: "5px",
          }}
        />
        <Box>
          <CustomTypography
            text={user}
            align="centre"
            sx={{
              fontWeight: "500",
              color: theme.palette.text.black,
              fontSize: "14px",
            }}
          />
          <CustomTypography
            text={"Admin"}
            align="centre"
            sx={{
              fontWeight: "400",
              color: theme.palette.text.grey,
              fontSize: "12px",
              lineHeight: "1",
            }}
          />
        </Box>
      </MenuItem>
      <Divider
        sx={{ borderColor: theme.palette.grey[300], borderStyle: "dotted" }}
      />

      <MenuItem
        onClick={handleLogout}
        sx={{ margin: "2px 6px", padding: "8px 10px", borderRadius: "6px" }}
      >
        <CustomTypography
          text={"Logout"}
          align="centre"
          sx={{
            fontWeight: "600",
            color: theme.palette.text.red,
            fontSize: "14px",
            flexGrow: "1",
          }}
        />
        <LogoutOutlinedIcon
          sx={{ fontSize: 20, color: theme.palette.text.red }}
        />
      </MenuItem>
    </Menu>
  );
};
export default AdminProfileMenu;
