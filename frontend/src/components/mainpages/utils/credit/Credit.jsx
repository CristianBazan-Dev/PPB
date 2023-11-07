import React from "react";
import "./credit.css";
import { ReactComponent as Graph } from "../../../../assets/graphs/2.svg";

function Credit(props) {
  return (
    <div className="credit-section">
      <div className="content">
        <div className="text">
          <h2>Crédito planeta</h2>
          <p>Acceda a nuestro crédito solo con su DNI</p>

          <button>Saber más</button>
        </div>

        <Graph />
      </div>
    </div>
  );
}

export default Credit;
