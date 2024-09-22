import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import fetchApi from "../../helpers/fetchApi";

import { useTranslation } from "react-i18next";

const initialProductState = {
  NOM_ARTICLE: "",
  MARQUE_ARTICLE: "",
  DESCRIPTION_ARTICLE: "",
  ADRESSE_ARTICLE: "",
  TELEPHONE: "",
  ID_CATEGORIE: "",
  IMAGE_1: null,
  IMAGE_2: null,
  IMAGE_3: null,
};

const AddProductModal = ({
  showModal,
  onClose,
  categories,
  refreshProducts,
}) => {
  const [newProduct, setNewProduct] = useState(initialProductState);
  const [formErrors, setFormErrors] = useState({});
  const [isloading, setIsloading] = useState(false);
  const [previewImages, setPreviewImages] = useState({
    IMAGE_1: null,
    IMAGE_2: null,
    IMAGE_3: null,
  });

  useEffect(() => {
    if (showModal) {
      // Get geolocation when the modal opens
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setNewProduct((prevState) => ({
              ...prevState,
              LATITUDE_ARTICLE: position.coords.latitude,
              LONGITUDE_ARTICLE: position.coords.longitude,
            }));
          },
          (error) => {
            console.error("Erreur de géolocalisation:", error);
          }
        );
      }
    } else {
      setNewProduct(initialProductState);
      setFormErrors({});
      setPreviewImages({ IMAGE_1: null, IMAGE_2: null, IMAGE_3: null });
    }
  }, [showModal]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];

    if (file) {
      setNewProduct((prevState) => ({ ...prevState, [name]: file }));

      // Generate a preview URL for the selected image
      const previewURL = URL.createObjectURL(file);
      setPreviewImages((prevState) => ({ ...prevState, [name]: previewURL }));
    }
  };

  const validateForm = () => {
    const errors = {};
    const requiredFields = [
      "NOM_ARTICLE",
      "MARQUE_ARTICLE",
      "DESCRIPTION_ARTICLE",
      "ADRESSE_ARTICLE",
      "ID_CATEGORIE",
      "TELEPHONE",
      "IMAGE_1",
      "IMAGE_2",
      "IMAGE_3",
      "LATITUDE_ARTICLE",
      "LONGITUDE_ARTICLE",
    ];

    requiredFields.forEach((field) => {
      if (!newProduct[field]) {
        errors[field] = "Ce champ est requis.";
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async () => {
    const STATUT_ARTICLE = 1;
    if (validateForm()) {
      try {
        setIsloading(true);
        const formData = new FormData();
        Object.keys(newProduct).forEach((key) => {
          if (newProduct[key]) formData.append(key, newProduct[key]);
        });

        formData.append("STATUT_ARTICLE", STATUT_ARTICLE);

        const response = await fetchApi("/articles/add", {
          method: "POST",
          body: formData,
        });

        if (response.statusCode === 200) {
          onClose();
          refreshProducts();
        } else {
          setFormErrors({ submit: "Erreur lors de l'ajout du produit." });
        }
      } catch {
        setFormErrors({ submit: "Erreur lors de l'ajout du produit." });
      } finally {
        setIsloading(false);
      }
    }
  };

  const { t } = useTranslation();

  return (
    <Dialog
      header={t("addProductModal.AddProduct")}
      visible={showModal}
      onHide={onClose}
      className="p-fluid p-3 text-center"
      style={{
        width: "80vw",
        maxWidth: "700px",
        borderRadius: "8px",
        backgroundColor: "white",
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.25)",
      }}
    >
      <div className="p-6 space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4">
        {Object.keys(initialProductState).map((field) => (
          <div key={field} className="mb-4 sm:mb-0">
            {field === "ID_CATEGORIE" ? (
              <Dropdown
                name="ID_CATEGORIE"
                value={newProduct.ID_CATEGORIE}
                options={categories.map((cat) => ({
                  label: cat.NOM_CATEGORIE,
                  value: cat.ID_CATEGORIE,
                }))}
                onChange={handleInputChange}
                placeholder="Sélectionnez une catégorie"
                className={`w-full border border-gray-300 p-2 rounded-md${
                  formErrors.ID_CATEGORIE ? "p-invalid" : ""
                }`}
              />
            ) : field.startsWith("IMAGE_") ? (
              <>
                <input
                  type="file"
                  name={field}
                  onChange={handleFileChange}
                  className={`w-full p-2 border ${
                    formErrors[field] ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                />
                {previewImages[field] && (
                  <img
                    src={previewImages[field]}
                    alt={`Preview ${field}`}
                    className="mt-2 max-h-10 max-w-full"
                  />
                )}
              </>
            ) : (
              <input
                type="text"
                name={field}
                value={newProduct[field]}
                onChange={handleInputChange}
                placeholder={`Entrez ${field.replace("_", " ").toLowerCase()}`}
                className={`w-full p-2 border ${
                  formErrors[field] ? "border-red-500" : "border-gray-300"
                } rounded-md`}
              />
            )}
            {formErrors[field] && (
              <small className="text-red-500">{formErrors[field]}</small>
            )}
          </div>
        ))}
      </div>

      {formErrors.submit && (
        <div className="text-red-500 mb-4">{formErrors.submit}</div>
      )}
      <div className="flex justify-end space-x-2 mt-4 mr-2">
        <Button
          label={!isloading ? t("addProductModal.Cancel") : "chargement...."}
          className="p-button-text border border-gray-300 rounded-md hover:bg-gray-100 p-2"
          onClick={onClose}
          disabled={!isloading}
        />
        <Button
          label={t("addProductModal.Submit")}
          className="p-button-success bg-teal-500 p-1 text-white hover:bg-teal-600 rounded-md"
          onClick={handleFormSubmit}
        />
      </div>
    </Dialog>
  );
};

export default AddProductModal;
