import { BASE_URL } from "../utils/baseURL";
import axios from "axios";

const BASE_ENDPOINT = `${BASE_URL}/vehicles`;

export const listVehiclesAPI = async ({ pagination, filter, sorting }) => {
  const response = await axios.get(BASE_ENDPOINT, {
    params: {
      page: pagination.pageIndex,
      limit: pagination.pageSize,
      filter,
      sort: sorting,
    },
  });
  return response.data;
};

export const detailVehicleAPI = async (vehicleId) => {
  const response = await axios.get(BASE_ENDPOINT + `/${vehicleId}`);
  return response.data;
};

export const createVehicleAPI = async (vehicledata) => {
  const response = await axios.post(BASE_ENDPOINT, vehicledata);
  return response.data;
};

export const updateVehicleAPI = async ({ vehicleId, ...data }) => {
  const response = await axios.put(BASE_ENDPOINT + `/${vehicleId}`, data);
  return response.data;
};

export const deleteVehicleAPI = async (vehicleId) => {
  const response = await axios.delete(BASE_ENDPOINT + `/${vehicleId}`);
  return response.data;
};

export const deleteManyVehiclesAPI = async (vehicleIds) => {
  const response = await axios.post(BASE_ENDPOINT + `/delete-many`, vehicleIds);
  return response.data;
};
