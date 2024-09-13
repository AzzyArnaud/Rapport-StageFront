import { useState } from "react";
import Validation from "../class/Validation";

/**
 * Hook pour l'affichage des erreurs de formulaire en temps réel
 * @param {Object} data Les données à contrôler
 * @param {Object} rules Les règles pour les données
 * @param {Object} customMessages Les messages personnalisés pour les erreurs
 * @param {Object} customValidation Les validations personnalisées
 * @returns {Object} Un objet contenant les fonctions de gestion des erreurs
 */
export const useFormErrorsHandle = (
  data,
  rules,
  customMessages,
  customValidation
) => {
  const [errors, setErrors] = useState({});

  const validation = new Validation(
    data,
    rules,
    customMessages,
    customValidation
  );

  const setError = (key, errors) => {
    validation.setError(key, Array.isArray(errors) ? errors[0] : errors);
    setErrors((err) => ({
      ...err,
      [key]: Array.isArray(errors) ? errors : [],
    }));
  };

  const checkFieldData = (e) => {
    if (e) {
      if (e.preventDefault) {
        e.preventDefault();
      }
    }
    const name = e.target.name;
    const fieldErrors = validation.getError(name);
    if (fieldErrors?.length !== 0) {
      setError(name, fieldErrors);
    }
  };

  const hasError = (name) => errors[name] && errors[name].length > 0;

  const getError = (name) => {
    const first = errors[name] ? errors[name][0] : null;
    const second = validation.getError(name)
      ? validation.getError(name)[0]
      : null;
    return first || second;
  };

  const getErrors = () => validation.getErrors();

  const isValidate = () => {
    function areSubarraysEmpty(arr) {
      return arr.every((subarray) => subarray.length === 0);
    }
    const isValid = areSubarraysEmpty(Object.values(errors));
    validation.run();
    return isValid && validation.isValidate();
  };

  const run = () => validation.run();

  return {
    errors,
    setErrors,
    setError,
    getError,
    hasError,
    checkFieldData,
    getErrors,
    isValidate,
    run,
  };
};
