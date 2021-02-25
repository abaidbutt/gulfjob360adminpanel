// import { useReducer } from "react";
// import { createContainer } from "react-tracked";
// import AdminReducer, { initState } from "./AdminReducer";

// const useValue = () => useReducer(AdminReducer, initState);

// export const {
//   Provider,
//   useTrackedState,
//   useUpdate: useDispatch,
// } = createContainer(useValue);
// const dispatch = useDispatch();
// const state = useTrackedState();
// //get all data
// async function handleFetch(routeName, rsl, rej) {
//   try {
//     const response = await Axios.get(routeName);
//     const { data } = response.data;

//     rsl(data);
//   } catch (err) {
//     rej(err.response);
//   }
// }
// //handle data
// async function fetchData(routeName, perPage, page) {
//   try {
//     dispatch({ type: "LOADING", payload: true });
//     const response = await Axios.get(routeName);
//     const res = response.data;

//     const { data, current_page, last_page, total } = res;
//     if (res) {
//       dispatch({
//         type: "RESULTS",
//         payload: { data, details: { current_page, last_page, total } },
//       });
//     }
//   } catch (err) {
//     dispatch({ type: "ERROR", payload: err.response });
//   }
// }
// //get a single data
// const handleGet = async (routeName, editId, rsl, rej) => {
//   try {
//     dispatch({ type: "LOADING", payload: true });
//     const response = await Axios.get(routeName);
//     const res = response.data;

//     dispatch({ type: "GET" });
//     rsl(res);
//   } catch (err) {
//     dispatch({ type: "ERROR", payload: err.response });
//     rej();
//   }
// };
// ///handle a category
// const handleCategory = async (routeName, type, rsl, rej) => {
//   try {
//     dispatch({ type: "LOADING", payload: true });
//     const response = await Axios.get(routeName);
//     const res = response.data;
//     dispatch({ type: "CATEGORY" });
//     rsl(res.data);
//   } catch (err) {
//     const { error } = err.response;
//     dispatch({ type: "ERROR", payload: error.data });
//     rej();
//   }
// };
// //handle single delete
// const handleDelete = async (routeName, delId) => {
//   try {
//     dispatch({ type: "LOADING", payload: true });
//     const response = await Axios.delete(routeName);
//     const res = response.data;
//     if (response.status === 202) {
//       dispatch({ type: "DELETE", payload: delId });
//       toast.success("Delete Successfully");
//     }
//   } catch (err) {
//     dispatch({ type: "ERROR", payload: err.response });
//     toast.error("Can not Delete");
//   }
// };
// // update a request

// const handleEdit = async (routeName, values, rsl, rej) => {
//   try {
//     dispatch({ type: "LOADING", payload: true });
//     const response = await Axios.put(routeName, values);
//     const res = response.data;
//     if (res.success === 1) {
//       dispatch({ type: "UPDATE", payload: res });
//       toast.success("Update Successfully");
//     }

//     rsl();
//   } catch (err) {
//     const { error } = err.response.data;
//     dispatch({ type: "ERROR", payload: error });
//     rej(error);
//   }
// };
// //create a request
// const handleCreate = async (routeName, values, rsl, rej) => {
//   try {
//     dispatch({ type: "LOADING", payload: true });
//     const response = await Axios.post(routeName, values);
//     const res = response.data;

//     if (response.status === 201) {
//       dispatch({ type: "CREATE", payload: res });
//       toast.success("Create Successfully");
//     }
//     rsl();
//   } catch (err) {
//     const { error } = err.response.data;
//     dispatch({ type: "ERROR", payload: error });
//     rej(error);
//   }
// };

// async function loginUser(routeName, credentials, rsl, rej) {
//   try {
//     const response = await Axios.post(routeName, credentials);
//     const res = response.data;
//     if (response.status === 202) {
//       dispatch({ type: "LOGIN", payload: res.success });
//       toast.success("Login Successfully");
//     }
//     rsl(res.success.token);
//   } catch (err) {
//     dispatch({ type: "ERROR", payload: err.response });
//     rej(err.response);
//   }
// }
// async function logoutUser(routeName, credentials, rsl, rej) {
//   dispatch({ type: "LOGOUT" });
//   toast.success("Logout Successfully");
// }
