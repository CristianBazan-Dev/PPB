import { React, useContext, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import { ReactComponent as Mail } from "../../headers/icon/mail.svg";
import { ReactComponent as Phone } from "../../headers/icon/phone.svg";
import { ReactComponent as Whatsapp } from "../../headers/icon/whatsapp.svg";
import { ReactComponent as Ig } from "../../headers/icon/ig.svg";

import { GlobalState } from "../../../GlobalState";

function Contact(props) {
  const state = useContext(GlobalState);
  const [token] = state.token;

  const [mail, setEmail] = useState({
    name: "",
    subject: "",
    mail: "",
    message: "",
  });

  useLayoutEffect(() => {
    window.scrollTo(0, 170);
  });

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setEmail({ ...mail, [name]: value });
  };

  const sendMail = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/api/sendmail",
        {
          name: mail.name,
          subject: mail.subject,
          mail: mail.mail,
          message: mail.message,
        },
        {
          headers: { Authorization: token },
        }
      );

      alert(res.data.msg);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="contact-page">
      <div className="form-page">
        <h1>Enviar correo</h1>
        <h3>Utiliza este formulario para enviar tu consulta.</h3>

        <form action="" className="contact-form" onSubmit={sendMail}>
          <div className="form-item">
            <input
              type="text"
              name="name"
              value={mail.name}
              onChange={handleChangeInput}
              placeholder="Nombre completo"
            />
          </div>

          <div className="form-item">
            <input
              type="text"
              name="subject"
              value={mail.subject}
              onChange={handleChangeInput}
              placeholder="Asunto"
            />
          </div>

          <div className="form-item">
            <input
              type="text"
              name="mail"
              value={mail.mail}
              onChange={handleChangeInput}
              placeholder="E-mail"
            />
          </div>

          <div className="form-item">
            <textarea
              type="text"
              name="message"
              value={mail.message}
              onChange={handleChangeInput}
              placeholder="Mensaje"
            />
          </div>

          <button type="submit">Enviar</button>
        </form>

        <div className="email-address">
          <h3>Dirección de e-mail</h3>
          <div className="contact">
            <Mail width="60" className="mail-icon" />
            <a href="mailto:preciosbajos@gmail.com?subject=Hola%20PlanetaPreciosBajos!%20Me%20contacto%20porque%20<asunto>&body=Escriba%20aqui%20su%20mensaje">
              <h5>preciosbajos@gmail.com</h5>
            </a>
          </div>
        </div>
      </div>

      <div className="telephone-number">
        <h1>Número de teléfono</h1>

        <div className="telephone">
          <div className="contact">
            <Phone width="60" className="phone-icon"></Phone>
            <h5>(3468)-506269</h5>
          </div>
        </div>

        <div className="whatsapp">
          <h3>Envía tu consulta a través de Whatsapp!</h3>
          <a
            href="https://wa.link/uxd2d6"
            rel="noreferrer"
            target="_blank"
          >
            <Whatsapp width="100" className="wpp-icon" />
          </a>

          <h4>Click en el ícono</h4>
        </div>
      </div>

      <div className="social-networks">
        <h1>Redes sociales</h1>

        <div className="contact">
          <Link
            to="https://www.instagram.com/planetaprecios/?igshid=N2JhNDIwYjc%3D"
            target="_blank"
          >
            <h3>Instagram</h3>
            <Ig width="60" className="ig-icon"></Ig>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Contact;
