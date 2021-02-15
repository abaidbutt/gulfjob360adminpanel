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
  const [values, setValues] = useState({
    name: "",
    slug: "",
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
        handleGet(`${BaseUrl}/industries/${editId}`, editId, rsl, rej);
      })
        .then((res) => {
          const { name, slug } = res;
          const formData = {
            name,
            slug,
          };
          console.log(res);
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
        handleEdit(`${BaseUrl}/industries/${editId}`, values, rsl, rej);
      } else {
        handleCreate(`${BaseUrl}/industries`, values, rsl, rej);
      }
    })
      .then((res) => history.push("/admin/industry"))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Container component="main" maxWidth="md" className={classes.root}>
        <div className={classes.paper}>
          <Title>{editId ? "Edit" : "Insert"} Industry </Title>
          <form className={classes.form} onSubmit={handleSubmit(EditSubmit)}>
            <TextField
              type="text"
              label="Industry Name *"
              name="name"
              variant="outlined"
              margin="dense"
              fullWidth
              value={values.name}
              onChange={handleChange}
              error={errors.name ? true : false}
              inputRef={register({
                required: "This is Required",
              })}
            />
            <FormHelperText error>{errors.name?.message}</FormHelperText>

            <TextField
              name="slug"
              label="Industry Slug *"
              variant="outlined"
              onKeyUp={(ev) => {
                if (ev.which === 32) {
                  setValues({
                    ...values,
                    slug: ev.target.value.replace(/\s+/g, "_"),
                  });
                }
              }}
              value={values.slug}
              onChange={handleChange}
              margin="dense"
              type="text"
              fullWidth
              inputRef={register({
                required: "This is Required",
              })}
              error={errors.slug ? true : false}
            />
            <FormHelperText error>{errors.slug?.message}</FormHelperText>

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
