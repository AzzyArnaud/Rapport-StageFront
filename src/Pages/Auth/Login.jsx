import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import fetchApi from "../../helpers/fetchApi";
import { setUserAction } from "../../store/actions/userActions";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = {
    EMAIL: email,
    PASSWORD: password,
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetchApi("/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Indique que le format des données est JSON
        },
        body: JSON.stringify(user), // Convertit l'objet user en chaîne JSON
      });

      if (response.statusCode === 200) {
        const resData = response.result;
        localStorage.setItem("user", JSON.stringify(resData));
        dispatch(setUserAction(resData));
        navigate("/home");
      } else {
        setError(
          response.message || "Une erreur est survenue. Veuillez réessayer."
        );
      }
    } catch (err) {
      setError(
        "Erreur de connexion. Veuillez vérifier votre email et mot de passe."
      );
      console.error("Erreur de connexion:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md transform hover:scale-105 transition-transform duration-300">
        <h2 className="text-3xl font-extrabold text-center text-indigo-600 mb-6">
          Connexion
        </h2>
        {error && (
          <p className="mt-4 text-sm text-center text-red-600">{error}</p>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-6 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Mot de passe
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 top-4 px-3 flex items-center text-gray-500 hover:text-indigo-500 transition-colors"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "Chargement..." : "Se connecter"}
          </button>

          <p className="mt-4 text-sm text-center text-gray-600">
            Vous avez oublié votre mot de passe ?{" "}
            <Link
              to="/forgot-password"
              className="text-indigo-600 hover:text-indigo-700"
            >
              Réinitialiser le mot de passe
            </Link>
          </p>
          <p className="mt-4 text-sm text-center text-gray-600">
            Vous n&apos;avez pas de compte ?{" "}
            <Link
              to="/signup"
              className="text-indigo-600 hover:text-indigo-700"
            >
              S&apos;inscrire
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
