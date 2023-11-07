import React, { useContext } from "react";
import "./categoriestrend.css";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../../GlobalState";

const CategoriesTrend = () => {
  const state = useContext(GlobalState);

  const [category, setCategory] = state.categoriesAPI.category;
  const [subcategory, setSubcategory] = state.categoriesAPI.subcategory;

  const [idCategory, setIdCategory] = state.categoriesAPI.idCategory;
  const [idSubcategory, setIdSubcategory] = state.categoriesAPI.idSubcategory;
  const [idMainCategory, setIdMainCategory] =
  state.categoriesAPI.idMainCategory;

  const handleCategory = (e) => {
    setCategory(`category=${e.target.id}`);
    setSubcategory("");
    setIdCategory(e.target.id);
  };

  const handleSubcategory = (e) => {
    setCategory(`category=${idMainCategory}`);
    setSubcategory(`subcategory=${e.target.id}`);
    setIdSubcategory(e.target.id);
  };

  return (
    <div className="categories-trend-pages">
      <div className="banner-1">
        <img
          src="https://res.cloudinary.com/dkdncsbmz/image/upload/v1683804194/planeta-precios-bajos-e-commerce/bannerThird/Inform%C3%A1tica/informatica_ontyax.png"
          alt=""
        />

        <div className="banner-text">
          <h3>Conectividad</h3>
          <h1>Computación</h1>
          <h4>Lo último en computación y accesorios tecnológicos.</h4>
          <Link to="/subcategory/641364b10d7ccc3e10014fb3" id="641364b10d7ccc3e10014fb3" onClick={() => {setIdMainCategory("6410bba2fce5c87c3b383880");handleSubcategory(); }}>
            <button>Ver</button>
          </Link>
        </div>
      </div>

      <div className="banner-2">
        <img
          src="https://res.cloudinary.com/dkdncsbmz/image/upload/v1683801694/planeta-precios-bajos-e-commerce/bannerThird/Tv/phillips-75_newow6.png"
          alt=""
        />

        <div className="banner-text">
          <h3>Movie time</h3>
          <h1>Televisores</h1>
          <h4>Vea sus series y películas favoritas con nuestras ofertas</h4>
          <Link to="/category/6410dc85719f9cf18d64bb67">
            <button>Ver</button>
          </Link>
        </div>
      </div>

      <div className="banners-mini">
        <div className="banner-mini-1">
          <h1>Telefunken 50" - TK5022UK6 </h1>
          <img
            src="https://res.cloudinary.com/dkdncsbmz/image/upload/v1683825290/planeta-precios-bajos-e-commerce/bannerThird/Tv/telefunken_-_50_-_TK5022UK6_ddeavk.png"
            alt="Telefunken 50"
          />

          <div className="banner-text">
            <Link to="/detail/645268f2e7bddd02c6b7a4c7">
              <Link to="">
                <button>Ver</button>
              </Link>
            </Link>
          </div>
        </div>

        <div className="banner-mini-2">
          <h1>Noblex - 58" - Dbx58x7500</h1>
          <img
            src="https://res.cloudinary.com/dkdncsbmz/image/upload/v1683825294/planeta-precios-bajos-e-commerce/bannerThird/Tv/noblex-58-db58x7500_mf72vw.png"
            alt="Noblex 58"
          />

          <div className="banner-text">
            <Link to="/detail/6452734d0bb44ac9e257e9a3">
              {" "}
              <button>Ver</button>
            </Link>
          </div>
        </div>

        <div className="banner-mini-3">
          <h1>Philips - 70" - 50PUD740677</h1>
          <img
            src="https://res.cloudinary.com/dkdncsbmz/image/upload/v1683826272/planeta-precios-bajos-e-commerce/bannerThird/Tv/Phillips_-_70.png"
            alt="Phillips 70"
          />

          <div className="banner-text">
            <Link to="/detail/6452734d0bb44ac9e257e9a3">
              <button>Ver</button>
            </Link>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default CategoriesTrend;
