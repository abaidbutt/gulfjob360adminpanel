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
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";

import Title from "../Title";
import { AdminContext } from "../../context/AdminContext";
export default function TipUpsert() {
  const classes = useStyles();
  const history = useHistory();
  const { handleEdit, handleGet, handleCreate, handleCategory } = useContext(
    AdminContext
  );
  const [errMsg, setErrMsg] = useState(null);
  const [category, setCategory] = useState();
  const [values, setValues] = useState({
    title: "",
    description: "",
    price: "",
    slug: "",
    status: "",
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

  const { register, handleSubmit, errors, control } = useForm({
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
        handleGet(`${BaseUrl}/services/${editId}`, editId, rsl, rej);
      })
        .then((res) => {
          const { title, description, price, status, slug, category_id } = res;
          const formData = {
            title,
            description,
            price,
            status,
            slug,
            category_id,
          };

          setValues(formData);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    new Promise((rsl, rej) => {
      handleCategory(`${BaseUrl}/categories`, "services", rsl, rej);
    })
      .then((res) => {
        const cateGory = res.filter((resCat) => resCat.type === "services");
        setCategory(cateGory);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const EditSubmit = async (data) => {
    new Promise((rsl, rej) => {
      if (editId) {
        handleEdit(`${BaseUrl}/services/${editId}`, values, rsl, rej);
      } else {
        handleCreate(`${BaseUrl}/services`, values, rsl, rej);
      }
    })
      .then((res) => history.push("/admin/service"))
      .catch((err) => {
        setErrMsg(err);
      });
  };
  const handleContent = (e, editor) => {
    const data = editor.getData();
    setValues({ ...values, description: data });
  };
  return (
    <>
      <Container component="main" maxWidth="md" className={classes.root}>
        <div className={classes.paper}>
          <Title>{editId ? "Edit" : "Add"} Service </Title>
          <form className={classes.form} onSubmit={handleSubmit(EditSubmit)}>
            <TextField
              type="text"
              label="Service Title *"
              name="title"
              variant="outlined"
              margin="dense"
              onKeyUp={(ev) => {
                setValues({
                  ...values,
                  slug: ev.target.value.replace(/\s+/g, "_"),
                });
              }}
              fullWidth
              value={values.title}
              onChange={handleChange}
              error={errors.title ? true : false}
              inputRef={register({
                required: "This is Required",
              })}
            />
            <FormHelperText error>{errors.title?.message}</FormHelperText>
            {errMsg?.title.map((err) => (
              <FormHelperText error> {err}</FormHelperText>
            ))}
            <CKEditor
              editor={ClassicEditor}
              data={values.description}
              onChange={handleContent}
            />
            {/* 
            <TextField
              type="text"
              label="Service Description *"
              name="description"
              variant="outlined"
              margin="dense"
              fullWidth
              value={values.description}
              multiline
              rows={3}
              onChange={handleChange}
              error={errors.description ? true : false}
              inputRef={register({
                required: "This is Required",
              })}
            />
            <FormHelperText error>{errors.description?.message}</FormHelperText> */}
            <TextField
              type="text"
              label="Service Price *"
              margin="dense"
              name="price"
              variant="outlined"
              fullWidth
              value={values.price}
              onChange={handleChange}
              error={errors.price ? true : false}
              inputRef={register({
                required: "This is Required",
              })}
            />
            <FormHelperText error>{errors.price?.message}</FormHelperText>

            <TextField
              name="slug"
              onKeyUp={(ev) => {
                if (ev.which === 32) {
                  setValues({
                    ...values,
                    slug: ev.target.value.replace(/\s+/g, "_"),
                  });
                }
              }}
              label="Service Slug *"
              variant="outlined"
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
            {errMsg?.slug.map((err) => (
              <FormHelperText error> {err}</FormHelperText>
            ))}

            <TextField
              label="status"
              select
              name="status"
              margin="dense"
              variant="outlined"
              inputProps={{
                inputRef: () =>
                  register({
                    required: "Thisi s Required",
                  }),
              }}
              onChange={handleChange}
              value={values.status}
              fullWidth
              error={errors.status ? true : false}
            >
              <MenuItem value={0}>In-Active</MenuItem>
              <MenuItem value={1}>Active</MenuItem>
            </TextField>

            <FormHelperText error>{errors.status?.message}</FormHelperText>

            <TextField
              label="Service Category"
              select
              margin="dense"
              variant="outlined"
              name="category_id"
              onChange={handleChange}
              // inputProps={{
              //   inputRef: (ref) => {
              //     if (!ref) return;
              //     register({
              //       name: "status",
              //       value: ref.value,
              //       required: "Thisis Required",
              //     });
              //   },
              // }}
              value={values.category_id}
              fullWidth
              error={errors.category_id ? true : false}
            >
              <MenuItem value={values.category_id}></MenuItem>
              {category &&
                category.map((ctg, i) => (
                  <MenuItem value={ctg.id} key={i}>
                    {ctg.name}
                  </MenuItem>
                ))}
            </TextField>

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
