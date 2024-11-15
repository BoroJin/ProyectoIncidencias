import axios from "axios";

export const getAllIncidencias = async () => {
  return axios.get("http://localhost:8000/urls/api/v1/incidencias/");
};
