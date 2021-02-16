export const initState = {
  user: JSON.parse(localStorage.getItem("credentials")) || null,
  results: [],
  loading: true,
  error: "",
  details: {},
};

export default (state, { type, payload }) => {
  switch (type) {
    case "LOGIN":
      const { token, user } = payload;
      localStorage.setItem("credentials", JSON.stringify(payload));
      return { ...state, user: user };
      break;
    case "LOGOUT":
      localStorage.clear();
      return { ...state, user: null };
      break;
    case "CREATE":
      console.log(payload);
      return { ...state, loading: payload, error: "" };
      break;
    case "LOADING":
      return { ...state, loading: payload, error: "" };
      break;
    case "ERROR":
      return { ...state, error: payload, loading: false };
      break;
    case "RESULTS":
      const { data, details } = payload;
      return {
        ...state,
        results: data,
        details: details,
        loading: false,
        error: "",
      };
      break;
    case "DELETE":
      console.log(payload)
      return {
        ...state,
        results: state.results.filter((res) => res.id !== payload),
      };
      break;

    default:
      // const token=localStorage.getItem('token')
      // JSON.parse(token)
      return { ...state };
      break;
  }
};
