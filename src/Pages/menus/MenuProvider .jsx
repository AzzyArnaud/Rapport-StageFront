import React, { createContext, useContext, useState } from "react";

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);

  const setSearchQuery = (term) => {
    setSearchTerm(term);
  };

  return (
    <MenuContext.Provider
      value={{ searchTerm, setSearchQuery, openDropdown, setOpenDropdown }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);
