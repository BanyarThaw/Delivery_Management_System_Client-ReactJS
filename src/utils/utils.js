export const getSingle = (list, id) => list.find((e) => e.id === Number(id));

export const convertDate = (date, iso = "en-US") =>
  date.toLocaleDateString(iso, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

export const joinShipmentsInfo = (shipments, clients, statuses) =>
  shipments.map((shipment) => {
    const client = getSingle(clients, shipment.client_id);
    const client_address = getSingle(
      client.addresses,
      shipment.client_addres_id
    );
    const status = getSingle(statuses, shipment.status_id);
    return { ...shipment, client, client_address, status };
  });
