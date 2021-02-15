import React, {useState} from "react";
import { TableCell, TableRow, Button, Menu, MenuItem } from "@material-ui/core";
import Moment from "react-moment";
import { MoreVert, Edit } from "@material-ui/icons";
import LocationDel from "./LocationDel";

import { Link } from "react-router-dom";
const LocationTable = ({ row, index, crtPage }) => {
  return (
    <TableRow key={row.id}>
      <TableCell component="th" scope="row">
        {index + 1 + (crtPage > 1 ? crtPage * 5 - 5 : 0)}
      </TableCell>
      <TableCell>{row.location_name}</TableCell>
      <TableCell>{row.code}</TableCell>

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

export default LocationTable;
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
          <LocationDel delId={rowId} />
        </MenuItem>
        <MenuItem>
          <Link to={`/admin/location/edit/${rowId}`}>
            <Button color="primary" fullWidth>
              <Edit />
            </Button>
          </Link>
        </MenuItem>
      </Menu>
    </>
  );
}
