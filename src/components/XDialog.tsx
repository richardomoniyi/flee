import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

interface XDialogProps {
  title: string;
  message: string;
  isOpen: boolean;
  onConfirm: () => void; // Event handler for Confirm button
}

const XDialog: React.FC<XDialogProps> = ({ title, message,isOpen, onConfirm }) => {
  const [open, setOpen] = useState<boolean>(isOpen);

  return (
    <div>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <p>{message}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">Cancel</Button>
          <Button 
            onClick={() => {
              onConfirm(); // Call the parent function
              setOpen(false); // Close the modal after confirming
            }} 
            color="secondary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default XDialog

