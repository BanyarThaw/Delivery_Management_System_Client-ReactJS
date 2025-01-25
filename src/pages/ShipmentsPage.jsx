import React from "react";
import "../styles/shipmentsPage.css";
import { useAppSelectors } from "../hooks/useAppSelectors";
import Shipments from "../components/Shipments";
import BikersModal from "../components/BikersModal";
import useShipments from "../hooks/useShipments";

const ShipmentsPage = () => {
  const { shipments, clients, statuses, loginInfo, users } = useAppSelectors();
  const {
    shipmentsState,
    renderedList,
    nextStatus,
    togglebikersList,
    assignBiker,
  } = useShipments(shipments, clients, statuses, loginInfo);

  return (
    <section
      className={
        "shipments " + (loginInfo.role === "manager" && "manager-list")
      }
    >
      <h2>Shipments</h2>
      {shipments.length && users.length && clients.length && statuses.length ? (
        statuses.map((status) => (
          <div key={status.id} className="shipment-list">
            <h4>{status.name}</h4>
            <Shipments
              list={renderedList}
              users={users}
              target="status_id"
              value={status.id}
              nextStatus={nextStatus}
              togglebikersList={togglebikersList}
              login={loginInfo}
              statuses={statuses}
            />
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
      {shipmentsState.showBikersList && (
        <BikersModal
          users={users}
          assignBiker={assignBiker}
          toggleBikersList={togglebikersList}
        />
      )}
    </section>
  );
};

export default ShipmentsPage;
