import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateShipments } from "../features/slices/shipmentSlice";
import { joinShipmentsInfo, convertDate, getSingle } from "../utils/utils";

const useShipments = (shipments, clients, statuses, loginInfo) => {
  const dispatch = useDispatch();
  const [shipmentsState, setShipmentsState] = useState({
    shipments: [],
    showBikersList: false,
    shipment_id: "",
  });

  const renderedList =
    loginInfo.role === "manager"
      ? shipmentsState.shipments
      : shipmentsState.shipments.filter(
          (shipment) => shipment.user_id === loginInfo.id
        );

  const nextStatus = (shipment_id, status_id) => {
    const nextStatusId = statuses.length > status_id ? status_id + 1 : 2;
    const status = getSingle(statuses, nextStatusId);

    const updatedShipments = shipments.map((shipment) => {
      if (shipment.id === Number(shipment_id)) {
        return {
          ...shipment,
          status_id: status.id,
          timeline: shipment.timeline.map((timelineItem) => {
            if (timelineItem.status_id === nextStatusId) {
              return {
                ...timelineItem,
                timestamp: convertDate(new Date()),
              };
            }
            return timelineItem;
          }),
        };
      }
      return shipment;
    });

    dispatch(updateShipments(updatedShipments));

    setShipmentsState((state) => ({
      ...state,
      shipments: updatedShipments,
    }));
  };

  const togglebikersList = (shipment_id) => {
    setShipmentsState((state) => ({
      ...state,
      showBikersList: !state.showBikersList,
      shipment_id: shipment_id,
    }));
  };

  const assignBiker = (user_id) => {
    const updatedShipments = shipmentsState.shipments.map((shipment) => {
      if (shipment.id === Number(shipmentsState.shipment_id)) {
        return {
          ...shipment,
          user_id: Number(user_id),
          status_id: 2,
          status: {
            id: 2,
            type: "assigned",
            description: "Assigned but not picked up.",
            name: "Assigned",
          },
          timeline: shipment.timeline.map((t) => {
            if (t.status_id === 2) {
              return {
                ...t,
                timestamp: convertDate(new Date()),
              };
            }
            return t;
          }),
        };
      }
      return shipment;
    });

    dispatch(updateShipments(updatedShipments));

    setShipmentsState((state) => ({
      ...state,
      shipments: updatedShipments,
      showBikersList: false,
      shipment_id: "",
    }));
    togglebikersList();
  };

  useEffect(() => {
    if (shipments.length && clients.length && statuses.length) {
      const joinedShipments = joinShipmentsInfo(shipments, clients, statuses);
      setShipmentsState((state) => ({
        ...state,
        shipments: joinedShipments,
      }));
    }
  }, [shipments, clients, statuses]);

  return {
    shipmentsState,
    renderedList,
    nextStatus,
    togglebikersList,
    assignBiker,
  };
};

export default useShipments;
