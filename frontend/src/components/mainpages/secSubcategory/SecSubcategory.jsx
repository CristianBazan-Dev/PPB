import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../category/category.css";

import axios from "axios";
import { GlobalState } from "../../../GlobalState";

import ProductsCard from "../utils/productCard/productCard";
import ProductItem from "../utils/productItem/ProductItem";
import Loading from "../utils/loading/Loading";
import CategoriesMenu from "../utils/categories-menu/CategoriesMenu";
import LoadMore from "../home/LoadMore";

import { ReactComponent as FiltersIcon } from "../../headers/icon/filters-2.svg";

import Iso from "../../../assets/img/iso.png";

function SecSubcategory(props) {
  const state = useContext(GlobalState);
  const params = useParams();

  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;

  const [categoryProducts, setCategoryProducts] =
    state.categoriesAPI.categoryProducts;

  const [categories, setCategories] = state.categoriesAPI.categories;
  const [subcategories, setSubcategories] = state.categoriesAPI.subcategories;
  const [secSubcategories, setSecSubcategories] =
    state.categoriesAPI.secSubcategories;

  const [nameMainCategory, setNameMainCategory] =
    state.categoriesAPI.nameMainCategory;
  const [nameSubcategory, setNameSubcategory] =
    state.categoriesAPI.nameSubcategory;
  const [nameSecSubcategory, setSecSubcategoryName] =
    state.categoriesAPI.nameSecSubcategory;

  const [idMainCategory, setIdMainCategory] =
    state.categoriesAPI.idMainCategory;

  const [idCategory, setIdCategory] = state.categoriesAPI.idCategory;
  const [idSubcategory, setIdSubcategory] = state.categoriesAPI.idSubcategory;
  const [idSecSubcategory, setIdSecSubcategory] =
    state.categoriesAPI.idSecSubcategory;

  const [sort, setSort] = state.categoriesAPI.sort;

  const [loading, setLoading] = useState(false);
  const [showFiltersMenu, setShowFiltersMenu] = useState(false);
  const [category, setCategory] = state.categoriesAPI.category;
  const [subcategory, setSubcategory] = state.categoriesAPI.subcategory;
  const [secSubcategory, setSecSubcategory] =
    state.categoriesAPI.secSubcategory;

  const [callback, setCallback] = state.categoriesAPI.callback;
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);

  useEffect(() => {
    setSecSubcategory(`secSubcategory=${params.id}`);
    setIdSecSubcategory(params.id);

    const getCategoryProducts = async () => {
      const res = await axios.get(
        `/api/products?limit=${page * 12}&${secSubcategory}&${sort}`
      );

      setCategoryProducts(res.data.products);
      setResult(res.data.result);
    };
    getCategoryProducts();
  }, [params.id, callback, category, subcategory, secSubcategory, page, sort]);

  useEffect(() => {
    const filtringCat = categories.filter((cat) => {
      if (cat._id == idCategory) {
        setNameMainCategory(cat.name);
      }
    });

    const filtringSubCat = subcategories.filter((subcat) => {
      if (subcat._id == idSubcategory) {
        setIdCategory(subcat.category);
        setNameSubcategory(subcat.name);
      }
    });

    const filtringSecSubcat = secSubcategories.filter((secSubcat) => {
      if (secSubcat._id == idSecSubcategory) {
        setIdMainCategory(secSubcat.mainCategoryId);
        setIdSubcategory(secSubcat.subcategoryId);

        setIdSecSubcategory(secSubcat._id);
        setSecSubcategoryName(secSubcat.name);
      }
    });
  });

  const handleCategory = (e) => {
    setCategory(`category=${e.target.id}`);
    setIdCategory(e.target.id);
    setSubcategory("");
  };

  const handleSubcategory = (e) => {
    setCategory(`category=${idMainCategory}`);
    setSubcategory(`subcategory=${e.target.id}`);
    setIdSubcategory(e.target.id);
  };

  return (
    <div className="categories-section-page">
      <CategoriesMenu />

      {secSubcategories.map((secSubcat) => {
        if (secSubcat._id == idSecSubcategory) {
          return (
            <div className="category-title">
              {categories.map((cat) => {
                if (cat._id === secSubcat.mainCategoryId) {
                  return (
                    <div className="text">
                      <h4>{cat.name} - </h4>
                      {subcategories.map((subcat) => {
                        if (subcat._id == secSubcat.subcategoryId)
                          return <h4>{subcat.name}</h4>;
                      })}
                    </div>
                  );
                }
              })}

              <div className="title">
                <img src={Iso} alt="" />
                <h1>{secSubcat.name}</h1>;
              </div>
            </div>
          );
        }
      })}

      <div className="categories-links">
        <Link
          to={`/category/${idCategory}`}
          id={idMainCategory}
          onClick={handleCategory}
        >
          {nameMainCategory} >{" "}
          <Link to={`/subcategory/${idSubcategory}`}>{nameSubcategory}</Link> >
          <Link to={`/secSubcategory/${idSecSubcategory}`}>
            {nameSecSubcategory}
            
          </Link>
        </Link>{" "}
      </div>

      <div className="products-categories-page">
        {categoryProducts.length == 0 ? (
          <Loading className="loading-categories" />
        ) : (
          <div className="categorySelected-page">
            <div className="filters-responsive-category">
              <h3>Filtros</h3>
              <div className="filters-responsive">
                <div className="filters-responsive-item">
                  <label>Precio: mayor a menor</label>
                  <input
                    type="radio"
                    name="sort"
                    value="sort=-unit_price"
                    onChange={(e) => setSort(e.target.value)}
                  />
                </div>

                <div className="filters-responsive-item">
                  <label>Precio: menor a mayor</label>
                  <input
                    type="radio"
                    name="sort"
                    value="sort=unit_price"
                    onChange={(e) => setSort(e.target.value)}
                  />
                </div>

                <div className="filters-responsive-item">
                  <label>Novedades</label>
                  <input
                    type="radio"
                    name="sort"
                    value=""
                    onChange={(e) => setSort(e.target.value)}
                  />
                </div>

                <div className="filters-responsive-item">
                  <label>Más antigüos</label>
                  <input
                    type="radio"
                    name="sort"
                    value="sort=oldest"
                    onChange={(e) => setSort(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="filters-category">
              <div
                className="filters-icon"
                onClick={() => {
                  setShowFiltersMenu(!showFiltersMenu);
                }}
              >
                <FiltersIcon className="icon" />
                <h3>Filtros</h3>
              </div>

              <div
                className={
                  showFiltersMenu === true
                    ? "filters-menu active"
                    : "filters-menu"
                }
              >
                <div className="sorting-options">
                  .
                  <div className="sorting-item">
                    <Link to="/products">
                      <h3>Todos los productos</h3>
                    </Link>
                  </div>
                  <div className="sorting-item">
                    <Link to="/offers">
                      <h3>Ofertas</h3>
                    </Link>
                  </div>
                  <div className="sorting-item">
                    <h3>Precio</h3>

                    <h5
                      id="sort=unit_price"
                      onClick={(e) => {
                        setSort(e.target.id);
                      }}
                    >
                      Menor a mayor
                    </h5>

                    <h5
                      id="sort=-unit_price"
                      onClick={(e) => {
                        setSort(e.target.id);
                      }}
                    >
                      Mayor a menor
                    </h5>
                  </div>
                  <div className="sorting-item">
                    <h3>Antigüedad</h3>
                    <h5
                      id=""
                      onClick={(e) => {
                        setSort(e.target.id);
                      }}
                    >
                      Novedades
                    </h5>
                    <h5
                      id="sort=oldest"
                      onClick={(e) => {
                        setSort(e.target.id);
                      }}
                    >
                      Antigüo
                    </h5>
                  </div>
                </div>

                {/* <span>Sort by: </span>
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                }}
              >
                <option value="">Newest</option>
                <option value="sort=oldest">Oldest</option>
                <option value="sort=-sold">Best sales</option>
                <option value="sort=-unit_price">Price: High-Low</option>
                <option value="sort=unit_price">Price: Low-High</option>
              </select> */}
              </div>
            </div>

            <div className="products-category">
              {categoryProducts.map((product) => {
                return (
                  <Link to={`/detail/${product._id}`}>
                    <ProductsCard
                      key={product._id}
                      product={product}
                      isAdmin={isAdmin}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        )}
        <div className="load_more">
          {result < page * 12 ? (
            ""
          ) : (
            <button onClick={() => setPage(page + 1)}>Cargar más</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SecSubcategory;
