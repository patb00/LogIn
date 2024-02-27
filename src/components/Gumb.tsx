import { Button } from "@mui/material";
import React from "react";
interface GumbProps {
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
    | "warning"; // Optional, add more colors as needed
}

const Gumb: React.FC<GumbProps> = ({
  buttonText,
  variant,
  onClick,
  color = "primary",
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      fullWidth
      style={{ marginBottom: "10px" }}
      onClick={onClick}
    >
      {buttonText}
    </Button>
  );
};

export default Gumb;
