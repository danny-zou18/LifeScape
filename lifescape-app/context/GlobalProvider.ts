import { createContext, useContext, useState, useEffect, ReactNode } from "react";

const GlobalContext = createContext(null);
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    return (
        <GlobalContext.Provider>
            {children}
        </GlobalContext.Provider>
    )
}