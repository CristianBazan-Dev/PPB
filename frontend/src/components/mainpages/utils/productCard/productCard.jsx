import React from "react";
import BtnRender from "../productItem/BtnRender";
import "./productCard.css";
import BtnCart from "./BtnCart";
import { Link } from "react-router-dom";

function productCard({ product, deleteProduct, isAdmin }) {
  return (
    <Link to={`/detail/${product._id}`}>
      <div className="product-card-item">
        <div className="container">
          <p className="brand">{product.brand}</p>

          <img src={product.images.url} alt="" />

          <div className="info">
            <h4 className="title">{product.title}</h4>
            <h3 className="full-price">${product.unit_price}</h3>
            <h5 className="dues">
              {product.dues} cuotas sin interes de $
              {Math.floor(product.unit_price / product.dues)}
            </h5>
          </div>

          <BtnCart product={product} deleteProduct={deleteProduct} />
        </div>
      </div>
    </Link>
  );
}

export default productCard;
