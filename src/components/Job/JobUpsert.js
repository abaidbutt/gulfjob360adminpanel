import React, { useEffect, useState, useCallback, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Button,
  TextField,
  Container,
  FormHelperText,
  MenuItem,
  Grid,
} from "@material-ui/core";
import { BaseUrl } from "../../config";
// import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";

import Title from "../Title";
import { AdminContext } from "../../context/AdminContext";

const currencies = [
  {
    name: "US",
    value: "\u0024",
  },
  {
    name: "Cent",
    value: "\u00A2",
  },
  {
    name: "Pound",
    value: "\u00A3",
  },
  {
    name: "EURO",
    value: "\u20A0",
  },
  {
    name: "YEN",
    value: "\u00A5",
  },
];
const gender = [
  { name: "male", value: "male" },
  { name: "female", value: "female" },
  { name: "no-preference", value: "no-preference" },
];

export default function JobUpsert() {
  const [location, setLocation] = useState([]);
  const [industry, setIndustry] = useState([]);
  const [educations, setEducations] = useState([]);

  const classes = useStyles();
  const history = useHistory();
  const {
    handleEdit,
    handleGet,
    handleCreate,
    handleCategory,
    handleFetch,
  } = useContext(AdminContext);
  const [category, setCategory] = useState();
  const [values, setValues] = useState({
    title: "",
    description: "",
    job_location: "",
    currency: "$",
    min_salry: "",
    max_salary: "",
    other_benifits: "",
    total_seats: "",
    category_id: "",
    industry_type: "",
    functional_area: "",
    gender: "",
    experience_from: "",
    experience_to: "",
    nationality: "",
    current_location: "",
    education: "",
    job_faq: "",
    company_id: "",
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

  function fetchLocation() {
    new Promise((rsl, rej) => {
      handleFetch(`${BaseUrl}/locations`, rsl, rej);
    })
      .then((res) => {
        setLocation(res);
      })
      .catch((err) => console.log(err));
    new Promise((rsl, rej) => {
      handleFetch(`${BaseUrl}/industries`, rsl, rej);
    })
      .then((res) => {
        setIndustry(res);
      })
      .catch((err) => console.log(err));
    new Promise((rsl, rej) => {
      handleFetch(`${BaseUrl}/educations`, rsl, rej);
    })
      .then((res) => {
        setEducations(res);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchLocation();
    if (editId) {
      new Promise((rsl, rej) => {
        handleGet(`${BaseUrl}/jobs/${editId}`, editId, rsl, rej);
      })
        .then((res) => {
          console.log(res, editId);
          const {
            title,
            description,
            job_location,
            currency,
            min_salry,
            max_salary,
            other_benifits,
            total_seats,
            category_id,
            industry_type,
            functional_area,
            gender,
            experience_from,
            experience_to,
            nationality,
            current_location,
            education,
            job_faq,
            company_id,
          } = res;
          const formData = {
            title,
            description,
            job_location,
            currency,
            min_salry,
            max_salary,
            other_benifits,
            total_seats,
            category_id,
            industry_type,
            functional_area,
            gender,
            experience_from,
            experience_to,
            nationality,
            current_location,
            education,
            job_faq,
            company_id,
          };

          setValues(formData);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    new Promise((rsl, rej) => {
      handleCategory(`${BaseUrl}/categories`, "jobs", rsl, rej);
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
    new Promise((rsl, rej) => {
      if (editId) {
        handleEdit(`${BaseUrl}/jobs/${editId}`, values, rsl, rej);
      } else {
        handleCreate(`${BaseUrl}/jobs`, values, rsl, rej);
      }
    })
      .then((res) => history.push("/admin/job"))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Container component="main" maxWidth="md">
        <div className={classes.paper}>
          <Title>{editId ? "Edit" : "Insert"} Job </Title>
          <form className={classes.form} onSubmit={handleSubmit(EditSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  color="secondary"
                  name="title"
                  label="Job Title"
                  variant="outlined"
                  onChange={handleChange}
                  fullWidth
                  autoComplete="shipping address-line2"
                  value={values.title}
                  inputRef={register({ required: "Title Required" })}
                  error={errors.title ? true : false}
                />
                <FormHelperText error>{errors.title?.message}</FormHelperText>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  color="secondary"
                  name="description"
                  label="Job Description"
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={4}
                  value={values.description}
                  variant="outlined"
                  inputRef={register({ required: "Description Required" })}
                  error={errors.description ? true : false}
                />
                <FormHelperText error>
                  {errors.description?.message}
                </FormHelperText>
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={2}>
                    <TextField
                      label="Currency"
                      select
                      variant="outlined"
                      inputProps={{
                        inputRef: (ref) => {
                          if (!ref) return;
                          register({
                            name: "currency",
                            value: ref.value,
                          });
                        },
                        onChange: (e) => {
                          const { currency } = values;

                          setValues({
                            ...values,
                            currency: e.target.value,
                          });
                        },
                      }}
                      value={values.currency}
                      fullWidth
                      error={errors.currency ? true : false}
                    >
                      {currencies.map((ctg, i) => (
                        <MenuItem value={ctg.name} key={i}>
                          {ctg.value}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      type="number"
                      color="secondary"
                      name="min_salry"
                      value={values.min_salry}
                      label="Min Salary"
                      onChange={handleChange}
                      fullWidth
                      variant="outlined"
                      inputRef={register}
                      error={errors.min_salry ? true : false}
                    />
                    <FormHelperText error>
                      {errors.min_salry?.message}
                    </FormHelperText>
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      type="number"
                      color="secondary"
                      name="max_salary"
                      label="Max Salary"
                      value={values.max_salary}
                      onChange={handleChange}
                      fullWidth
                      variant="outlined"
                      inputRef={register}
                      error={errors.max_salary ? true : false}
                    />
                    <FormHelperText error>
                      {errors.max_salary?.message}
                    </FormHelperText>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  color="secondary"
                  name="other_benifits"
                  label="Other Benifits"
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  value={values.other_benifits}
                  inputRef={register}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="number"
                  name="total_seats"
                  label="Total Seats"
                  color="secondary"
                  onChange={handleChange}
                  fullWidth
                  value={values.total_seats}
                  variant="outlined"
                  inputRef={register}
                  error={errors.total_seats ? true : false}
                />
                <FormHelperText error>
                  {errors.total_seats?.message}
                </FormHelperText>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Industry"
                  select
                  variant="outlined"
                  inputProps={{
                    inputRef: (ref) => {
                      if (!ref) return;
                      register({
                        name: "industry_type",
                        value: ref.value,
                      });
                    },
                    onChange: (e) => {
                      const { industry_type } = values;

                      setValues({ ...values, industry_type: e.target.value });
                    },
                  }}
                  value={values.industry_type}
                  fullWidth
                  error={errors.industry_type ? true : false}
                >
                  {industry &&
                    industry.map((indust) => (
                      <MenuItem value={indust.id} key={indust.id}>
                        {indust.name}
                      </MenuItem>
                    ))}
                </TextField>

                <FormHelperText error>
                  {errors.industry_type?.message}
                </FormHelperText>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Location"
                  select
                  variant="outlined"
                  inputProps={{
                    inputRef: (ref) => {
                      if (!ref) return;
                      register({
                        name: "job_location",
                        value: ref.value,
                      });
                    },
                    onChange: (e) => {
                      const { job_location } = values;

                      setValues({ ...values, job_location: e.target.value });
                    },
                  }}
                  value={values.job_location}
                  fullWidth
                  error={errors.job_location ? true : false}
                >
                  {location &&
                    location.map((loc) => (
                      <MenuItem value={loc.id} key={loc.id}>
                        {loc.location_name}
                      </MenuItem>
                    ))}
                </TextField>

                <FormHelperText error>
                  {errors.job_location?.message}
                </FormHelperText>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="gender"
                  select
                  variant="outlined"
                  inputProps={{
                    inputRef: (ref) => {
                      if (!ref) return;
                      register({
                        name: "gender",
                        value: ref.value,
                      });
                    },
                    onChange: (e) => {
                      const { gender } = values;

                      setValues({ ...values, gender: e.target.value });
                    },
                  }}
                  value={values.gender}
                  fullWidth
                  error={errors.gender ? true : false}
                >
                  {gender &&
                    gender.map((indust, i) => (
                      <MenuItem value={indust.value} key={i}>
                        {indust.name}
                      </MenuItem>
                    ))}
                </TextField>

                <FormHelperText error>{errors.gender?.message}</FormHelperText>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  color="secondary"
                  name="experience_from"
                  label="Experience From "
                  onChange={handleChange}
                  fullWidth
                  value={values.experience_from}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  color="secondary"
                  name="experience_to"
                  label="Experience To"
                  onChange={handleChange}
                  fullWidth
                  value={values.experience_to}
                  variant="outlined"
                  inputRef={register}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  color="secondary"
                  name="nationality"
                  label="Nationality"
                  fullWidth
                  onChange={handleChange}
                  value={values.nationality}
                  variant="outlined"
                  inputRef={register}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="education"
                  select
                  variant="outlined"
                  inputProps={{
                    inputRef: (ref) => {
                      if (!ref) return;
                      register({
                        name: "education",
                        value: ref.value,
                      });
                    },
                    onChange: (e) => {
                      const { education } = values;

                      setValues({ ...values, education: e.target.value });
                    },
                  }}
                  value={values.education}
                  fullWidth
                  error={errors.education ? true : false}
                >
                  {educations &&
                    educations.map((edu, i) => (
                      <MenuItem value={edu.id} key={i}>
                        {edu.name}
                      </MenuItem>
                    ))}
                </TextField>

                <FormHelperText error>
                  {errors.education?.message}
                </FormHelperText>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  color="secondary"
                  name="job_faq"
                  label="Job FAQ"
                  multiline
                  onChange={handleChange}
                  rows={2}
                  value={values.job_faq}
                  fullWidth
                  variant="outlined"
                  inputRef={register}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  // FormHelperText={errors.company_id?.message}
                  color="secondary"
                  name="company_id"
                  label="Company *"
                  inputRef={register({ required: "This is Required" })}
                  fullWidth
                  variant="outlined"
                  onChange={handleChange}
                  value={values.company_id}
                />
              </Grid>
            </Grid>
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
}));
