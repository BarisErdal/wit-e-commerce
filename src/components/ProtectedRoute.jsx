import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, ...rest }) => {
  const user = useSelector((state) => state.client.user);
  const isAuthed = Boolean(user?.token || localStorage.getItem("token"));

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthed ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
