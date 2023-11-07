import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";

function OrderDetails() {
  const state = useContext(GlobalState);

  const [history] = state.userAPI.history;

  const [orderDetails, setOrderDetails] = useState([]);

  const params = useParams();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    if (params.id) {
      history.forEach((item) => {
        if (item._id === params.id) setOrderDetails(item);
      });
    }
  }, [params.id, history]);

  if (orderDetails.length === 0) return null;

  return (
    <div className="history-page">
      <table>
        <thead>
          <tr>
            <th>Fecha de compra</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>E-mail</th>
            <th>Pago</th>
            <th>Envío</th>
            <th>País</th>
            <th>Provincia</th>
            <th>Localidad</th>
            <th>Código postal</th>
            <th>Dirección</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{new Date(orderDetails.createdAt).toLocaleDateString()}</td>
            <td>{orderDetails.name}</td>
            <td>{orderDetails.phone}</td>
            <td className="orderDetails-payer_email">
              {orderDetails.payer_email}
            </td>
            <td>{orderDetails.paymentMethod}</td>

            <td>{orderDetails.shippingMethod}</td>
            <td>{orderDetails.country}</td>
            <td>{orderDetails.state}</td>
            <td>{orderDetails.city}</td>
            <td>{orderDetails.postalCode}</td>
            <td>{orderDetails.address}</td>
          </tr>
        </tbody>
      </table>

      <table style={{ margin: "30px 0px" }}>
        <thead>
          <tr>
            <th></th>
            <th>Productos</th>
            <th>Cantidad</th>
            <th>Precio</th>
            {orderDetails.paymentMethod == "transfer" ? <th>Descuento</th> : ""}
          </tr>
        </thead>

        <tbody>
          {orderDetails.items.map((item) => {
            return (
              <tr key={item._id}>
                <td>
                  <img src={item.images.url} alt="" />
                </td>
                <td>{item.title}</td>
                <td>{item.quantity}</td>
                <td>
                  $
                  {orderDetails.paymentMethod == "transfer" &&
                  item.transfer_offer == true
                    ? item.unit_price -
                      (item.unit_price * item.transfer_offer_value) / 100
                    : item.unit_price * item.quantity}
                </td>

                {orderDetails.paymentMethod == "transfer" ? (
                  <td>
                    item.transfer_offer == true ? `${item.transfer_offer_value}
                    %`
                  </td>
                ) : (
                  ""
                )}
              </tr>
            );
          })}
        </tbody>
      </table>

      {orderDetails.items.map((item) => {
        return (
          <div className="details-card item" key={item._id}>
            <h1 className="card-title">Detalle de producto</h1>
            <div className="card-item">
              <img src={item.images.url} alt="" />
            </div>

            <div className="card-item">
              <h2>Producto</h2>
              <h2 className="card-text">{item.title}</h2>
            </div>

            <div className="card-item">
              <h2>Cantidad</h2>
              <h2 className="card-text">{item.quantity}</h2>
            </div>

            <div className="card-item">
              <h2>Precio por unidad</h2>
              <h2 className="card-text">{item.unit_price}</h2>
            </div>

            <div className="card-item">
              <h2>Sub-Total</h2>
              <h2 className="card-text">{item.quantity * item.unit_price}</h2>
            </div>
          </div>
        );
      })}

      <div className="details-card shipping">
        <h1 className="card-title">Detalles del envío</h1>
        <div className="card-item">
          <h2>Nombre</h2>
          <h2 className="card-text">{orderDetails.name}</h2>
        </div>

        <div className="card-item">
          <h2>País</h2>
          <h2 className="card-text">{orderDetails.country}</h2>
        </div>

        <div className="card-item">
          <h2>Provincia</h2>
          <h2 className="card-text">{orderDetails.state}</h2>
        </div>

        <div className="card-item">
          <h2>Ciudad</h2>
          <h2 className="card-text">{orderDetails.city}</h2>
        </div>

        <div className="card-item">
          <h2>Código postal</h2>
          <h2 className="card-text">{orderDetails.postalCode}</h2>
        </div>
        <div className="card-item">
          <h2>Dirección</h2>
          <h2 className="card-text">{orderDetails.address}</h2>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
