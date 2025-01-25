import React from "react";
import Shipment from "./Shipment";

const Shipments = ({
  list,
  users,
  target,
  value,
  nextStatus,
  togglebikersList,
  login,
  statuses,
}) => {
  
  const renderFilteredShipments = () =>
    list
      .filter((shipment) => shipment[target] === value)
      .map((shipment) => {
        const user = users.find((user) => user.id === shipment.user_id);
        const status = statuses.find(
          (status) => status.id === shipment.status_id
        );

        return (
          <Shipment
            key={shipment.id}
            shipment={shipment}
            user={user}
            nextStatus={nextStatus}
            togglebikersList={togglebikersList}
            login={login}
            status={status}
            statuses={statuses}
          />
        );
      });

  const renderAllShipments = () =>
    list.map((shipment) => <Shipment key={shipment.id} shipment={shipment} />);

  return target && value >= 0
    ? renderFilteredShipments()
    : renderAllShipments();
};

export default Shipments;
