document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("incidenciasContainer");

  incidenciasData.forEach((incidencia) => {
    const card = document.createElement("div");
    card.className = "incidenciaCard " + incidencia.fields.estado;
    card.innerHTML = `
            <h4>${incidencia.fields.titulo_Incidencia} (ID: ${
      incidencia.pk
    })</h4>
            <p>Estado: ${incidencia.fields.estado}</p>
            <p>Fecha de reporte: ${new Date(
              incidencia.fields.fecha_Reporte
            ).toLocaleDateString("en-US")}</p>
        `;
    card.onclick = function () {
      alert(
        `Detalles de la incidencia: ID: ${incidencia.pk} Título: ${
          incidencia.fields.titulo_Incidencia
        } Estado: ${incidencia.fields.estado} Fecha de reporte: ${new Date(
          incidencia.fields.fecha_Reporte
        ).toLocaleDateString("en-US")}`
      );
    };
    container.appendChild(card);
  });
});
