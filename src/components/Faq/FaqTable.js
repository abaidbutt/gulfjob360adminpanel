import React, { useState } from "react";
import { TableCell, TableRow, Button, Menu, MenuItem } from "@material-ui/core";
import Moment from "react-moment";
import { MoreVert, Edit } from "@material-ui/icons";
import FaqDel from "./FaqDel";
import htmr from "htmr";

import { Link, useRouteMatch } from "react-router-dom";
export default function FaqTable({ row, index, crtPage }) {
  return (
    <TableRow key={row.id}>
      <TableCell component="th" scope="row">
        {index + 1 + (crtPage > 1 ? crtPage * 10 - 10 : 0)}
      </TableCell>
      <TableCell>{row.heading}</TableCell>
      <TableCell>{row.description ? htmr(row.description) : ""}</TableCell>
      <TableCell>{row.status === 0 ? "In-Active" : "Active"}</TableCell>
      <TableCell>{row.category_id}</TableCell>
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
}

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
          <FaqDel delId={rowId} />
        </MenuItem>
        <MenuItem>
          <Link to={`/admin/faq/edit/${rowId}`}>
            <Button color="primary" fullWidth>
              <Edit />
            </Button>
          </Link>
        </MenuItem>
      </Menu>
    </>
  );
}
