import React, { useState } from "react";
import { TableCell, TableRow, Button, Menu, MenuItem } from "@material-ui/core";
import Moment from "react-moment";
import { MoreVert, Edit } from "@material-ui/icons";
import AdsDel from "./AdsDel";
import htmr from "htmr";
import { Link, useRouteMatch } from "react-router-dom";
const AdsTable = ({ row, index, crtPage }) => {
  return (
    <TableRow key={row.id}>
      <TableCell component="th" scope="row">
        {index + 1 + (crtPage > 1 ? crtPage * 10 - 10 : 0)}
      </TableCell>
      <TableCell>{row.location}</TableCell>
      <TableCell>{row?.content ? htmr(row?.content) : ""}</TableCell>
      <TableCell>{row.status === 0 ? "In-Active" : "Active"}</TableCell>
      <TableCell align="center">
        <Moment
          date={row.created_at.split(".")[0]}
          from={new Date().toJSON().split(".")[0]}
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

export default AdsTable;
function SimpleListMenu({ rowId }) {
  const { url } = useRouteMatch();
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
          <AdsDel delId={rowId} />
        </MenuItem>
        <MenuItem>
          <Link to={`${url}/edit/${rowId}`}>
            <Button color="primary" fullWidth>
              <Edit />
            </Button>
          </Link>
        </MenuItem>
      </Menu>
    </>
  );
}
