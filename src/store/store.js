import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/loginSlice";
import {getClientsReducer,getClientReducer,createClientReducer} from "../features/clientSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    client: getClientReducer,
    clients: getClientsReducer,
    createClient: createClientReducer
  },
});
export default store;
