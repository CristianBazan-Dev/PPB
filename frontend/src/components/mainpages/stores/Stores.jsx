import {React, useLayoutEffect} from "react";

function Stores(props) {
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
});


  return (
    <div className="stores-page">
      <div className="principal-store">
        <div className="info">
          <h1>Casa matriz</h1>
          <h2>Belgrano 328</h2>
          <h3>General Baldissera, Córdoba</h3>
        </div>

        <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3341.416934262306!2d-62.306620124809406!3d-33.124409480888254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95c911a955d92859%3A0xb2d6ff7e4f9fa5d!2sPlanetapreciosbajos.com!5e0!3m2!1ses-419!2sar!4v1679337849840!5m2!1ses-419!2sar"
            width="600"
            height="450"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <div className="store">
        <div className="info">
          <h1>Sucursal</h1>
          <h2>Av. Italia 815</h2>
          <h3>Corral de Bustos, Córdoba</h3>
        </div>

        <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3335.339339082146!2d-62.17211384591915!3d-33.28378429752183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95c9021ff6a10733%3A0x13b6a558f3b0853a!2sAvenida%20Italia%2C%20Corral%20de%20Bustos%2C%20C%C3%B3rdoba!5e0!3m2!1ses-419!2sar!4v1679338641248!5m2!1ses-419!2sar"
            width="600"
            height="450"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <div className="store">
        <div className="info">
          <h1>Sucursal</h1>
          <h2>Maipu 499</h2>
          <h3>Monte Buey, Córdoba</h3>
        </div>

        <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3349.247048565241!2d-62.45914895988432!3d-32.91807050432586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95c9427d9adf68bb%3A0x896498b4d40458c7!2zTWFpcMO6IDQ5OSwgTW9udGUgQnVleSwgQ8OzcmRvYmE!5e0!3m2!1ses-419!2sar!4v1679338776476!5m2!1ses-419!2sar"
            width="600"
            height="450"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Stores;
