import { Button, SxProps } from "@mui/material";
import React from "react";

interface GumbProps {
  buttonText?: string;
  variant: "text" | "outlined" | "contained";
  onClick: () => void;
  sx?: SxProps;
  icon?: React.ReactNode;
}

const Gumb: React.FC<GumbProps> = ({
  buttonText,
  variant,
  onClick,
  sx,
  icon,
}) => {
  return (
    <Button
      variant={variant}
      fullWidth
      onClick={onClick}
      sx={{
        ...sx,
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
          style={{ marginRight: buttonText ? "10px" : "0", marginTop: "5px" }}
        >
          {icon}
        </span>
      )}{" "}
      {buttonText}
    </Button>
  );
};

export default Gumb;
