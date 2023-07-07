import React, { useState,useEffect } from "react";
import "../styles/client.css";
//import { connect } from "react-redux";
//import { fetchClients } from "../../actions/clientActions";
import { useDispatch, useSelector } from "react-redux";
import { fetchClients,selectClients } from "../features/clientSlice";
import Profiles from "../components/Profiles";

const ClientsPage = () => {
  const dispatch = useDispatch();
  const clients = useSelector(selectClients);
  //const [clients,setclients] = useState());
  useEffect(() => {
    dispatch(fetchClients());
  }, []);

  console.log("this is clients");
  console.log(clients);
  return (
    <section className="clients">
      <h2>Clients</h2>
      <Profiles
        list={clients}
        folder="clients"
        alt="Profile"
        hideRole={true}
      />
    </section>
  );
}

export default ClientsPage;

