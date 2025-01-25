import { useSelector } from "react-redux";
import { selectShipments } from "../features/slices/shipmentSlice";
import { selectClients } from "../features/slices/clientSlice";
import { selectStatuses } from "../features/slices/statusSlice";
import { selectInfos } from "../features/slices/loginSlice";
import { selectUsers } from "../features/slices/userSlice";

export const useAppSelectors = () => {
  const shipments = useSelector(selectShipments);
  const clients = useSelector(selectClients);
  const statuses = useSelector(selectStatuses);
  const loginInfo = useSelector(selectInfos);
  const users = useSelector(selectUsers);

  return {
    shipments,
    clients,
    statuses,
    loginInfo,
    users,
  };
};
