import { useContext, useEffect, useState } from "react";
import "./blackFriday.css";
import { GlobalState } from "../../../../../GlobalState";

import ProductCard from "../../productCard/productCard";

import { Link } from "react-router-dom";

function BlackFriday(props) {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.productsAPI.products;

  


  return (
    <div className="event-section" style={{ backgroundColor: "#111" }}>
      <div className="content">
        <div className="logo">
          <h1>BLACK FRIDAY</h1>
          <h2>Conozca las mejores ofertas</h2>
        </div>

        <div className="products-container">
          {products.map((product, i) => {
            if (i < 5) {
              return (
                <ProductCard
                  product={product}
                  key={product._id}
                  className="black-product"
                />
              );
            }
          })}
        </div>

        <Link to="/category/6560142575b75739dc410565">
          <button>Ingresar al BLACK FRIDAY</button>
        </Link>
      </div>
    </div>
  );
}

export default BlackFriday;
