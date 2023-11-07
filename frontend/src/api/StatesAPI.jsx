import { useState, useEffect } from "react";
import axios from "axios";

function StatesAPI(props) {
  const [states, setStates] = useState([]);

  useEffect(() => {
    const getStates = async () => {
      const res = await axios.get(`/api/products/shipping`);
      setStates(res.data);
    };
    getStates();
  }, []);

  return {
    states: [states, setStates],
  };
}

export default StatesAPI;
