import { React, useContext, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Mail } from "../headers/icon/mail.svg";
import { ReactComponent as Phone } from "../headers/icon/phone.svg";
import { ReactComponent as Ig } from "../headers/icon/ig.svg";
import { GlobalState } from "../../GlobalState";
import Isologo from "../../assets/img/isologo.png"
import CB from "../../assets/img/CB.png"

function Footer(props) {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;

  return <footer>

    <div className="content">
      

    
      <img src={Isologo} alt="" />
     
   
    

      <div className="columns">
        <div className="column">
            <h3>Secciones</h3>
            <Link to="/">Inicio</Link>
            <Link to="/">Productos</Link>
            <Link to="/">Ofertas</Link>
            <Link to="/">Nosotros</Link>
            <Link to="/">Crédito Planeta</Link>
            <Link to="/">Sucursales</Link>
        </div>

        <div className="column">
            <h3>Categorías</h3>
           {categories.map((category) => {
            return <Link to={`/category/${category.id}`}>{category.name}</Link>
           })}
        </div>

        <div className="column alt">
            <div className="column-separation">
            <h3>Atención al cliente</h3>
            <Link to="/">Inicio</Link>
            </div>

            <div className="column-separation">
            <h3>Casa matriz</h3>
            <p>Belgrano 328</p>
            <p>General Baldisera, Córdoba.</p>
            <p>Argentina.</p>
            
            <div className="column-separation">
              {/* <Mail/> */}
              <Ig/>
            </div>
            </div>
            
           
        </div>
      </div>

        <div className="copyright">

          <p>Planeta Precios Bajos @ 2023 - Todos los derechos reservados</p>
          
          <Link to="https://cristianbazan-dev.github.io/CB/" target="_blank">
          E-commerce creado por <img src={CB} alt="" />

          </Link>
          

          
          
          </div>
    </div>

  </footer>;
}

export default Footer;
