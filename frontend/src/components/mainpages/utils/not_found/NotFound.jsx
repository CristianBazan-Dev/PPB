import React from "react";
import "./notFound.css";
import { ReactComponent as Error } from "../../../headers/icon/404.svg";
function NotFound(props) {
  return (
    <div className="notfound-page">
        <div className="notfound-titles">
        <h1>404 || Not found</h1>
      <h3>El error 404 indica que el host ha sido capaz de comunicarse con el servidor, pero no existe el recurso que ha sido pedido</h3>
        </div>
     
      <Error className="notfound-img"/>
    </div>
  );
}

export default NotFound;
