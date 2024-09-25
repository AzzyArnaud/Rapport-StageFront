import { useState, useEffect, useRef } from "react";
import {
  FaSearch,
  FaShoppingCart,
  FaBell,
  FaUser,
  FaCog,
  FaGlobe,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { unsetUserAction } from "../store/actions/userActions";
import { setLanguageAction } from "../store/actions/languageActions"; // Importer l'action
import { useDispatch, useSelector } from "react-redux";
import { useMenu } from "./menus/MenuProvider "; // Assurez-vous que ce chemin est correct
import { selectLanguage } from "../store/selectors/languageSelector"; // Importer le selector
import i18next from "i18next";

function Header() {
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [languageDropdown, setLanguageDropdown] = useState(false);
  const dispatch = useDispatch();
  const currentLanguage = useSelector(selectLanguage); // Récupérer la langue du store
  const profileDropdownRef = useRef(null);
  const sidebarRef = useRef(null);
  const languageDropdownRef = useRef(null);
  const navigate = useNavigate();
  const { searchTerm, setSearchQuery } = useMenu(); // Assurez-vous que ces noms correspondent

  useEffect(() => {
    i18next.changeLanguage(currentLanguage); // Changer la langue au démarrage
  }, [currentLanguage]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setProfileDropdown(false);
      }
      if (
        sidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setSidebarOpen(false);
      }
      if (
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(event.target)
      ) {
        setLanguageDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen, languageDropdown]);

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(unsetUserAction(null));
    localStorage.setItem("user", null);
    navigate("/");
  };

  const changeLanguage = (lang) => {
    dispatch(setLanguageAction(lang)); // Dispatche l'action pour changer la langue
    setLanguageDropdown(false);
  };

  return (
    <header className="bg-gray-900 text-white p-4 relative">
      {/* Mobile Menu Button */}
      <div className="lg:hidden flex justify-between items-center">
        <button onClick={() => setSidebarOpen(true)} className="text-white">
          <FaBars className="text-2xl" />
        </button>
        <div className="flex items-center space-x-4 flex-grow">
          <div className="relative w-full ml-5">
            <input
              type="text"
              className="w-full p-1 bg-gray-800 text-white outline-none rounded-md pl-3 pr-12"
              placeholder="Search........"
              value={searchTerm} // Utilisez searchTerm ici
              onChange={(e) => setSearchQuery(e.target.value)} // Utilisez setSearchQuery ici
            />
            <button className="bg-teal-500 p-2 rounded-r-md absolute right-0 top-0 h-full flex items-center justify-center">
              <FaSearch />
            </button>
          </div>
          <button onClick={() => navigate("/cart")} className="text-xl">
            <FaShoppingCart />
          </button>
          <div ref={profileDropdownRef} className="relative">
            <button
              onClick={() => setProfileDropdown(!profileDropdown)}
              className="flex items-center space-x-2"
            >
              <img
                src="./public/images/profil.png"
                alt="Profile"
                className="h-8 w-8 rounded-full"
              />
              <IoIosArrowDown />
            </button>
            {/* Profile Dropdown */}
            {profileDropdown && (
              <ul className="absolute right-0 mt-2 bg-black text-white w-40 rounded-md shadow-lg z-10">
                <li
                  className="p-2 hover:bg-gray-700 flex items-center space-x-2"
                  onClick={() => navigate("/profile")}
                >
                  <FaUser /> <span>Profile</span>
                </li>
                <li
                  className="p-2 hover:bg-gray-700 flex items-center space-x-2"
                  onClick={() => navigate("/settings")}
                >
                  <FaCog /> <span>Settings</span>
                </li>
                <li
                  className="p-2 hover:bg-gray-700 flex items-center space-x-2 cursor-pointer"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt /> <span>Logout</span>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Full Header for Desktop */}
      <div className="hidden lg:flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link to="/home">
            <div className="flex items-center space-x-2">
              <div className=" p-2 rounded-full">
                <img
                  src="./public/logo.webp"
                  alt="Logo"
                  className="h-10 w-10 rounded-full"
                />
              </div>
              <h1 className="text-xl font-bold whitespace-nowrap uppercase">
                Marché Naturel
              </h1>
            </div>
          </Link>
          <div className="hidden lg:flex items-center space-x-1">
            <span className="text-sm">Produced By</span>
            <span className="font-semibold whitespace-nowrap">
              Azzy, Burundi
            </span>
          </div>
        </div>

        <div className="flex items-center w-2/3 lg:w-1/3 relative">
          <input
            type="text"
            className="w-full p-2 bg-gray-800 text-white outline-none rounded-l-md"
            placeholder="Search product here.."
            value={searchTerm} // Utilisez searchTerm ici
            onChange={(e) => setSearchQuery(e.target.value)} // Utilisez setSearchQuery ici
          />
          <button className="bg-teal-500 p-2 rounded-r-md h-10">
            <FaSearch />
          </button>
        </div>

        <div className="flex items-center space-x-6 relative">
          {/* <button onClick={() => navigate("/cart")} className="text-xl">
            <FaShoppingCart />
          </button>
          <div className="relative">
            <FaBell className="text-xl" />
            <span className="absolute top-0 right-0 bg-red-500 rounded-full text-xs w-4 h-4 flex items-center justify-center">
              2
            </span>
          </div> */}
          {/* Language Icon and Dropdown */}
          <div ref={languageDropdownRef} className="relative">
            <button
              onClick={() => setLanguageDropdown(!languageDropdown)}
              className="flex items-center space-x-2"
            >
              <FaGlobe className="text-xl" />
              <span className="text-sm">Language</span>
            </button>
            {/* Language Dropdown */}
            {languageDropdown && (
              <ul className="absolute right-0 mt-2 bg-black text-white w-32 rounded-md shadow-lg z-10">
                <li
                  className="p-2 hover:bg-gray-700 cursor-pointer"
                  onClick={() => changeLanguage("en")}
                >
                  English
                </li>
                <li
                  className="p-2 hover:bg-gray-700 cursor-pointer"
                  onClick={() => changeLanguage("fr")}
                >
                  French
                </li>
                <li
                  className="p-2 hover:bg-gray-700 cursor-pointer"
                  onClick={() => changeLanguage("ki")}
                >
                  Kirundi
                </li>
              </ul>
            )}
          </div>
          {/* Profile Icon and Dropdown */}
          <div ref={profileDropdownRef} className="relative">
            <button
              onClick={() => setProfileDropdown(!profileDropdown)}
              className="flex items-center space-x-2"
            >
              <img
                src="./public/images/profil.png"
                alt="Profile"
                className="h-8 w-8 rounded-full"
              />
              <IoIosArrowDown />
            </button>
            {/* Profile Dropdown */}
            {profileDropdown && (
              <ul className="absolute right-0 mt-2 bg-black text-white w-40 rounded-md shadow-lg z-10">
                <li
                  className="p-2 hover:bg-gray-700 flex items-center space-x-2"
                  onClick={() => navigate("/profile")}
                >
                  <FaUser /> <span>Profile</span>
                </li>
                <li
                  className="p-2 hover:bg-gray-700 flex items-center space-x-2"
                  onClick={() => navigate("/settings")}
                >
                  <FaCog /> <span>Settings</span>
                </li>
                <li
                  className="p-2 hover:bg-gray-700 flex items-center space-x-2 cursor-pointer"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt /> <span>Logout</span>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      {sidebarOpen && (
        <div
          ref={sidebarRef}
          className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50"
        >
          <div className="w-64 h-full bg-gray-900 p-4 flex flex-col justify-between">
            {/* Header de la Sidebar (Logo, Nom et Bouton Fermer) */}
            <div>
              <div className="flex items-center justify-between mb-6">
                {/* Logo et Nom */}
                <div className="flex items-center space-x-2">
                  <img
                    src="public/logo.webp"
                    alt="Logo"
                    className="h-8 w-8 rounded-md"
                  />
                  <h1 className="text-lg font-bold">NDANGIRA</h1>
                </div>
                {/* Bouton de fermeture */}
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-white text-2xl"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Contenu de la Sidebar (Menus) */}
              <div className="flex flex-col space-y-4 text-white">
                <button
                  className="flex items-center space-x-2"
                  onClick={() => navigate("/profile")}
                >
                  <FaUser />
                  <span>Profile</span>
                </button>

                <button
                  className="flex items-center space-x-2"
                  onClick={() => navigate("/settings")}
                >
                  <FaCog />
                  <span>Settings</span>
                </button>

                {/* Language Dropdown in Sidebar */}
                <div ref={languageDropdownRef} className="relative">
                  <button
                    onClick={() => setLanguageDropdown(!languageDropdown)}
                    className="flex items-center space-x-2"
                  >
                    <FaGlobe className="text-xl" />
                    <span className="text-sm">Language</span>
                  </button>
                  {languageDropdown && (
                    <ul className="absolute right-0 mt-2 bg-black text-white w-32 rounded-md shadow-lg z-10">
                      <li
                        className="p-2 hover:bg-gray-700 cursor-pointer"
                        onClick={() => changeLanguage("en")}
                      >
                        English
                      </li>
                      <li
                        className="p-2 hover:bg-gray-700 cursor-pointer"
                        onClick={() => changeLanguage("fr")}
                      >
                        French
                      </li>
                      <li
                        className="p-2 hover:bg-gray-700 cursor-pointer"
                        onClick={() => changeLanguage("ki")}
                      >
                        Kirundi
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </div>

            {/* Bouton Logout en bas */}
            <div className="mt-auto">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-white hover:bg-gray-700 p-2 rounded-md"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
