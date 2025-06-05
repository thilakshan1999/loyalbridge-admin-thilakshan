import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CustomTypography from "../../../components/typography/customTypography";
import AdminDrawerIconList from "./adminDrawerIconList";
import AdminDrawerHeader from "./adminDrawerHeader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import BusinessIcon from "@mui/icons-material/Business";
import ListAltIcon from "@mui/icons-material/ListAlt";
import Logo from "../../../components/logo/logo";

const drawerWidth = 260;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: 120,
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export default function AdminDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectedMenu, setSelectedMenu] = React.useState("Orders");

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon /> },
    { text: "User Management", icon: <GroupIcon /> },
    { text: "Partner Management", icon: <BusinessIcon /> },
    { text: "Conversion Log", icon: <ListAltIcon /> },
  ];

  const handleDrawerToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AdminDrawerHeader open={open} handleDrawerOpen={handleDrawerToggle} />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader
          sx={{
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexGrow: "1",
              alignItems: "center",
            }}
          >
            <Logo />
          </Box>

          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              position: "absolute",
              right: "-5px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            {open ? (
              theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )
            ) : theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <AdminDrawerIconList
          menuItems={menuItems}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          open={open}
        />
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        {/* {selectedMenu === "Orders" && <OrderSection />}
        {selectedMenu === "Categories" && <CategorySection />}
        {selectedMenu === "Products" && <ProductSection />} */}
      </Box>
    </Box>
  );
}
