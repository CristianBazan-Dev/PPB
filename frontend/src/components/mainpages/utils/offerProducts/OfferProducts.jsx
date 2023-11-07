import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./offerProducts.css";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { GlobalState } from "../../../../GlobalState";
import Loading from "../loading/Loading";
import ProductItem from "../productItem/ProductItem";
import { Link } from "react-router-dom";

import OfferBackground from "./Bg Products - Universe - long.png";
import Stars from "../newProducts/Estrellas.png";

function OfferProducts(props) {
  const state = useContext(GlobalState);

  const [products, setProducts] = state.productsAPI.products;

  const [isAdmin] = state.userAPI.isAdmin;
  const [offerProducts, setOfferProducts] = state.productsAPI.offerProducts;

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

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
      slidesToSlide: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, 
    },
  };

  return (
    <div className="offers-page">

      <div className="offer-titles">
      <h1>¡Ofertas!</h1>
      <h2>Ha arribado a los mejores precios.</h2>
      </div>

      <div className="offers-background">
       



      </div>


      <div className="carousel-contain">
      <img src={Stars} alt="" className="stars" />
      <Carousel responsive={responsive}   containerClass="carousel-container">
        {offerProducts.map((product) => {
          return (
            <Link to={`/detail/${product._id}`}>
            <ProductItem
              className="carousel-item"
              key={product._id}
              product={product}
              isAdmin={isAdmin}
              deleteProduct={deleteProduct}
              handleCheck={handleCheck}
            />
            </Link>
          );
        })}
      </Carousel>
      </div>

      <div className="button-see-more">
            <Link to="/offers">
            <button>Ver más</button>
            </Link>
          </div>

    </div>
  );
}

export default OfferProducts;
