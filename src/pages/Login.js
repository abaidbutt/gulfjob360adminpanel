import React, { useState, useContext } from "react";
import {
  Avatar,
  Button,
  TextField,
  Box,
  Typography,
  Container,
  FormHelperText,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";

import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { BaseUrl } from "../config";
import { useForm } from "react-hook-form";
import { AdminContext } from "../context/AdminContext";

import { toast } from "react-toastify";
export default function Login() {
  const { loginUser } = useContext(AdminContext);
  const [msg, setMsg] = useState(null);
  const classes = useStyles();
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {},
    resolver: undefined,
    context: undefined,
    criteriaMode: "firstError",
    shouldFocusError: true,
    shouldUnregister: true,
  });

  const handleLogin = (data) => {
    console.log(data);
    new Promise((rsl, rej) => {
      loginUser(`${BaseUrl}/admin-login`, data, rsl, rej);
    })
      .then((res) => {
        history.push("/admin");
      })
      .catch((err) => {
        console.log(err);
        setMsg(err);
        toast("Please Check Login credentials");
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Admin Panel Log In{" "}
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit(handleLogin)}>
          <div className={classes.input}>
            <FormHelperText error>
              {msg ? "Check Your Login Credentials" : ""}
            </FormHelperText>
            <TextField
              autoFocus
              variant="outlined"
              fullWidth
              label="Email Address"
              name="email"
              inputRef={register({
                required: "This Field is Required",
              })}
              error={errors.email ? true : false}
            />

            <FormHelperText error>{errors.email?.message}</FormHelperText>
          </div>
          <div className={classes.input}>
            <TextField
              variant="outlined"
              fullWidth
              name="password"
              label="Password"
              type="password"
              inputRef={register({
                required: "This Field is Required",
              })}
              error={errors.password ? true : false}
            />

            <FormHelperText error>{errors.password?.message}</FormHelperText>
          </div>
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log In
          </Button>
          {/* <Grid container>
            <Grid item xs>
            <Link to="#" variant="body2">
            Forgot password?
            </Link>
            </Grid>
            <Grid item>
            <Link to="/" variant="body2">
            {"Don't have an account? Sign Up"}
            </Link>
            </Grid>
          </Grid> */}
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"GulfJobs360"}{" "}
      <Link color="inherit" to="/">
        View Website
      </Link>
      {"."}
    </Typography>
  );
}
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8 * 2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "white",
    padding: "25px",
    borderRadius: "25px",
  },
  input: {
    marginTop: theme.spacing(2),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
