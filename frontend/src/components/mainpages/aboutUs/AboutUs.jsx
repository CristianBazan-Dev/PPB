import { React, useLayoutEffect } from "react";
import { Link } from "react-router-dom";

function AboutUs(props) {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="about-page">
      <div className="text-container">
        <img
          src="https://res.cloudinary.com/dkdncsbmz/image/upload/v1684835309/planeta-precios-bajos-e-commerce/Assets/Logo_-_completo_gvucvm.png"
          alt=""
        />

        <h1>Nuestra Historia</h1>

        <h3>
          Por iniciativa de Elian Bortot, nace en el mes de febrero de 2007,
          <Link to="/"> Planetapreciosbajos.com</Link> .
        </h3>

        <p>
          Todo comenzó 7 años antes de esa fecha, tomando experiencia en el
          rubro con comercios familiares. Luego, empezamos a transitar nuestro
          propio camino en una pequeña estructura y funcionando como
          distribuidor mayorista de productos importados y tecnológicos en la
          calle 9 de julio, en la localidad General Baldissera de la provincia
          de Córdoba.
        </p>

        <p>
          En el 2017 frente al crecimiento del rubro, decidimos trasladarnos a
          un local más amplio y céntrico, comercializando artículos para el
          hogar, tecnología y rodados.
        </p>

        <p>
          Desde el año 2019, hasta la actualidad, integramos el grupo de compra
          de electrodomésticos y artículos del hogar, <b>Red del interior</b>.
          <br />
          <br />
          <div className="remark-quote">
            Siempre haciéndole honor a nuestro nombre de fantasía al tener los
            mejores precios, hoy contamos con <b>2 sucursales</b> y más de{" "}
            <b>10 empleados </b>
            en la Provincia Córdoba buscando satisfacer las necesidades de los
            clientes, ofreciendo gran variedad de productos, primeras marcas,
            con facilidades de pago y mínimos requisitos.
          </div>
        </p>

        <p>
          La empresa se caracteriza por su cultura familiar con la que trabaja
          desde hace 40 años en el rubro y el vínculo que mantiene con sus
          clientes garantizando una atención personalizada, seriedad y confianza
          a la hora de realizar una compra. Son 16 años atendiendo y
          satisfaciendo los deseos de las personas
        </p>
      </div>

      <section class="wrapper-gallery" id="index-gallery">
        <div class="gallery-img img1"></div>
        <div class="gallery-img img2"></div>
        <div class="gallery-img img3"></div>
        <div class="gallery-img img4"></div>
        <div class="gallery-img img5"></div>
        <div class="gallery-img img6"></div>
      </section>

      <div class="modal">
        <div class="modal-image"></div>
      </div>

      <img
        src="https://res.cloudinary.com/dkdncsbmz/image/upload/v1684835523/planeta-precios-bajos-e-commerce/Assets/Planeta_voxnx7.png"
        alt=""
        className="final-img"
      />
    </div>
  );
}

export default AboutUs;
