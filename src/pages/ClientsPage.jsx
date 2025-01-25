import React from "react";
import "../styles/client.css";

import Profiles from "../components/Profiles";
import { useAppSelectors } from "../hooks/useAppSelectors";

const ClientsPage = () => {
  const { clients } = useAppSelectors();
  return (
    <section className="clients">
      <h2>Clients</h2>
      <Profiles list={clients} folder="clients" alt="Profile" hideRole={true} />
    </section>
  );
};

export default ClientsPage;
