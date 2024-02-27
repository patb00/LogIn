import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface SnackbarDialogProps {
  open: boolean;
  onClose: () => void;
}

const SnackbarDialog: React.FC<SnackbarDialogProps> = ({ open, onClose }) => {
  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
        <Alert
          onClose={onClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Succesfully signed up!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SnackbarDialog;
