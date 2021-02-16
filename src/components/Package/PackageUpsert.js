import React, { useEffect, useState, useCallback, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Button,
  TextField,
  Container,
  FormHelperText,
  MenuItem,
} from "@material-ui/core";
import { BaseUrl } from "../../config";
// import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";

import Title from "../Title";
import { AdminContext } from "../../context/AdminContext";
export default function PackageUpsert() {
  const classes = useStyles();
  const history = useHistory();
  const { handleEdit, handleGet, handleCreate, handleCategory } = useContext(
    AdminContext
  );
  const [category, setCategory] = useState();
  const [values, setValues] = useState({
    title: "",
    description: "",
    price: "",
    slug: "",
    category_id: "",
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
        handleGet(`${BaseUrl}/packages/${editId}`, editId, rsl, rej);
      })
        .then((res) => {
          console.log(res, editId);
          const { title, description, slug, category_id, price } = res;
          const formData = {
            title,
            description,
            slug,
            category_id,
            price,
          };

          setValues(formData);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    new Promise((rsl, rej) => {
      handleCategory(`${BaseUrl}/categories`, "package", rsl, rej);
    })
      .then((res) => {
        const cateGory = res.filter((resCat) => resCat.type === "package");
        setCategory(cateGory);
        console.log(cateGory);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const EditSubmit = async (data) => {
    new Promise((rsl, rej) => {
      if (editId) {
        handleEdit(`${BaseUrl}/package/${editId}`, values, rsl, rej);
      } else {
        handleCreate(`${BaseUrl}/package`, values, rsl, rej);
      }
    })
      .then((res) => history.push("/admin/tip"))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Container component="main" maxWidth="md" className={classes.root}>
        <div className={classes.paper}>
          <Title>{editId?'Edit':'Add'} Tips </Title>
          <form className={classes.form} onSubmit={handleSubmit(EditSubmit)}>
            <TextField
              type="text"
              label="Tip Name *"
              name="heading"
              margin="dense"
              variant="outlined"
              fullWidth
              value={values.heading}
              onChange={handleChange}
              error={errors.heading ? true : false}
              inputRef={register({
                required: "This is Required",
              })}
            />
            <FormHelperText error>{errors.heading?.message}</FormHelperText>
            <TextField
              type="text"
              label="Tip Description *"
              name="description"
              margin="dense"
              variant="outlined"
              fullWidth
              value={values.description}
              onChange={handleChange}
              error={errors.description ? true : false}
              inputRef={register({
                required: "This is Required",
              })}
            />
            <FormHelperText error>{errors.description?.message}</FormHelperText>

            <TextField
              margin="dense"
              name="slug"
              label="Tip Slug *"
              onKeyUp={(ev) => {
                if (ev.which === 32) {
                  setValues({
                    ...values,
                    slug: ev.target.value.replace(/\s+/g, "_"),
                  });
                }
              }}
              variant="outlined"
              value={values.slug}
              onChange={handleChange}
              type="text"
              fullWidth
              inputRef={register({
                required: "This is Required",
              })}
              error={errors.slug ? true : false}
            />
            <FormHelperText error>{errors.slug?.message}</FormHelperText>
            {category && (
              <TextField
                label="Package Category"
                margin="dense"
                select
                variant="outlined"
                inputProps={{
                  inputRef: (ref) => {
                    if (!ref) return;
                    register({
                      name: "category_id",
                      value: ref.value,
                    });
                  },
                  onChange: (e) => {
                    const { category_id } = values;

                    setValues({ ...values, category_id: e.target.value });
                  },
                }}
                value={values.category_id}
                fullWidth
                error={errors.category_id ? true : false}
              >
                {/* <MenuItem></MenuItem> */}
                {category.map((ctg, i) => (
                  <MenuItem value={ctg.id} key={i}>
                    {ctg.name}
                  </MenuItem>
                ))}
              </TextField>
            )}

            <FormHelperText error>{errors.category_id?.message}</FormHelperText>
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
