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
  const payload = {
    incidenciaId,
    resolutorId,
    comentario: comentario || "",
  };

  console.log("Datos a enviar:", payload);

  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/urls/api/asignar-resolutor/",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Respuesta exitosa:", response.data);
    return response;
  } catch (error) {
    console.error("Error completo:", error);
    console.error("Datos del error:", error.response.data);
    throw error;
  }
};

export const getAllRegistros = async () => {
  return axios.get("http://localhost:8000/urls/api/v1/registroasignaciones/");
};
