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
function CategoryUpsert() {
  const classes = useStyles();
  const history = useHistory();
  const { handleEdit, handleGet, handleCreate } = useContext(AdminContext);
  const [values, setValues] = useState({
    name: "",
    slug: "",
    type: "",
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
        handleGet(`${BaseUrl}/categories/${editId}`, editId, rsl, rej);
      })
        .then((res) => {
          const { name, slug, type } = res;
          const formData = {
            name,
            slug,
            type,
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
        handleEdit(`${BaseUrl}/categories/${editId}`, values, rsl, rej);
      } else {
        handleCreate(`${BaseUrl}/categories`, values, rsl, rej);
      }
    })
      .then((res) => history.push("/admin/category"))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Container component="main" maxWidth="md" className={classes.root}>
        <div className={classes.paper}>
          <Title>{editId ? "Edit" : "Insert"} Category </Title>
          <form className={classes.form} onSubmit={handleSubmit(EditSubmit)}>
            <TextField
              type="text"
              margin="dense"
              label="Category Name *"
              name="name"
              variant="outlined"
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
              label="Category Slug *"
              variant="outlined"
              value={values.slug}
              onChange={handleChange}
              margin="dense"
              type="text"
              onKeyUp={(ev) => {
                if (ev.which === 32) {
                  setValues({
                    ...values,
                    slug: ev.target.value.replace(/\s+/g, "_"),
                  });
                }
              }}
              fullWidth
              inputRef={register({
                required: "This is Required",
              })}
              error={errors.slug ? true : false}
            />
            <FormHelperText error>{errors.slug?.message}</FormHelperText>
            <TextField
              margin="dense"
              name="type"
              label="Category *"
              variant="outlined"
              value={values.type}
              onChange={handleChange}
              type="text"
              fullWidth
              inputRef={register({
                required: "This is Required",
              })}
              error={errors.type ? true : false}
            />
            <FormHelperText error>{errors.type?.message}</FormHelperText>

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
export default CategoryUpsert;

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
