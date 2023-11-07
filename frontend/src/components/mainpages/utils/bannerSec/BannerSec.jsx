import React, { useContext, useState, useEffect } from "react";
import "./bannerSec.css";

import { GlobalState } from "../../../../GlobalState";
import { Link } from "react-router-dom";

function BannerSec(props) {
  const state = useContext(GlobalState);

  return (
    <div className="banners-page">
      <div className="banner-sec">
        <div className="banner-card">
          <div className="banner-card-body">
            <div className="banner-card-body-text">
              <h1>Calefacción</h1>
              <h3>¡Ofertas pensadas para no pasar frío!</h3>
              <h4>Hasta 30% de descuento en compra por transferencia.</h4>
            </div>

            <Link to="/subcategory/641366ec0d7ccc3e10015018">
              <button>Ver</button>
            </Link>
          </div>
          <img
            src="https://res.cloudinary.com/dkdncsbmz/image/upload/v1683302541/planeta-precios-bajos-e-commerce/bannerSec/bannerSec_w7g1xp.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default BannerSec;
