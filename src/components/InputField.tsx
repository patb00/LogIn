import { TextField } from '@mui/material';

interface InputFieldProps {
  label: string;
  inputRef?: React.Ref<HTMLInputElement>;
}

const InputField: React.FC<InputFieldProps> = ({ label, inputRef }) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      margin="normal"
      style={{ marginBottom: '13px' }}
      label={label}
      inputRef={inputRef}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

export default InputField;
