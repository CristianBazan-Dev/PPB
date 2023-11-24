import { useState, useEffect, useContext } from "react";

import { GlobalState } from "../GlobalState";

import axios from "axios";

function CategoriesAPI(props) {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [secSubcategories, setSecSubcategories] = useState([]); 
  const [callback, setCallback] = useState(false);

  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [secSubcategory, setSecSubcategory] = useState(""); 

  const [categoryProducts, setCategoryProducts] = useState([]);

  const [idCategory, setIdCategory] = useState("");

  const [idMainCategory, setIdMainCategory] = useState("");
  const [nameMainCategory, setNameMainCategory] = useState("");

  const [idSubcategory, setIdSubcategory] = useState("");
  const [nameSubcategory, setNameSubcategory] = useState("");

  const [idSecSubcategory, setIdSecSubcategory] = useState(""); 
  const [nameSecSubcategory, setNameSecSubcategory] = useState(""); 

  const [cyberMonday, setCyberMonday] = useState(false); 
  const [blackFriday, setBlackFriday] = useState(false); 

  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("");



  useEffect(() => {
    const getSubcategories = async () => {
      const res = await axios.get("/api/subcategory");
      setSubcategories(res.data);
    };
    getSubcategories();

    const getCategories = async () => {
      const res = await axios.get("/api/category");
      setCategories(res.data);
    };
    getCategories();


    
    const getSecSubcategories = async () => {
      const res = await axios.get("/api/secsubcategory");
      setSecSubcategories(res.data);
    };
    getSecSubcategories();

  }, [callback]);

  return {
    categories: [categories, setCategories],
    subcategories: [subcategories, setSubcategories],
    secSubcategories: [secSubcategories, setSecSubcategories], 
    callback: [callback, setCallback],
    categoryProducts: [categoryProducts, setCategoryProducts],
    category: [category, setCategory],
    subcategory: [subcategory, setSubcategory],
    secSubcategory: [secSubcategory, setSecSubcategory], 
    nameMainCategory: [nameMainCategory, setNameMainCategory],
    idMainCategory: [idMainCategory, setIdMainCategory],
    nameSubcategory: [nameSubcategory, setNameSubcategory],
    idCategory: [idCategory, setIdCategory],
    idSubcategory: [idSubcategory, setIdSubcategory],
    idSecSubcategory: [idSecSubcategory, setIdSecSubcategory], 
    nameSecSubcategory: [nameSecSubcategory, setNameSecSubcategory], 
    page: [page, setPage],
    sort: [sort, setSort],

    cyberMonday: [cyberMonday, setCyberMonday], 
    blackFriday: [blackFriday, setBlackFriday]
  };
}

export default CategoriesAPI;
