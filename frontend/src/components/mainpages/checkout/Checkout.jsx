import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import { Link } from "react-router-dom";
import { ReactComponent as Whatsapp } from "../../headers/icon/whatsapp.svg";

import axios from "axios";

function Checkout() {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;
  const [token] = state.token;
  const [states] = state.statesAPI.states;

  const [paymentId, setPaymentId] = useState("");
  const [mpLink, setMpLink] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("");
  const [shippingMethod, setShippingMethod] = useState("");

  const [shippingPrice, setShippingPrice] = useState(0);

  const [addressNumber, setAddressNumber] = useState(0);

  const [isOfferTransfer, setIsOfferTransfer] = useState(false);
  const [transferDescount, setTransferDescount] = useState();
  const [priceDefault, setPriceDefault] = useState(0);

  const [checkout, setCheckout] = useState({
    name: "",
    lastName: "",
    personalId: "",
    payer_email: "",
    phone: "",
    country: "Argentina",
    state: "",
    postalCode: "",
    city: "",
    address: "",
    items: cart,
  });

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.unit_price * item.quantity;
      }, 0);

      setTotal(total);
      setPriceDefault(total);
    };
    getTotal();
  }, [cart]);

  useEffect(() => {
    const settingOfferValueInTransfer = () => {
      cart.map((item) => {
        setTransferDescount(item.transfer_offer_value);
      });
    };

    settingOfferValueInTransfer();
  }, []);

  const onChangeInput = async (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setCheckout({ ...checkout, [name]: value });
  };

  const addToCart = async (cart) => {
    await axios.patch(
      "/users/addcart",
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };

  const checkoutSubmit = async (e) => {
    e.preventDefault();
    if (!paymentMethod) {
      alert("Debe especificar el método de pago");
    }
    if (paymentMethod) {
      try {
        const res = await axios.post(
          "/api/payment",
          { total, ...checkout, paymentMethod, shippingMethod, shippingPrice },
          {
            headers: { Authorization: token },
          }
        );

        const paymentId = res.data;
        setPaymentId(paymentId);

        if (paymentMethod == "transfer") {
          alert(
            "Encargo realizado! Nos estaremos comunicando con usted para hacer el seguimiento de la compra."
          );
          window.location.href = "/#/history  ";
        } else if (paymentMethod == "mp") {
          const mpRes = await axios.post(`/api/payment/${paymentId}`, {
            headers: { Authorization: token },
          });
          const mpLink = mpRes.data.init_point;
          setMpLink(mpLink);

          alert("Compra confirmada! Serás redirigido a realizar el pago");

          window.open(`${mpLink}`);
          window.location.href = "/#/history  ";
        }

        setCart([]);
        addToCart([]);
      } catch (err) {
        alert(err.response.data.msg);
      }
    }
  };

  const paySelection = (e) => {
    let paymentMethod = e.target.value;
    setPaymentMethod(paymentMethod);

    if (paymentMethod == "transfer") {
      const transferData = document.querySelector(".transfer-data");
      transferData.classList.toggle("active");

      cart.map((item) => {
        if (item.transfer_offer == true && paymentMethod == "transfer") {
          setIsOfferTransfer(true);
          const operation =
            item.unit_price -
            item.unit_price * (item.transfer_offer_value / 100) * item.quantity;
          setTotal(operation);
        }
      });
    } else {
      const transferData = document.querySelector(".transfer-data");
      transferData.classList.remove("active");
      setTotal(priceDefault);
    }

    if (paymentMethod == "sucursal") {
      const shippingMethod = document.querySelector(".shipping-method");
      shippingMethod.classList.toggle("inactive");
    } else {
      const shippingMethod = document.querySelector(".shipping-method");
      shippingMethod.classList.remove("inactive");
    }
  };

  const shipSelection = (e) => {
    let shippingMethod = e.target.value;
    setShippingMethod(shippingMethod);

    if (shippingMethod == "sucursal") {
      setShippingPrice(0);
    }

    if (shippingMethod == "correo_arg") {
      const shippingForm = document.querySelector(".shipping-data");

      shippingForm.classList.toggle("active");
    } else {
      const shippingForm = document.querySelector(".shipping-data");

      shippingForm.classList.remove("active");
    }
  };

  const onShipChange = (e) => {
    const { name, value } = e.target;
    setCheckout({ ...checkout, [name]: value });

    if (shippingMethod == "correo_arg") {
      const statesRending = states.filter((state) => {
        if (state.state == e.target.value) {
          let stateName = state.state;
          let stateShipPrice = state.unit_price;
          setShippingPrice(stateShipPrice);
        }
      });
    }
  };

  const copyToClipboard = (e) => {
    const cbu = document.getElementById("cbu");
    cbu.select();
    cbu.setSelectionRange(0, 9999);

    navigator.clipboard.writeText(cbu.value);

    alert(
      "Elemento copiado! Ya puedes pegarlo para realizar tu transferencia."
    );
  };

  return (
    <div className="checkout-page">
      <h1>Finaliza tu compra</h1>
      <h3>Completa todos los pasos para finalizar tu compra.</h3>

      <div>
        <form onSubmit={checkoutSubmit} className="consumer-form">
          <div className="payment-method">
            <h2>Método de pago</h2>

            <div className="form-item" id="mp">
              {/* <input type="checkbox" className="check-pay-meth" /> */}
              <input
                type="radio"
                onClick={paySelection}
                value="mp"
                name="paymentMethod"
                id="mp"
              />

              <img
                src="https://res.cloudinary.com/dhbvri4ni/image/upload/v1677862587/planeta-precios-bajos-e-commerce/0006813_mercadopago-checkout-latam-tecnofin_z51fvi.png"
                alt=""
                className="mp"
              />
            </div>

            <div className="form-item" id="transfer">
              {/* <input type="checkbox" className="check-pay-meth" /> */}
              <input
                type="radio"
                onClick={paySelection}
                value="transfer"
                name="paymentMethod"
                id="transfer"
              />
              <img
                src="https://res.cloudinary.com/dhbvri4ni/image/upload/v1677871231/planeta-precios-bajos-e-commerce/Transfer_s8nqkh.png"
                alt=""
              />
              <label>Transferencia bancaria</label>
            </div>
            {transferDescount >= 1 ? (
              <h4 className="transfer-style accent">
                Al seleccionar la transferencia, tu producto tendrá un descuento
                del {transferDescount}%
              </h4>
            ) : (
              ""
            )}

            <div className="form-item" id="sucursalPay">
              {/* <input type="checkbox" className="check-pay-meth" /> */}
              <input
                type="radio"
                onClick={paySelection}
                value="sucursal"
                name="paymentMethod"
                id="sucursalPay"
              />
              <img
                src="https://res.cloudinary.com/dhbvri4ni/image/upload/v1677871231/planeta-precios-bajos-e-commerce/Sucursal_oy3lk6.png"
                alt=""
              />
              <label>Pago en sucursal</label>
            </div>
          </div>

          <div className="transfer-data">
            <h3>Datos para la transferencia</h3>
            <p>Deberás realizar la transferencia al siguiente CBU: </p>
            <div className="cbu">
              <h2>CBU</h2>
              <input type="text" value="0200435201000030001829" id="cbu" />
              <button type="button" onClick={copyToClipboard}>
                Copiar
              </button>
            </div>

            <div className="alias">
              <h2>Alias</h2>
              <input
                type="text"
                value="CANELA.BOTE.TIGRE"
                id="alias"
                disabled
              />
            </div>

            <p>
              Si quieres mayor seguimiento, puedes obtener asistencia a través
              de nuestra atención al cliente.
            </p>

            <a
              href="https://api.whatsapp.com/send/?phone=543467635090&text=Hola%21+Necesito+ayuda+con+el+proceso+de+compra+en+la+página+de+PlanetaPreciosBajos.com.ar.&type=phone_number&app_absent=0"
              target="_blank"
            >
              <Whatsapp width="60px" fill="var(--base)" />
            </a>
          </div>

          <div className="buyer-data">
            <h2>Datos del comprador</h2>

            <div className="form-container">
              <div className="form-item">
                <span>Nombre completo</span>
                <input
                  type="text"
                  name="name"
                  value={checkout.name}
                  onChange={onChangeInput}
                  placeholder="Ej: Rosa Díaz"
                />
              </div>

              <div className="form-item">
                <span>DNI</span>
                <input
                  type="text"
                  name="personalId"
                  value={checkout.personalId}
                  onChange={onChangeInput}
                  placeholder="Ej: 23.323.342"
                />
              </div>

              <div className="form-item">
                <span>Email</span>
                <input
                  type="text"
                  name="payer_email"
                  value={checkout.payer_email}
                  onChange={onChangeInput}
                  placeholder="Ej: rosadiaz_90@gmail.com"
                />
              </div>

              <div className="form-item">
                <span>Teléfono celular</span>
                <input
                  type="text"
                  name="phone"
                  value={checkout.phone}
                  onChange={onChangeInput}
                  placeholder="Ej: 3537233423"
                />
              </div>
            </div>

            {/* <div className="button-container">
              <div className="save-button" id="save-button">
                Guardar
              </div>
            </div> */}
          </div>

          <div className="shipping-method" id="shippingMethod">
            <h2>Método de envío</h2>

            <div className="form-item">
              <input
                type="radio"
                onClick={shipSelection}
                value="correo_arg"
                name="shippingMethod"
              />

              <img
                src="https://res.cloudinary.com/dhbvri4ni/image/upload/v1677871845/planeta-precios-bajos-e-commerce/Correo_cbdbub.png"
                className="cor-Ar"
                alt=""
              />
            </div>

            <div className="form-item">
              <input
                type="radio"
                onClick={shipSelection}
                value="sucursal"
                name="shippingMethod"
              />
              <img
                src="https://res.cloudinary.com/dhbvri4ni/image/upload/v1677871231/planeta-precios-bajos-e-commerce/Sucursal_oy3lk6.png"
                alt=""
              />
              <label>Retiro en sucursal</label>
            </div>
          </div>

          <div className="shipping-data">
            <h2>Datos para el envío</h2>
            <div className="form-container">
              <div className="form-item">
                <span>País</span>
                <input
                  type="text"
                  name="country"
                  value={checkout.country}
                  onChange={onChangeInput}
                  defaultValue="Argentina"
                  disabled
                />
              </div>

              <div className="form-item">
                <span>Provincia</span>
                <select
                  name="state"
                  value={checkout.state}
                  onChange={onShipChange}
                  id="selectState"
                  placeholder="Seleccione una provincia"
                >
                  <option hidden selected>
                    Seleccione una provincia
                  </option>

                  {states.map((state) => {
                    return (
                      <option value={state.state} key={state.product_id}>
                        {state.state}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="form-item">
                <span>Localidad</span>
                <input
                  type="text"
                  name="city"
                  value={checkout.city}
                  onChange={onChangeInput}
                  placeholder="Ej: Monte Buey"
                />
              </div>

              <div className="form-item">
                <span>Código postal</span>
                <input
                  type="text"
                  name="postalCode"
                  value={checkout.postalCode}
                  onChange={onChangeInput}
                  placeholder="Ej: 2589"
                ></input>
              </div>

              <div className="form-item">
                <span>Dirección</span>
                <input
                  type="text"
                  name="address"
                  value={checkout.address}
                  onChange={onChangeInput}
                  placeholder="Ej: Córdoba 1250"
                ></input>
              </div>

              <div className="form-item">
                <span>Costo de envío</span>
                $
                <input
                  type="text"
                  value={shippingPrice}
                  onChange={onChangeInput}
                  disabled
                />
              </div>
            </div>
          </div>

          <h1>Productos</h1>

          {cart.map((item) => {
            return (
              <>
                <div className="product-card">
                  <div className="card-item">
                    <img src={item.images.url} alt="" />
                  </div>

                  <div className="card-item">
                    <h3>Item</h3>
                    <h4>{item.title}</h4>
                  </div>

                  <div className="card-item">
                    <h3>Precio</h3>
                    <h4>{item.unit_price}</h4>
                  </div>

                  <div className="card-item">
                    <h3>Cantidad</h3>
                    <h4>{item.quantity}</h4>
                  </div>

                  <div className="card-item">
                    <h3>Sub-total</h3>
                    <h4>${item.quantity * item.unit_price}</h4>
                  </div>
                </div>
              </>
            );
          })}

          <div className="total-responsive">
            <h1>Total</h1>
            <h1>${total}</h1>
          </div>

          <div className="product-table">
            <table style={{ margin: "30px 0px" }}>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Sub-total</th>
                </tr>
              </thead>

              <tbody>
                {cart.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td>
                        <img src={item.images.url} alt="" />
                      </td>
                      <td>{item.title}</td>
                      <td>
                        {paymentMethod == "transfer" &&
                        item.transfer_offer == true
                          ? `$ ${
                              item.unit_price -
                              item.unit_price *
                                (item.transfer_offer_value / 100)
                            }`
                          : `$ ${item.unit_price}`}
                      </td>
                      <td>{item.quantity}</td>

                      <td>
                        {paymentMethod == "transfer" &&
                        item.transfer_offer == true
                          ? `$ ${
                              item.unit_price -
                              item.unit_price *
                                (item.transfer_offer_value / 100) *
                                item.quantity
                            }`
                          : `$ ${item.unit_price * item.quantity}`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>

              <tbody className="total">
                <tr>
                  <td>
                    <h4>Productos: ${total} </h4>
                    <h4>Envio: ${shippingPrice}</h4>
                    <h4>Total: ${total + shippingPrice}</h4>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <button type="submit">Continuar con el pago</button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
