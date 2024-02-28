import * as React from "react";
import Checkbox from "@mui/material/Checkbox";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

interface CheckboxProps {
  onChange: () => void;
  checked: boolean;
}

const CheckBoxComponent: React.FC<CheckboxProps> = ({ onChange, checked }) => {
  return (
    <div>
      <Checkbox
        {...label}
        onChange={onChange}
        checked={checked}
        sx={{
          color: "#242b46", // Boja boxa
          "&.Mui-checked": {
            color: "#242b46", // Boja kvacice
          },
        }}
      />
    </div>
  );
};

export default CheckBoxComponent;
