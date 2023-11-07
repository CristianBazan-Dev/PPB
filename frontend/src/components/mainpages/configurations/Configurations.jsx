import { React, useContext, useState } from "react";

import { GlobalState } from "../../../GlobalState";

import axios from "axios";

import Loading from "../utils/loading/Loading";

function Configurations(props) {
  const state = useContext(GlobalState);
  const [states, setStates] = state.statesAPI.states;
  const [usd, setUsd] = state.USDAPI.usd;
  const [usdBlue, setBlueUsd] = state.USDAPI.usdBlue;
  const [banners, setBanners] = state.bannersAPI.banners;
  const [isAdmin] = state.userAPI.isAdmin;
  const [isSuperAdmin] = state.userAPI.isSuperAdmin;
  const [token] = state.token;

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [updatedPrice, setUpdatedPrice] = useState([]);
  const [porcentageValue, setPorcentageValue] = useState([]); 

  const uploadBanner = async (e) => {
    try {
      if (!isAdmin || isSuperAdmin) return alert("No eres administrador/a");
      const file = e.target.files[0];

      if (!file) return alert("No se ha seleccionado ningún archivo.");

      if (file.size > 1024 * 1024)
        return alert("El archivo es demasiado pesado.");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return alert(
          "Formato no soportado. Seleccione una imagen en .jpg o .png"
        );

      let formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      const res = await axios.post("/api/upload/banner", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      setLoading(true);
      setImages(res.data);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDestroyBanner = async () => {
    try {
      if (!isAdmin) return alert("No eres administrador/a");

      setLoading(true);
      await axios.post(
        "/api/destroy/banner",
        { public_id: images.public_id },
        {
          headers: { Authorization: token },
        }
      );
      setLoading(false);
    } catch (err) {
      alert(err.response.msg);
    }
  };

  const styleUpload = {
    display: images ? "block" : "none",
  };

  const handleSubmitBanner = async (id) => {
    try {
      const res = await axios.put(
        `/api/banners/${id}`,
        { images },
        {
          headers: { Authorization: token },
        }
      );
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPrice(value);
  };

  const updatePrice = async (id) => {
    try {
      const res = await axios.put(
        `/api/products/shipping/${id}`,
        { unit_price: updatedPrice },
        {
          headers: { Authorization: token },
        }
      );
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const updateAllPrices = async () => {
    try {
      const res = await axios.post(
        "/api/products/updatePrices", 
        {porcentageValue},
        {
          headers: { Authorization: token },
        }
      ); 

    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  console.log(porcentageValue)

  return (
    <>
      <div className="configurations-page">
        <div className="first-column">
          <div className="usd-converter">
            <h1>Dólar</h1>
            <h3>Precio del dolar para realizar conversión</h3>

            <label htmlFor="usd">Oficial</label>
            <input
              type="number"
              name="usd"
              value={usd}
              disabled
              placeholder=""
            />

            <label htmlFor="ars">Blue</label>
            <input
              type="number"
              name="ars"
              value={usdBlue}
              disabled
              placeholder=""
            />
          </div>

          <div className="updating-banner">
            <h3>Editar banner</h3>

            {banners.map((ban) => {
              return (
                <form
                  onSubmit={() => {
                    handleSubmitBanner(ban._id);
                  }}
                >
                  <div className="banner-items-container">
                    <h3>{ban.name}</h3>
                    <img src={ban.images.url} alt="" />
                    <input type="file" onChange={uploadBanner} />
                  </div>
                  <button type="submit">Actualizar {ban.name}</button>
                </form>
              );
            })}
          </div>

          <div className="updating-prices">
            <h1>Actualizar precios</h1>
            <h3>Actualizar los precios de todos los productos</h3>
            <div className="input-item">
              <input type="number" onChange={(e) =>{setPorcentageValue(e.target.value)}}/>
              <h4>%</h4>
            </div>

            <button
              type="submit"
              onClick={() => {
                updateAllPrices();
              }}
            >
              Actualizar todos los precios
            </button>
          </div>
        </div>

        <div className="second-column">
          <div className="states-container">
            <h1>Precios de envío</h1>
            <h3>
              Los precios consignados se han estipulado en base a lo expuesto
              por el documento oficial de Correo Argentino, tomando en cuenta un
              peso medio de paquete. Esto se ha dado así debido a la falta de un
              sistema automatizado por parte de la empresa.{" "}
            </h3>
            <a href="https://www.correoargentino.com.ar/MiCorreo/public/files/lista-de-precios-CF-MiCorreo.pdf?20200522110842">
              Documento de Correo Argentino
            </a>

            {states.map((state) => {
              return (
                <form
                  className="state-card"
                  onSubmit={() => {
                    updatePrice(state._id);
                  }}
                >
                  <h3>{state.state}</h3>
                  <h4>Precio de envío: ${state.unit_price}</h4>
                  <h4>Zona: {state.zone}</h4>
                  <div className="updating-shipping">
                    <input
                      type="text"
                      name="unit_price"
                      onChange={handleInputChange}
                    />
                    <button className="shipping-update-button">
                      Actualizar envío a {state.state}
                    </button>
                  </div>
                </form>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Configurations;
