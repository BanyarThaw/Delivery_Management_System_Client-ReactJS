// App.js
import React, { useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchClients,
  fetchLogin,
  fetchShipments,
  fetchStatuses,
  fetchUsers,
} from "./features";
import { selectInfos } from "./features/slices/loginSlice";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import LoginPage from "./pages/LoginPage";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  const dispatch = useDispatch();
  const loginInfo = useSelector(selectInfos);

  useEffect(() => {
    dispatch(fetchShipments());
    dispatch(fetchStatuses());
    dispatch(fetchClients());
    dispatch(fetchUsers());
  }, [dispatch]);

  const isLogged = () => !!Object.keys(loginInfo).length;

  return (
    <div className="App">
      {isLogged() && (
        <>
          <Header loginInfo={loginInfo} />
          {loginInfo.role === "manager" && <Navigation />}
        </>
      )}
      {isLogged() ? (
        <AppRoutes />
      ) : (
        <LoginPage checkUser={(user) => dispatch(fetchLogin(user))} />
      )}
    </div>
  );
};

export default App;
