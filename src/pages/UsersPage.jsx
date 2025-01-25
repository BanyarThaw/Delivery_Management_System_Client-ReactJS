import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "../styles/users.css";
import Profile from "../components/Profile";
import Select from "../components/Select";
import { updateUsers } from "../features/slices/userSlice";
import { useAppSelectors } from "../hooks/useAppSelectors";

const UsersPage = () => {
  const { users } = useAppSelectors();
  const dispatch = useDispatch();
  const [usersState, setUsersState] = useState({
    users: [],
    roles: [
      {
        id: 1,
        value: "manager",
        text: "Manager",
      },
      {
        id: 2,
        value: "biker",
        text: "Biker",
      },
    ],
  });

  useEffect(() => {
    setUsersState((state) => ({
      ...state,
      users: users,
    }));
  }, [users]);

  const handleSelect = (user) => (ev) => {
    const updated_users = usersState.users.map((e) => {
      if (e.id === Number(user.id)) {
        return { ...e, role: ev.target.value }; // Create a new object with updated role
      }
      return e;
    });

    dispatch(updateUsers(updated_users)); // Update the state with the new array

    setUsersState((state) => ({
      ...state,
      users: updated_users, // Set the updated array in the state
    }));
  };

  return (
    <section className="users">
      <h2>Users</h2>
      {usersState.users.length ? (
        <>
          {usersState.users.map((e) => (
            <div key={e.id} className="users-list">
              <Select
                id="select-role"
                value={e.role}
                handleSelect={handleSelect(e)}
                options={usersState.roles}
              />
              <Profile user={e} folder="users" alt="User" hideRole={true} />
            </div>
          ))}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </section>
  );
};

export default UsersPage;
