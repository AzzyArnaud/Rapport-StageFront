import { useState } from "react";

function CartLeft() {
  const categories = [
    { id: 1, name: "polo", imgSrc: "./public/images/t-shart.jpg" },
    { id: 2, name: "shoes", imgSrc: "./public/images/shoes2.jpg" },
    { id: 4, name: "t shart", imgSrc: "./public/images/t-shart2.jpg" },
    { id: 3, name: "shoes", imgSrc: "./public/images/shoes3.jpg" },
    { id: 5, name: "hat", imgSrc: "./public/images/shoes4.jpg" },
    { id: 6, name: "glasses", imgSrc: "./public/images/shoes5.jpg" },
  ];

  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 4;

  const handleNext = () => {
    if (startIndex < categories.length - visibleCount) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <div className="lg:w-1/2 items-start space-y-4 lg:space-y-0 lg:space-x-4 lg:translate-x-0 lg:left-52 relative">
      {/* Left side card */}
      <div className="w-full lg:w-11/12 bg-white p-2 rounded-lg shadow-lg top-10 mb-4 lg:mb-0">
        <h2 className="text-lg font-semibold mb-4">Acheter par catégories</h2>

        <div className="relative flex items-center">
          {/* Bouton Précédent */}
          {startIndex > 0 && (
            <button
              className="absolute left-0 bg-teal-500 text-white p-2 rounded-full shadow-lg hover:bg-teal-600 transition duration-300"
              onClick={handlePrev}
            >
              &lt;
            </button>
          )}

          {/* Catégories */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 mx-12">
            {categories
              .slice(startIndex, startIndex + visibleCount)
              .map((category) => (
                <div
                  key={category.id}
                  className="bg-white p-2 border border-gray-200 rounded-md shadow-lg transform transition-transform duration-300 hover:scale-105"
                >
                  <img
                    src={category.imgSrc}
                    alt={category.name}
                    className="w-full h-[80px] object-cover"
                  />
                  <span>{category.name}</span>
                </div>
              ))}
          </div>

          {/* Bouton Suivant */}
          {startIndex < categories.length - visibleCount && (
            <button
              className="absolute right-0 bg-teal-500 text-white p-2 rounded-full shadow-lg hover:bg-teal-600 transition duration-300"
              onClick={handleNext}
            >
              &gt;
            </button>
          )}
        </div>

        <div className="mt-4 text-right lg:absolute lg:top-0 lg:right-16">
          <a href="#" className="text-sm text-teal-500">
            Voir plus
          </a>
        </div>
      </div>
    </div>
  );
}

export default CartLeft;
