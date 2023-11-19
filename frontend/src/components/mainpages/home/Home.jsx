import React, { useContext, Suspense, lazy, useEffect } from "react";

import { GlobalState } from "../../../GlobalState";
import { Link } from "react-router-dom";

import Loading from "../utils/loading/Loading";

import "./home.css";



import CategoriesMenu from "../utils/categories-menu/CategoriesMenu";
import Banner from "../utils/banner/Banner";

import CyberMonday from "../utils/events/CyberMonday/CyberMonday"

import PopularCategories from "../utils/popularCategories/PopularCategories";
import Products1 from "../utils/products-1/Products1";
import Products2 from "../utils/products-2/Products2";
import Assist from "../utils/assist/Assist";
import CategoriesSelection from "../utils/categories-selection/CategoriesSelection";
import Credit from "../utils/credit/Credit";

import { ReactComponent as Whatsapp } from "../../headers/icon/whatsapp.svg";

const NewProducts = lazy(() => import("../utils/newProducts/NewProducts"));

function Products(props) {
  const state = useContext(GlobalState);
  const [search, setSearch] = state.productsAPI.search;
  const [page, setPage] = state.productsAPI.search;
  const scroll = () => {
    window.addEventListener("scroll", reveal);

    function reveal() {
      var reveals = document.querySelectorAll(".reveal");

      for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 10;

        if (revealtop < windowHeight - revealpoint) {
          reveals[i].classList.add("active");
        } else {
          reveals[i].classList.remove("active");
        }
      }
    }
  };

  useEffect(() => {
    setSearch("");
  }, []);

  return (
    <article onScroll={scroll()} className="home">
      {/* Categories  */}
      {/* Banner  */}
      <section>
        <CategoriesMenu />

        <Suspense fallback={<Loading />}>
          <Banner />
        </Suspense>
      </section>

      {/* Events section */}
      {/* <section className="reveal">
        <Suspense fallback={<Loading />}>
        
        </Suspense>
      </section> */}



      {/* Popular categoríes*/}
      <section className="reveal">
        <Suspense fallback={<Loading />}>
          <PopularCategories />
        </Suspense>
      </section>

      {/* Products 1  */}
      <section className="reveal">
        <Products1 />
      </section>

      {/* Assists  */}
      <section className="reveal">
        <Assist />
      </section>

      {/* Products 2  */}
      <section className="reveal">
        <Products2 />
      </section>

      {/* Categories selection  */}
      <section className="reveal">
        <CategoriesSelection />
      </section>

      {/* Credit */}
      <section className="reveal">
        <Credit />
      </section>

      <Link
        to="https://wa.link/uxd2d6"
        target="_blank"
        className="whatsapp-icon-container"
      >
        <Whatsapp />

        <div className="deploy-msg-wpp">
          <p>Contactese a través de Whatsapp</p>
        </div>
      </Link>
    </article>
  );
}

export default Products;
