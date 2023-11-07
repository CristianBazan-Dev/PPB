import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import { GlobalState } from "../../GlobalState";

import { ReactComponent as Phone } from "./icon/phone.svg";
import { ReactComponent as Mail } from "./icon/mail.svg";
import { ReactComponent as Search } from "./icon/search.svg";
import { ReactComponent as SearchMenu } from "./icon/search-resp.svg";
import { ReactComponent as Menu } from "./icon/menu.svg";
import { ReactComponent as Home } from "./icon/home.svg";
import { ReactComponent as Close } from "./icon/close.svg";
import { ReactComponent as Orders } from "./icon/orders.svg";
import { ReactComponent as CartResp } from "./icon/cart-resp.svg";
import { ReactComponent as UserResp } from "./icon/user-resp.svg";
import { ReactComponent as Whatsapp } from "./icon/whatsapp.svg";
import { ReactComponent as Ig } from "./icon/ig.svg";

import Cart from "./icon/cart.svg";
import User from "./icon/user.svg";

import Iso from "../../assets/img/iso.png";
import CB from "../../assets/img/CB.png";

function Header(props) {
  const state = useContext(GlobalState);

  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [isSuperAdmin] = state.userAPI.isSuperAdmin;
  const [cart] = state.userAPI.cart;
  const [name] = state.userAPI.name;
  const [token] = state.token;
  const [search, setSearch] = state.productsAPI.search;
  const [history, setHistory] = state.userAPI.history;
  const [notification] = state.userAPI.notification;

  const [page, setPage] = state.productsAPI.page;
  const [sort, setSort] = state.productsAPI.sort;

  const [categories, setCategories] = state.categoriesAPI.categories;
  const [subcategories, setSubcategories] = state.categoriesAPI.subcategories;
  const [secSubcategories, setSecSubcategories] =
    state.categoriesAPI.secSubcategories;

  const [allProducts, setAllProducts] = state.productsAPI.allProducts;
  const [resultAll, setResultAll] = state.productsAPI.resultAll;
  const [callback, setCallback] = useState(false);

  const [startSearch, setStartSearch] = useState(false);

  const [menuDeploy, setMenuDeploy] = useState(false);

  const [navResp, setNavResp] = useState(false);
  const [homeResp, setHomeResp] = useState(false);
  const [catNavResp, setCatNavResp] = useState(false);
  const [cartNavResp, setCartNavResp] = useState(false);
  const [userNavResp, setUserNavResp] = useState(false);

  const params = useParams();

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get(`/api/products?title[regex]=${search}`);
      setAllProducts(res.data.products);
      setResultAll(res.data.result);
    };
    getProducts();
  }, [callback, search, page]);

  useEffect(() => {
    if (token) {
      const getHistory = async () => {
        if (isAdmin || isSuperAdmin) {
          const res = await axios.get("/api/payment", {
            headers: { Authorization: token },
          });
          setHistory(res.data);
        } else {
          const res = await axios.get("/users/history", {
            headers: { Authorization: token },
          });
          setHistory(res.data);
        }
      };
      getHistory();
    }
  }, [token, isAdmin, isSuperAdmin, setHistory]);

  const logoutUser = async () => {
    await axios.get("/users/logout");

    localStorage.removeItem("firstLogin");

    window.location.href = "/";
  };

  const redirectingProduct = (id) => {
    window.location.assign(`/detail/${id}`);
  };

  const adminRouter = () => {
    return (
      <>
        <div className="admin-ul">
          <li>
            <Link to="/create_product">Crear producto</Link>
          </li>

          <li>
            <Link to="/category">Categorías</Link>
          </li>

          <li>
            <Link to="/users">Usuarios</Link>
          </li>

          <li>
            <Link to="/configurations">Configuraciones</Link>
          </li>

          <li>
            <Link to="/" onClick={logoutUser}>
              Cerrar sesión
            </Link>
          </li>
        </div>

        <div className="orders-icon">
          <Link to="/history">
            <span>{notification}</span>
            <Orders width="50" />
          </Link>
        </div>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <div className="login-menu">
        <h3>{isAdmin || isSuperAdmin ? "" : "Hola " + name}</h3>
        <li>
          <Link to="/history">
            {isAdmin || isSuperAdmin ? "Pedidos" : "Compras"}
          </Link>
        </li>

        <li>
          <Link to="/" onClick={logoutUser}>
            Cerrar sesión
          </Link>
        </li>
      </div>
    );
  };

  const deployAdminMenu = () => {
    const adminMenuDeploy = document.querySelector(".admin-ul");
    const adminBarsDeploy = document.querySelector(".adminMenu-bars");

    adminMenuDeploy.classList.toggle("active");
    adminBarsDeploy.classList.toggle("active");
  };

  return (
    <header>
      <nav>
        <ul>
          <li>
            <a href="https://wa.link/uxd2d6" rel="noreferrer" target="_blank">
              <Phone className="li-icon" /> (3468)-506269
            </a>
          </li>
          <li>
            <Link to="/contact">
              <Mail className="li-icon" />
              preciosbajos@gmail.com
            </Link>
          </li>
        </ul>

        <ul>
          <li>
            <Link to="/credit">Crédito Planeta</Link>{" "}
          </li>
          <li>
            <Link to="/about">Nosotros</Link>
          </li>

          <li>
            <Link to="/stores">Sucursales</Link>{" "}
          </li>
          <li>
            <Link to="/contact">Contacto</Link>{" "}
          </li>
        </ul>
      </nav>

      <div className="menu">
        <Menu
          onClick={() => {
            setMenuDeploy(!menuDeploy);
            // const menuDeploy = document.querySelector(".menu-deploy");
            // menuDeploy.classList.toggle("active");
          }}
        />

        <div className="logo">
          <Link
            to="/"
            onClick={() => {
              setUserNavResp(false);
              setCartNavResp(false);
            }}
          >
            <img
              src="https://res.cloudinary.com/dkdncsbmz/image/upload/v1684835309/planeta-precios-bajos-e-commerce/Assets/Logo_-_completo_gvucvm.png"
              alt=""
              className="logo-img"
            />
          </Link>
        </div>

        <div className="actions">
          <div className="admin-title" onClick={deployAdminMenu}>
            <Link to="/">
              <h1>
                {isSuperAdmin
                  ? `${name} - Super Admin`
                  : isAdmin
                  ? `${name} - Admin`
                  : ""}
              </h1>
            </Link>

            {isAdmin || isSuperAdmin ? (
              <div className="adminMenu-bars">
                <div className="bar-1"></div>
                <div className="bar-2"></div>
              </div>
            ) : (
              ""
            )}

            <div>{isAdmin || isSuperAdmin ? adminRouter() : ""}</div>
          </div>

          <div className="icons">
            {isAdmin || isSuperAdmin ? (
              ""
            ) : (
              <div>
                <div className="user-icon">
                  <img
                    src={User}
                    alt=""
                    onMouseOver={() => {
                      const menuDeploy = document.querySelector(".user-menu");
                      menuDeploy.classList.add("active");
                    }}
                    onClick={() => {
                      const menuDeploy = document.querySelector(".user-menu");
                      menuDeploy.classList.add("active");
                    }}
                  />
                </div>

                <div
                  className="user-menu"
                  onMouseOver={() => {
                    const menuDeploy = document.querySelector(".user-menu");
                    menuDeploy.classList.add("active");
                  }}
                  onMouseOut={() => {
                    const menuDeploy = document.querySelector(".user-menu");
                    menuDeploy.classList.remove("active");
                  }}
                >
                  {isLogged ? (
                    loggedRouter()
                  ) : (
                    <div className="login-menu">
                      <li>
                        <Link to="/login">Iniciar sesión</Link>
                      </li>

                      <li>
                        <Link to="/register">Registro</Link>
                      </li>
                    </div>
                  )}
                </div>
              </div>
            )}

            {isAdmin || isSuperAdmin ? (
              ""
            ) : (
              <div className="cart-icon">
                <span>{cart.length}</span>
                <Link to="/cart">
                  <img src={Cart} alt="" width="30" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="header-content">
        <div className="logo">
          <Link
            to="/"
            onClick={() => {
              setUserNavResp(false);
              setCartNavResp(false);
            }}
          >
            <img
              src="https://res.cloudinary.com/dkdncsbmz/image/upload/v1684835309/planeta-precios-bajos-e-commerce/Assets/Logo_-_completo_gvucvm.png"
              alt=""
              className="logo-img"
            />
          </Link>
        </div>

        <div className="search">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Ingrese su búsqueda"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value.toLowerCase());
              }}
              onKeyDown={() => {
                setStartSearch(true);
              }}
            />

            <div className="searching">
              {startSearch && search.length >= 1 && (
                <div className="searched-item">
                  <h4>Buscando {search}....</h4>
                  {allProducts.map((item) => {
                    return (
                      <div
                        className="finding-item"
                        onClick={() => {
                          redirectingProduct(item._id);
                        }}
                      >
                        <img src={item.images.url} alt="" />
                        <h4>{item.title}</h4>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <Search className="search-icon" />
        </div>

        <div className="actions">
          <div className="admin-title" onClick={deployAdminMenu}>
            <Link to="/">
              <h1>
                {isSuperAdmin
                  ? `${name} - Super Admin`
                  : isAdmin
                  ? `${name} - Admin`
                  : ""}
              </h1>
            </Link>

            {isAdmin || isSuperAdmin ? (
              <div className="adminMenu-bars">
                <div className="bar-1"></div>
                <div className="bar-2"></div>
              </div>
            ) : (
              ""
            )}

            <div>{isAdmin || isSuperAdmin ? adminRouter() : ""}</div>
          </div>

          <div className="icons">
            {isAdmin || isSuperAdmin ? (
              ""
            ) : (
              <div>
                <div className="user-icon">
                  <img
                    src={User}
                    alt=""
                    onMouseOver={() => {
                      const menuDeploy = document.querySelector(".user-menu");
                      menuDeploy.classList.add("active");
                    }}
                    onClick={() => {
                      const menuDeploy = document.querySelector(".user-menu");
                      menuDeploy.classList.add("active");
                    }}
                  />
                </div>

                <div
                  className="user-menu"
                  onMouseOver={() => {
                    const menuDeploy = document.querySelector(".user-menu");
                    menuDeploy.classList.add("active");
                  }}
                  onMouseOut={() => {
                    const menuDeploy = document.querySelector(".user-menu");
                    menuDeploy.classList.remove("active");
                  }}
                >
                  {isLogged ? (
                    loggedRouter()
                  ) : (
                    <div className="login-menu">
                      <li>
                        <Link to="/login">Iniciar sesión</Link>
                      </li>

                      <li>
                        <Link to="/register">Registro</Link>
                      </li>
                    </div>
                  )}
                </div>
              </div>
            )}

            {isAdmin || isSuperAdmin ? (
              ""
            ) : (
              <div className="cart-icon">
                <span>{cart.length}</span>
                <Link to="/cart">
                  <img src={Cart} alt="" width="30" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={menuDeploy ? "menu-deploy active" : "menu-deploy"}>
        <Close
          className="close-icon"
          onClick={() => {
            const menuDeploy = document.querySelector(".menu-deploy");
            menuDeploy.classList.remove("active");
          }}
        />

        <div className="options">
          <img src={Iso} alt="" />

          <div className="pages">
            <Link
              to="/about"
              onClick={() => {
                setMenuDeploy(false);
              }}
            >
              Nosotros
            </Link>
            <Link
              to="/credit"
              onClick={() => {
                setMenuDeploy(false);
              }}
            >
              Credito Planeta
            </Link>{" "}
            <Link
              to="/stores"
              onClick={() => {
                setMenuDeploy(false);
              }}
            >
              Sucursales
            </Link>{" "}
            <Link
              to="/contact"
              onClick={() => {
                setMenuDeploy(false);
              }}
            >
              Contacto
            </Link>{" "}
          </div>

          <div className="social">
            <Link to="https://wa.link/uxd2d6" target="_blank">
              <Whatsapp />
            </Link>

            <Link
              to="https://www.instagram.com/planetapreciosbajos_/"
              target="blank"
            >
              <Ig />
            </Link>
          </div>

          <div className="footer">
            <div className="copyright">
              <p>
                Planeta Precios Bajos @ 2023 - Todos los derechos reservados
              </p>

              <Link
                to="https://cristianbazan-dev.github.io/CB/"
                target="_blank"
              >
                E-commerce creado por <img src={CB} alt="" />
              </Link>
            </div>
          </div>
        </div>

        {/* <div className="actions-menu">
          <div className="icons">
            {isAdmin || isSuperAdmin ? (
              ""
            ) : (
              <div>
                {isLogged ? (
                  loggedRouter()
                ) : (
                  <div className="login-menu">
                    <img src={User} alt="" width="30px" />
                    <li>
                      <Link to="/login">Iniciar sesión</Link>
                    </li>

                    <li>
                      <Link to="/register">Registro</Link>
                    </li>
                  </div>
                )}
              </div>
            )}

            <div className="admin">
              <div className="admin-menu-deploy">
                {isAdmin || isSuperAdmin ? (
                  <>
                    <h3>{name} - Admin </h3>
                    <li>
                      <Link to="/create_product">Crear producto</Link>
                    </li>

                    <li>
                      <Link to="/category">Categorías</Link>
                    </li>

                    <li>
                      <Link to="/users">Usuarios</Link>
                    </li>

                    <li>
                      <Link to="/configurations">Configuraciones</Link>
                    </li>

                    <li>
                      <Link to="/" onClick={logoutUser}>
                        Cerrar sesión
                      </Link>
                    </li>

                    <div className="orders-icon">
                      <Link to="/history">
                        <span>{notification}</span>
                        <Orders width="50" />
                      </Link>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>

            {isAdmin || isSuperAdmin ? (
              ""
            ) : (
              <div className="cart-icon">
                <span>{cart.length}</span>
                <Link to="/cart">
                  <img src={Cart} alt="" width="35px" />
                </Link>
              </div>
            )}
          </div>
        </div> */}
      </div>

      <div className="header-responsive">
        <Link to="/">
          <Home
            className={
              homeResp
                ? "header-responsive-icon active"
                : "header-responsive-icon"
            }
            onClick={() => {
              setHomeResp(!homeResp);
              setNavResp(false);
              setCartNavResp(false);
              setUserNavResp(false);
              setCatNavResp(false);
            }}
          />
        </Link>

        <SearchMenu
          className={
            catNavResp
              ? "header-responsive-icon active"
              : "header-responsive-icon"
          }
          onClick={() => {
            setNavResp(false);
            setCartNavResp(false);
            setUserNavResp(false);
            setHomeResp(false);
            setCatNavResp(!catNavResp);
          }}
        />

        {!isAdmin ? (
          <Link
            to="/cart"
            onClick={() => {
              setHomeResp(false);
              setNavResp(false);
              setUserNavResp(false);
              setCatNavResp(false);
              setCartNavResp(!cartNavResp);
            }}
          >
            <CartResp
              className={
                cartNavResp
                  ? "header-responsive-icon active"
                  : "header-responsive-icon"
              }
            />
          </Link>
        ) : (
          <div className="orders-icon">
            <Link to="/history">
              <span>{notification}</span>
              <Orders width="50" fill="#ffffff" />
            </Link>
          </div>
        )}

        <Link
          to={isLogged ? "/" : "/login"}
          onClick={() => {
            setHomeResp(false);
            setNavResp(false);
            setCartNavResp(false);
            setCatNavResp(false);
            setUserNavResp(!userNavResp);
          }}
        >
          <UserResp
            className={
              userNavResp
                ? "header-responsive-icon active"
                : "header-responsive-icon"
            }
          />
        </Link>
      </div>

      <div className={navResp ? "nav-responsive active" : "nav-responsive"}>
        <div className="nav-resp-menu">
          <Close
            className="close-icon"
            onClick={() => {
              setNavResp(false);
              setCatNavResp(false);
            }}
          />
          <ul>
            <h4>Secciones</h4>
            <li>
              <Link
                to="/credit"
                onClick={() => {
                  setNavResp(false);
                }}
              >
                Crédito Planeta
              </Link>{" "}
            </li>
            <li>
              <Link
                to="/about"
                onClick={() => {
                  setNavResp(false);
                }}
              >
                Nosotros
              </Link>
            </li>

            <li>
              <Link
                to="/stores"
                onClick={() => {
                  setNavResp(false);
                }}
              >
                Sucursales
              </Link>{" "}
            </li>
            <li>
              <Link
                to="/contact"
                onClick={() => {
                  setNavResp(false);
                }}
              >
                Contacto
              </Link>{" "}
              <div className="whatsapp-logo" onMouse>
                <a href="https://wa.link/uxd2d6">
                  <Whatsapp className="whatsapp-icon" width="15px" />
                </a>
              </div>
            </li>
          </ul>

          <ul>
            <h4>Productos</h4>
            <li>
              <Link
                to="/products"
                onClick={() => {
                  setNavResp(false);
                }}
              >
                Todos los productos
              </Link>{" "}
            </li>
            <li>
              <Link
                to="/offers"
                onClick={() => {
                  setNavResp(false);
                }}
              >
                Ofertas
              </Link>{" "}
            </li>
            <li>
              <Link
                onClick={() => {
                  setNavResp(false);
                  setCatNavResp(true);
                }}
              >
                Categorías
              </Link>{" "}
            </li>
          </ul>

          <ul>
            <h4>Usuarios</h4>
            <li>
              <Link
                to="/login"
                onClick={() => {
                  setNavResp(false);
                }}
              >
                Iniciar sesión
              </Link>{" "}
            </li>
            <li>
              <Link
                to="/register"
                onClick={() => {
                  setNavResp(false);
                }}
              >
                Registrarme
              </Link>{" "}
            </li>
          </ul>
        </div>
      </div>

      <div className={catNavResp ? "cat-responsive active" : "cat-responsive"}>
        <div className="cat-resp-menu">
          <Close
            className="close-icon"
            onClick={() => {
              setNavResp(false);
              setCatNavResp(false);
            }}
          />

          <div className="search">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Ingrese su búsqueda"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value.toLowerCase());
                }}
                onKeyDown={() => {
                  setStartSearch(true);
                }}
              />

              <div className="searching">
                {startSearch && search.length >= 1 && (
                  <div className="searched-item">
                    <h4>Buscando {search}....</h4>
                    {allProducts.map((item) => {
                      return (
                        <div
                          className="finding-item"
                          onClick={() => {
                            redirectingProduct(item._id);
                          }}
                        >
                          <img src={item.images.url} alt="" />
                          <h4>{item.title}</h4>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <Search className="search-icon" />
          </div>

          <ul>
            <h4>Categorías</h4>
            {categories.map((cat) => {
              return (
                <Link
                  to={`/category/${cat._id}`}
                  onClick={() => {
                    setCatNavResp(false);
                  }}
                  className="category"
                >
                  <li>{cat.name}</li>
                  {subcategories.map((subcat) => {
                    if (subcat.category == cat._id) {
                      return (
                        <>
                          <div className="subcategory">
                            <Link
                              to={`/subcategory/${subcat._id}`}
                              className="subcategory"
                            >
                              {subcat.name}
                            </Link>
                          </div>

                          {secSubcategories.map((secSubcat) => {
                            if (secSubcat.subcategoryId == subcat._id) {
                              return (
                                <Link to={`/secSubcategory/${secSubcat._id}`}>
                                  <p>{secSubcat.name}</p>
                                </Link>
                              );
                            }
                          })}
                        </>
                      );
                    }
                  })}
                </Link>
              );
            })}
          </ul>
        </div>
      </div>

      <div
        className={
          userNavResp && isLogged ? "user-responsive active" : "user-responsive"
        }
      >
        <Close
          className="close-icon"
          onClick={() => {
            setUserNavResp(false);
          }}
        />
        <ul>
          <Link
            to="/history"
            onClick={() => {
              setUserNavResp(false);
            }}
          >
            <li>Historial</li>
          </Link>

          <li
            onClick={() => {
              logoutUser();
              setUserNavResp(false);
            }}
          >
            Cerrar sesión
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
