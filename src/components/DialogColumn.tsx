import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

interface DialogColumnProps {
  open: boolean;
  onClose: () => void;
  onClick: () => void;
  editValue: string;
  setEditValue: (value: string) => void;
}

function DialogColumn({
  open,
  onClose,
  editValue,
  setEditValue,
  onClick,
}: DialogColumnProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Change Text Column</DialogTitle>
      <DialogContent>
        <TextField
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
        />

        <Button
          variant="contained"
          onClick={onClick}
          sx={{ width: 20, height: 55, ml: 2 }}
        >
          Apply
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogColumn;
