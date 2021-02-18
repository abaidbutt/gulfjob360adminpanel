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
import { DropzoneDialog } from "material-ui-dropzone";

import Title from "../Title";
import { AdminContext } from "../../context/AdminContext";
export default function AdsUpsert() {
  const [fileOpen, setFileOpen] = useState(false);
  const classes = useStyles();
  const history = useHistory();
  const [errMsg, setErrMsg] = useState(null);
  const { handleEdit, handleGet, handleCreate } = useContext(AdminContext);
  const [values, setValues] = useState({
    name: "",
    description: "",
    image: [],
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
        handleGet(`${BaseUrl}/partners/${editId}`, editId, rsl, rej);
      })
        .then((res) => {
          const { name, description, image } = res;
          const formData = {
            name,
            description,
            image,
          };

          setValues(formData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  function handleClose() {
    setFileOpen(false);
  }

  function handleSave(files) {
    setFileOpen(false);

    setValues({ ...values, image: files });
  }

  function handleOpen() {
    setFileOpen(true);
  }

  const EditSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    values.image = data.image[0];
    formData.append("image", values.image);

    new Promise((rsl, rej) => {
      if (editId) {
        handleEdit(`${BaseUrl}/partners/${editId}`, formData, rsl, rej);
      } else {
        handleCreate(`${BaseUrl}/partners`, formData, rsl, rej);
      }
    })
      .then((res) => history.push("/admin/partner"))
      .catch((err) => {
        setErrMsg(err);
      });
  };

  return (
    <>
      <Container component="main" maxWidth="md" className={classes.root}>
        <div className={classes.paper}>
          <Title>{editId ? "Edit" : "Add"} Partner </Title>
          <form
            className={classes.form}
            onSubmit={handleSubmit(EditSubmit)}
            encType="multipart/form-data"
          >
            <TextField
              type="text"
              label="name *"
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
            {errMsg?.name.map((err) => (
              <FormHelperText error> {err}</FormHelperText>
            ))}
            <TextField
              name="description"
              label="description *"
              variant="outlined"
              value={values.description}
              onChange={handleChange}
              type="text"
              fullWidth
              margin="dense"
              multiline
              rows={4}
              inputRef={register({
                required: "This is Required",
              })}
              error={errors.description ? true : false}
            />
            <FormHelperText error>{errors.description?.message}</FormHelperText>

            <input
              accept="image/*"
              style={{ display: "none" }}
              id="contained-button-file"
              type="file"
              name="image"
              ref={register}
              onChange={(e) => {
                setValues({ ...values, image: e.target.files[0].name });
              }}
            />

            <label htmlFor="contained-button-file">
              <Button variant="contained" color="primary" component="span">
                Upload
              </Button>
            </label>
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
