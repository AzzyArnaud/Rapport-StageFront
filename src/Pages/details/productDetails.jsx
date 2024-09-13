import { useState } from "react";

const ProductDetails = () => {
  // Données du produit principal
  const product = {
    name: "Essentials Men's Regular-Fit Long-Sleeve Oxford Shirt",
    description: `Long-sleeve dress shirt in classic fit featuring button-down collar.
    Patch Pocket on Left Chest.
    Durable Combination Cotton Fabric.
    Comfortable and quality dress shirt.
    Go To Classic button down shirt for all special occasions.`,
    price: "$45.00",
    rating: 4.9,
    reviewsCount: "2.3k Reviews",
    images: [
      "../public/images/shoes2.jpg",
      "../public/images/shoes3.jpg",
      "../public/images/shoes4.jpg",
      "../public/images/shoes5.jpg",
      "../public/images/shoes5.jpg",
      "../public/images/shoes5.jpg",
    ],
    stock: 656,
    discount: "25% OFF Until Oct 30, 2022",
  };

  // Produits recommandés (statique)
  const recommendedProducts = [
    {
      id: 1,
      name: "Classic Black Sneakers",
      price: "$50.00",
      image: "../public/images/shoes2.jpg",
    },
    {
      id: 2,
      name: "Stylish Running Shoes",
      price: "$60.00",
      image: "../public/images/shoes3.jpg",
    },
    {
      id: 3,
      name: "Elegant Dress Shoes",
      price: "$70.00",
      image: "../public/images/shoes4.jpg",
    },
    {
      id: 4,
      name: "Casual Loafers",
      price: "$45.00",
      image: "../public/images/shoes5.jpg",
    },
    {
      id: 5,
      name: "Casual Loafers",
      price: "$45.00",
      image: "../public/images/t-shart.jpg",
    },
    {
      id: 6,
      name: "Casual Loafers",
      price: "$45.00",
      image: "../public/images/t-shart2.jpg",
    },
    {
      id: 7,
      name: "Casual Loafers",
      price: "$45.00",
      image: "../public/images/shoes2.jpg",
    },
    {
      id: 8,
      name: "Casual Loafers",
      price: "$45.00",
      image: "../public/images/back1.jpg",
    },
    {
      id: 9,
      name: "Casual Loafers",
      price: "$45.00",
      image: "../public/images/back2.jpg",
    },
  ];

  // État pour suivre l'image sélectionnée
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  // Nombre maximum d'images miniatures à afficher
  const maxThumbnails = 4;

  return (
    <div className="container mx-auto p-6 lg:p-12">
      <div className="flex flex-col lg:flex-row">
        {/* Section gauche - Images du produit */}
        <div className="lg:w-1/2">
          {/* Image principale */}
          <img
            src={selectedImage}
            alt={product.name}
            className="w-full h-[500px] object-cover rounded-lg shadow-lg" // Fixe la hauteur à 500px
          />
          <div className="flex justify-center gap-4 mt-4 overflow-x-auto">
            {product.images.slice(0, maxThumbnails).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} ${index + 1}`}
                className="w-24 h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition duration-300"
                onClick={() => setSelectedImage(image)} // Remplace l'image principale par celle sélectionnée
              />
            ))}
          </div>
        </div>

        {/* Section droite - Détails du produit */}
        <div className="lg:w-1/2 lg:pl-8 mt-6 lg:mt-0">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center mb-2">
            <span className="text-yellow-500 text-xl">
              {"⭐".repeat(Math.floor(product.rating))}
            </span>
            <span className="ml-2 text-gray-600">{product.reviewsCount}</span>
          </div>
          <p className="text-3xl font-semibold mb-2">{product.price}</p>
          <p className="text-green-500 text-sm mb-4">{product.discount}</p>

          {/* Choix de taille */}
          <div className="mb-4">
            <label className="text-sm text-gray-700 font-medium">
              Choose Size:
            </label>
            <div className="flex items-center mt-2 flex-wrap">
              {["S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  className="border px-4 py-2 rounded-md mr-2 mb-2 hover:bg-gray-100 transition duration-300"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Description:</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>

          {/* Informations sur l'expédition */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">
              Shipping Information:
            </h2>
            <p className="text-gray-700">
              Delivery: Shipping from Jakarta, Indonesia
            </p>
            <p className="text-gray-700">
              Shipping: FREE International Shipping
            </p>
            <p className="text-gray-700">
              Arrival: Estimated arrival on 25 - 27 Oct 2022
            </p>
          </div>

          {/* Informations sur le vendeur */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Seller Information:</h2>
            <p className="text-gray-700">Thrifting_Store</p>
            <p className="text-gray-700">Active 5 Minutes ago</p>
            <p className="text-gray-700">96.7% Positive Feedback</p>
            <button className="text-blue-500">Visit Store</button>
          </div>
        </div>
      </div>

      {/* Produits recommandés */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Recommended Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedProducts.map((product) => (
            <div key={product.id} className="p-4 border rounded-lg shadow-sm">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-2"
                style={{ aspectRatio: "1 / 1" }} // Maintient le ratio d'aspect carré
              />
              <p className="text-sm font-bold mb-1">{product.name}</p>
              <p className="text-green-500 font-semibold">{product.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Icône de chat WhatsApp */}
      <a
        href={`https://wa.me/${"+25779288438"}?text=Hello,%20I%20am%20interested%20in%20the%20${encodeURIComponent(
          product.name
        )}.%20Can%20we%20discuss%20more?`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 p-3 rounded-full shadow-lg hover:bg-green-600 transition duration-300"
        title="Chat with Seller"
      >
        <img
          src="../public/images/whatsapp-icon.png" // Met à jour avec le chemin correct
          alt="WhatsApp"
          className="w-8 h-8 rounded-full"
        />
      </a>
    </div>
  );
};

export default ProductDetails;
