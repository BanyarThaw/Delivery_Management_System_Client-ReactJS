import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../styles/users.css";
import { selectUsers,updateUsers } from "../features/userSlice";
import Profile from "../components/Profile";
import Select from "../components/Select";

const UsersPage = () => {
    const users = Object.values(useSelector(selectUsers));
    const [UsersState,setUsersState] = useState({
        users: [],
        roles: [
            {
                id: 1,
                value: "manager",
                text: "Manager"
            },
            {
                id: 2,
                value: "biker",
                text: "Biker"
            }
        ]
    });

    useEffect(() => {
        setUsersState(state => ({
            ...state,
            users: users
        }));
    }, [])

    // const handleSelect = user => ev => {
    //     const updated_users = UsersState.users.map(e => {
    //         if (e.id === Number(user.id)) {
    //             e.role = ev.target.value;
    //         }
    //         return e;
    //     });

    //     updateUsers(updated_users);

    //     setUsersState(state => ({
    //         ...state,
    //         users: updated_users
    //     }));
    // };

    const handleSelect = user => ev => {
        const updated_users = UsersState.users.map(e => {
          if (e.id === Number(user.id)) {
            return { ...e, role: ev.target.value }; // Create a new object with updated role
          }
          return e;
        });
      
        updateUsers(updated_users); // Update the state with the new array
      
        setUsersState(state => ({
          ...state,
          users: updated_users // Set the updated array in the state
        }));
    };  

    return (
        <section className="users">
        <h2>Users</h2>
        {UsersState.users.length ? (
            <>
                {UsersState.users.map(e => (
                    <div key={e.id} className="users-list">
                        <Select
                            id="select-role"
                            value={e.role}
                            handleSelect={handleSelect(e)}
                            options={UsersState.roles}
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
}

export default UsersPage;
