import { Button } from "@mui/material";
import React from "react";
interface SignOutButtonProps {
  buttonText: string;
  variant: "text" | "outlined" | "contained";
  onClick: () => void;
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
}

const SignOutButton: React.FC<SignOutButtonProps> = ({
  buttonText,
  variant,
  onClick,
  color = "primary",
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      style={{ marginLeft: "auto", marginBottom: "-5px" }}
      onClick={onClick}
    >
      {buttonText}
    </Button>
  );
};

export default SignOutButton;
