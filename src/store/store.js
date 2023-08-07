import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/loginSlice";
import { getClientsReducer,getClientReducer,createClientReducer } from "../features/clientSlice";
import { getShipmentsReducer,getShipmentReducer,createShipmentReducer } from "../features/shipmentSlice";
import { createUserReducer, getUserReducer, getUsersReducer } from "../features/userSlice";
import { createStatusReducer, getStatusReducer, getStatusesReducer } from "../features/statusSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    client: getClientReducer,
    clients: getClientsReducer,
    createClient: createClientReducer,
    shipment: getShipmentReducer,
    shipments: getShipmentsReducer,
    createShipment: createShipmentReducer,
    user: getUserReducer,
    users: getUsersReducer,
    createUser: createUserReducer,
    status: getStatusReducer,
    statuses: getStatusesReducer,
    createStatus: createStatusReducer
  },
});
export default store;
