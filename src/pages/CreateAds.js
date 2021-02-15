import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  TextField,
  Container,
  FormHelperText,
  MenuItem,
} from "@material-ui/core";
import { BaseUrl } from "../config";

import { makeStyles } from "@material-ui/core/styles";

import { useForm } from "react-hook-form";
import Title from "../components/Title";

import { AdminContext } from "../context/AdminContext";

function CreateAds() {
  const classes = useStyles();
  const history = useHistory();
  const { handleCreate } = useContext(AdminContext);

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

  const loginSubmit = async (data) => {
    new Promise((rsl, rej) => {
      handleCreate(`${BaseUrl}/advertisements`, data, rsl, rej);
    })
      .then((res) => {
        console.log(res);
        history.push("/admin/ads");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Container component="main" maxWidth="md">
        <div className={classes.paper}>
          <Title>Create </Title>
          <form className={classes.form} onSubmit={handleSubmit(loginSubmit)}>
            <TextField
              type="text"
              label="Location *"
              name="location"
              variant="outlined"
              fullWidth
              error={errors.location ? true : false}
              inputRef={register({
                required: "This is Required",
              })}
            />
            <FormHelperText error>{errors.location?.message}</FormHelperText>

            <TextField
              name="content"
              label="Content *"
              variant="outlined"
              type="text"
              fullWidth
              multiline
              rows={4}
              inputRef={register({
                required: "This is Required",
              })}
              error={errors.content ? true : false}
            />
            <FormHelperText error>{errors.content?.message}</FormHelperText>

            <TextField
              label="Status"
              select
              variant="outlined"
              inputProps={{
                inputRef: (ref) => {
                  if (!ref) return;
                  register({
                    name: "status",
                    value: ref.value,
                  });
                },
                onChange: (e) => {
                  const { status } = values;

                  setValues({ ...values, status: e.target.value });
                },
              }}
              value={values.status || 0}
              fullWidth
              error={errors.status ? true : false}
            >
              <MenuItem value={0}>In-Active</MenuItem>
              <MenuItem value={1}>Active</MenuItem>
            </TextField>

            <FormHelperText error>{errors.status?.message}</FormHelperText>
            <div className={classes.wrapper}>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
                Create
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
}
export default CreateAds;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(0),
    display: "flex",
    flexDirection: "column",
    backgroundColor: "transparent",
    marginTop: "2vh",
  },
  wrapper: {
    display: "flex",
    justifyContent: "center",
  },

  form: {
    marginTop: theme.spacing(1),
  },
  submit: {
    color: "white",
    margin: theme.spacing(2, 0, 2),
  },
}));
