import { useEffect } from "react";
import { createContext, useReducer } from "react";
import adminReducer, { initState } from "./AdminReducer";
import Axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, initState);

  useEffect(() => {
    console.log(state.error);
    if (state.error) {
      toast("Please Provide Correct Credentials");
    }
  }, [state?.error]);
  // useEffect(() => {
  //   console.log(state);
  // });
  async function handleFetch(routeName, rsl, rej) {
    try {
      const response = await Axios.get(routeName);
      const { data } = response.data;

      rsl(data);
    } catch (err) {
      rej(err.response);
    }
  }

  async function fetchData(routeName, perPage, page) {
    try {
      const response = await Axios.get(routeName);
      const res = response.data;

      const { data, current_page, last_page, total } = res;
      if (res) {
        dispatch({
          type: "RESULTS",
          payload: { data, details: { current_page, last_page, total } },
        });
      }
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.response });
    }

    dispatch({ type: "LOADING", payload: false });
  }

  const handleDelete = async (routeName, delId) => {
    try {
      console.log(delId);
      const response = await Axios.delete(routeName);
      const res = response.data;
      if (response.status === 202) {
        dispatch({ type: "DELETE", payload: delId });
        toast("Delete Successfully");
      }
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.response });
    }
    dispatch({ type: "LOADING", payload: false });
  };
  const handleEdit = async (routeName, values, rsl, rej) => {
    try {
      const response = await Axios.put(routeName, values);
      const res = response.data;

      if (res.success === 1) {
        dispatch({ type: "UPDATE", payload: res });
        toast("Update Successfully");
      }

      rsl();
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.response });
      const { error } = err.response.data;
      dispatch({ type: "ERROR", payload: error });
      rej(error);
    }
    dispatch({ type: "LOADING", payload: false });
  };
  const handleCreate = async (routeName, values, rsl, rej) => {
    try {
      const response = await Axios.post(routeName, values);
      const res = response.data;

      if (response.status === 201) {
        dispatch({ type: "CREATE", payload: res });
        toast("Create Successfully");
      }
      rsl();
    } catch (err) {
      const { error } = err.response.data;
      dispatch({ type: "ERROR", payload: error });
      rej(error);
    }
    dispatch({ type: "LOADING", payload: false });
  };
  const handleGet = async (routeName, editId, rsl, rej) => {
    try {
      const response = await Axios.get(routeName);
      const res = response.data;

      dispatch({ type: "GET" });
      rsl(res);
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.response });
      rej();
    }
    dispatch({ type: "LOADING", payload: false });
  };
  const handleCategory = async (routeName, type, rsl, rej) => {
    try {
      const response = await Axios.get(routeName);
      const res = response.data;

      rsl(res.data);

      dispatch({ type: "CATEGORY" });
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.response.error.data });
      rej();
    }
    dispatch({ type: "LOADING", payload: false });
  };
  async function loginUser(routeName, credentials, rsl, rej) {
    try {
      const response = await Axios.post(routeName, credentials);
      const res = response.data;
      if (response.status === 202) {
        dispatch({ type: "LOGIN", payload: res.success });
        toast("Login Successfully");
      }
      rsl(res.success.token);
    } catch (err) {
      // dispatch({ type: "ERROR", payload: err.response });
      rej(err.response);
    }
  }
  async function logoutUser(routeName, credentials, rsl, rej) {
    dispatch({ type: "LOGOUT" });
    toast("Logout Successfully");
  }
  // useEffect(() => {
  //
  //   fetchData(dataSource);
  // }, [dataSource]);

  return (
    <AdminContext.Provider
      value={{
        ctxLoad: state.loading,
        ctxDetails: state.details,
        ctxResults: state.results,
        ctxUser: state.user,
        fetchData,
        handleDelete,
        handleEdit,
        handleCreate,
        handleGet,
        handleCategory,
        handleFetch,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
