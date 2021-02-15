import React, {useState} from "react";
import { TableCell, TableRow, Button, Menu, MenuItem } from "@material-ui/core";
import Moment from "react-moment";
import { MoreVert, Edit } from "@material-ui/icons";
import PackageDel from "./PackageDel";

import { Link } from "react-router-dom";
export default function PackageTable({ row, index, crtPage }) {
  return (
    <TableRow key={row.id}>
      <TableCell component="th" scope="row">
        {index + 1 + (crtPage > 1 ? crtPage * 5 - 5 : 0)}
      </TableCell>
      <TableCell>{row.title}</TableCell>
      <TableCell>{row.price}</TableCell>
      <TableCell>{row.category_id}</TableCell>
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
}

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
          <PackageDel delId={rowId} />
        </MenuItem>
        <MenuItem>
          <Link to={`/admin/package/edit/${rowId}`}>
            <Button color="primary" fullWidth>
              <Edit />
            </Button>
          </Link>
        </MenuItem>
      </Menu>
    </>
  );
}
