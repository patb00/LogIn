import { TextField } from "@mui/material";

interface InputFieldProps {
  label: string;
  inputRef?: React.Ref<HTMLInputElement>;
  error?: boolean;
  helperText?: string;
  type?: "password" | "number" | "search";
  required?: boolean;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  inputRef,
  error,
  helperText,
  type,
  required,
  disabled,
  onChange,
}) => {
  return (
    <TextField
      sx={{
        "& label.Mui-focused": {
          color: "#242b46",
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#242b46",
          },
          "&:hover fieldset": {
            borderColor: "#242b46",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#242b46",
          },
          color: "#242b46",
        },
      }}
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
      onChange={onChange}
    />
  );
};

export default InputField;
