import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useTheme,
} from "@mui/material";
import CustomTypography from "../../../components/typography/customTypography";

const LogoutDialog = ({ openDialog, setOpenDialog, onClick }) => {
  const theme = useTheme();
  return (
    <Dialog
      open={openDialog}
      onClose={() => setOpenDialog(false)}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "12px",
          padding: "16px 0",
          minWidth: "480px",
        },
      }}
    >
      <DialogTitle>
        <CustomTypography
          color={theme.palette.text.black}
          text={"Confirm Logout"}
          sx={{
            fontSize: "16px",
            fontWeight: "bold",
          }}
        />
      </DialogTitle>
      <DialogContent>
        <CustomTypography
          color={theme.palette.text.grey}
          text={"Are you sure you want to log out?"}
          sx={{
            fontSize: "14px",
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setOpenDialog(false)}
          sx={{
            color: theme.palette.text.black,
            border: "1px solid gray",
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: "bold",
            "&:hover": {
              borderColor: theme.palette.text.black,
            },
          }}
        >
          {"No"}
        </Button>
        <Button
          onClick={onClick}
          color="error"
          sx={{
            backgroundColor: theme.palette.button.red,
            color: "white",
            textTransform: "none",
            borderRadius: "8px",
            marginRight: "10px",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: theme.palette.error.dark,
            },
          }}
        >
          {"Yes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default LogoutDialog;
