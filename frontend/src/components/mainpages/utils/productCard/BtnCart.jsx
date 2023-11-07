import React, { useContext } from "react";
import { GlobalState } from "../../../../GlobalState";
import { ReactComponent as CartProduct } from "../../../headers/icon/cartProduct.svg";
import { Link } from "react-router-dom";

function BtnCart({ product, deleteProduct }) {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;
  const addCart = state.userAPI.addCart;

  return (
    <>
      {isAdmin ? (
        <div className="double-btn">
          <Link className="edit-btn" to={`/edit_products/${product._id}`}>
            Editar
          </Link>
          <div className="delete-btn"  onClick={() => deleteProduct(product._id, product.images.public_id)}>Eliminar</div>
        </div>
      ) : (
        <div
          className="product-card-button"
          onClick={() => {
            addCart(product);
          }}
        >
          <Link to={`/detail/${product._id}`}>
            <CartProduct />
            Añadir al carrito
          </Link>
        </div>
      )}
    </>
  );
}

export default BtnCart;
