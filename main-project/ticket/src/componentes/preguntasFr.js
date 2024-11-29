import React from "react";

const Introduccion = () => {
  return (
    <div className="todoApp">
      <div className="card">
        <div className="card-header">
          <h2>Preguntas frecuentes</h2>
        </div>

        <div className="card-body">
          <div className="secciones">
            <div className="seccionIntro">
              <h className="textoTit">
                {" "}
                ¿Que tipo de incidencias se pueden reportar?{" "}
              </h>
              <div className="textoGen">
                Las incidencias que se deben reportar, son aquellas que
                describen las problemáticas que estan bajo la jurisdicción de
                las municipalidades, las cuales son: alambrado público,
                recolección de basura/residuos, aseo y ornato, infraestructura
                pública, señalización y demarcación, plagas y sanitización,
                ruidos molestos, emergencias ambientales, gestion de seguridad
                publica.
              </div>
            </div>
            <div className="seccionResp">
              <h className="textoTit">
                {" "}
                ¿Cual es la cadena que sigue la incidencia?{" "}
              </h>
              <div className="textoGen">
                La incidencia parte desde el momento en que el gestor
                territorial, ve en terreno una situación que debe ser reportada
                según la normativa vigente. Luego, esta es designada a un equipo
                resolutor por el departamento correspondiente, según el motivo
                de la incidencia. Este equipo será el encargado de darle
                solución y cierre a la misma, para finalmente ser revisada por
                el departamento y definir si es que el cierre corresponde o si
                aún falta para darla por finalizada.
              </div>
            </div>
            <div className="seccionResp">
              <h className="textoTit">
                {" "}
                ¿Cuanto tiempo demorará la resolución?{" "}
              </h>
              <div className="textoGen">
                {" "}
                La resolución de la incidencia no tiene un tiempo determinado,
                ya que todo dependerá de la disponibilidad de personal
                capacitado o equipo de trabajo, y de la gravedad de la misma.
              </div>
            </div>
            <div className="seccionResp">
              <h className="textoTit">
                {" "}
                Mi aplicación web no funciona, ¿Que puedo hacer?{" "}
              </h>
              <div className="textoGen">
                {" "}
                En primera instancia debes recurrir al chat de soporte, donde
                podrás obtener ayuda técnica y de soporte técnico. Si el
                problema persiste, debes ponerte en contacto con el equipo de
                soporte técnico mediante un Ticket, que se encuentra en la barra
                lateral.
              </div>
            </div>
            <div className="seccionResp">
              <h className="textoTit">
                {" "}
                ¿Cuanto tiempo demorará la resolución?{" "}
              </h>
              <div className="textoGen">
                {" "}
                La resolución de la incidencia no tiene un tiempo determinado,
                ya que todo dependerá de la disponibilidad de personal
                capacitado o equipo de trabajo, y de la gravedad de la misma.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduccion;
