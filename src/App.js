import React,{useEffect} from "react";
import "./App.css";
import logo from "./icons/bikers.svg";
import ShipmentsPage from "./pages/ShipmentsPage";
import ClientsPage from "./pages/ClientsPage";
import UsersPage from "./pages/UsersPage";
import LoginPage from "./pages/LoginPage";
import Profile from "./components/Profile";
import { fetchLogin,selectInfos } from "./features/loginSlice";
import { fetchClients } from "./features/clientSlice";
import { fetchShipments } from "./features/shipmentSlice";
import { fetchStatuses } from "./features/statusSlice";
import { fetchUsers } from "./features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Route,
  NavLink,
  Routes,
} from "react-router-dom";


const App = () => {
  const dispatch = useDispatch();

  const checkUser = (user) => dispatch(fetchLogin(user));
  const loginInfo = useSelector(selectInfos);
  console.log(loginInfo.role);
 
  useEffect(() => {
    dispatch(fetchClients());
    dispatch(fetchShipments());
    dispatch(fetchUsers());
    dispatch(fetchStatuses());
  }, []);

  const isLogged = () => {
    if (Object.keys(loginInfo).length) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="App">
      {isLogged() && (
        <>
          <header className="App-header">
            <NavLink to="/" className="link-logo">
              <img className="App-logo" alt="Delivery control" src={logo} />
            </NavLink>
            <h3>Delivery control</h3>
            <div className="logged-in-user">
              <Profile
                user={loginInfo}
                folder="users"
                alt="Profile"
                hideEmail={true}
              />
              <button
                className="exit"
                /*onClick={() => this.props.removeLogin()}*/
              >
                Exit
              </button>
            </div>
          </header>
          {loginInfo.role === "manager" && (
            <nav className="main-navigation">
              <ul>
                <li>
                  <NavLink className="link-main-nav" exact to="/shipments">
                    Shipments
                  </NavLink>
                </li>
                <li>
                  <NavLink className="link-main-nav" to="/clients">
                    Clients
                  </NavLink>
                </li>
                <li>
                  <NavLink className="link-main-nav" to="/users">
                    Users
                  </NavLink>
                </li>
              </ul>
            </nav>
          )}
        </>
      )}

      {isLogged() ? (
        <>
          <Routes>
            <Route exact path="/" element={<ShipmentsPage />} />
            <Route exact path="/shipments" element={<ShipmentsPage />} />
            <Route exact path="/clients" element={<ClientsPage />} />
            <Route exact path="/users" element={<UsersPage />} />
          </Routes>
        </>
      ) : (
          <>
            <LoginPage checkUser={checkUser} />
          </>
      )}
    </div>
  );
};

export default App;
