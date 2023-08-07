import React, { useEffect, useState } from "react";
import "../styles/shipmentsPage.css";
import { useSelector } from "react-redux";
import { selectShipments,updateShipments } from "../features/shipmentSlice";
import { selectClients } from "../features/clientSlice";
import Shipments from "../components/Shipments";
import Profile from "../components/Profile";
import { selectStatuses } from "../features/statusSlice";
import { selectUsers } from "../features/userSlice";
import { selectInfos } from "../features/loginSlice";

const ShipmentsPage = ({ }) => {
    const users = Object.values(useSelector(selectUsers));
    const shipments = Object.values(useSelector(selectShipments));
    const clients = Object.values(useSelector(selectClients));
    const statuses = Object.values(useSelector(selectStatuses));
    const loginInfo = useSelector(selectInfos);
    const [ShipmentsState,setShipmentsState] = useState({
        shipments: [],
        showBikersList: false,
        shipment_id: ""
    });

    useEffect(() => {
        setShipmentsState(state => ({
            ...state,
            shipments: shipmentsJoinInfo()
        }));
    }, [])

    console.log('this is from shipmentsState');
    console.log(ShipmentsState.shipments);

    const getSingle = (list, id) => list.find(e => e.id === Number(id));

    const shipmentsJoinInfo = () =>
        shipments.map(e => {
            const client = getSingle(clients, e.client_id);
            const client_address = getSingle(
                client.addresses,
                e.client_addres_id
            );
            const status = getSingle(statuses, e.status_id);
            const shipments = {
                ...e,
                client,
                client_address,
                status
            };

            return shipments;
    });

    // const hasClients = () => clients.length;

    const convertDate = (date, iso = "en-US") =>
        date.toLocaleDateString(iso, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        }
    );

    const nextStatus = (shipment_id, status_id) => {
        if (statuses.length > status_id) {
            status_id = status_id + 1;
        } else {
            status_id = 2;
        }
        const status = getSingle(statuses, status_id);
        const shipments = shipments.map(e => {
            if (e.id === Number(shipment_id)) {
                e.status_id = status.id;
                e.timeline.map(t => {
                if (t.status_id === status_id)
                    t.timestamp = convertDate(new Date());
                    return t;
                });
            }
            return e;
        });

        updateShipments(shipments);

        setShipmentsState(state => ({
            ...state,
            shipments
        }));
    };

    const togglebikersList = shipment_id => {
        setShipmentsState(state => ({
            ...state,
            showBikersList: !state.showBikersList,
            shipment_id: shipment_id
        }));
    };

    // const assignBiker = user_id => {
    //     const updated_shipments = shipments.map(e => {
    //         if (e.id === Number(ShipmentsState.shipment_id)) {
    //             e.user_id = Number(user_id);
    //             e.status_id = 2;
    //             e.timeline.map(t => {
    //             if (t.status_id === 2) {
    //                 t.timestamp = convertDate(new Date());
    //             }
    //             return t;
    //             });
    //         }
    //         return e;
    //     });

    //     updateShipments(updated_shipments);

    //     setShipmentsState(state => ({
    //         ...state,
    //         updated_shipments,
    //         togglebikersList: false,
    //         shipment_id: ""
    //     }));

    //     const list = togglebikersList();
    //     console.log(`list:`, list);
    //     return list;
    // };

    const assignBiker = user_id => {
        const updated_shipments = ShipmentsState.shipments.map(e => {
            if (e.id === Number(ShipmentsState.shipment_id)) {
                // Create a new object with the updated properties
                return {
                    ...e,
                    user_id: Number(user_id),
                    status_id: 2,
                    status: {
                        id: 2, 
                        type: 'assigned', 
                        description: 'Assigned but not picked up.', 
                        name: 'Assigned'
                    },
                    timeline: e.timeline.map(t => {
                        if (t.status_id === 2) {
                        return {
                            ...t,
                            timestamp: convertDate(new Date())
                        };
                        }
                        return t;
                    })
                };
            }
            return e;
        });
      
        console.log('hello');
        console.log('this is updated_shipments');
        console.log(updated_shipments);
        //updateShipments(updated_shipments);
      
        setShipmentsState(state => ({
            ...state,
            shipments: Object.values(updated_shipments),
            togglebikersList: false,
            shipment_id: ""
        }));
      
        // const list = togglebikersList();
        // console.log(`list:`, list);
        // return list;
    };

    return (
        <section
            className={
                "shipments " + (loginInfo.role === "manager" && "manager-list") 
            }
        >
        <h2>Shipments</h2>
        {shipments.length && users.length ? (
            statuses.map(
            e =>
                loginInfo.role === "manager" ? (
                <div key={e.id} className="shipment-list">
                    <h4>{e.name}</h4>
                    <Shipments
                        list={ShipmentsState.shipments}
                        users={users}
                        target="status_id"
                        value={e.id}
                        nextStatus={nextStatus}
                        togglebikersList={togglebikersList}
                        login={loginInfo}
                        statuses={statuses}
                    />
                </div>
                ) : (
                <div key={e.id} className="shipment-list">
                    {e.id > 1 && <h4>{e.name}</h4>}
                    <Shipments
                        list={shipments.filter(
                            e => e.user_id === loginInfo.id
                        )}
                        users={users}
                        target="status_id"
                        value={e.id}
                        nextStatus={nextStatus}
                        togglebikersList={togglebikersList}
                        login={loginInfo}
                        statuses={statuses}
                    />
                </div>
                )
            )
        ) : (
            <div>Loading...</div>
        )}
        {ShipmentsState.showBikersList && (
            <div className="modal" onClick={() => togglebikersList()}>
                <div className="bikers-list">
                    {users.filter(e => e.role === "biker").map(e => (
                    <div
                        key={e.id}
                        className="biker"
                        onClick={() => assignBiker(e.id)}
                    >
                        <Profile
                            user={e}
                            folder="users"
                            hideEmail={true}
                            hideRole={true}
                        />
                    </div>
                    ))}
                </div>
            </div>
        )}
        </section>
    );
}

export default ShipmentsPage;