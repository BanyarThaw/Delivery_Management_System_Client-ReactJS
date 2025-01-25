import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => (
  <nav className="main-navigation">
    <ul>
      <li>
        <NavLink className="link-main-nav" to="/shipments">
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
);

export default Navigation;
