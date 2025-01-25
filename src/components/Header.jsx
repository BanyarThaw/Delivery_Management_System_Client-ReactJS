import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../icons/bikers.svg";
import Profile from "./Profile";
import { useDispatch } from "react-redux";
import { removeLogin } from "../features/slices/loginSlice";

const Header = ({ loginInfo }) => {
  const dispatch = useDispatch();

  return (
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
        <button className="exit" onClick={() => dispatch(removeLogin())}>
          Exit
        </button>
      </div>
    </header>
  );
};

export default Header;
