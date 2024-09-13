import { useRef, useEffect, useState } from "react";
import { useMenu } from "./MenuProvider "; // Assurez-vous que ce chemin est correct
import fetchApi from "../../helpers/fetchApi";

const MenuButtons = () => {
  const { openDropdown, setOpenDropdown } = useMenu();
  const [categories, setCategories] = useState([]);
  const dropdownRef = useRef(null);

  const fetchCategories = async () => {
    try {
      const response = await fetchApi("/category/categories");
      if (response.statusCode === 200 && response.result) {
        setCategories(response.result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      // setOpenDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (category) => {
    if (typeof setOpenDropdown === "function") {
      setOpenDropdown((prev) => (prev === category ? null : category));
    } else {
      console.error("setOpenDropdown is not a function");
    }
  };

  return (
    <div
      className="relative ml-2 md:ml-6 flex justify-center mb-3"
      ref={dropdownRef}
    >
      <div className="grid grid-cols-2 gap-2 md:flex md:space-x-4">
        {categories.map((category, index) => (
          <div key={index} className="relative">
            <button
              onClick={() => toggleDropdown(category)}
              className="w-full bg-white text-gray-700 font-bold py-2 px-4 rounded border border-gray-300 hover:bg-gray-100 transition duration-300 text-center"
            >
              {category.NOM_CATEGORIE}
            </button>
            {/* Ajoutez ici un menu déroulant ou un autre élément si nécessaire */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuButtons;
