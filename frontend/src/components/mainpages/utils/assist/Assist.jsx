import React from "react";
import "./assist.css";
import Iso from "../../../../assets/img/iso.png";
import { Link } from "react-router-dom";
import { ReactComponent as Graph } from "../../../../assets/graphs/1.svg";

function Assist(props) {
  return (
    <div className="assist-section">
      <div className="content">
        <div className="assist">
          <div className="info">
            <div className="title">
              <img src={Iso} alt="" />
              <h3>Valoramos su opinion</h3>
            </div>

            <p>
              Hemos creado una línea directa para que nuestros asistentes puedan
              atender sus dudas y sugerencias.
            </p>
          </div>

          <Link
            to="https://api.whatsapp.com/send?phone=543468506269&text=Hola!%20Vengo%20de%20la%20web%20de%20planetapreciosbajos.com%20y%20tengo%20la%20siguiente%20consulta%3A%20"
            target="_blank"
          >
            <button>Chat</button>
          </Link>

          <Graph />
        </div>
      </div>
    </div>
  );
}

export default Assist;
