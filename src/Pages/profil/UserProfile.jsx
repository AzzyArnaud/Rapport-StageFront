import React from "react";

const UserProfile = () => {
  // Données statiques pour le profil utilisateur
  const user = {
    name: "John Doe",
    bio: "Développeur Full Stack passionné | Amoureux du design minimaliste | Basé à San Francisco",
    email: "john.doe@example.com",
    location: "San Francisco, CA",
    profilePicture: "https://via.placeholder.com/150", // Remplacez par une URL réelle
    friendsCount: 350,
    postsCount: 80,
    commentsCount: 120,
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mt-10">
      {/* Section supérieure : couverture + avatar */}
      <div className="relative h-48 bg-gradient-to-r from-indigo-600 to-purple-600">
        <img
          className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full border-4 border-white shadow-lg"
          src={user.profilePicture}
          alt={user.name}
        />
      </div>

      {/* Informations du profil */}
      <div className="pt-16 text-center pb-8 px-6">
        <h2 className="text-3xl font-bold text-gray-900">{user.name}</h2>
        <p className="mt-2 text-lg text-gray-500">{user.bio}</p>
        <p className="mt-1 text-sm text-gray-400">{user.location}</p>
        <p className="mt-1 text-sm text-gray-400">{user.email}</p>
      </div>

      {/* Section des statistiques */}
      <div className="grid grid-cols-3 divide-x divide-gray-200 bg-gray-100 py-6">
        <div className="text-center">
          <p className="text-2xl font-semibold text-gray-800">
            {user.friendsCount}
          </p>
          <p className="text-gray-600">Amis</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-semibold text-gray-800">
            {user.postsCount}
          </p>
          <p className="text-gray-600">Publications</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-semibold text-gray-800">
            {user.commentsCount}
          </p>
          <p className="text-gray-600">Commentaires</p>
        </div>
      </div>

      {/* Bouton d'actions */}
      <div className="flex justify-center py-6">
        <button className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition duration-300">
          Modifier Profil
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
