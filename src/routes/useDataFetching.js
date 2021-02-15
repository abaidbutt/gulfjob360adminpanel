import { useState, useEffect } from "react";
import Axios from "axios";
function useDataFetching({ dataSource }) {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await Axios.get(dataSource);
        const { data } = await response;

        if (data) {
          setLoading(false);
          setResults(data);
        }
      } catch (error) {
        setLoading(false);
        setError(error.response);
      }

      setLoading(false);
    }

    fetchData();
  }, [dataSource]);

  return { loading, results, error };
}

export default useDataFetching;
//   if (loading || error) {
//     return loading ? <Spinner/> : error.message;
//   }
/*
const PrivateRoute = ({component: Component, auth }) => (
  <Route render={props => auth === true
    ? <Component auth={auth} {...props} />
    : <Redirect to={{pathname:'/'}} />
  }
  />
)
   <Route path='/callback'
					 render={(props) => {
                         context.handleAuth(props);                                                            return <Callback />}} />


*/