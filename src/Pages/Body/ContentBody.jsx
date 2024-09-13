import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMenu } from "../menus/MenuProvider ";
import fetchApi from "../../helpers/fetchApi";
import ProductList from "./ProduitList";
import AddProductModal from "./AddProductModal";
import ProductDetailsModal from "./ProductDetailsModal";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";

const SpecialProducts = () => {
  const { openDropdown, searchTerm } = useMenu();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Fetch products based on selected category
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      let url = "/category/categories/articles"; // URL de base

      const params = [];

      if (openDropdown?.ID_CATEGORIE) {
        params.push(`id_category=${openDropdown.ID_CATEGORIE}`);
      }

      if (searchTerm) {
        params.push(`search=${searchTerm}`);
      }

      if (params.length > 0) {
        url += `?${params.join("&")}`;
      }

      const response = await fetchApi(url);

      // Assurez-vous que la réponse est un tableau
      if (response) {
        setProducts(response);
      } else {
        setProducts([]); // En cas d'erreur, assignez un tableau vide pour éviter les problèmes avec `.map()`
      }
    } catch (error) {
      setError("Erreur lors de la récupération des produits.");
    } finally {
      setIsLoading(false);
    }
  }, [openDropdown, searchTerm]);

  const fetchCategories = async () => {
    try {
      const response = await fetchApi("/category/categories");
      if (response.statusCode === 200) {
        setCategories(response.result);
      } else {
        setError("Erreur lors de la récupération des catégories.");
      }
    } catch {
      setError("Erreur lors de la récupération des catégories.");
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [fetchProducts]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowDetailsModal(true);
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setShowDetailsModal(false);
    setSelectedProduct(null);
  };

  if (isLoading) {
    return <div className="p-6 text-center">{t("contentBody.chargement")}</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-red-500 text-center">
        {t("contentBody.erreur")} {error}
      </div>
    );
  }

  return (
    <div className="relative pt-4 pb-6 bg-white">
      {(showModal || showDetailsModal) && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40" />
      )}

      <Button
        className="absolute top-12 right-2 p-button-primary bg-teal-500 p-2 rounded-md text-white"
        label={t("contentBody.AddProduct")}
        onClick={handleModalOpen}
      />
      <ProductList products={products} onProductClick={handleProductClick} />
      {/* <ProductList products={[]} onProductClick={() => {}} /> */}
      <AddProductModal
        showModal={showModal}
        onClose={handleModalClose}
        categories={categories}
        refreshProducts={fetchProducts}
      />
      <ProductDetailsModal
        showModal={showDetailsModal}
        onClose={handleModalClose}
        product={selectedProduct}
      />
    </div>
  );
};

export default SpecialProducts;
