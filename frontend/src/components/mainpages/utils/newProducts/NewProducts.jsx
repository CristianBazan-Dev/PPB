import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./newProducts.css";

import MainBackground from "./Bg Products - Universe.png";
import Stars from "./Estrellas.png";
import { GlobalState } from "../../../../GlobalState";
import Loading from "../loading/Loading";
import ProductItem from "../productItem/ProductItem";
import { Link } from "react-router-dom";

function NewProducts(props) {
  const state = useContext(GlobalState);

  const [products, setProducts] = state.productsAPI.products;

  const [isAdmin] = state.userAPI.isAdmin;

  const [token] = state.token;
  const [callback, setCallback] = state.productsAPI.callback;
  const [loading, setLoading] = useState(false);
  const [isCheck, setIsCheck] = useState(false);

  const handleCheck = (id) => {
    products.forEach((product) => {
      if (product._id === id) product.checked = !product.checked;
    });
    setProducts([...products]);
  };

  const deleteProduct = async (id, public_id) => {
    try {
      setLoading(true);

      const destroyImg = axios.post(
        "/api/destroy",
        { public_id },
        {
          headers: { Authorization: token },
        }
      );

      const deleteProduct = axios.delete(`/api/products/${id}`, {
        headers: { Authorization: token },
      });

      await destroyImg;
      await deleteProduct;
      setCallback(!callback);
      setLoading(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const checkAll = () => {
    products.forEach((product) => {
      product.checked = !isCheck;
    });
    setProducts([...products]);
    setIsCheck(!isCheck);
  };

  const deleteAll = () => {
    products.forEach((product) => {
      if (product.checked) deleteProduct(product._id, product.images.public_id);
    });
  };

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <div className="new-products-page">
      <div className="products-background">
        <div className="main-form">
          <div className="products-titles">
            <h1>¡Lo último!</h1>
            <h3></h3>
          </div>

          {isAdmin && (
            <div className="delete-all">
              <span>Seleccionar todo</span>
              <input type="checkbox" checked={isCheck} onChange={checkAll} />
              <button onClick={deleteAll}>Eliminar todo</button>
            </div>
          )}

          {products.length === 0 && <Loading />}
          <div className="products">
          

            {products.map((product) => {
              return (
                <Link to={`/detail/${product._id}`}>
                  <ProductItem
                    key={product._id}
                    product={product}
                    isAdmin={isAdmin}
                    deleteProduct={deleteProduct}
                    handleCheck={handleCheck}
                  />
                </Link>
              );
            })}
          </div>

          <div className="button-see-more">
            <Link to="/products">
              <button>Ver más</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewProducts;
