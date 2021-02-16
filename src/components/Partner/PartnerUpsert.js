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

  // const openFile = (event) => {
  //   const input = event.target;

  //   const reader = new FileReader();
  //   reader.onload = function () {
  //     const dataURL = reader.result;
  //     const output = document.getElementById("output");
  //     output.src = dataURL;
  //   };
  //   reader.readAsDataURL(input.files[0]);
  //   console.log(reader, input);
  // };
  const EditSubmit = async (data) => {
    // console.log(data.image[0].name);
    values.image = data.image[0].name;
    new Promise((rsl, rej) => {
      if (editId) {
        handleEdit(`${BaseUrl}/partners/${editId}`, values, rsl, rej);
      } else {
        handleCreate(`${BaseUrl}/partners`, values, rsl, rej);
      }
    })
      .then((res) => history.push("/admin/partner"))
      .catch((err) => {
        setErrMsg(err);
        console.log(err);
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
            {/* <Button onClick={handleOpen}>Add Image</Button>
            <DropzoneDialog
            
              open={fileOpen}
              onSave={handleSave}
              acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
              showPreviews={true}
              maxFileSize={5000000}
              onClose={handleClose}
            /> */}
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="contained-button-file"
              type="file"
              name="image"
              ref={register}
            />
            {/* // onChange={openFile} */}
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
