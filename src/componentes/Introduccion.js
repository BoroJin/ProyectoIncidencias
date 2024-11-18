import React from "react";

const Introduccion = () => {
  return (
    <div className="todoApp">
      <div className="card">
        <div className="card-header">
          <h2>Introducción a la aplicación</h2>
        </div>

        <div className="card-body">
          <div className="secciones">
            <div className="seccionIntro">
              <h className="subtituloGen"> ¿Qué es UrbanSensor? </h>
              <div className="textoGen">
                UrbanSensor es una aplicación web que modela un sistema de
                registro de incidencias para los distintos municipios dentro de
                la Región Metropolitana, que tiene como objetivo principal el
                reporte de incidencias comunales y su posterior resolución
                mediante personal capacitado.
              </div>
            </div>
            <div className="seccionResp">
              <h className="subtituloGen"> ¿A qué problemática responde? </h>
              <div className="textoGen">
                La problemática inicial nace de la necesidad de conocer las
                distintas incidencias correspondientes al poder municipal, que
                atraviesan las distintas comunas a lo largo de la región, junto
                con el deber de responder a ellas oportuna y efectivamente,
                mejorando la calidad de vida de todos los ciudadanos.
              </div>
            </div>
            <div className="seccionResp">
              <h className="subtituloGen"> ¿Cómo funciona? </h>
              <div className="textoGen">
                {" "}
                La aplicación web cuenta con un sistema de reportes mediante
                formularios, que tienen como objetivo principal el describir la
                información básica de cada incidencia, para que esta luego sea
                delegada a un equipo resolutor correspondiente, que se encargará
                finalmente de la resolución de la misma. (Para más información
                detallada, consultar el manual de usuario)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduccion;
