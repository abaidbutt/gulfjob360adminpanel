import React, { useEffect, useContext, useCallback } from "react";
import Moment from "react-moment";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  CircularProgress,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import Title from "./Title";
import { AdminContext } from "../context/AdminContext";
const useStyles2 = makeStyles((theme) => ({
  table: {
    minWidth: 500,
  },
  title: {
    padding: theme.spacing(2),
  },
}));
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);
export default function Orders() {
  const classes = useStyles2();
  const { fetchData, ctxLoad, ctxDetails, ctxResults } = useContext(
    AdminContext
  );
  const crtPage = ctxDetails.current_page;

  const handleChange = useCallback((event, value) => {
    fetchData(
      `http://gulfjobs.nwsols.com/api/users?per_page=${10}&page=${value}`
    );
  }, []);

  useEffect(() => {
    fetchData(`http://gulfjobs.nwsols.com/api/users?per_page=${10}&page=${1}`);
    console.log(ctxResults);
  }, []);

  return (
    <>
      {ctxLoad ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress color="secondary" />
        </Box>
      ) : (
        <>
          <Box display="flex" justifyContent="space-between">
            <Title className={classes.title}>Users </Title>
            <Title className={classes.title}>Total: {ctxDetails.total} </Title>
          </Box>
          <TableContainer>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <StyledTableCell>S.No</StyledTableCell>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell>Mobile Number</StyledTableCell>

                  <StyledTableCell align="center">Created Date</StyledTableCell>
                  <StyledTableCell align="center"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ctxResults.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {index + 1 + (crtPage > 1 ? crtPage * 10 - 10 : 0)}
                    </TableCell>
                    <TableCell>
                      {row.first_name} {row.last_name}
                    </TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.mobile_number}</TableCell>
                    <TableCell align="center">
                      <Moment
                        date={row.created_at.split("T")[0].replace(/-/g, "")}
                        fromNow
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            display="flex"
            justifyContent="flex-end"
            m={1}
            p={1}
            bgcolor="background.paper"
          >
            <Pagination
              count={ctxDetails.last_page}
              page={ctxDetails.current_page}
              onChange={handleChange}
              showFirstButton
              showLastButton
              color="secondary"
            />
          </Box>
        </>
      )}
    </>
  );
}
