import React, { useContext } from "react";
import { Route, Redirect, Switch, useLocation } from "react-router-dom";
import Routes from "./routes/Index";

import Login from "./pages/Login";
import PageError from "./pages/404";
import { AnimatedSwitch, AnimatedRoute } from "react-router-transition";

import { AdminContext } from "./context/AdminContext";
function App() {
  const { ctxUser } = useContext(AdminContext);
  const location = useLocation();

  return (
    <>
      <>
        <Switch>
          <Route exact path={["/", "/admin/login"]}>
            {ctxUser ? <Redirect to={"/admin"} /> : <Login />}
          </Route>
          <PrivateRoute path="/admin">
            <Routes />
          </PrivateRoute>

          <Route component={PageError} />
        </Switch>
      </>
    </>
  );
}

export default App;
function PrivateRoute({ children, ...rest }) {
  const { ctxUser } = useContext(AdminContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        ctxUser ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/admin/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
