import axios from "axios";

export const getAllIncidencias = async () => {
  return axios.get("http://localhost:8000/urls/api/v1/incidencias/");
};

//esto es para asignar incidencias a un resolutor
export const assignResolutor = async ({
  incidenciaId,
  resolutorId,
  comentario,
}) => {
  return await axios.post("http://127.0.0.1:8000/urls/api/asignar-resolutor", {
    incidenciaId,
    resolutorId,
    comentario,
  });
};
