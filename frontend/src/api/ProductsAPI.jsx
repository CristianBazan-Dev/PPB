import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductsAPI(props) {
  const [products, setProducts] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [offerProducts, setOfferProducts] = useState([]);
  const [phones, setPhones] = useState([]);
  const [tv, setTv] = useState([])
  const [electrodomestics, setElectrodomestics] = useState([])


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

  const [cyberMonday, setCyberMonday] = useState([])


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

    const gettingOfferProducts = async () => {
      try {
        const res = await axios.get(`/api/products/offer?${category}&${sort}`);
        setOfferProducts(res.data);
      } catch (err) {
        alert(err.response.data.msg);
      }
    };
    gettingOfferProducts();


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

    
    const getElectrodomestics = async () => {
      const res = await axios.get(
        `/api/products?limit=${
          page * 8
        }&subcategory=6520072e1e845ea315b735ff&sort=-price`
      );
      setElectrodomestics(res.data.products);
      setResult(res.data.result);
    };
    getElectrodomestics();

    const getCyberMonday = async () => {
      const res = await axios.get(
        `/api/products?limit=${
          page * 8
        }&category=6547f8cd0b66b722b43e2de7&sort=-price`
      );
      setCyberMonday(res.data.products);
      setResult(res.data.result);
    };
    getCyberMonday();

  }, [callback, category, subcategory, sort, search, page]);



  return {
    products: [products, setProducts],
    allProducts: [allProducts, setAllProducts],
    categoryProducts: [categoryProducts, setCategoryProducts],
    offerProducts: [offerProducts, setOfferProducts],
    phones: [phones, setPhones],
    tv: [tv, setTv],
    electrodomestics: [electrodomestics, setElectrodomestics],
    cyberMonday: [cyberMonday, setCyberMonday], 
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
