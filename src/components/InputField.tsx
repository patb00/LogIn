import { TextField } from "@mui/material";

interface InputFieldProps {
  label: string;
  inputRef?: React.Ref<HTMLInputElement>;
  error?: boolean;
  helperText?: string;
  type?: "password" | "number" | "search";
  required?: boolean;
  disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  inputRef,
  error,
  helperText,
  type,
  required,
  disabled,
}) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      margin="normal"
      style={{ marginBottom: "13px" }}
      label={label}
      inputRef={inputRef}
      error={error}
      helperText={helperText}
      type={type}
      required={required}
      disabled={disabled}
    />
  );
};

export default InputField;
