import { React, useState, useEffect } from "react";
import axios from "axios";

function USDAPI(props) {
  const [usd, setUsd] = useState(0);
  const [usdBlue, setUsdBlue] = useState(0);

  useEffect(() => {
    const getDollarValue = async (e) => {
      try {
        const res = await axios.get("https://api.bluelytics.com.ar/v2/latest");
        setUsd(res.data.oficial.value_avg);
        setUsdBlue(res.data.blue.value_avg);
      } catch (err) {
        alert(err.message);
      }
    };

    getDollarValue();
  });

  return {
    usd: [usd, setUsd],
    usdBlue: [usdBlue, setUsdBlue],
  };
}

export default USDAPI;
