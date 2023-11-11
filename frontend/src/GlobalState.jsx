import React, { createContext, useEffect, useState } from 'react' 
import ProductsAPI from './api/ProductsAPI'
import UserAPI from './api/UserAPI'
import axios from 'axios'
import CategoriesAPI from './api/CategoriesAPI'
import StatesAPI from './api/StatesAPI'
import USDAPI from './api/USDAPI'
import BannersAPI from './api/BannersAPI'

export const GlobalState = createContext() 

export const DataProvider = ({children}) =>{
    const [token, setToken] = useState(false); 

    useEffect(() =>{
        const firstLogin = localStorage.getItem('firstLogin')
        
        if(firstLogin){
            const refreshToken = async () =>{
                const res = await axios.get('/api/users/refresh_token');
        
                setToken(res.data.accessToken)
    
                setTimeout(() =>{
                    refreshToken()
                }, 10 * 60 * 1000)
            }
          refreshToken()
        }
     
    }, [])

    const state = {
        token: [token, setToken],
        productsAPI: ProductsAPI(),
        userAPI: UserAPI(token),
        categoriesAPI: CategoriesAPI(),
        statesAPI: StatesAPI(), 
        USDAPI: USDAPI(),
        bannersAPI: BannersAPI(),
    }
    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}