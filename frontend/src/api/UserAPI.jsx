import { useState, useEffect } from "react";
import axios from "axios";

function UserAPI(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false); 
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);
  const [notification, setNotification] = useState(0);
  const [callback, setCallback] = useState(false);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   if (token) {
  //     const getUser = async () => {
  //       try {
  //         const res = await axios.get("/users/infor", {
  //           headers: { Authorization: token },
  //         });
  //         setIsLogged(true);
  //         res.data.role === 2 ? setIsSuperAdmin(true) : setIsSuperAdmin(false); 
  //         res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
  //         setName(res.data.name);
  //         setEmail(res.data.email);
  //         setCart(res.data.cart);
  //       } catch (err) {
  //         alert(err.response.data.msg);
  //       }
  //     };
  //     getUser();
  //   }
  //   const getNotifications = async () => {
  //     try {
  //       const res = await axios.get("/users/notification", {
  //         headers: { Authorization: token },
  //       });
  //       setNotification(res.data);
  //     } catch (err) {
  //       alert(err.response.data.msg);
  //     }
  //   };
  //   getNotifications();
  // }, [token]);


  const addCart = async (product) => {
    if (!isLogged)
      return alert("Por favor, inicie sesión para continuar con la compra.");

    const check = cart.every((item) => {
      return item._id !== product._id;
    });

    if (check) {
      setCart([...cart, { ...product, quantity: 1 }]);

      await axios.patch(
        "/api/users/addcart",
        { cart: [...cart, { ...product, quantity: 1 }] },
        {
          headers: { Authorization: token },
        }
      );
    } else {
      alert("Agregado al carrito!");
    }
  };

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    isSuperAdmin: [isSuperAdmin, setIsSuperAdmin], 
    cart: [cart, setCart],
    addCart: addCart,
    history: [history, setHistory],
    notification: [notification, setNotification],
    name: [name, setName],
    email: [email, setEmail],
    users: [users, setUsers],
  };
}

export default UserAPI;
