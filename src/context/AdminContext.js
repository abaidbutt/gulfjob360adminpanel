import { useEffect } from "react";
import { createContext, useReducer } from "react";
import adminReducer, { initState } from "./AdminReducer";
import Axios from "axios";

export const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, initState);
  useEffect(() => {
    return () => {
      dispatch({ type: "ERROR", payload: "" });
    };
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
      }
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.response });
    }
    dispatch({ type: "LOADING", payload: false });
  };
  const handleEdit = async (routeName, values, rsl, rej) => {
    try {
      console.log(values);
      const response = await Axios.put(routeName, values);
      const res = response.data;
      dispatch({ type: "UPDATE", payload: res });

      rsl();
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.response });
      rej();
    }
    dispatch({ type: "LOADING", payload: false });
  };
  const handleCreate = async (routeName, values, rsl, rej) => {
    try {
      const response = await Axios.post(routeName, values);
      const res = response.data;

      dispatch({ type: "CREATE", payload: res });
      rsl();
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.response.data.error });

      rej();
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
      dispatch({ type: "LOGIN", payload: res.success });
      rsl(res.success.token);
    } catch (err) {
      // dispatch({ type: "ERROR", payload: err.response });
      rej(err.response);
    }
  }
  async function logoutUser(routeName, credentials, rsl, rej) {
    dispatch({ type: "LOGOUT" });
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
