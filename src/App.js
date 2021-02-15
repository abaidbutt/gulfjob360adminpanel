import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import Routes from "./routes/Index";

import Login from "./pages/Login";
import PageError from "./pages/404";
import { AnimatedSwitch, AnimatedRoute } from "react-router-transition";

import { AdminContext } from "./context/AdminContext";
function App() {
  const { ctxUser } = useContext(AdminContext);
  useEffect(() => {
    console.log(ctxUser);
  });

  return (
    <>
      <>
        <AnimatedSwitch
          atEnter={{ opacity: 0 }}
          atLeave={{ opacity: 0 }}
          atActive={{ opacity: 1 }}
        >
          <AnimatedRoute
            atEnter={{ offset: -100 }}
            atLeave={{ offset: -100 }}
            atActive={{ offset: 0 }}
            mapStyles={(styles) => ({
              // transform: `translateX(${styles.offset}%)`,
            })}
            exact
            path="/admin/login"
          >
            <Login />
            {/* <Login /> */}
          </AnimatedRoute>
          <PrivateRoute path="/admin">
            <Routes />
          </PrivateRoute>

          <AnimatedRoute
            atEnter={{ offset: -100 }}
            atLeave={{ offset: -100 }}
            atActive={{ offset: 0 }}
            mapStyles={(styles) => ({
              transform: `translateX(${styles.offset}%)`,
            })}
            path="*"
            component={PageError}
          />
        </AnimatedSwitch>
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
