import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/slices/loginSlice";

import {
  getShipmentsReducer,
  getShipmentReducer,
  createShipmentReducer,
} from "../features/slices/shipmentSlice";
import {
  createUserReducer,
  getUserReducer,
  getUsersReducer,
} from "../features/slices/userSlice";
import {
  createStatusReducer,
  getStatusReducer,
  getStatusesReducer,
} from "../features/slices/statusSlice";
import {
  createClientReducer,
  getClientReducer,
  getClientsReducer,
} from "../features/slices/clientSlice";

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
    createStatus: createStatusReducer,
  },
});
export default store;
