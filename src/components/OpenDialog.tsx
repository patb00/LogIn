import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

interface OpenDialogProps {
  open: boolean;
  onClose: () => void;
  rowData?: { id: number; lastName: string; firstName: string; age: number };
}

function OpenDialog({ open, onClose, rowData }: OpenDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Selected Row</DialogTitle>
      <DialogContent>
        {rowData ? (
          <div>
            Full Name: {rowData.firstName} {rowData.lastName}
          </div>
        ) : (
          "No row selected"
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default OpenDialog;
