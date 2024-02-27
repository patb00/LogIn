import React, { useRef } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import InputField from "../components/InputField";

interface ChangePasswordDialogProps {
  open: boolean;
  onClose: () => void;
  onPasswordChange: (oldPassword: string, newPassword: string) => void;
  isNewPasswordEnabled: boolean;
}

const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = ({
  open,
  onClose,
  onPasswordChange,
  isNewPasswordEnabled,
}) => {
  const oldPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);

  const handleChangePassword = () => {
    const oldPassword = oldPasswordRef.current?.value;
    const newPassword = newPasswordRef.current?.value;
    if (oldPassword && newPassword) {
      onPasswordChange(oldPassword, newPassword);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        <InputField
          label="Old Password"
          inputRef={oldPasswordRef}
          required={true}
        />
        <InputField
          label="New Password"
          inputRef={newPasswordRef}
          disabled={!isNewPasswordEnabled}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button onClick={handleChangePassword}>Change</Button>{" "}
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordDialog;
