import React, { useEffect, useContext, useCallback, useState } from "react";
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
import Title from "../Title";
import { useParams } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
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
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
  body: {
    backgroundColor: theme.palette.background.default,
    fontSize: 14,
  },
}))(TableCell);
export default function Orders() {
  const classes = useStyles2();
  const { fetchData, ctxLoad, ctxDetails, ctxResults, handleGet } = useContext(
    AdminContext
  );
  const [viewData, setViewData] = useState({});
  const { viewId } = useParams();
  //   const crtPage = ctxDetails.current_page;

  //   const handleChange = useCallback((event, value) => {
  //     fetchData(
  //       `http://gulfjobs.nwsols.com/api/users?per_page=${10}&page=${value}`
  //     );
  //   }, []);

  useEffect(() => {
    if (viewId) {
      new Promise((rsl, rej) => {
        handleGet(
          `http://gulfjobs.nwsols.com/api/jobs/${viewId}`,
          viewId,
          rsl,
          rej
        );
      })
        .then((res) => {
          setViewData(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
            <Title className={classes.title}>Jobs Details </Title>
          </Box>
          <TableContainer>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <StyledTableCell>Title</StyledTableCell>
                  <TableCell>{viewData.title}</TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Description</StyledTableCell>
                  <TableCell>{viewData.description}</TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Other Benefits</StyledTableCell>
                  <TableCell>{viewData.other_benifits}</TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Total Seats</StyledTableCell>
                  <TableCell>{viewData.total_seats}</TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Status</StyledTableCell>
                  <TableCell>
                    {viewData.status === 0 ? "In-Active" : "Active"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Max Salary</StyledTableCell>
                  <TableCell>{viewData.max_salary}</TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Min Salary</StyledTableCell>
                  <TableCell>{viewData.min_salary}</TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Industry</StyledTableCell>
                  <TableCell>{viewData.industry_type}</TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Job Location</StyledTableCell>
                  <TableCell>{viewData.job_location}</TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Current Location</StyledTableCell>
                  <TableCell>{viewData.current_location}</TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Experince From</StyledTableCell>
                  <TableCell>{viewData.experince_from}</TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Job Faq</StyledTableCell>
                  <TableCell>{viewData.job_faq}</TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Nationality</StyledTableCell>
                  <TableCell>{viewData.nationality}</TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Gender</StyledTableCell>
                  <TableCell>{viewData.gender}</TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Company</StyledTableCell>
                  <TableCell>{viewData.company_id}</TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Created At</StyledTableCell>
                  <TableCell>{viewData.created_at}</TableCell>
                </TableRow>
                {/* {ctxResults.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {index + 1 + (crtPage > 1 ? crtPage * 10 - 10 : 0)}
                    </TableCell>
                    <TableCell>
                      {row.first_name} {row.last_name}
                    </TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.mobile_number}</TableCell>
                    <TableCell >
                      <Moment
                        date={row.created_at.split("T")[0].replace(/-/g, "")}
                        fromNow
                      />
                    </TableCell>
                  </TableRow>
                ))} */}
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
            {/* <Pagination
              count={ctxDetails.last_page}
              page={ctxDetails.current_page}
              onChange={handleChange}
              showFirstButton
              showLastButton
              color="secondary"
            /> */}
          </Box>
        </>
      )}
    </>
  );
}
