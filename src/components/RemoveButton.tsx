import React from "react";
import { Button } from "@mui/material";

interface RemoveButtonProps {
  onClick: () => void;
  buttonText: string;
  variant: "text" | "outlined" | "contained";
}

const RemoveButton: React.FC<RemoveButtonProps> = ({
  onClick,
  buttonText,
  variant,
}) => {
  return (
    <Button
      color="error"
      onClick={onClick}
      variant={variant}
      sx={{ marginLeft: "auto", mr: 2, height: 25 }}
    >
      {buttonText}
    </Button>
  );
};

export default RemoveButton;
