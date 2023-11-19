import React, { useContext, useState, useEffect } from "react";

import { Link } from "react-router-dom";
import axios from "axios";

import { GlobalState } from "../../../GlobalState";

import { ReactComponent as Close } from "../../headers/icon/close.svg";

function Users(props) {
  const state = useContext(GlobalState);
  const [history, setHistory] = state.userAPI.history;
  const [isAdmin] = state.userAPI.isAdmin;
  const [isSuperAdmin] = state.userAPI.isSuperAdmin;
  const [token] = state.token;
  const [notification] = state.userAPI.notification;
  const [users, setUsers] = state.userAPI.users;
  const [admins, setAdmins] = useState([]);

  const [userSelected, setUserSelected] = useState([]);
  const [isUserSelectedCart, setIsUserSelectedCart] = useState(false);

  useEffect(() => {
    if (isAdmin || isSuperAdmin) {
      const getUsers = async () => {
        try {
          const res = await axios.get("/api/users/all-users", {
            headers: { Authorization: token },
          });
          setUsers(res.data);
        } catch (err) {
          alert(err.response.data.msg);
        }
      };
      getUsers();
    }
  }, []);

  useEffect(() => {
    const getAdmins = async () => {
      try {
        const res = await axios.get("/api/users/admins", {
          headers: { Authorization: token },
        });
        setAdmins(res.data);
      } catch (err) {
        alert(err.response.data.msg);
      }
    };
    getAdmins();
  }, []);

  const createAdmin = async (id) => {
    try {
      const res = await axios.put(`/api/users/superadmin/${id}`, {
        headers: { Authorization: token },
      });
      alert(res.data.msg);
      window.location.href = "/users";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const deleteAdmin = async (id) => {
    try {
      const res = await axios.put(`/api/users/admindelete/${id}`, {
        headers: { Authorization: token },
      });
      alert(res.data.msg);
      window.location.href = "/users";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await axios.delete(`/api/users/userdelete/${id}`, {
        headers: { Authorization: token },
      });
      alert(res.data.msg);
      window.location.href = "/users";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  useEffect(() => {
    const handleEsc = (e) => {
      {
        console.log("Close");
      }
    };
  }, []);

  const closeCartModal = (e) => {
    setUserSelected();
    setIsUserSelectedCart(false);
  };

  const escCartModal = (e) => {
    if (e.keyCode === 27) {
      setUserSelected();
      setIsUserSelectedCart(false);
    }
  };

  const displayUserCart = () => {
    return (
      <div className="cart-modal">
        <Close
          width="20px"
          className="close-cart-modal"
          onClick={closeCartModal}
        />

        <div className="cart-alert">
          <div className="cart-items">
            <div className="cart-alert-header">
              <h1>Carrito del usuario #{userSelected._id}</h1>
            </div>

            <div className="cart-alert-personal">
              <h2>{userSelected.name}</h2>
              <h2>{userSelected.email}</h2>
            </div>

            <div className="cart-alert-cart">
              {userSelected.cart.map((item) => {
                return (
                  <>
                    <div className="cart-alert-card">
                      <div className="detail">
                        <img src={item.images.url} alt={item.title} />

                        <div className="box-detail">
                          <div className="row">
                            <h6>#id: {item.product_id}</h6>
                            <h2>{item.title}</h2>
                          </div>

                          <p>{item.description}</p>

                          <p>{item.content}</p>

                          <div className="details-buy">
                            <span className="details-price">
                              ${item.unit_price}
                            </span>

                            <h4>${Math.round(item.unit_price / item.dues)}</h4>
                            <div className="dues-style accent">
                              x {item.dues} cuotas sin interés
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="users-page">
      <div className="admins-table">
        <h2>Administradores</h2>

        <div className="users">
          <table className="new">
            <thead>
              <tr>
                <th>ID de usuario</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Creado</th>
                <th>Rol</th>
                {isSuperAdmin ? <th>Acciones</th> : ""}
              </tr>
            </thead>

            <tbody>
              {admins.map((user) => {
                return (
                  <tr key={user._id} className="admins-row">
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td className="user-email">{user.email}</td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td>{user.role === 1 ? "Administrador" : "Usuario"}</td>
                    {isSuperAdmin ? (
                      <div className="buttons-actions-admins">
                        <button
                          className="delete-admin"
                          onClick={() => {
                            deleteAdmin(user._id);
                          }}
                        >
                          Eliminar administrador
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="users-table">
        <h2>Usuarios</h2>

        <div className="users">
          <table className="new">
            <thead>
              <tr>
                <th>ID de usuario</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Creado</th>
                <th>Rol</th>
                <th>Carrito</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td className="user-email">{user.email}</td>
                    <td className="user-email">{user.phone}</td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td>{user.role === 1 ? "Administrador" : "Usuario"}</td>
                    <td
                      className="cart-link"
                      onClick={() => {
                        if (user.cart.length >= 1) {
                          setUserSelected(user);
                          setIsUserSelectedCart(true);
                        } else {
                          alert(
                            `El carrito de ${user.name} se encuentra vacío!`
                          );
                        }
                      }}
                    >
                      {user.cart.length}
                    </td>
                    <td>
                      {isSuperAdmin ? (
                        <div className="buttons-actions-admins">
                          <button className="delete-user">Eliminar</button>
                          <button
                            className="create-admin"
                            onClick={() => {
                              createAdmin(user._id);
                            }}
                          >
                            Crear administrador
                          </button>
                        </div>
                      ) : (
                        <div className="buttons-actions-admins">
                          <button
                            className="delete-user"
                            onClick={() => {
                              deleteUser(user._id);
                            }}
                          >
                            Eliminar
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {isUserSelectedCart ? displayUserCart() : <div></div>}
        </div>
      </div>
    </div>
  );
}

export default Users;
