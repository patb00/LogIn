import { Button } from "@mui/material";
import React from "react";
interface SignOutButtonProps {
  buttonText: string;
  variant: "text" | "outlined" | "contained";
  onClick: () => void;
  icon?: React.ReactNode;
}

const SignOutButton: React.FC<SignOutButtonProps> = ({
  buttonText,
  variant,
  onClick,
  icon,
}) => {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      sx={{
        height: 28,
        marginLeft: 1,
        fontFamily: "sans-serif",
        color: variant === "contained" ? "white" : "#242b46",
        backgroundColor: variant === "contained" ? "#242b46" : "",
        borderColor: variant === "outlined" ? "#242b46" : "",
        "&:hover": {
          backgroundColor: variant === "contained" ? "#3a4255" : "",
          borderColor: variant === "outlined" ? "#3a4255" : "",
          color: variant === "text" ? "#3a4255" : "",
        },
      }}
    >
      {icon && (
        <span
          style={{ marginRight: buttonText ? "5px" : "0", marginTop: "7px" }}
        >
          {icon}
        </span>
      )}{" "}
      {buttonText}
    </Button>
  );
};

export default SignOutButton;
