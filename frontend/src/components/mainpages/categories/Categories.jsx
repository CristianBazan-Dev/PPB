import React, { useState, useContext } from "react";
import axios from "axios";

import { GlobalState } from "../../../GlobalState";

import Loading from "../utils/loading/Loading";

function Categories(props) {
  const state = useContext(GlobalState);

  const [token] = state.token;
  const [categories] = state.categoriesAPI.categories;
  const [subcategories] = state.categoriesAPI.subcategories;
  const [secSubcategories] = state.categoriesAPI.secSubcategories;

  const [callback, setCallback] = state.categoriesAPI.callback;
  const [isAdmin] = state.userAPI.isAdmin;
  const [isSuperAdmin] = state.userAPI.isSuperAdmin;

  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  
  const [secSubcategory, setSecSubcategory] = useState("");

  const [categoryId, setCategoryId] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState(""); 

  const [onEdit, setOnEdit] = useState("");
  const [id, setID] = useState("");

  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState(false);

  const createCategory = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.put(
          `/api/category/${id}`,
          { name: category, images: images },
          {
            headers: { Authorization: token },
          }
        );

        alert(res.data.msg);
      } else {
        const res = await axios.post(
          "/api/category",
          { name: category, images },
          {
            headers: { Authorization: token },
          }
        );

        alert(res.data.msg);
      }
      setOnEdit(false);
      setCategory("");
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const editCategory = async (id, name) => {
    setID(id);
    setCategory(name);
    setOnEdit(true);
  };

  const deleteCategory = async (id) => {
    try {
      const res = await axios.delete(`/api/category/${id}`, {
        headers: { Authorization: token },
      });
      alert(res.data.msg);
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin || !isSuperAdmin) return alert("No eres administrador/a");
      const file = e.target.files[0];

      if (!file) return alert("No se ha seleccionado ningún archivo.");

      if (file.size > 1024 * 1024)
        return alert("El archivo es demasiado pesado.");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return alert(
          "Formato no soportado. Seleccione una imagen en .jpg o .png"
        );

      let formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      const res = await axios.post("/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      setLoading(false);
      setImages(res.data);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleDestroy = async () => {
    try {
      if (!isAdmin || !isSuperAdmin) return alert("No eres administrador/a");

      setLoading(true);
      await axios.post(
        "/api/destroy",
        { public_id: images.public_id },
        {
          headers: { Authorization: token },
        }
      );
      setLoading(false);
      setImages(false);
    } catch (err) {
      alert(err.response.msg);
    }
  };
  const styleUpload = {
    display: images ? "block" : "none",
  };

  const onCategoryChange = async (e) => {
    const { category, value } = e.target;
    setSelectedCategory(value);
    getCategory(value);
  };

  const getCategory = async (value) => {
    try {
      const res = await axios.post(
        "/api/subcategory/category",
        { category: value },
        {
          headers: { Authorization: token },
        }
      );
      setCategoryId(res.data.category);
      setSelectedCategory(res.data.mainCategoryName);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const onSubcategoryChange = async (e) => {
    const { subcategory, value } = e.target;
    setSubcategory(value);
  };

  const createSubcategory = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.put(
          `/api/subcategory/${id}`,
          {
            name: subcategory,
            images: images,
          },
          {
            headers: { Authorization: token },
          }
        );

        alert(res.data.msg);
      } else {
        const res = await axios.post(
          "/api/subcategory",
          {
            category: categoryId,
            mainCategoryName: selectedCategory,
            name: subcategory,
          },
          {
            headers: { Authorization: token },
          }
        );

        alert(res.data.msg);
      }
      setOnEdit(false);
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const editSubcategory = async (id, name) => {
    setID(id);
    setSubcategory(name);
    setOnEdit(true);
  };

  const deleteSubcategory = async (id) => {
    try {
      const confirmation = window.confirm("Se eliminará la subcategoría");
      if (confirmation) {
        const res = await axios.delete(`/api/subcategory/${id}`, {
          headers: { Authorization: token },
        });
        alert(res.data.msg);
        setCallback(!callback);
      }
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const deleteAllSubcategories = async (id) => {
    try {
      const confirmation = window.confirm(
        "Se eliminarán todas las subcategorías de esta categoría"
      );
      if (confirmation) {
        const res = await axios.delete(`/api/subcategory/${id}/deleteAll`, {
          headers: { Authorization: token },
        });
        alert(res.data.msg);
        setCallback(!callback);
      }
    } catch (err) {
      alert(err.response.data.msg);
    }
  };


  const createThirdCategory = async (e) => {
    e.preventDefault(); 
    setSecSubcategory("")
    const res = await axios.post(
      "/api/secSubcategory",
      {mainCategoryId: selectedCategory, subcategoryId: selectedSubcategory, name: secSubcategory},
      {
        headers: { Authorization: token },
      }
    );

    alert(res.data.msg);
   
  };


  return (
    <div className="categories-page">
      <div className="categories">
        <div className="create-category">
          <form onSubmit={createCategory}>
            <label htmlFor="category">Nueva categoría</label>
            <input
              type="text"
              name="category"
              value={category}
              required
              onChange={(e) => setCategory(e.target.value)}
            />

            <div className="upload-cat-img">
              <input
                type="file"
                name="file"
                id="file_cat_up"
                onChange={handleUpload}
              />
              {loading ? (
                <div id="file_cat_img">
                  <Loading />
                </div>
              ) : (
                <div id="file_cat_img" style={styleUpload}>
                  <img src={images ? images.url : ""} alt="" />
                  <span onClick={handleDestroy}>X</span>
                </div>
              )}
            </div>

            <button type="submit">{onEdit ? "Actualizar" : "Crear"}</button>
          </form>

          {/* Subcategory  */}

          <form action="" onSubmit={createSubcategory}>
            <label htmlFor="category">Nueva sub-categoría</label>

            <label htmlFor="">Categoría principal</label>
            <select name="category" id="" onChange={onCategoryChange}>
              <option hidden selected>
                Seleccione una categoría
              </option>
              {categories.map((category) => {
                return (
                  <option value={category.name} key={category._id}>
                    {category.name}
                  </option>
                );
              })}
            </select>

            <label htmlFor="">Subcategoría</label>
            <input
              type="text"
              name="subcategory"
              value={subcategory}
              required
              onChange={(e) => setSubcategory(e.target.value)}
            />

            <button type="submit">{onEdit ? "Actualizar" : "Crear"}</button>
          </form>

          {/* Sec Subcategory category */}

          <form action="" onSubmit={createThirdCategory}>
            <label htmlFor="secSubcategory">Segunda sub-categoría</label>

            <label htmlFor="category">Categoría principal</label>
            <select name="category" id="" onChange={(e) => {setSelectedCategory(e.target.value)}}>
              <option hidden selected>
                Seleccione una categoría
              </option>
              {categories.map((category) => {
                return (
                  <option value={category._id} key={category._id}>
                    {category.name}
                  </option>
                );
              })}
            </select>

            <select name="subcategoryId" id="" onChange={(e) => {setSelectedSubcategory(e.target.value)}}>
              <option hidden selected>
                Seleccione una subcategoría
              </option>
              {subcategories.map((subcategory) => {
                if(subcategory.category == selectedCategory ){
                  return (
                    <option value={subcategory._id} key={subcategory._id}>
                      {subcategory.name}
                    </option>
                  );
                }
        
              })}
            </select>

            <label htmlFor="">Segunda subcategoría</label>
            <input
              type="text"
              name="secSubcategory"
              required
              onChange={(e) => setSecSubcategory(e.target.value)}
            />

            <button type="submit">{onEdit ? "Actualizar" : "Crear"}</button>
          </form>
        </div>
      </div>

      <div className="col">
        {categories.map((category) => {
          return (
            <div className="row" key={category._id}>
              <h4>Categoría</h4>

              <div>
                <ul className="category-name">
                  <li key={category._id}>{category.name}</li>
                </ul>

                <img src={category.images.url} alt="" />
                <button
                  onClick={() => editCategory(category._id, category.name)}
                >
                  Editar
                </button>

                <button onClick={() => deleteCategory(category._id)}>
                  Eliminar
                </button>

                <div className="subcategories">
                  <h4>Subcategorías</h4>
                  {subcategories.map((subcategory) => {
                    if (subcategory.category == category._id) {
                      return (
                        <div className="info">
                          <div className="name">
                            <ol>
                              <li>{subcategory.name}</li>
                              {secSubcategories.map((secSubcategory) => {
                                if (
                                  secSubcategory.subcategoryId ==
                                  subcategory._id
                                ) {
                                  return <p>{secSubcategory.name}</p>;
                                }
                              })}
                            </ol>
                          </div>

                          <div className="actions">
                            <button
                              onClick={() =>
                                editSubcategory(
                                  subcategory._id,
                                  subcategory.name
                                )
                              }
                            >
                              Editar
                            </button>

                            <button
                              onClick={() => deleteSubcategory(subcategory._id)}
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      );
                    }
                  })}

                  {/* <button
                    className="subcat-button"
                    onClick={() => deleteAllSubcategories(category._id)}
                  >
                    Eliminar subcategorías
                  </button> */}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Categories;
