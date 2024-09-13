import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import "primeicons/primeicons.css"; // Importation des icônes
import fetchApi from "../../helpers/fetchApi";

const ProductDetailsModal = ({ showModal, onClose, product }) => {
  const [mainImage, setMainImage] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (product) {
      setMainImage(product.IMAGES_1);
    }
  }, [product]);

  const handleImageClick = (image) => {
    setMainImage(image);
  };

  const handleChatSubmit = async () => {
    if (chatMessage.trim() !== "") {
      const formData = new FormData();
      formData.append("MESSAGE", chatMessage);

      try {
        const response = await fetchApi("/message/send", {
          method: "POST",
          body: formData,
        });

        if (response.statusCode === 200) {
          const { MESSAGE, DATE_ENVOYE } = response.result;
          setMessages([
            ...messages,
            { text: MESSAGE, sent: true, date: DATE_ENVOYE },
          ]);
          setChatMessage("");
        } else {
          console.error(
            "Erreur lors de l'envoi du message : ",
            response.message
          );
        }
      } catch (error) {
        console.error("Erreur réseau ou serveur : ", error);
      }
    }
  };

  return (
    <Dialog
      header={product?.NOM_ARTICLE}
      visible={showModal}
      onHide={onClose}
      className="p-fluid p-3 text-center"
      style={{
        width: "90vw",
        maxWidth: "600px",
        borderRadius: "8px",
        backgroundColor: "white",
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
        position: "relative",
      }}
    >
      {product ? (
        <div className="space-y-4 p-4">
          <img
            src={mainImage}
            alt={product.NOM_ARTICLE}
            className="w-full max-h-[400px] object-contain mb-4 rounded-lg"
          />
          <div className="flex justify-center gap-2 mb-4">
            {[product.IMAGES_1, product.IMAGES_2, product.IMAGES_3].map(
              (image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-16 h-16 object-cover cursor-pointer rounded-md border border-gray-200 hover:border-teal-500"
                  onClick={() => handleImageClick(image)}
                />
              )
            )}
          </div>
          <div className="text-left">
            <h3 className="text-xl font-semibold mb-2">
              {product.MARQUE_ARTICLE}
            </h3>
            <p className="text-gray-700 text-sm mb-2">
              {product.DESCRIPTION_ARTICLE}
            </p>
            <p className="text-gray-700 text-sm">{product.ADRESSE_ARTICLE}</p>
          </div>
        </div>
      ) : (
        <div className="p-6 text-center">Chargement des détails...</div>
      )}

      <div className="flex justify-end space-x-4 mt-4">
        <a
          href="https://wa.me/25762717022"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-500 text-3xl hover:text-green-600 bg-white p-2 rounded-full"
        >
          <i className="pi pi-whatsapp"></i>
        </a>
        <i
          className="pi pi-comments text-blue-500 text-3xl hover:text-blue-600 cursor-pointer bg-white p-2 rounded-full"
          onClick={() => setIsChatOpen(!isChatOpen)}
        ></i>
      </div>

      {isChatOpen && (
        <div
          className="absolute right-0 top-0 w-full md:w-80 bg-white shadow-lg border-l border-gray-200 p-4 z-50 flex flex-col"
          style={{ height: "calc(100% - 3rem)" }}
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Envoyer une description</h3>
            <i
              className="pi pi-times text-xl cursor-pointer"
              onClick={() => setIsChatOpen(false)}
            ></i>
          </div>
          <div className="flex-1 overflow-y-auto mb-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 ${message.sent ? "text-right" : ""}`}
              >
                <div
                  className={`inline-block p-2 rounded-lg ${
                    message.sent
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {message.text}
                  <br />
                  <small className="text-xs text-gray-400">
                    {new Date(message.date).toLocaleString()}
                  </small>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center border-t border-gray-200 pt-2">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="Entrez votre message ici..."
              className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              className="bg-blue-500 text-white p-2 rounded-full ml-2 hover:bg-blue-600"
              onClick={handleChatSubmit}
            >
              <i className="pi pi-send"></i>
            </button>
          </div>
        </div>
      )}
    </Dialog>
  );
};

export default ProductDetailsModal;
