import React, { Component } from "react";
import "./style.css";
import { connect } from "react-redux";
import { updateShipments } from "../../actions/shipmentActions";
import Shipments from "../../components/Shipments";
import Profile from "../../components/Profiles/Profile";

const ShipmentsPage = ({ }) => {
    const getSingle = (list, id) => list.find(e => e.id === Number(id));

    const shipmentsJoinInfo = () =>
    this.props.shipments.map(e => {
        const clients = this.props.clients;
        const client = this.getSingle(clients, e.client_id);
        const client_address = this.getSingle(
            client.addresses,
            e.client_addres_id
        );
        const statuses = this.props.statuses;
        const status = this.getSingle(statuses, e.status_id);
        const shipments = {
            ...e,
            client,
            client_address,
            status
        };
        return shipments;
    });

    const hasClients = () => this.props.clients.length;

    const convertDate = (date, iso = "en-US") =>
    date.toLocaleDateString(iso, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });

    const nextStatus = (shipment_id, status_id) => {
        if (this.props.statuses.length > status_id) {
            status_id = status_id + 1;
        } else {
            status_id = 2;
        }
        const status = this.getSingle(this.props.statuses, status_id);
        const shipments = this.props.shipments.map(e => {
        if (e.id === Number(shipment_id)) {
            e.status_id = status.id;
            e.timeline.map(t => {
            if (t.status_id === status_id)
                t.timestamp = this.convertDate(new Date());
                return t;
            });
        }
        return e;
    });

    this.props.updateShipments(shipments);

    this.setState(state => ({
        ...state,
        shipments
        }));
    };

    const togglebikersList = shipment_id => {
        this.setState(state => ({
        ...state,
        showBikersList: !this.state.showBikersList,
        shipment_id: shipment_id
        }));
    };

    const assignBiker = user_id => {
        const shipments = this.props.shipments.map(e => {
        if (e.id === Number(this.state.shipment_id)) {
            e.user_id = Number(user_id);
            e.status_id = 2;
            e.timeline.map(t => {
            if (t.status_id === 2) {
                t.timestamp = this.convertDate(new Date());
            }
            return t;
            });
        }
        return e;
    });

    this.props.updateShipments(shipments);

    this.setState(state => ({
      ...state,
      shipments,
      togglebikersList: false,
      shipment_id: ""
    }));

    const list = this.togglebikersList();
        console.log(`list:`, list);
        return list;
    };

    render = () => (
        <section
        className={
            "shipments " /*+ (this.props.login.role === "manager" && "manager-list") */
        }
        >
        <h2>Shipments</h2>
        {this.state.shipments.length && this.props.users.length ? (
            this.props.statuses.map(
            e =>
                this.props.login.role === "manager" ? (
                <div key={e.id} className="shipment-list">
                    <h4>{e.name}</h4>
                    <Shipments
                    list={this.state.shipments}
                    users={this.props.users}
                    target="status_id"
                    value={e.id}
                    nextStatus={this.nextStatus}
                    togglebikersList={this.togglebikersList}
                    login={this.props.login}
                    statuses={this.props.statuses}
                    />
                </div>
                ) : (
                <div key={e.id} className="shipment-list">
                    {e.id > 1 && <h4>{e.name}</h4>}
                    <Shipments
                    list={this.state.shipments.filter(
                        e => e.user_id === this.props.login.id
                    )}
                    users={this.props.users}
                    target="status_id"
                    value={e.id}
                    nextStatus={this.nextStatus}
                    togglebikersList={this.togglebikersList}
                    login={this.props.login}
                    statuses={this.props.statuses}
                    />
                </div>
                )
            )
        ) : (
            <div>Loading...</div>
        )}
        {this.state.showBikersList && (
            <div className="modal" onClick={() => this.togglebikersList()}>
            <div className="bikers-list">
                {this.props.users.filter(e => e.role === "biker").map(e => (
                <div
                    key={e.id}
                    className="biker"
                    onClick={() => this.assignBiker(e.id)}
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