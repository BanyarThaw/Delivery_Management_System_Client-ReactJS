import React from "react";
import "../styles/client.css";
import { useSelector } from "react-redux";
import { selectClients } from "../features/clientSlice";
import Profiles from "../components/Profiles";

const ClientsPage = () => {
  const clients = useSelector(selectClients);
  
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

