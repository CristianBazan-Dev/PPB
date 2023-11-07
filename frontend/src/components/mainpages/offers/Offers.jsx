import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./offers.css";

import axios from "axios";
import { GlobalState } from "../../../GlobalState";

import ProductItem from "../utils/productItem/ProductItem";
import Loading from "../utils/loading/Loading";
import CategoriesMenu from "../utils/categories-menu/CategoriesMenu";
import LoadMore from "../home/LoadMore";

import { ReactComponent as FiltersIcon } from "../../headers/icon/filters-2.svg";

function Offers(props) {
  const state = useContext(GlobalState);

  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;

  const [search, setSearch] = state.productsAPI.search;
  const [page, setPage] = state.productsAPI.page;
  const [sort, setSort] = state.productsAPI.sort;

  const [offerProducts, setOfferProducts] = state.productsAPI.offerProducts;

  const [resultAll, setResultAll] = state.productsAPI.resultAll;
  const [callback, setCallback] = useState(false);

  const [loading, setLoading] = useState(false);
  const [showFiltersMenu, setShowFiltersMenu] = useState(false);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div>
      <CategoriesMenu />
      <h1 className="offers-title">Ofertas</h1>

      {offerProducts.length == 0 ? (
        <Loading className="loading-categories" />
      ) : (
        <div className="allProducts-page">
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

          <div className="filters-allproducts">
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
                <div className="sorting-item">
                  <Link to="/products">
                    <h3>Todos los productos</h3>
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
            {offerProducts.map((product) => {
              return (
                <ProductItem
                  key={product._id}
                  product={product}
                  isAdmin={isAdmin}
                />
              );
            })}

            <LoadMore />
          </div>
        </div>
      )}
    </div>
  );
}

export default Offers;
