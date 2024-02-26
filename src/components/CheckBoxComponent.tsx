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
      <Checkbox {...label} onChange={onChange} checked={checked} />
    </div>
  );
};

export default CheckBoxComponent;
