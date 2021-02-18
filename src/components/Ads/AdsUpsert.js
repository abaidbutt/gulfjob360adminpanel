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
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { makeStyles } from "@material-ui/core/styles";

import { useForm } from "react-hook-form";

import Title from "../Title";
import { AdminContext } from "../../context/AdminContext";

export default function AdsUpsert() {
  const classes = useStyles();

  const [errMsg, setErrMsg] = useState(null);

  const history = useHistory();
  const { handleEdit, handleGet, handleCreate } = useContext(AdminContext);
  const [values, setValues] = useState({
    location: "",
    content: "",
    status: "",
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
        handleGet(`${BaseUrl}/advertisements/${editId}`, editId, rsl, rej);
      })
        .then((res) => {
          const { location, content, status } = res;

          const formData = {
            location,
            content,
            status,
          };
          setValues(formData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const EditSubmit = async (data) => {
    console.log(data);
    new Promise((rsl, rej) => {
      if (editId) {
        handleEdit(`${BaseUrl}/advertisements/${editId}`, values, rsl, rej);
      } else {
        handleCreate(`${BaseUrl}/advertisements`, values, rsl, rej);
      }
    })
      .then((res) => history.push("/admin/ads"))
      .catch((err) => {
        console.log(err);
        setErrMsg(err);
      });
  };

  const handleContent = (e, editor) => {
    const data = editor.getData();
    setValues({ ...values, content: data });
  };
  return (
    <>
      <Container component="main" maxWidth="md" className={classes.root}>
        <div className={classes.paper}>
          <Title>{editId ? "Edit" : "Add"} Advertisement </Title>

          <form className={classes.form} onSubmit={handleSubmit(EditSubmit)}>
            <TextField
              type="text"
              label="Location *"
              name="location"
              variant="outlined"
              fullWidth
              margin="dense"
              value={values.location}
              onChange={handleChange}
              error={errors.location ? true : false}
              inputRef={register({
                required: "This is Required",
              })}
            />
            <FormHelperText error>{errors.location?.message}</FormHelperText>

            <CKEditor
              editor={ClassicEditor}
              data={values.content}
              onChange={handleContent}
            />

            <FormHelperText error>{errors.content?.message}</FormHelperText>
            {errMsg?.content.map((err) => (
              <FormHelperText error> {err}</FormHelperText>
            ))}
            <TextField
              label="Status"
              select
              margin="dense"
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
              value={values.status}
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
  root: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    width: "70%",
  },
  paper: {
    marginTop: theme.spacing(2),
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
}));
