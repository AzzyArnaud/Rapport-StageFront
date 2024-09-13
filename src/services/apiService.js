// src/api/apiService.js

import { fetchApi } from "../helpers/fetchApi";

// Récupérer les catégories
export const getCategories = async () => {
  return await fetchApi("/users/categories");
};

// Récupérer les produits basés sur la catégorie sélectionnée
export const getProducts = async (categoryId) => {
  const url = categoryId
    ? `/users/categories/articles?id_category=${categoryId}`
    : "/users/categories/articles";
  return await fetchApi(url);
};

// Ajouter un produit
export const addProduct = async (formData) => {
  return await fetchApi("/articles/add", {
    method: "POST",
    body: formData,
  });
};
