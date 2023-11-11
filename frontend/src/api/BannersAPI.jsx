import React, { useState, useEffect } from "react";

import axios from "axios";

function BannersAPI(props) {
  const [banners, setBanners] = useState([]);

  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getBanners = async () => {
      const res = await axios.get("/api/banners");
      setBanners(res.data);
    };
    getBanners();
  }, [callback]);

  return {
    banners: [banners, setBanners],
  };
}

export default BannersAPI;
