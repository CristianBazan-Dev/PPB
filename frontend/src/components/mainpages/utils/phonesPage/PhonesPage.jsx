import React, { useContext, useState, useEffect } from "react";
import axios from 'axios'
import BlobBackground from "./blobBackground.png";
import "./phones.css";
import ProductItem from "../productItem/ProductItem";
import { GlobalState } from "../../../../GlobalState";
import Loading from "../loading/Loading";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";

function PhonesPage(props) {
  const state = useContext(GlobalState);

  const [phones] = state.productsAPI.phones;
  const [isAdmin] = state.userAPI.isAdmin;
  const [products, setProducts] = state.productsAPI.products;

  const [category, setCategory] = state.categoriesAPI.category;
  const [subcategory, setSubcategory] = state.categoriesAPI.subcategory;

  const [idCategory, setIdCategory] = state.categoriesAPI.idCategory;

  const [token] = state.token;
  const [callback, setCallback] = state.productsAPI.callback;
  const [loading, setLoading] = useState(false);
  const [isCheck, setIsCheck] = useState(false);

  const handleCategory = (e) => {
    setCategory(`category=${e.target.id}`);
    setSubcategory("");
    setIdCategory(e.target.id);
  };

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

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 2,
      slidesToSlide: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
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
    <div className="phones-page">
      <h1>Lo mejor en telefonía celular</h1>

      <div className="phones-products-page">
        <div className="phones-products">
          <div
            id="carouselExampleFade"
            className="carousel slide carousel-fade"
            data-bs-ride="carousel"
            data-bs-interval="3000"
          >
            <div className="carousel-inner">
              <div className="logo-phones-page">
                <img
                  src="https://res.cloudinary.com/dkdncsbmz/image/upload/v1684835523/planeta-precios-bajos-e-commerce/Assets/Planeta_voxnx7.png"
                  alt=""
                />
              </div>
              <div className="carousel-item active">
                <img
                  className="d-block w-100"
                  src="https://res.cloudinary.com/dkdncsbmz/image/upload/v1683864283/planeta-precios-bajos-e-commerce/phonesPage/A23_ovbeov.png"
                  alt="First slide"
                />
                <h1>Samsung A23</h1>
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  src="https://res.cloudinary.com/dkdncsbmz/image/upload/v1683866820/planeta-precios-bajos-e-commerce/phonesPage/G32_afxau1.png"
                />
                <h1>Moto G32</h1>
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  src="https://res.cloudinary.com/dkdncsbmz/image/upload/v1683864289/planeta-precios-bajos-e-commerce/phonesPage/A04_tplrpm.png"
                />
                <h1>Samsung A04</h1>
              </div>

              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  src="https://res.cloudinary.com/dkdncsbmz/image/upload/v1683866821/planeta-precios-bajos-e-commerce/phonesPage/E22_yzm572.png"
                />
                <h1>Moto E22</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {phones.length === 0 && <Loading />}

      <div className="carousel-contain">
        <Carousel responsive={responsive} containerClass="carousel-container">
          {phones.map((product) => {
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
        </Carousel>
      </div>

      <div className="button-see-more">
        <Link
          to="/category/643d5739af2e7d016d840bc6"
          id="643d5739af2e7d016d840bc6"
          onClick={handleCategory}
        >
          <button>Ver más</button>
        </Link>
      </div>
    </div>
  );
}

export default PhonesPage;
