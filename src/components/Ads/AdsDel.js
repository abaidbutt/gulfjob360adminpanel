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
import {useHistory} from 'react-router-dom'
export default function AdsDel({ delId }) {
  const { handleDelete } = useContext(AdminContext);
  const [open, setOpen] = useState(false);
  const history=useHistory()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const AdsDelete = useCallback(() => {
    handleDelete(`${BaseUrl}/advertisements/${delId}`, delId);
    history.push('/admin/ads')
    setOpen(false);

  }, []);
  return (
    <div>
      <Button color="primary" onClick={handleClickOpen} fullWidth>
        <Delete />
      </Button>
      <Dialog open={open} keepMounted>
        <Box display="flex" justifyContent="space-between">
          <DialogTitle>Are you sure to Delete this Advertisement</DialogTitle>
          <Button edge="start" color="inherit" onClick={handleClose}>
            <Close />
          </Button>
        </Box>

        <DialogActions>
          <Button onClick={AdsDelete} color="secondary" variant="outlined">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
