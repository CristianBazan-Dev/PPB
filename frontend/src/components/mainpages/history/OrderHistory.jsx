import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { GlobalState } from "../../../GlobalState";

function OrderHistory(props) {
  const state = useContext(GlobalState);
  const [history, setHistory] = state.userAPI.history;
  const [isAdmin] = state.userAPI.isAdmin;
  const [isSuperAdmin] = state.userAPI.isSuperAdmin;
  const [token] = state.token;
  const [notification] = state.userAPI.notification;

  useEffect(() => {
    if (token) {
      const getHistory = async () => {
        if (isAdmin || isSuperAdmin) {
          const res = await axios.get("/api/checkout", {
            headers: { Authorization: token },
          });
          setHistory(res.data);
        } else {
          const res = await axios.get("/api/users/history", {
            headers: { Authorization: token },
          });
          setHistory(res.data);
        }
      };
      getHistory();
    }
  }, [token, isAdmin, isSuperAdmin, setHistory]);

  const updateHistory = async (e) => {
    try {
      const { name, value } = e.target;
      const res = await axios.post(
        `api/checkout/${e.target.id}`,
        {
          [name]: value,
        },
        {
          headers: { Authorization: token },
        }
      );

      window.location.reload();
    } catch (err) {
      alert(err.message);
    }
  };

  const displayUserCart = (cart) => {
    return (
      <div className="cart-modal">
        <h1>{cart.length}</h1>
      </div>
    );
  };

  // console.log("History", minusHistory);

  return (
    <div className="history-page">
      {isAdmin || isSuperAdmin ? (
        <>
          <h2>Pedidos</h2>
          <h4>Tienes {notification} nuevos pedidos</h4>
          <h2>Nuevos</h2>
          <table className="new">
            <thead>
              <tr>
                <th>ID del pago</th>
                <th>Fecha de compra</th>
                <th>Detalles</th>
                <th>Eliminar notificación</th>
              </tr>
            </thead>

            <tbody>
              {history.map((items) => {
                if (items.seen == false) {
                  return (
                    <tr key={items._id}>
                      <td>{items._id}</td>
                      <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                      <td>
                        <Link to={`/history/${items._id}`}>Ver</Link>
                      </td>
                      <td>
                        {
                          <button
                            className="history-button"
                            id={items._id}
                            onClick={updateHistory}
                            value="true"
                            name="seen"
                          >
                            Visto
                          </button>
                        }
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>

          {history.map((items) => {
            if (items.seen === false) {
              return (
                <div className="history-card">
                  <div className="card-item" key={items._id}>
                    <h2>Id del pedido</h2>
                    <h2 className="card-text">{items._id}</h2>
                  </div>

                  <div className="card-item">
                    <h2>Fecha de compra</h2>
                    <h2 className="card-text">
                      {new Date(items.createdAt).toLocaleDateString()}
                    </h2>
                  </div>

                  <div className="card-item">
                    <Link to={`/history/${items._id}`}>Ver</Link>
                  </div>
                </div>
              );
            }
          })}
        </>
      ) : (
        ""
      )}

      <h2>Historial</h2>
      <h4>Tienes {history.length} compras</h4>
      <table className="new">
        <thead>
          <tr>
            <th>ID del pago</th>
            <th>Fecha de compra</th>
            <th>Detalles</th>
          </tr>
        </thead>

        <tbody>
          {history.map((items) => {
            return (
              <tr key={items._id}>
                <td>{items._id}</td>
                <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                <td>
                  <Link to={`/history/${items._id}`}>Ver</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {history.map((items) => {
        return (
          <div className="history-card">
            <div className="card-item" key={items._id}>
              <h2>Id del pedido</h2>
              <h2 className="card-text">{items._id}</h2>
            </div>

            <div className="card-item">
              <h2>Fecha de compra</h2>
              <h2 className="card-text">
                {new Date(items.createdAt).toLocaleDateString()}
              </h2>
            </div>

            <div className="card-item">
              <Link to={`/history/${items._id}`}>Ver</Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default OrderHistory;
