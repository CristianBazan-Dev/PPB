import React, { useContext, useEffect, useState } from "react";
import ReactTouchEvents from "react-touch-events";
import "./products-1.css";
import Iso from "../../../../assets/img/iso.png";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../../GlobalState";
import ProductCard from "../productCard/productCard";
import axios from "axios";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Products1(props) {
  const state = useContext(GlobalState);
  const [phones] = state.productsAPI.phones;
  const [products] = state.productsAPI.products;
  const [tv] = state.productsAPI.tv;
  const [token] = state.token;
  const [callback, setCallback] = state.productsAPI.callback;
  const [loading, setLoading] = useState(false);
  const [isCheck, setIsCheck] = useState(false);

  const [prev, setPrev] = useState(0);
  const [pos, setPos] = useState(3);
  const [showPrev, setShowPrev] = useState(true);
  const [showPos, setShowPos] = useState(true);
  const [posLimit, setPosLimit] = useState(false);

  const [prevTv, setPrevTv] = useState(0);
  const [posTv, setPosTv] = useState(3);
  const [showPrevTv, setShowPrevTv] = useState(true);
  const [showPosTv, setShowPosTv] = useState(true);

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

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const prevFunction = (length) => {
    if (prev > 0) {
      setPrev(prev - 1);
      setPos(pos - 1);
    } else {
      setShowPos(true);
    }
  };
  const prevFunctionTv = (length) => {
    if (prevTv > 0) {
      setPrevTv(prevTv - 1);
      setPosTv(posTv - 1);
    } else {
      setShowPosTv(true);
    }
  };

  const posFunction = (length) => {
    if (pos == length) {
      setShowPos(false);
    } else {
      setPrev(prev + 1);
      setPos(pos + 1);
      if (prev >= 0) {
        setShowPrev(true);
      }
    }
  };
  const posFunctionTv = (length) => {
    if (posTv == length) {
      setShowPosTv(false);
    } else {
      setPrevTv(prevTv + 1);
      setPosTv(posTv + 1);
      if (prevTv >= 0) {
        setShowPrevTv(true);
      }
    }
  };

  useEffect(() => {
    if (prev == 0) {
      setShowPrev(false);
    }

    if (prevTv == 0) {
      setShowPrevTv(false);
    }
  }, [pos, prev, prevTv, posTv]);

  const handleSwipe = (direction) => {
    switch (direction) {
      case "top":
        console.log("top");
        break;
      case "bottom":
        console.log("bottom");
        break;
      case "left":
        console.log("left");
        break;
      case "right":
        console.log("right");
        break;
      default:
        break;
    }
  };

  return (
    <div className="products-1-section">
      <div className="content">
        <div className="first-row">
          <div className="category-presentation">
            <div className="title">
              <img src={Iso} alt="Logo de Planeta Precios Bajos" />

              <h3>Celulares</h3>
            </div>

            <div className="category-img">
              <img
                src="https://res.cloudinary.com/droyfngct/image/upload/v1698687948/PPB/Sections/products-1/products_1_cat_1_womnfq.png"
                alt="Categoría Celulares de los productos de Planeta Precios Bajos"
              />
            </div>

            <Link to="/secSubcategory/65426327b0b64f6ec2a68251">
              <button>Ver</button>
            </Link>
          </div>

          <ReactTouchEvents onSwipe={handleSwipe}>
            <div className="products-presentation">
              {showPrev ? (
                <KeyboardArrowLeftIcon
                  className="chevron-arrow prev"
                  onClick={() => {
                    prevFunction();
                  }}
                />
              ) : (
                ""
              )}

              {phones.map((product, index) => {
                if (index >= prev && index < pos) {
                  return (
                    <ProductCard
                      product={product}
                      delete
                      Product={deleteProduct}
                    />
                  );
                }
              })}

              {showPos ? (
                <KeyboardArrowRightIcon
                  className="chevron-arrow post"
                  onClick={() => {
                    posFunction(phones.length);
                  }}
                />
              ) : (
                ""
              )}
            </div>
          </ReactTouchEvents>
        </div>

        <div className="second-row">
          <div className="category-presentation">
            <div className="category-img">
              <img
                src="https://res.cloudinary.com/droyfngct/image/upload/v1698687948/PPB/Sections/products-1/products_1_cat_2_mlch49.png"
                alt="Categoría Televisores de los productos de Planeta Precios Bajos"
              />
            </div>

            <div className="title">
              <img src={Iso} alt="Logo de Planeta Precios Bajos" />

              <h3>Smart TV</h3>
            </div>

            <Link to="/secSubcategory/6523e4e0651a0ea504f6577c">
              <button>Ver</button>
            </Link>
          </div>

          <div className="products-presentation">
            {showPrevTv ? (
              <KeyboardArrowLeftIcon
                className="chevron-arrow prev"
                onClick={() => {
                  prevFunctionTv();
                }}
              />
            ) : (
              ""
            )}

            {tv.map((product, index) => {
              if (index >= prevTv && index < posTv) {
                return <ProductCard product={product} />;
              }
            })}

            {showPosTv ? (
              <KeyboardArrowRightIcon
                className="chevron-arrow post"
                onClick={() => {
                  posFunctionTv(tv.length);
                }}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products1;
