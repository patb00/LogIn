import React, { useState, useRef } from "react";
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
  username: string;
}

const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = ({
  open,
  onClose,
  onPasswordChange,
  username,
}) => {
  const oldPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const [isOldPasswordVerified, setIsOldPasswordVerified] = useState(false);

  const verifyOldPassword = () => {
    const oldPassword = oldPasswordRef.current?.value;
    const currentUserJson = localStorage.getItem("currentUser");
    if (currentUserJson) {
      const currentUser = JSON.parse(currentUserJson);
      console.log(`Verifying for user: ${username}`);
      console.log(`Expected password: ${currentUser.password}`);
      console.log(`Entered password: ${oldPassword}`);
      if (
        currentUser.username === username &&
        currentUser.password === oldPassword
      ) {
        setIsOldPasswordVerified(true);
      } else {
        alert("The old password is incorrect.");
      }
    }
  };

  const handleChangePassword = () => {
    const newPassword = newPasswordRef.current?.value;
    if (isOldPasswordVerified && newPassword) {
      onPasswordChange(oldPasswordRef.current?.value || "", newPassword);
      setIsOldPasswordVerified(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ color: "#242b46" }}>Promijeni lozinku</DialogTitle>
      <DialogContent>
        <InputField
          label="Stara Lozinka"
          inputRef={oldPasswordRef}
          required={true}
        />
        <Button
          sx={{ color: "#242b46" }}
          onClick={verifyOldPassword}
          disabled={isOldPasswordVerified}
        >
          {isOldPasswordVerified
            ? "Verificiraj Staru Lozinku"
            : "Verificiraj Staru Lozinku"}
        </Button>
        <InputField
          label="Nova Lozinka"
          inputRef={newPasswordRef}
          disabled={!isOldPasswordVerified}
          required={true}
        />
      </DialogContent>
      <DialogActions>
        <Button sx={{ color: "#242b46" }} onClick={onClose}>
          Close
        </Button>
        <Button
          sx={{ color: "#242b46" }}
          onClick={handleChangePassword}
          disabled={!isOldPasswordVerified}
        >
          Change
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordDialog;
