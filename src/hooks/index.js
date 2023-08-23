import { useContext, useEffect, useInsertionEffect, useState } from "react";
import { register, login as userLogin } from "../api";
import { AuthContext } from "../providers/AuthProvider";
import { setItemInLocalStorage ,LOCALSTORAGE_TOKEN_KEY, removeItemFromLocalStorage, getItemFromLocalStorage} from "../utils";
import jwt from 'jwt-decode';

export const useAuth = ()=>{    
    return useContext(AuthContext);
}

export const useProvideAuth = () => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
        if(userToken){
            const user = jwt(userToken);
            setUser(user);
        }
        setLoading(false);
    },[]);

    const login = async(email,password)=>{
        const response = await userLogin(email,password);
        if(response.success){
            setUser(response.data.user);

            setItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY,response.data.token ? response.data.token : null)
            return {success:true};
        }else{
            return {
                success:false,
                message:response.message
            };
        }
    };

    const signup = async(name,email,password,confirm_password)=>{
        const response = await register(name,email,password,confirm_password);
        if(response.success){
           return {success:true};
        }else{
            return {
                success:false,
                message:response.message
            };
        }
    };

    const logout = () =>{
        setUser(null);
        removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY)
    }

    return {
        user,
        login,
        logout,
        loading,
        signup
      };
    };