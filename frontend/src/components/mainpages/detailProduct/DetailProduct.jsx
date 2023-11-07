import React, { useContext, useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

import { GlobalState } from "../../../GlobalState";

import ProductItem from "../utils/productItem/ProductItem";

function DetailProduct() {
  const params = useParams();
  const state = useContext(GlobalState);
  const addCart = state.userAPI.addCart;
  const [products, setProducts] = state.productsAPI.products;
  const [detailProduct, setDetailProduct] = useState([]);
  const [callback, setCallback] = useState(false);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });


  useEffect(() => {
    const getProduct = async () => {
      const res = await axios.get(
        `/api/products/detail/${params.id}`
      ); 
      setDetailProduct(res.data)
    }
    getProduct()
  }, [])


  if (detailProduct.length === 0) return null;

  return (
    <div className="detail-page">
      <div className="detail">
        <img src={detailProduct.images.url} alt={detailProduct.title} />

        <div className="box-detail">
          <div className="row">
            <h6>#id: {detailProduct.product_id}</h6>
            <h2>{detailProduct.title}</h2>
          </div>

          <p>{detailProduct.description}</p>

          <p>{detailProduct.content}</p>

          <div className="details-buy">
            <span className="details-price">${detailProduct.unit_price}</span>

            <h4>
              ${Math.round(detailProduct.unit_price / detailProduct.dues)}
              <div className="dues-style accent">
                x {detailProduct.dues} cuotas sin interés
              </div>
            </h4>
            <Link
              to="/cart"
              className="cart"
              onClick={() => addCart(detailProduct)}
            >
              Comprar
            </Link>
          </div>
        </div>
      </div>

      {/* <div className="related-products">
        <h2 className="title">Productos relacionados</h2>
        <div className="related-products-items">
          {products.map((product) => {
            return product.category === detailProduct.category ? (
              <ProductItem key={product._id} product={product} />
            ) : null;
          })}
        </div>
      </div> */}
    </div>
  );
}

export default DetailProduct;
