import React, { useContext, useCallback, useEffect } from "react";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  
  Box,
  Typography,
  
  CircularProgress,
  
} from "@material-ui/core";
import { AdminContext } from "../../context/AdminContext";
import { Pagination } from "@material-ui/lab";
import Title from "../../components/Title";

import PackageTable from "../../components/Package/PackageTable";

export default function Location() {
  const classes = useStyles2();
  const { fetchData, ctxLoad, ctxDetails, ctxResults } = useContext(
    AdminContext
  );

  const handleChange = useCallback((event, value) => {
    fetchData(
      `http://gulfjobs.nwsols.com/api/packages?per_page=${10}&page=${value}`
    );
  }, []);

  useEffect(() => {
    fetchData(
      `http://gulfjobs.nwsols.com/api/packages?per_page=${10}&page=${1}`
    );
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
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
          >
            <Title className={classes.title}>Packages </Title>
            <Typography
              className={classes.title}
              component="h1"
              variant="h2"
              color="primary"
              gutterBottom
            >
              Total: {ctxDetails.total}{" "}
            </Typography>
          </Box>
          <TableContainer>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <StyledTableCell>S.No</StyledTableCell>
                  <StyledTableCell>Title</StyledTableCell>

                  <StyledTableCell>price</StyledTableCell>
                  <StyledTableCell>Category</StyledTableCell>

                  <StyledTableCell align="center">Created </StyledTableCell>
                  <StyledTableCell align="center"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ctxResults.map((row, index) => (
                  <PackageTable
                    row={row}
                    index={index}
                    key={index}
                    crtPage={ctxDetails.current_page}
                  />
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
              page={ctxDetails.current_page || 1}
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
