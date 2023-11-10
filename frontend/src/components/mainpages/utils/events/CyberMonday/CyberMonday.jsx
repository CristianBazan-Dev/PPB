import React, { useContext, useEffect, useState } from "react";
import "./cyberMonday.css";
import {GlobalState} from "../../../../../GlobalState"

import ProductCard from "../../productCard/productCard"

import Logo from "./graphs/logo.png";
import { Link } from "react-router-dom";

function CyberMonday(props) {
  const state = useContext(GlobalState)
  const [cyberMonday, setCyberMonday] = state.productsAPI.cyberMonday
  const [index, setIndex] = useState(0)


  useEffect(() => {

  }, [index])


  return (
    <div className="cyber-monday-section">

      <div className="content">
        <div className="logo">
          <img src={Logo} alt="" />
        </div>

        <div className="products-container">
          <h2>Disfrute del Cyber Monday con las mejores ofertas!</h2>

          {cyberMonday.map((product, index) => {
            if( index > 0 && index < 4)
            return <ProductCard product={product} className="cyber-product"  key={product._id}/>
          })}

        </div>
        
        <Link to="/category/6547f8cd0b66b722b43e2de7">
        <button>Ver las ofertas del Cyber Monday</button>
          </Link>
      
      </div>

    
    </div>
  );
}

export default CyberMonday;
