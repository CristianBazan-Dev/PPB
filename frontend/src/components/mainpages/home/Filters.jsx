import React, { useContext, useState } from "react";
import axios from "axios";

import { GlobalState } from "../../../GlobalState";

import { ReactComponent as Filtring } from "../../headers/icon/filters-2.svg";

function Filters() {
  const state = useContext(GlobalState);

  const [categories] = state.categoriesAPI.categories;
  const [subcategories] = state.categoriesAPI.subcategories;
  const [category, setCategory] = state.productsAPI.category;
  const [subcategory, setSubcategory] = state.productsAPI.subcategory;
  const [sort, setSort] = state.productsAPI.sort;
  const [search, setSearch] = state.productsAPI.search;
  const [seeOffers, setSeeOffers] = state.productsAPI.seeOffers;

  const [categoriesId, setCategoriesId] = useState([]);

  const handleCategory = (e) => {
    setCategory(e.target.value);
    setSeeOffers(false);
    setSearch("");
  };

  const handleSubcategory = (e) => {
    setSubcategory(e.target.value);
    setSearch("");
  };

  const deployFilterMenu = () => {
    const filtringOptionsMenu = document.querySelector(".filtring-options");
    const filterMenuShadow = document.querySelector(".filter-menu");
    filtringOptionsMenu.classList.toggle("active");
    filterMenuShadow.classList.toggle("active");
  };

  const deploySortFilter = () => {
    const sortMenuDeployment = document.querySelector(".sort-container");
    const sortBars = document.getElementById("sortBars");
    const categoryMenuDeployment = document.querySelector(
      ".categories-container"
    );
    const catBars = document.getElementById("catBars");

    catBars.classList.remove("active");
    categoryMenuDeployment.classList.remove("active");
    sortBars.classList.toggle("active");
    sortMenuDeployment.classList.toggle("active");

    window.scrollTo(0, 800);
  };

  const deployCatFilter = () => {
    const categoryMenuDeployment = document.querySelector(
      ".categories-container"
    );
    const catBars = document.getElementById("catBars");
    const sortMenuDeployment = document.querySelector(".sort-container");
    const sortBars = document.getElementById("sortBars");

    sortMenuDeployment.classList.remove("active");
    sortBars.classList.remove("active");
    catBars.classList.toggle("active");
    categoryMenuDeployment.classList.toggle("active");
    window.scrollTo(0, 800);
  };

  const renderOffers = (boolean) => {
    setSeeOffers(true);
  };

  const showResponsiveSelection = () => {
    const responsiveMenuRow = document.querySelector(".row");
    const responsiveFiltRow = document.querySelector(".resp-filt");

    responsiveMenuRow.classList.toggle("active");
    responsiveFiltRow.classList.toggle("active");
  };

  const showCatGallery = () => {
    let counter = 1;
    setInterval(function () {
      document.getElementById("radio-cat" + counter).checked = true;
      counter++;
      if (counter > categories.length) {
        counter = 1;
      }
    }, 6000);
  };



  return (
    <>
      <div className="category">
        <div className="cat-gallery-container">
          {categories.map((category) => {
            return (
              <div
                className="cat-slide"
                key={category._id}
                id={category._id}
                onClick={handleCategory}
              >
                <input type="radio" value={"category=" + category._id} />
                <img
                  value={"category=" + category._id}
                  src={category.images.url}
                  onClick={(e) => {e.target.classList.toggle('active')}}
                />
                <h3>{category.name}</h3>
              </div>
            );
          })}
        </div>


        <div className="filter-responsive-menu">
          <Filtring width="30px"  onClick={showResponsiveSelection} className="filtring-resp-icon" />

          <div className="row">
            <h3>Categorías</h3>
            <select name="category" value={category} onChange={handleCategory}>
              <option value="">Todos los productos</option>

              {categories.map((category) => {
                return (
                  <option value={"category=" + category._id} key={category._id}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="row resp-filt">
            <h3>Filtros </h3>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="">Nuevo</option>
              <option value="sort=oldest">Antigüó</option>
              <option value="sort=-sold">Más vendido</option>
              <option value="sort=-price">Precio: Alto-bajo</option>
              <option value="sort=price">Precio: Bajo-alto</option>
            </select>
          </div>
        </div>

        <div className="filter-menu">
          <Filtring
            width="40px"
            className="filtring"
            onClick={deployFilterMenu}
          />

          <div className="filtring-options">
            {/* Filtring categories  */}

            <div className="sort">
              <h3
                value=""
                onClick={handleCategory}
                onMouseOver={handleSubcategory}
              >
                Todos los productos
              </h3>
              <br />
              <h3 onClick={renderOffers}>Ofertas</h3>
              <br />

              <div className="title" id="catSelect" onClick={deployCatFilter}>
                <h3>Categorías</h3>
                <div className="bars" id="catBars">
                  <div className="bar-1"></div>
                  <div className="bar-2"></div>
                </div>
              </div>

              <div className="categories-container">
                {categories.map((category) => {
                  return (
                    <>
                      <button
                        value={"category=" + category._id}
                        src={category.images.url}
                        onClick={handleCategory}
                        key={category._id}
                      >
                        {category.name}
                      </button>

                      {subcategories.map((subcategory) => {
                        if (subcategory.category == category._id) {
                          return (
                            <>
                              <ol className="subcategories-menu">
                                <button
                                  className="subcategory-buttons"
                                  value={"subcategory=" + subcategory._id}
                                  onClick={handleSubcategory}
                                  key={subcategory._id}
                                >
                                  {subcategory.name}
                                </button>
                              </ol>
                            </>
                          );
                        }
                      })}
                    </>
                  );
                })}
              </div>
            </div>

            {/* Sorting products  */}
            <div className="sort">
              <div className="title" id="sortSelect" onClick={deploySortFilter}>
                <h3>Filtros</h3>
                <div className="bars" id="sortBars">
                  <div className="bar-1"></div>
                  <div className="bar-2"></div>
                </div>
              </div>

              <div className="sort-container">
                <button
                  name="sort"
                  value=""
                  onClick={(e) => setSort(e.target.value)}
                >
                  Nuevo
                </button>

                <button
                  name="sort"
                  value="sort=oldest"
                  onClick={(e) => setSort(e.target.value)}
                >
                  Más antigüo
                </button>

                <button
                  name="sort"
                  value="sort=-sold"
                  onClick={(e) => setSort(e.target.value)}
                >
                  Más vendido
                </button>

                <button
                  name="sort"
                  value="sort=-unit_price"
                  onClick={(e) => setSort(e.target.value)}
                >
                  Precio: Más caro
                </button>

                <button
                  name="sort"
                  value="sort=unit_price  "
                  onClick={(e) => setSort(e.target.value)}
                >
                  Precio: Más barato
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Filters;
