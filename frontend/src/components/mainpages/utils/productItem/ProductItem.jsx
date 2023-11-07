import React from "react";
import { Link } from "react-router-dom";
import BtnRender from "./BtnRender";

function ProductItem({ product, isAdmin, deleteProduct, handleCheck }) {
  return (
    <>
      <div className="product_card">
        {isAdmin && (
          <input
            type="checkbox"
            checked={product.checked}
            onChange={() => handleCheck(product._id)}
          />
        )}

        <img src={product.images.url} alt="" />

        <div className="product_box">
          <h2 title={product.title}>{product.title}</h2>
          {product.offer ? (
            <>
              <div className="offer-tag">
                <Link to="/about">
                  <img src="https://res.cloudinary.com/dhbvri4ni/image/upload/v1679659694/planeta-precios-bajos-e-commerce/Assets/Logo-icon_little_wmlsic.png" />
                </Link>
                Oferta
              </div>
              <div className="offer-prices">
                <span>${product.old_price}</span>
                <h3>${product.unit_price}</h3>
                {product.dues >= 3 ? (
                  <div className="dues-style">
                    <h4>
                      ${Math.round(product.unit_price / product.dues)}{" "}
                      <div className="dues-style accent">
                        {" "}
                        x {product.dues} cuotas sin interés
                      </div>
                    </h4>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </>
          ) : (
            <>
              <h3>${product.unit_price}</h3>
              {product.dues >= 3 ? (
                <div className="dues-style">
                  <h4>
                    ${Math.round(product.unit_price / product.dues)}{" "}
                    <div className="dues-style accent">
                      {" "}
                      x {product.dues} cuotas sin interés
                    </div>
                  </h4>
                </div>
              ) : (
                ""
              )}
            </>
          )}

          <p>{product.description}</p>

          <BtnRender product={product} deleteProduct={deleteProduct} />
        </div>
      </div>
    </>
  );
}

export default ProductItem;
