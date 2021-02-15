import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

export default function Title({ children, ...props }) {
  return (
    <Typography
      component="h1"
      variant="h2"
      color="secondary"
      gutterBottom
      {...props}
    >
      {children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};
