import React, { useContext, useState, useEffect, useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { GlobalState } from "../../../GlobalState";

import Loading from "../utils/loading/Loading";

const initialState = {
  product_id: "",
  title: "",
  unit_price: 0,
  description:
    "How to and tutorial videos of cool CSS effect, Web Design ideas, Javascript libraries, Node.",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  category: "",
  subcategory: "",
  secSubcategory: "", 
  brand: "",
  model: "",
  usd_type: "",
  dues: 0,
  transfer_offer_value: 0,
  usd_price: 0,
  old_price: 0,
  _id: "",
};

function CreateProduct(props) {
  const state = useContext(GlobalState);
  const [product, setProduct] = useState(initialState);
  const [categories] = state.categoriesAPI.categories;
  const [subcategories] = state.categoriesAPI.subcategories;
  const [secSubcategories] = state.categoriesAPI.secSubcategories; 
  const [isAdmin] = state.userAPI.isAdmin;
  const [isSuperAdmin] = state.userAPI.isSuperAdmin; 
  const [token] = state.token;
  const [products] = state.productsAPI.products;
  const [callback, setCallback] = state.productsAPI.products;
  const [usd] = state.USDAPI.usd;
  const [usdBlue] = state.USDAPI.usdBlue;

  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [onEdit, setOnEdit] = useState(false);

  const [isUsd, setIsUsd] = useState(false);
  const [isUsdBlue, setIsUsdBlue] = useState(false);
  const [isOffer, setIsOffer] = useState(false);
  const [isTransferOffer, setIsTransferOffer] = useState(false);

  const [category, setCategory] = useState([]);
  const [dues, setDues] = useState(0);

  const history = useNavigate();
  const param = useParams();


  console.log(product.secSubcategory)

  useEffect(() => {
    // if(param.id) {
    //   setOnEdit(true);
    //   products.forEach((product) => {
    //     if (product._id === param.id) {
    //       setProduct(product);
    //       setImages(product.images);
    //     }
    //   });
    // } else {
    //   setOnEdit(false);
    //   setProduct(initialState);
    //   setImages(false);
    // }

    if(param.id){
      setOnEdit(true)
      const getProduct = async () => {
        const res = await axios.get(
          `/api/products/detail/${param.id}`
        ); 
        setProduct(res.data);
        setImages(res.data.images)
      }
      getProduct()
    }else{
      setOnEdit(false); 
      setProduct(initialState); 
      setImages(false); 
    }

  }, [param.id, products]);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
 
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
      const res = await axios.post("/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      setLoading(false);
      setImages(res.data);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleDestroy = async () => {
    try {

      setLoading(true);
      await axios.post(
        "/api/destroy",
        { public_id: images.public_id },
        {
          headers: { Authorization: token },
        }
      );
      setLoading(false);
      setImages(false);
    } catch (err) {
      alert(err.response.msg);
    }
  };

  const categorySelection = (e) => {
    const { category, value } = e.target;
    setCategory({ category: value });
  };

  const handleChangeInput = async (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleCheckOffer = async (e) => {
    const { name, checked } = e.target;
    setIsOffer(e.target.checked);
    setProduct({ ...product, [name]: checked });
  };

  const handleCheckTransferOffer = async (e) => {
    const { name, checked } = e.target;
    setIsTransferOffer(e.target.checked);
    setProduct({ ...product, [name]: checked });
  };

  const handleCheckUsd = async (e) => {
    const { name, checked } = e.target;
    setIsUsd(e.target.checked);
    setProduct({ ...product, [name]: checked });
  };

  const handleUsdType = async (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleDues = async (e) => {
    const { name, value } = e.target;
    setDues(e.target.value);
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      if (!images) return alert("No se ha seleccionado ninguna imagen.");

      if (onEdit) {
        await axios.put(
          `/api/products/${product._id}`,
          { ...product, images },
          {
            headers: { Authorization: token },
          }
        );
      } else {
        await axios.post(
          "/api/products",
          { ...product, images },
          {
            headers: { Authorization: token },
          }
        );
      }
      setCallback(!callback);

      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const styleUpload = {
    display: images ? "block" : "none",
  };

  return (
    <div className="create_product">
      {onEdit ? <h1>Editar producto</h1> : <h1>Nuevo producto</h1>}
      <form onSubmit={handleSubmit}>
        <div className="display">
          <h1>Tarjeta del producto</h1>
          <h3>Esta es la información que se mostrará al inicio</h3>

          <div className="row">
            <label htmlFor="title">Título</label>

            <input
              type="text"
              name="title"
              required
              value={product.title}
              id="title"
              onChange={handleChangeInput}
            />
          </div>

          <div className="row">
            <label htmlFor="unit_price">Precio</label>

            <input
              type="number"
              name="unit_price"
              required
              value={product.unit_price}
              id="unit_price"
              onChange={handleChangeInput}
            />
          </div>

          <div className="row">
            <label htmlFor="usd">Convertir desde dólar</label>

            <input
              type="checkbox"
              name="usd"
              id="usd"
              onChange={handleCheckUsd}
            />

            {isUsd == true && (
              <div>
                <div className="usdConfig-container">
                  <label htmlFor="usdType">Oficial - ${usd}</label>
                  <input
                    type="radio"
                    name="usd_type"
                    value={usd}
                    onChange={handleUsdType}
                  ></input>

                  <label htmlFor="usdBlue">Blue - ${usdBlue}</label>
                  <input
                    type="radio"
                    name="usd_type"
                    value={usdBlue}
                    onChange={handleUsdType}
                  ></input>

                  <div className="usd-conversion">
                    <label htmlFor="usdType">Precio en USD</label>

                    <input
                      type="number"
                      name="usd_price"
                      value={product.usd_price}
                      onChange={handleChangeInput}
                    />

                    <label htmlFor="usdType">Precio final (USD a ARS)</label>

                    <input
                      type="number"
                      name="unit_price"
                      value={
                        (product.unit_price =
                          product.usd_price * product.usd_type)
                      }
                      onChange={handleChangeInput}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="row">
            <label htmlFor="offer">Oferta</label>

            <input
              type="checkbox"
              name="offer"
              value={product.offer}
              id="offer"
              onChange={handleCheckOffer}
            />

            {isOffer == true && (
              <div>
                <div className="offer-container">
                  <label htmlFor="">Precio antiguo</label>
                  <input
                    type="number"
                    name="old_price"
                    value={product.old_price}
                    id="old_price"
                    onChange={handleChangeInput}
                  />

                  <label htmlFor="">Precio en oferta</label>
                  <input
                    type="number"
                    name="unit_price"
                    value={product.unit_price}
                    id="unit_price"
                    onChange={handleChangeInput}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="row">
            <label htmlFor="transfer_offer">Oferta de transferencia</label>

            <input
              type="checkbox"
              name="transfer_offer"
              value={product.transfer_offer}
              id="transfer_offer"
              onChange={handleCheckTransferOffer}
            />

            {isTransferOffer == true && (
              <div>
                <div className="offer-container">
                  <label htmlFor="transfer_offer_value">
                    Porcentaje a aplicar
                  </label>

                  <div className="porcentage">
                    <input
                      type="number"
                      name="transfer_offer_value"
                      value={product.transfer_offer_value}
                      id="transfer_offer_value"
                      onChange={handleChangeInput}
                      placeholder="%"
                    />
                    <h4>%</h4>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="row">
            <label htmlFor="dues">Cuotas</label>
            <div className="dues-rows">
              <div className="due-option">
                <label htmlFor="">3</label>
                <input
                  type="radio"
                  name="dues"
                  value={3}
                  onChange={handleDues}
                />
              </div>

              <div className="due-option">
                <label htmlFor="">6</label>
                <input
                  type="radio"
                  name="dues"
                  value={6}
                  onChange={handleDues}
                />
              </div>

              <div className="due-option">
                <label htmlFor="">12</label>
                <input
                  type="radio"
                  name="dues"
                  value={12}
                  onChange={handleDues}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <label htmlFor="description">Descripción</label>

            <input
              type="text"
              name="description"
              required
              value={product.description}
              id="description"
              onChange={handleChangeInput}
            />
          </div>

          <div className="row">
            <label htmlFor="categories">Categoría</label>

            <select
              name="category"
              value={product.category}
              onChange={handleChangeInput}
            >
              <option value="">Por favor, elija una categoría.</option>

              {categories.map((category) => {
                return (
                  <option value={category._id} key={category._id}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="row">
            <label htmlFor="subcategory">Subcategoría</label>

            <select
              name="subcategory"
              value={product.subcategory}
              onChange={handleChangeInput}
            >
              <option value="">Por favor, elija una subcategoría.</option>

              {subcategories.map((subcategory) => {
                if(subcategory.category == product.category){
                  return (
                    <option value={subcategory._id} key={subcategory._id}>
                      {subcategory.name}
                    </option>
                  );
                }
      
              })}
            </select>
          </div>

          <div className="row">
            <label htmlFor="secSubcategory">Segunda Subcategoría</label>

            <select
              name="secSubcategory"
              value={product.secSubcategory}
              onChange={handleChangeInput}
            >
              <option value="">Por favor, elija una segunda subcategoría.</option>

              {secSubcategories.map((secSubcategory) => {
                if(secSubcategory.subcategoryId == product.subcategory){
                  return (
                    <option value={secSubcategory._id} key={secSubcategory._id}>
                      {secSubcategory.name}
                    </option>
                  );
                }
      
              })}
            </select>
          </div>

        </div>

        <div className="technical-aspect">
          <h1>Apartado técnico</h1>
          <h3></h3>
          <div className="row">
            <label htmlFor="brand">Marca</label>

            <input
              type="text"
              name="brand"
              value={product.brand}
              id="brand"
              onChange={handleChangeInput}
            />
          </div>

          <div className="row">
            <label htmlFor="model">Modelo</label>

            <input
              type="text"
              name="model"
              value={product.model}
              id="model"
              onChange={handleChangeInput}
            />
          </div>
        </div>

        <div className="details">
          <h1>Detalles</h1>
          <h3>Información útil acerca del artículo</h3>
          <div className="row">
            <label htmlFor="product_id">ID del producto</label>

            <input
              type="text"
              name="product_id"
              required
              value={product.product_id}
              id="product_id"
              onChange={handleChangeInput}
            />
          </div>

          <div className="row">
            <label htmlFor="content">Contenido</label>

            <textarea
              name="content"
              value={product.content}
              id="content"
              onChange={handleChangeInput}
            />
          </div>
        </div>

        <div className="upload">
          <input type="file" name="file" id="file_up" onChange={handleUpload} />
          {loading ? (
            <div id="file_img">
              <Loading />
            </div>
          ) : (
            <div id="file_img" style={styleUpload}>
              <img src={images ? images.url : ""} alt="" />
              <span onClick={handleDestroy}>X</span>
            </div>
          )}
        </div>

        <button type="submit">{onEdit ? "Actualizar" : "Crear"}</button>
      </form>
    </div>
  );
}

export default CreateProduct;
