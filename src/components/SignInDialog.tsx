import React, { useRef } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import InputField from "../components/InputField";
import SnackbarDialog from "../components/SnackbarDialog";

interface SignInDialogProps {
  open: boolean;
  onClose: () => void;
}

const SignInDialog: React.FC<SignInDialogProps> = ({ open, onClose }) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const surnameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [entered, setOpen] = React.useState(false);

  const informacijeOsobe = () => {
    const name = nameRef.current?.value || "";
    const surname = surnameRef.current?.value || "";
    const username = usernameRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (!passwordRegex.test(password)) {
      alert(
        "Password must be more than 8 characters long and include at least one uppercase and one lowercase letter."
      );
      return;
    }

    const newUser = { name, surname, username, password };
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    const signInSuccessful = true;

    if (signInSuccessful) {
      setTimeout(() => {
        setOpen(true);
      }, 500);

      setTimeout(() => {
        window.location.href = "/login";
      }, 800);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Sign Up</DialogTitle>
      <DialogContent>
        <InputField label="Name" inputRef={nameRef} />
        <InputField label="Surname" inputRef={surnameRef} />
        <InputField label="Username" inputRef={usernameRef} />
        <InputField label="Password" inputRef={passwordRef} />
      </DialogContent>
      <DialogActions>
        <Button sx={{ color: "#242b46" }} onClick={onClose}>
          Close
        </Button>
        <Button sx={{ color: "#242b46" }} onClick={informacijeOsobe}>
          Sign In
        </Button>
      </DialogActions>
      <SnackbarDialog open={entered} onClose={handleClose} />
    </Dialog>
  );
};

export default SignInDialog;
