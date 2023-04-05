//import lib
import React from "react";
import { Navigate } from "react-router-dom";
import { pages } from "../../utils/constants";

export const PrivateRoute = ({children}) =>{  
    const authenticated = sessionStorage.getItem('onLogin');
    if(!authenticated) return <Navigate to={pages.LOGIN} />
    return children;
}

export const PublicRoute = ({children}) => {
    const authenticated = sessionStorage.getItem('onLogin');
    if(authenticated) return <Navigate to={pages.DASHBOARD} />
    return children;
}