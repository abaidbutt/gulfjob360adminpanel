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
import {
  makeStyles,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import MUIRichTextEditor from "mui-rte";
import { Editor, EditorState } from "draft-js";

import Title from "../Title";
import { AdminContext } from "../../context/AdminContext";
export default function AdsUpsert() {
  const classes = useStyles();
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

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
    new Promise((rsl, rej) => {
      if (editId) {
        handleEdit(`${BaseUrl}/advertisements/${editId}`, values, rsl, rej);
      } else {
        handleCreate(`${BaseUrl}/advertisements`, values, rsl, rej);
      }
    })
      .then((res) => history.push("/admin/ads"))
      .catch((err) => console.log(err));
  };
  const save = (data) => {
    console.log(data);
  };
  const handleEditor = (e) => {
    setValues({ ...values, content: e });
  };
  return (
    <>
      <Container component="main" maxWidth="md" className={classes.root}>
        <div className={classes.paper}>
          <Title>Edit Advertisement </Title>
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
            
            {/* <MuiThemeProvider theme={defaultTheme}>
              <MUIRichTextEditor
                label="content"
                inlineToolbar={true}
                ref={register({
                  required: "This is Required Field",
                })}
                value={values.content}
                name="content"
              />
            </MuiThemeProvider> */}
            <TextField
              name="content"
              label="Content *"
              variant="outlined"
              value={values.content}
              onChange={handleChange}
              type="text"
              fullWidth
              margin="dense"
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
                Save Advertisement
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
}
const defaultTheme = createMuiTheme();

Object.assign(defaultTheme, {
  overrides: {
    MUIRichTextEditor: {
      root: {
        marginTop: 20,
        width: "100%",
        marginBottom: "20",
        height: "50vh",
        border: "1px solid lightgray",
        padding: "10px",
        borderRadius: "10px",
      },
      editor: {
        borderTop: "1px solid gray",
      },
    },
  },
});

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
