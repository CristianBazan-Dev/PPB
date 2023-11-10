import React, { useContext } from "react";
import "./products-2.css";
import Iso from "../../../../assets/img/iso.png";

import { Link } from "react-router-dom";

import { GlobalState } from "../../../../GlobalState";
import ProductCard from "../productCard/productCard";

function Products2(props) {
  const state = useContext(GlobalState);
  const [electrodomestics, setElectrodomestics] = state.productsAPI.electrodomestics;

  return (
    <div className="products-2-section">
      <div className="content">
        <div className="first-row">
          <div className="category-presentation">
            <div className="title">
              <h3>Electrodomésticos</h3>
              <Link to="/category/6520071d1e845ea315b735f5">
                <button>Ver</button>
              </Link>
            </div>

            <div className="category-img"></div>
          </div>

          <div className="products-presentation">
            {electrodomestics.map((product, index) => {
              if (index < 3) {
                return <ProductCard product={product}   key={product._id}/>;
              }
            })}
          </div>
        </div>

        <div className="second-row">
          <div className="products-presentation">
            {electrodomestics.map((product, index) => {
              if (index >= 3) {
                return <ProductCard product={product}  key={product._id}/>;
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products2;

