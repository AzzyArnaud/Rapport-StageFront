import React, { useState } from "react";

const Settings = () => {
  // États pour les préférences de l'utilisateur
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [emailUpdates, setEmailUpdates] = useState(true);

  // Gestion du changement de préférences
  const handleNotificationChange = () => {
    setNotifications(!notifications);
  };

  const handleDarkModeChange = () => {
    setDarkMode(!darkMode);
  };

  const handleEmailUpdatesChange = () => {
    setEmailUpdates(!emailUpdates);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Paramètres du Compte
      </h2>

      {/* Section Notifications */}
      <div className="mb-5">
        <h3 className="text-xl font-semibold text-gray-800">Notifications</h3>
        <div className="flex items-center justify-between mt-3">
          <p className="text-gray-600">Activer les notifications push</p>
          <label className="switch">
            <input
              type="checkbox"
              checked={notifications}
              onChange={handleNotificationChange}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>

      {/* Section Mode Sombre */}
      <div className="mb-5">
        <h3 className="text-xl font-semibold text-gray-800">Apparence</h3>
        <div className="flex items-center justify-between mt-3">
          <p className="text-gray-600">Activer le mode sombre</p>
          <label className="switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={handleDarkModeChange}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>

      {/* Section Mises à jour par e-mail */}
      <div className="mb-5">
        <h3 className="text-xl font-semibold text-gray-800">
          Mises à jour par e-mail
        </h3>
        <div className="flex items-center justify-between mt-3">
          <p className="text-gray-600">Recevoir des mises à jour par e-mail</p>
          <label className="switch">
            <input
              type="checkbox"
              checked={emailUpdates}
              onChange={handleEmailUpdatesChange}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>

      {/* Bouton Enregistrer */}
      <div className="flex justify-end">
        <button className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300">
          Enregistrer les Modifications
        </button>
      </div>
    </div>
  );
};

// Styles pour le bouton bascule (switch)
const style = `
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 12px;
  width: 12px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #4f46e5;
}

input:checked + .slider:before {
  transform: translateX(18px);
}
`;

// Injecter le style dans la page
const styleTag = document.createElement("style");
styleTag.textContent = style;
document.head.appendChild(styleTag);

export default Settings;
