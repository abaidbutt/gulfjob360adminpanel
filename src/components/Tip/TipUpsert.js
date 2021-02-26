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
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Title from "../Title";
import { AdminContext } from "../../context/AdminContext";
export default function TipUpsert() {
  const classes = useStyles();
  const history = useHistory();
  const [errMsg, setErrMsg] = useState(null);
  const { handleEdit, handleGet, handleCreate, handleCategory } = useContext(
    AdminContext
  );
  const [category, setCategory] = useState();
  const [values, setValues] = useState({
    heading: "",

    slug: "",
    category_id: "",
  });
  const [description, setDescription] = useState("");
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
        handleGet(`${BaseUrl}/tips/${editId}`, editId, rsl, rej);
      })
        .then((res) => {
          console.log(res, editId);
          const { heading, description, slug, category_id } = res;
          const formData = {
            heading,
            slug,
            category_id,
          };
          setDescription(description);

          setValues(formData);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    new Promise((rsl, rej) => {
      handleCategory(`${BaseUrl}/categories`, "tips", rsl, rej);
    })
      .then((res) => {
        const cateGory = res.filter((resCat) => resCat.type === "tips");
        setCategory(cateGory);
        console.log(cateGory);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const EditSubmit = async (data) => {
    values.description = description;
    new Promise((rsl, rej) => {
      if (editId) {
        handleEdit(`${BaseUrl}/tips/${editId}`, values, rsl, rej);
      } else {
        handleCreate(`${BaseUrl}/tips`, values, rsl, rej);
      }
    })
      .then((res) => history.push("/admin/tip"))
      .catch((err) => {
        setErrMsg(err);
        console.log(err);
      });
  };
  const handleContent = (e, editor) => {
    const data = editor.getData();
    setDescription(data);
  };
  return (
    <>
      <Container component="main" maxWidth="md" className={classes.root}>
        <div className={classes.paper}>
          <Title>{editId ? "Edit" : "Add"} Tips </Title>
          <form className={classes.form} onSubmit={handleSubmit(EditSubmit)}>
            <TextField
              type="text"
              label="Tip Name *"
              name="heading"
              onKeyUp={(ev) => {
                setValues({
                  ...values,
                  slug: ev.target.value.replace(/\s+/g, "_"),
                });
              }}
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
            {errMsg?.heading.map((err) => (
              <FormHelperText error> {err}</FormHelperText>
            ))}
            <CKEditor
              editor={ClassicEditor}
              data={description}
              onChange={handleContent}
            />
            {/* <TextField
              type="text"
              label="Tip Description *"
              name="description"
              margin="dense"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              value={values.description}
              onChange={handleChange}
              error={errors.description ? true : false}
              inputRef={register({
                required: "This is Required",
              })}
            />
            <FormHelperText error>{errors.description?.message}</FormHelperText> */}

            <TextField
              name="slug"
              label="Tip Slug *"
              variant="outlined"
              onKeyUp={(ev) => {
                if (ev.which === 32) {
                  setValues({
                    ...values,
                    slug: ev.target.value.replace(/\s+/g, "_"),
                  });
                }
              }}
              margin="dense"
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
                label="Tips Category Id"
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
