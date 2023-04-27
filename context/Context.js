'use client'
import { createContext, useState } from "react"

function Context({ children }) {
    const [language, setLanguage] = useState();
    const [search, setSearch] = useState();
  
    return (
      <Message_data.Provider value={{ language ,setLanguage, search , setSearch }}>
        {children}
      </Message_data.Provider>
    );
  }
  
export const Message_data = createContext(null);