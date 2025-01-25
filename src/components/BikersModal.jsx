import React from "react";
import Profile from "./Profile";

const BikersModal = ({ users, assignBiker, toggleBikersList }) => (
  <div className="modal" onClick={toggleBikersList}>
    <div className="bikers-list">
      {users
        .filter((user) => user.role === "biker")
        .map((user) => (
          <div
            key={user.id}
            className="biker"
            onClick={() => assignBiker(user.id)}
          >
            <Profile user={user} hideEmail={true} hideRole={true} folder='users' />
          </div>
        ))}
    </div>
  </div>
);

export default BikersModal;
