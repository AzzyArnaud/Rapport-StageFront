import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import fetchApi from "../../helpers/fetchApi";
import { useDispatch } from "react-redux";
import { setUserAction } from "../../store/actions/userActions";

function SignUp() {
  const [formData, setFormData] = useState({
    NOM_UTILISATEUR: "",
    PRENOM_UTILISATEUR: "",
    EMAIL: "",
    PASSWORD: "",
    confirmPassword: "",
    TELEPHONE: "",
    ADRESSE_UTILISATEUR: "",
    CNI: "",
    GENRE: "Homme",
    NIF: "",
    RC: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState(""); // Message de soumission
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      "NOM_UTILISATEUR",
      "PRENOM_UTILISATEUR",
      "EMAIL",
      "PASSWORD",
      "TELEPHONE",
      "ADRESSE_UTILISATEUR",
      "CNI",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        newErrors[field] = "Ce champ est obligatoire.";
      }
    }

    if (formData.PASSWORD.length < 8) {
      newErrors.PASSWORD =
        "Le mot de passe doit contenir au moins 8 caractères.";
    }

    if (formData.PASSWORD !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas.";
    }

    if (!/^\d{8}$/.test(formData.TELEPHONE)) {
      newErrors.TELEPHONE =
        "Le numéro de téléphone doit contenir exactement 8 chiffres.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.EMAIL)) {
      newErrors.EMAIL = "Veuillez entrer une adresse e-mail valide.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setSubmissionMessage(""); // Reset the message

    const data = new FormData();
    data.append("NOM_UTILISATEUR", formData.NOM_UTILISATEUR);
    data.append("PRENOM_UTILISATEUR", formData.PRENOM_UTILISATEUR);
    data.append("EMAIL", formData.EMAIL);
    data.append("PASSWORD", formData.PASSWORD);
    data.append("TELEPHONE", formData.TELEPHONE);
    data.append("ADRESSE_UTILISATEUR", formData.ADRESSE_UTILISATEUR);
    data.append("CNI", formData.CNI);
    data.append("GENRE", formData.GENRE);
    data.append("NIF", formData.NIF);
    data.append("RC", formData.RC);

    try {
      const response = await fetchApi("/users/signup", {
        method: "POST",
        body: data,
      });

      const resData = response.result;

      await localStorage.setItem("user", JSON.stringify(resData));
      dispatch(setUserAction(resData));
      setSubmissionMessage("Inscription réussie ! Redirection en cours...");
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (error) {
      setErrors({
        form: "Erreur de connexion au serveur. Veuillez réessayer.",
      });
      setSubmissionMessage(
        "Échec de l'inscription. Veuillez vérifier vos informations."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-12 px-4 sm:px-6 lg:px-8 transition-all duration-500 ease-in-out">
      <div className="bg-white shadow-xl rounded-lg p-12 w-full max-w-3xl transform transition duration-700 hover:scale-105">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Créer un compte
        </h2>
        {errors.form && (
          <div className="text-red-500 text-sm mb-4 flex justify-center">
            {errors.form}
          </div>
        )}
        {submissionMessage && (
          <div
            className={`text-sm mb-4 flex justify-center ${
              submissionMessage.includes("réussie")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {submissionMessage}
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-6">
          {/* Nom et Prénom */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="NOM_UTILISATEUR"
                className="block text-sm font-medium text-gray-700"
              >
                Nom <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="NOM_UTILISATEUR"
                name="NOM_UTILISATEUR"
                value={formData.NOM_UTILISATEUR}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              {errors.NOM_UTILISATEUR && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.NOM_UTILISATEUR}
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor="PRENOM_UTILISATEUR"
                className="block text-sm font-medium text-gray-700"
              >
                Prénom <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="PRENOM_UTILISATEUR"
                name="PRENOM_UTILISATEUR"
                value={formData.PRENOM_UTILISATEUR}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              {errors.PRENOM_UTILISATEUR && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.PRENOM_UTILISATEUR}
                </div>
              )}
            </div>
          </div>

          {/* Email et Téléphone */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="EMAIL"
                className="block text-sm font-medium text-gray-700"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="EMAIL"
                name="EMAIL"
                value={formData.EMAIL}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              {errors.EMAIL && (
                <div className="text-red-500 text-sm mt-1">{errors.EMAIL}</div>
              )}
            </div>
            <div>
              <label
                htmlFor="TELEPHONE"
                className="block text-sm font-medium text-gray-700"
              >
                Téléphone <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="TELEPHONE"
                name="TELEPHONE"
                value={formData.TELEPHONE}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              {errors.TELEPHONE && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.TELEPHONE}
                </div>
              )}
            </div>
          </div>

          {/* Mot de passe et Confirmation */}
          <div className="grid grid-cols-2 gap-6">
            <div className="relative">
              <label
                htmlFor="PASSWORD"
                className="block text-sm font-medium text-gray-700"
              >
                Mot de passe <span className="text-red-500">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="PASSWORD"
                name="PASSWORD"
                value={formData.PASSWORD}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 top-4 px-3 py-2 text-gray-500 focus:outline-none"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.PASSWORD && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.PASSWORD}
                </div>
              )}
            </div>
            <div className="relative">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirmer le mot de passe{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 top-4 px-3 py-2 text-gray-500 focus:outline-none"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.confirmPassword && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </div>
              )}
            </div>
          </div>

          {/* Adresse et CNI */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="ADRESSE_UTILISATEUR"
                className="block text-sm font-medium text-gray-700"
              >
                Adresse <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="ADRESSE_UTILISATEUR"
                name="ADRESSE_UTILISATEUR"
                value={formData.ADRESSE_UTILISATEUR}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              {errors.ADRESSE_UTILISATEUR && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.ADRESSE_UTILISATEUR}
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor="CNI"
                className="block text-sm font-medium text-gray-700"
              >
                Numéro CNI <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="CNI"
                name="CNI"
                value={formData.CNI}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              {errors.CNI && (
                <div className="text-red-500 text-sm mt-1">{errors.CNI}</div>
              )}
            </div>
            <div>
              <label
                htmlFor="CNI"
                className="block text-sm font-medium text-gray-700"
              >
                Numéro RC
              </label>
              <input
                type="text"
                id="RC"
                name="RC"
                value={formData.RC}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="NIF"
                className="block text-sm font-medium text-gray-700"
              >
                Numéro NIF
              </label>
              <input
                type="text"
                id="NIF"
                name="NIF"
                value={formData.NIF}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Genre */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Genre <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center space-x-4 mt-1">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="genre-homme"
                  name="GENRE"
                  value="Homme"
                  checked={formData.GENRE === "Homme"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label
                  htmlFor="genre-homme"
                  className="ml-2 text-sm text-gray-600"
                >
                  Homme
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="genre-femme"
                  name="GENRE"
                  value="Femme"
                  checked={formData.GENRE === "Femme"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label
                  htmlFor="genre-femme"
                  className="ml-2 text-sm text-gray-600"
                >
                  Femme
                </label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none transition-all"
            >
              {loading ? "Chargement..." : "S'inscrire"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Déjà un compte ?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Connectez-vous
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
