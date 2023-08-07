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
  statuses
}) => {
  const shipmentList = Object.values(list);
  
  if (target && value >= 0) {
    return shipmentList.filter(e => e[target] === value).map(e => {
      const user = users.find(x => x.id === e.user_id);
      return (
        <Shipment
          key={e.id}
          shipment={e}
          user={user}
          nextStatus={nextStatus}
          togglebikersList={togglebikersList}
          login={login}
          statuses={statuses}
        />
      );
    });
  } else {
    return shipmentList.map(e => <Shipment e={e} />);
  }
};

export default Shipments;
