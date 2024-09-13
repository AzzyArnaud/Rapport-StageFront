// Layout.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./Pages/Header";
import Login from "./Pages/Auth/Login";
import Cart from "./Pages/cart/Cart";
import ProductDetails from "./Pages/details/productDetails";
import HeroSection from "./Pages/Body/Body";
import { MenuProvider } from "./Pages/menus/MenuProvider "; // Assurez-vous d'importer MenuProvider
import SignUp from "./Pages/Auth/SignUp";
import Footer from "./Pages/footer";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "./store/selectors/userSelector";
import { setUserAction } from "./store/actions/userActions";
import { useLayoutEffect, useState } from "react";

import "./i18n.js";
import UserProfile from "./Pages/profil/UserProfile.jsx";
import Settings from "./Pages/profil/Settings.jsx";

function Layout() {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    try {
      // Récupère l'utilisateur dans le local storage
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        dispatch(setUserAction(storedUser));
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  // Si l'utilisateur n'est pas trouvé et que la page actuelle n'est pas /signup, redirige vers login
  // if (!user && !["/signup"].includes(location.pathname)) {
  //   return <Login />;
  // }

  // // Si l'utilisateur n'est pas authentifié, affiche uniquement Login ou SignUp
  // if (!user) {
  //   return (
  //     <Routes>
  //       <Route path="/" element={<Login />} />
  //       <Route path="/signup" element={<SignUp />} />
  //     </Routes>
  //   );
  // }

  // Déterminez si le Header et le Footer doivent être affichés
  const showHeaderFooter = !["/", "/signup"].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {showHeaderFooter && <Header />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<HeroSection />} />
          <Route path="/product/:id_product" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
      {showHeaderFooter && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <MenuProvider>
      {/* Encapsule seulement le Layout avec MenuProvider */}
      <Layout />
    </MenuProvider>
  );
}
