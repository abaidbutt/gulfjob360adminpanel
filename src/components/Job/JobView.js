import React, { useEffect, useContext, useState } from "react";
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
export default function JobView() {
  const classes = useStyles2();
  const { ctxLoad, handleGet } = useContext(AdminContext);
  const [viewData, setViewData] = useState(null);
  const { viewId } = useParams();

  useEffect(() => {
    console.log(viewId);
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
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <>
      {!viewData ? (
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
                  <TableCell>{viewData?.title}</TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Description</StyledTableCell>
                  <TableCell>{viewData?.description}</TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Other Benefits</StyledTableCell>
                  <TableCell>{viewData?.other_benifits}</TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Total Seats</StyledTableCell>
                  <TableCell>{viewData?.total_seats}</TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Status</StyledTableCell>
                  <TableCell>
                    {viewData?.status === 0 ? "In-Active" : "Active"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Max Salary</StyledTableCell>
                  <TableCell>{viewData?.max_salary}</TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Min Salary</StyledTableCell>
                  <TableCell>{viewData?.min_salary}</TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Industry</StyledTableCell>
                  <TableCell>{viewData?.industry_type}</TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Job Location</StyledTableCell>
                  <TableCell>{viewData?.job_location}</TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Current Location</StyledTableCell>
                  <TableCell>{viewData?.current_location}</TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Experince From</StyledTableCell>
                  <TableCell>{viewData?.experince_from}</TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Job Faq</StyledTableCell>
                  <TableCell>{viewData?.job_faq}</TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Nationality</StyledTableCell>
                  <TableCell>{viewData?.nationality}</TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Gender</StyledTableCell>
                  <TableCell>{viewData?.gender}</TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Company</StyledTableCell>
                  <TableCell>{viewData?.company_id}</TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Created At</StyledTableCell>
                  <TableCell>
                    <Moment
                      date={viewData.created_at.split(".")[0]}
                      from={new Date().toJSON().split(".")[0]}
                      ago
                      interval={30000}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
}
