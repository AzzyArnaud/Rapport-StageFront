import React from "react";
import { useTranslation } from "react-i18next";

const ProductList = ({ products, onProductClick }) => {
  // Vérifiez si les produits sont dans `rows`
  const productList = products?.result?.rows || [];

  const { t } = useTranslation();
  return (
    <div className="bg-white rounded-lg pt-10">
      <h2 className="text-2xl font-bold mb-4">
        {t("ProductList.ProduitSpecial")}
      </h2>
      {productList.length === 0 ? (
        <div className="text-center text-gray-500 p-6">
          {t("ProductList.AucunProduit")}.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productList.map((product) => (
            <div
              key={product.ID_ARTICLE}
              className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-teal-500 cursor-pointer"
              onClick={() => onProductClick(product)}
            >
              <img
                src={product.IMAGES_1}
                alt={`${product.NOM_ARTICLE} Image 1`}
                className="w-full h-48 object-cover bg-white p-2 rounded-md"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">
                  {product.NOM_ARTICLE}
                </h3>
                <p className="text-gray-700 text-base mb-2">
                  {product.MARQUE_ARTICLE}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 text-center">
        <button className="px-4 py-2 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600">
          {t("ProductList.VoirPlus")}
        </button>
      </div>
    </div>
  );
};

export default ProductList;
