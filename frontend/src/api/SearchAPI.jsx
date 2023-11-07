import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function SearchAPI(props) {
  const [products, setProducts] = useState([]);
  const [callback, setCallback] = useState(false);
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get(
        `/api/products?limit=${
          page * 6
        }&${category}&${sort}&title[regex]=${search}`
      );
      setProducts(res.data.products);
      setResult(res.data.result);
    };
    getProducts();
  }, [callback, category, subcategory, sort, search, page]);

  return {
    products: [products, setProducts],
    callback: [callback, setCallback],
    sort: [sort, setSort],
    search: [search, setSearch],
    page: [page, setPage],
    result: [result, setResult],
  };
}

export default SearchAPI;
