import React from "react";
import { Button } from "@mui/material";

interface RemoveButtonProps {
  onClick: () => void;
  buttonText: string;
  variant: "text" | "outlined" | "contained";
  icon?: React.ReactNode;
}

const RemoveButton: React.FC<RemoveButtonProps> = ({
  onClick,
  buttonText,
  variant,
  icon,
}) => {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      sx={{
        borderRadius: "8px",
        width: 30,
        height: 30,
        minWidth: 0,
        padding: "6px",
        marginLeft: "auto",
        mr: 2,
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

export default RemoveButton;
