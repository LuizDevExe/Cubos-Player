import React, { createContext, useState, useRef } from "react";

const defaultValue = {
    url: "",
    tocando: false,
    artist: "",
    tittle: "",
    idIndex: 0
}

const SiteContext = createContext();

const SiteContextProvider = ({ children }) => {
    const audioPlayer = useRef();
    const [siteState, setSiteState] = useState(defaultValue);
    return (
        <SiteContext.Provider value={{ siteState, setSiteState, audioPlayer, defaultValue }}>
            {children}

        </SiteContext.Provider>
    )
}

export { SiteContextProvider, SiteContext }