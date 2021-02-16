import React, { useEffect, useState, useCallback, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Button,
  TextField,
  Container,
  FormHelperText,
} from "@material-ui/core";
import { BaseUrl } from "../../config";
// import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";

import Title from "../Title";
import { AdminContext } from "../../context/AdminContext";
export default function AdsUpsert() {
  const classes = useStyles();
  const history = useHistory();
  const { handleEdit, handleGet, handleCreate } = useContext(AdminContext);
  const [errMsg, setErrMsg] = useState(null);

  const [values, setValues] = useState({
    location_name: "",
    slug: "",
    code: "",
  });
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      setValues({ ...values, [name]: value });
    },
    [values]
  );
  let { editId } = useParams();

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
  useEffect(() => {
    if (editId) {
      new Promise((rsl, rej) => {
        handleGet(`${BaseUrl}/locations/${editId}`, editId, rsl, rej);
      })
        .then((res) => {
          const { location_name, code, slug } = res;
          const formData = {
            location_name,
            code,
            slug,
          };

          setValues(formData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const EditSubmit = async (data) => {
    new Promise((rsl, rej) => {
      if (editId) {
        handleEdit(`${BaseUrl}/locations/${editId}`, values, rsl, rej);
      } else {
        handleCreate(`${BaseUrl}/locations`, values, rsl, rej);
      }
    })
      .then((res) => history.push("/admin/location"))
      .catch((err) => {
        console.log(err);
        setErrMsg(err);
      });
  };

  return (
    <>
      <Container component="main" maxWidth="md" className={classes.root}>
        <div className={classes.paper}>
          <Title>{editId ? "Edit" : "Add"} Location </Title>
          <form className={classes.form} onSubmit={handleSubmit(EditSubmit)}>
            <TextField
              type="text"
              label="Location Name *"
              name="location_name"
              variant="outlined"
              margin="dense"
              fullWidth
              onKeyUp={(ev) => {
                setValues({
                  ...values,
                  slug: ev.target.value.replace(/\s+/g, "_"),
                });
              }}
              value={values.location_name}
              onChange={handleChange}
              error={errors.location_name ? true : false}
              inputRef={register({
                required: "This is Required",
              })}
            />
            <FormHelperText error>
              {errors.location_name?.message}
            </FormHelperText>
            {errMsg?.location_name.map((err) => (
              <FormHelperText error> {err}</FormHelperText>
            ))}

            <TextField
              name="code"
              label="Location Code *"
              variant="outlined"
              value={values.code}
              onChange={handleChange}
              type="text"
              margin="dense"
              fullWidth
              inputRef={register({
                required: "This is Required",
              })}
              error={errors.code ? true : false}
            />
            <FormHelperText error>{errors.code?.message}</FormHelperText>
            {errMsg?.code.map((err) => (
              <FormHelperText error> {err}</FormHelperText>
            ))}
            <TextField
              name="slug"
              label="Location Slug *"
              variant="outlined"
              value={values.slug}
              onChange={handleChange}
              type="text"
              margin="dense"
              fullWidth
              onKeyUp={(ev) => {
                if (ev.which === 32) {
                  setValues({
                    ...values,
                    slug: ev.target.value.replace(/\s+/g, "_"),
                  });
                }
              }}
              inputRef={register({
                required: "This is Required",
              })}
              error={errors.slug ? true : false}
            />
            <FormHelperText error>{errors.slug?.message}</FormHelperText>
            {errMsg?.slug.map((err) => (
              <FormHelperText error> {err}</FormHelperText>
            ))}
            <div className={classes.wrapper}>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(0),
    display: "flex",
    flexDirection: "column",
    backgroundColor: "transparent",
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
  root: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    width: "70%",
  },
}));
