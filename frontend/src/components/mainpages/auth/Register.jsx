import React, { useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Lock from "../../headers/icon/lock.svg";
import Mail from "../../headers/icon/mail.svg";
import User from "../../headers/icon/user.svg";
import Phone from "../../headers/icon/phone.svg";

function Register(props) {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/users/register", { ...user });

      localStorage.setItem("firstlogin", true);

      window.location.href = "/#/login";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-card-logo">
          <img
            src="https://res.cloudinary.com/dhbvri4ni/image/upload/v1678385337/planeta-precios-bajos-e-commerce/Logo_transparent_cj5gjf.png"
            alt=""
          />
        </div>

        <div className="login-card-header">
          <h1>Iniciar sesión</h1>
          <div>
            Por favor, ingresa en tu cuenta para adquirir nuestros productos!
          </div>
        </div>

        <form onSubmit={registerSubmit} className="login-card-form">
          <div className="form-item">
            <span className="form-item-icon-material-symbols-rounded">
              <img src={User} alt="" />
            </span>

            <input
              type="text"
              name="name"
              required
              placeholder="Nombre"
              value={user.name}
              onChange={onChangeInput}
            />
          </div>

          <div className="form-item">
            <span className="form-item-icon-material-symbols-rounded">
              <img src={Mail} alt="" />
            </span>

            <input
              type="text"
              name="email"
              required
              placeholder="E-mail"
              value={user.email}
              onChange={onChangeInput}
            />
          </div>

          <div className="form-item">
            <span className="form-item-icon-material-symbols-rounded">
              <img src={Phone} alt="" />
            </span>

            <input
              type="text"
              name="phone"
              required
              placeholder="Teléfono celular"
              value={user.phone}
              onChange={onChangeInput}
            />
          </div>

          <div className="form-item">
            <span className="form-item-icon-material-symbols-rounded">
              <img src={Lock} alt="" />
            </span>
            <input
              type="password"
              name="password"
              required
              placeholder="Contraseña"
              value={user.password}
              onChange={onChangeInput}
            />
          </div>

          <button type="submit">Registrame!</button>
        </form>

        <div className="login-card-footer">
          Ya tienes una cuenta? <Link to="/register">Inicia sesión!</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
