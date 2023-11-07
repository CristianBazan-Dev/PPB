import React, { useLayoutEffect } from "react";
import "./creditPage.css";
import { Link } from "react-router-dom";

import MainBackground from "../../mainpages/utils/newProducts/Bg Products - Universe.png";
import { ReactComponent as Id } from "../../headers/icon/id.svg";
import { ReactComponent as Arrow } from "../../headers/icon/arrow.svg";
import { ReactComponent as Whatsapp } from "../../headers/icon/whatsapp.svg";
import { ReactComponent as Mail } from "../../headers/icon/mail.svg";

function CreditPage(props) {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="credit-page">
      <div className="credit-elements">
        <img src={MainBackground} alt="" className="credit-background" />

        <img
          src="https://res.cloudinary.com/dkdncsbmz/image/upload/v1684835523/planeta-precios-bajos-e-commerce/Assets/Planeta_voxnx7.png"
          alt=""
          className="logo-credit"
        />

        <Arrow className="credit-arrow" />

        <Id className="credit-id" />
      </div>

      <div className="credit-text">
        <div className="credit-titles">
          <h1>Crédito Planeta Precios Bajos</h1>
        </div>

        <div className="credit-details">
          <h3>Características</h3>
          <ul>
            <li>Hasta 1.500.000 en 24 cuotas.</li>
            <li>Sólo con tu DNI.</li>
            <li>No necesitas recibo.</li>
            <li>Fácil y rápido.</li>
          </ul>

          <h4>
            Aprovecha todos los beneficios y compra en cuotas lo que necesites!
          </h4>
        </div>

        <div className="credit-contact">
          <h2>
            Podes solicitar tu crédito contactandote, con un sólo click, a
            través de las siguientes vías:
          </h2>

          <div className="credit-contact-icons">
            <div className="credit-contact-item">
              <a href="https://api.whatsapp.com/send/?phone=543467635090&text=Hola%21+Quiero+consultar+sobre+el+prestamo+inmediato.&type=phone_number&app_absent=0" target="_blank">
                <Whatsapp className="credit-contact-icon" />
                <h4>Whatsapp</h4>
              </a>
            </div>

            <div className="credit-contact-item">
              <Link to="/contact">
                <Mail className="credit-contact-icon mail" />
                <h4>Mail</h4>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreditPage;
