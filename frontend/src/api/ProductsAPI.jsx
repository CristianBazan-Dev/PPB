import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductsAPI(props) {
  const [products, setProducts] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [offerProducts, setOfferProducts] = useState([]);
  const [phones, setPhones] = useState([]);
  const [tv, setTv] = useState([])
  const [seeOffers, setSeeOffers] = useState(true);
  const [callback, setCallback] = useState(false);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);

  const [allProducts, setAllProducts] = useState([]);
  const [resultAll, setResultAll] = useState("");

  const [detailProduct, setDetailProduct] = useState([]);

  const params = useParams();

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

    const getAllProducts = async () => {
      const res = await axios.get(`/api/products/`);
      setAllProducts(res.data.products);
    };
    getAllProducts();
  }, [callback, category, subcategory, sort, search, page]);

  useEffect(() => {
    const gettingOfferProducts = async () => {
      try {
        const res = await axios.get(`/api/products/offer?${category}&${sort}`);
        setOfferProducts(res.data);
      } catch (err) {
        alert(err.response.data.msg);
      }
    };
    gettingOfferProducts();
  }, [callback, category, subcategory, sort]);

  useEffect(() => {
    const getPhones = async () => {
      const res = await axios.get(
        `/api/products?limit=${
          page * 8
        }&secSubcategory=65426327b0b64f6ec2a68251&sort=-price`
      );
      setPhones(res.data.products);
      setResult(res.data.result);
    };
    getPhones();


    const getTV = async () => {
      const res = await axios.get(
        `/api/products?limit=${
          page * 8
        }&secSubcategory=6523e4e0651a0ea504f6577c&sort=-price`
      );
      setTv(res.data.products);
      setResult(res.data.result);
    };
    getTV();
  }, [callback, category, subcategory, sort, search, page]);



  return {
    products: [products, setProducts],
    allProducts: [allProducts, setAllProducts],
    categoryProducts: [categoryProducts, setCategoryProducts],
    offerProducts: [offerProducts, setOfferProducts],
    phones: [phones, setPhones],
    tv: [tv, setTv],
    seeOffers: [seeOffers, setSeeOffers],
    callback: [callback, setCallback],
    category: [category, setCategory],
    subcategory: [subcategory, setSubcategory],
    sort: [sort, setSort],
    search: [search, setSearch],
    page: [page, setPage],
    result: [result, setResult],
    resultAll: [resultAll, setResultAll],
  };
}

export default ProductsAPI;
