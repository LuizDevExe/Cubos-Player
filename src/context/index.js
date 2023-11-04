import React from "react";
import { SiteContextProvider } from "./site/context";

const GlobalProvider = ({ children }) =>{
    return(
        <SiteContextProvider>
            {children}
        </SiteContextProvider>
    )
}


export default GlobalProvider;