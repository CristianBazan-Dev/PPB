import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { GlobalState } from "../../../../GlobalState";

import Menu from "../../../headers/icon/menu.svg";

import "./categoriesMenu.css";

function CategoriesMenu(props) {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;
  const [subcategories] = state.categoriesAPI.subcategories;
  const [secSubcategories] = state.categoriesAPI.secSubcategories;

  const [category, setCategory] = state.categoriesAPI.category;
  const [subcategory, setSubcategory] = state.categoriesAPI.subcategory;

  const [nameMainCategory, setNameMainCategory] =
    state.categoriesAPI.nameMainCategory;

  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showSubcategories, setShowSubcategories] = useState(false);

  const [idCategory, setIdCategory] = state.categoriesAPI.idCategory;
  const [idMainCategory, setIdMainCategory] =
    state.categoriesAPI.idMainCategory;

  const [idSubcategory, setIdSubcategory] = state.categoriesAPI.idSubcategory;

  const [showMainCategoryName, setShowMainCategoryName] = useState(false);

  const [selectedSubcategories, setSelectedSubcategories] = useState([]);

  const [categoryMenu, setCategoryMenu] = useState("");

  const [cyberMonday, setCyberMonday] = state.categoriesAPI.cyberMonday;

  const handleCategory = (e) => {
    setCategory(`category=${e.target.id}`);
    setSubcategory("");
    setIdCategory(e.target.id);
    setShowAllCategories(false);
  };

  const handleSubcategory = (e) => {
    setCategory(`category=${idMainCategory}`);
    setSubcategory(`subcategory=${e.target.id}`);
    setIdSubcategory(e.target.id);
    setShowAllCategories(false);
  };

  return (
    <div className="categories">
      <div className="categories-selection">
        <div className="hamburger-categories">
          <div className="categories-list">
            <div
              className="toggle-option"
              onClick={() => {
                setShowAllCategories(!showAllCategories);
              }}
            >
              <img src={Menu} width="20px" alt="" />
              <h3 className="toggle-title">Categorías</h3>
            </div>

            <div className="categories-titles">
              <Link
                to="/category/6560142575b75739dc410565"

              >
                <h3 className="black-friday-title">BLACK FRIDAY</h3>
              </Link>

              <Link to="/category/6520071d1e845ea315b735f5">
                <h3>Electrodomésticos</h3>
              </Link>

              <Link to="/subcategory/6520068e1e845ea315b735ca">
                <h3>Televisión</h3>
              </Link>

              <Link to="/category/652006821e845ea315b735c0">
                <h3>Tecnología</h3>
              </Link>

              <Link to="/subcategory/652007b61e845ea315b73657">
                <h3>Calefacción</h3>
              </Link>

              <Link to="/subcategory/652006b71e845ea315b735db">
                <h3>Celulares</h3>
              </Link>
            </div>
          </div>

          {showAllCategories ? (
            <div className="all-categories">
              <div className="categories-menu">
                {categories.map((category) => {
                  return (
                    <Link to={`/category/${category._id}`}>
                      <h3
                        onMouseEnter={() => {
                          setShowSubcategories(!showSubcategories);
                          setCategoryMenu(category._id);
                          setNameMainCategory(category.name);
                        }}
                      >
                        {category.name}
                      </h3>
                    </Link>
                  );
                })}
              </div>

              <div className="subcategories">
                <div className="name-mainCategory">
                  {categories.map((category) => {
                    if (category._id == categoryMenu) {
                      return <>{category.name}</>;
                    }
                  })}
                </div>
                {subcategories.map((subcategory) => {
                  if (subcategory.category == categoryMenu) {
                    return (
                      <div className="subcategory">
                        <Link to={`/subcategory/${subcategory._id}`}>
                          <h3>{subcategory.name}</h3>
                        </Link>

                        {secSubcategories.map((secSubcategory) => {
                          if (secSubcategory.subcategoryId == subcategory._id) {
                            return (
                              <Link
                                to={`/secSubcategory/${secSubcategory._id}`}
                              >
                                <p>{secSubcategory.name}</p>
                              </Link>
                            );
                          }
                        })}
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default CategoriesMenu;
