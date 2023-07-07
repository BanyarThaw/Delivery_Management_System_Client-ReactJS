import React from "react";
import "../styles/profiles.css";
import Profile from "./Profile";

const Profiles = ({
  list,
  folder,
  alt,
  hideName,
  hideAddresses,
  hideEmail,
  hideRole
}) => {
  const clientList = Object.values(list);

  return(
    <section className="profiles">
      {clientList.map(e => (
        <Profile
          key={e.id}
          user={e}
          folder={folder ? folder : "users"}
          alt={alt ? alt : "Profile"}
          hideName={hideName}
          hideAddresses={hideAddresses}
          hideEmail={hideEmail}
          hideRole={hideRole}
        />
      ))}
    </section>
  );
};

export default Profiles;

