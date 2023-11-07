import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./banner.css";

import { GlobalState } from "../../../../GlobalState";

import { ReactComponent as Shipping } from "./../../../headers/icon/shippingTruck.svg";
import { ReactComponent as Transfer } from "./../../../headers/icon/bankTransfer.svg";
import { ReactComponent as Calling } from "./../../../headers/icon/calling.svg";

function Banner(props) {
  const state = useContext(GlobalState);

  const [banners, setBanners] = useState([]);
  const [callback, setCallback] = state.productsAPI.callback;

  useEffect(() => {
    const getBanners = async () => {
      const res = await axios.get("api/banners");
      setBanners(res.data);
    };
    getBanners();
  }, [callback]);

  return (
    <div className="banner-container">
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>

          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>

          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>

          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="3"
            aria-label="Slide 4"
          ></button>

          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="4"
            aria-label="Slide 5"
          ></button>
        </div>

        <div className="carousel-inner">
          {banners.map((ban, index) => {
            return (
              <div
                className={
                  index === 0 ? "carousel-item active" : "carousel-item"
                }
                key={ban._id}
              >
                <img src={ban.images.url} alt={ban.name} />
              </div>
            );
          })}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>

      <div className="banner-footer-info">
        <div className="banner-info-item">
          <img src="https://res.cloudinary.com/dkdncsbmz/image/upload/v1684248093/planeta-precios-bajos-e-commerce/Assets/mp_-_credit_xhn3jm.png" />
        </div>

        <div className="banner-info-item">
          <Shipping className="banner-info-icon" />
          <span>Envíos a todo el país</span>
        </div>

        <div className="banner-info-item">
          <Transfer className="banner-info-icon" />
          <span>Transferencia bancaria</span>
        </div>

        <div className="banner-info-item">
          <Calling className="banner-info-icon" />
          <span>Atención personalizada</span>
        </div>
      </div>
    </div>
  );
}

export default Banner;
