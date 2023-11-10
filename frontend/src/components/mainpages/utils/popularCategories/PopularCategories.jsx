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
          
          <Link to="/secSubcategory/6523e4e0651a0ea504f6577c">
          <div className="category-item">
            <img src="https://res.cloudinary.com/droyfngct/image/upload/v1699245612/PPB/Sections/popular-categories/1_vwkhpn.png" alt="" />
         
            <h3>Smart TV</h3>
          </div>
          </Link>

          <Link to="/subcategory/652007891e845ea315b73632">
            <div className="category-item">
            <img src="https://res.cloudinary.com/droyfngct/image/upload/v1699245613/PPB/Sections/popular-categories/2_njr8ur.png" alt="" />
         
              <h3>Línea Blanca</h3>
            </div>
          </Link>

          <Link to="/secSubcategory/65426327b0b64f6ec2a68251">
            <div className="category-item">
          
              <img src="https://res.cloudinary.com/droyfngct/image/upload/v1699245613/PPB/Sections/popular-categories/3_tkaxkm.png" alt="" />
              <h3>Celulares</h3>
            </div>
          </Link>

          <Link to="/category/652007c11e845ea315b73660">
            <div className="category-item">
              
          <img src="https://res.cloudinary.com/droyfngct/image/upload/v1699245613/PPB/Sections/popular-categories/5_jepkyn.png" alt="" />
         
              <h3>Hogar, muebles y jardín</h3>
            </div>
          </Link>

          <Link to="/category/652007931e845ea315b7363b">
            <div className="category-item">
              <img src="https://res.cloudinary.com/droyfngct/image/upload/v1699245613/PPB/Sections/popular-categories/4_czue5h.png" alt="" />

              <h3>Climatización</h3>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
}

export default PopularCategories;
