import React from "react";
import "./categoriesSelection.css";
import { Link } from "react-router-dom";
function CategoriesSelection(props) {
  return (
    <div className="categories-selection-section">
      <div className="content">
        <div className="first-row">
          
          <Link to="/category/652007931e845ea315b7363b">
            <div className="category-item">
              <div className="title">
                <h3>Climatización</h3>
              </div>

              <div className="info">
                <button>Ver</button>
              </div>
            </div>
          </Link>
        </div>

        <div className="second-row">
          <Link
            to="/subcategory/6520072e1e845ea315b735ff"
            className="category-item"
          >
            <div className="title">
              <h3>Cocina</h3>
            </div>

            <div className="info">
              <button>Ver</button>
            </div>
          </Link>

          <Link
            to="/subcategory/6520080e1e845ea315b736a0"
            className="category-item"
          >
            <div className="title">
              <h3>Jardín y aire libre</h3>
            </div>

            <div className="info">
              <button>Ver</button>
            </div>
          </Link>

          <Link
            to="/subcategory/6520077c1e845ea315b73629"
            className="category-item"
          >
            <div className="title">
              <h3>Cuidado personal</h3>
            </div>

            <div className="info">
              <button>Ver</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CategoriesSelection;