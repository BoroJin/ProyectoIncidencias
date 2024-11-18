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
              <div className="textoTit">UrbanSensor, calidad de vida</div>
              <div className="textoGen">
                UrbanSensor es una aplicación web diseñada para gestionar un
                sistema de registro y resolución de incidencias en los
                municipios de la Región Metropolitana. Su objetivo principal es
                facilitar el reporte y manejo eficiente de incidencias
                comunales, contribuyendo a la mejora de la calidad de vida de
                los ciudadanos a través de una gestión oportuna y efectiva
                realizada exclusivamente por gestores designados por los
                municipios.
              </div>
            </div>
            <div className="seccionResp">
              <div className="textoTit">Gestión crítica de servicios</div>
              <div className="textoGen">
                La aplicación está diseñada para atender la necesidad de los
                municipios de identificar, organizar y resolver diversas
                incidencias, como problemas de infraestructura, servicios
                públicos o condiciones de seguridad. UrbanSensor centraliza este
                proceso, permitiendo a los gestores priorizar, asignar y
                monitorear la resolución de las incidencias de manera eficiente,
                promoviendo la transparencia y el uso eficiente de los recursos
                municipales.
              </div>
            </div>
            <div className="seccionResp">
              <div className="textoTit">Procesamiento y análisis de datos</div>
              <div className="textoGen">
                {" "}
                UrbanSensor opera mediante un sistema de reportes accesible
                desde su plataforma web. A través de formularios simples pero
                detallados, los usuarios pueden describir incidencias
                específicas, proporcionando información clave para su
                resolución. Una vez registrado un reporte, este se asigna al
                equipo municipal adecuado para su gestión y resolución. Además,
                la aplicación incluye herramientas para monitorear el progreso
                de cada incidencia, generar estadísticas de desempeño y exportar
                datos para análisis posteriores.
              </div>
            </div>
            <div className="seccionResp">
              <div className="textoTit">UrbanSensor, eficiencia comunal</div>
              <div className="textoGen">
                {" "}
                UrbanSensor fortalece la gestión municipal al proporcionar una
                herramienta tecnológica diseñada específicamente para optimizar
                la resolución de incidencias comunales. Aunque su uso está
                reservado para gestores designados, sus beneficios trascienden
                al ámbito ciudadano, al garantizar que los problemas reportados
                sean atendidos de manera estructurada y con mayor eficacia. Esto
                promueve un entorno más ordenado y funcional en las comunidades,
                alineado con las necesidades de sus habitantes.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduccion;
