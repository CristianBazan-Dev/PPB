import React from "react";
import "./loading.css";
import { ReactComponent as LoadingIcon } from "../../../headers/icon/icon.png";

function Loading(props) {
  return (
    <div className="loading-container">
      <img
        src="https://res.cloudinary.com/dkdncsbmz/image/upload/v1684835523/planeta-precios-bajos-e-commerce/Assets/Planeta_voxnx7.png"
        alt=""
      />
      <h1>Cargando...</h1>
    </div>
  );
}

export default Loading;
