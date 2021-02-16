import React, { useState } from "react";
import {
  TableCell,
  TableRow,
  Button,
  Menu,
  MenuItem,
  Avatar,
} from "@material-ui/core";
import Moment from "react-moment";
import { MoreVert, Edit } from "@material-ui/icons";
import PartnerDel from "./PartnerDel";

import { Link } from "react-router-dom";
const PartnerTable = ({ row, index, crtPage }) => {
  return (
    <TableRow key={row.id}>
      <TableCell component="th" scope="row">
        {index + 1 + (crtPage > 1 ? crtPage * 10 - 10 : 0)}
      </TableCell>
      <TableCell>{row.name}</TableCell>
      <TableCell>
        {/* <Avatar
          src={`http://gulfjob.nwsols.com/public${row.image}`}
          alt={row.name}
        /> */}
        <Avatar
          alt="Remy Sharp"
          src={`http://gulfjobs.nwsols.com/public${row.image}`}
        />
      </TableCell>

      <TableCell align="center">
        <Moment
          date={row.created_at.split("T")[0]}
          from={new Date().toISOString().split("T")[0]}
          ago
          interval={30000}
        />
      </TableCell>
      <TableCell align="center">
        <SimpleListMenu rowId={row.id} />
      </TableCell>
    </TableRow>
  );
};

export default PartnerTable;
function SimpleListMenu({ rowId }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button onClick={handleClickListItem}>
        <MoreVert />
      </Button>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <PartnerDel delId={rowId} />
        </MenuItem>
        <MenuItem>
          <Link to={`/admin/partner/edit/${rowId}`}>
            <Button color="primary" fullWidth>
              <Edit />
            </Button>
          </Link>
        </MenuItem>
      </Menu>
    </>
  );
}