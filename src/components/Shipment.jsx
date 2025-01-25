import React from "react";
import "../styles/shipment.css";
import Profile from "./Profile";
import Timeline from "./Timeline";
import Address from "./Address";

const Shipment = ({
  shipment,
  user,
  nextStatus,
  togglebikersList,
  login,
  status,
  statuses,
}) => {
  
  const handleStatusClick = () => {
    if (login.role === "biker" && status?.id !== 4) {
      nextStatus(shipment.id, shipment.status_id);
    }
  };

  const handleBikerListToggle = () => {
    if (status.id === 1) {
      togglebikersList(shipment.id);
    }
  };

  const isManager = login.role === "manager";
  const isStatusComplete = status.id === 4;
  const canClickUser = status.id === 1;

  return (
    <article className="shipment">
      <h3>{shipment.number}</h3>

      <div className="shipment-status">
        <button
          className={`button_status ${status.type}`}
          onClick={handleStatusClick}
          disabled={isManager || isStatusComplete}
        >
          {status.name}
        </button>

        <div
          className={`user ${canClickUser ? "allow_click" : ""}`}
          onClick={handleBikerListToggle}
        >
          <Profile
            user={user}
            hideAddresses
            hideEmail
            hideRole
            folder="users"
            alt="Profile"
          />
        </div>
      </div>

      <details className="client">
        <summary>
          <strong>{shipment.client?.name}</strong>
        </summary>
        <Profile
          user={shipment.client}
          hideAddresses
          folder="clients"
          alt="Profile"
        />
      </details>

      <details className="client-address">
        <summary>
          {shipment.client_address?.street_number}{" "}
          {shipment.client_address?.street_name}
        </summary>
        <Address address={shipment.client_address} hideStreet />
      </details>

      <details className="timeline">
        <summary>Timeline</summary>
        <Timeline timeline={shipment.timeline} statuses={statuses} />
      </details>
    </article>
  );
};

export default Shipment;
