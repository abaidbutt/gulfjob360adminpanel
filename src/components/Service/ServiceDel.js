import React, { useCallback, useContext, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  
} from "@material-ui/core";
import { BaseUrl } from "../../config";
import { Delete, Close } from "@material-ui/icons";
import { AdminContext } from "../../context/AdminContext";
export default function TipDel({ delId }) {
  const { handleDelete } = useContext(AdminContext);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const ServiceDelete = useCallback(() => {
    handleDelete(`${BaseUrl}/services/${delId}`, delId);
  }, []);
  return (
    <div>
      <Button color="primary" onClick={handleClickOpen} fullWidth>
        <Delete />
      </Button>
      <Dialog open={open} keepMounted>
        <Box display="flex" justifyContent="space-between">
          <DialogTitle>
            Are you sure to Delete this Service
          </DialogTitle>
          <Button edge="start" color="inherit" onClick={handleClose}>
            <Close />
          </Button>
        </Box>

        <DialogActions>
          <Button onClick={ServiceDelete} color="secondary" variant="outlined">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
