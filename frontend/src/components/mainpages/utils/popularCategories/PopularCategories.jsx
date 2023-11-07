import React, { useContext } from "react";
import "./popularCategories.css";
import { GlobalState } from "../../../../GlobalState";
import { Link } from "react-router-dom";

function PopularCategories(props) {
  const state = useContext(GlobalState);
  const [categories, setCategories] = state.categoriesAPI.categories;


  return (
    <div className="popular-categories-section">
      <div className="content">
        <h3>Categorías populares</h3>

        <div className="categories-circles">
          
          <Link to="/">
            <div className="category-item">
              <div className="presentation"></div>
              <img
                src="https://res.cloudinary.com/droyfngct/image/upload/v1698783536/PPB/Sections/categories-selection/smart_tv_gngqor.png"
                alt=""
              />
              <h3>Smart TV</h3>
            </div>
          </Link>

          <Link to="/">
            <div className="category-item">
              <div className="presentation"></div>
              <img
                src="https://res.cloudinary.com/droyfngct/image/upload/v1698783535/PPB/Sections/categories-selection/linea_blanca_v7gg5z.png"
                alt=""
              />
              <h3>Línea Blanca</h3>
            </div>
          </Link>

          <Link to="/">
            <div className="category-item">
              <div className="presentation"></div>

              <img
                src="https://res.cloudinary.com/droyfngct/image/upload/v1698783535/PPB/Sections/categories-selection/celulares_sukghw.png"
                alt=""
              />

              <h3>Celulares</h3>
            </div>
          </Link>

          <Link to="/">
            <div className="category-item">
              <div className="presentation"></div>

              <img
                src="https://res.cloudinary.com/droyfngct/image/upload/v1698783535/PPB/Sections/categories-selection/hogar_mueble_jardin_ejk6wy.png"
                alt=""
              />

              <h3>Hogar, muebles y jardín</h3>
            </div>
          </Link>

          <Link to="/">
            <div className="category-item">
              <div className="presentation"></div>

              <img
                src="https://res.cloudinary.com/droyfngct/image/upload/v1698783535/PPB/Sections/categories-selection/calefaccion_o92pco.png"
                alt=""
              />

              <h3>Calefacción</h3>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
}

export default PopularCategories;
