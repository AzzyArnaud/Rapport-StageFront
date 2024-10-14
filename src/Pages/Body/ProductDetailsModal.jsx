import React, { useState, useEffect, useRef } from "react";
import { Dialog } from "primereact/dialog";
import "primeicons/primeicons.css";
import fetchApi from "../../helpers/fetchApi";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../store/selectors/userSelector";
import { io } from "socket.io-client"; // Importer Socket.IO Client

const ProductDetailsModal = ({ showModal, onClose, product }) => {
  const [mainImage, setMainImage] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null); // State to store conversation ID
  const dispatch = useDispatch();
  const userConnected = useSelector(userSelector);

  const user = {
    id_user: userConnected.user.ID_UTILISATEUR,
    telephone: userConnected.user.TELEPHONE,
  };
  const socketRef = useRef(null); // Use a ref to store the socket instance

  useEffect(() => {
    if (product) {
      setMainImage(product.IMAGES_1);
      fetchConversationId(); // Fetch conversation ID on product load

      // Establish the connection with Socket.IO
      socketRef.current = io("http://localhost:8000");

      socketRef.current.on("connect", () => {
        console.log("Socket.IO connection established!");
      });

      socketRef.current.on("chatMessage", (newMessage) => {
        console.log("Received message:", newMessage);
        setMessages((prevMessages) => [...prevMessages, newMessage]); // Add new message
      });

      socketRef.current.on("disconnect", () => {
        console.log("Socket.IO connection closed!");
      });

      socketRef.current.on("error", (error) => {
        console.error("Socket.IO error:", error);
      });

      return () => {
        socketRef.current?.disconnect(); // Disconnect on component unmount
      };
    }
  }, [product]);
  console.log(product.seller.ID_UTILISATEUR);

  // Fetch conversation ID based on article, buyer, and seller
  const fetchConversationId = async () => {
    try {
      const response = await fetchApi(
        `/conversation/conversation/${product.ID_ARTICLE}/${user.id_user}/${product.seller.ID_UTILISATEUR}`
      );
      console.log(response);

      if (response.statusCode === 200 && response.result?.ID_CONVERSATION) {
        setConversationId(response.result.ID_CONVERSATION);
        fetchMessages(response.result.ID_CONVERSATION); // Fetch messages for the specific conversation
      } else {
        console.error("Conversation introuvable:", response.message);
      }
    } catch (error) {
      console.error("Erreur réseau ou serveur:", error);
    }
  };

  const handleImageClick = (image) => {
    setMainImage(image);
  };

  const handleChatSubmit = async () => {
    if (chatMessage.trim() !== "") {
      const newMessage = {
        text: chatMessage,
        sent: true, // Marque le message comme envoyé par l'utilisateur
        date: new Date().toISOString(),
        ID_UTILISATEUR: user.id_user,
        ID_ARTICLE: product.ID_ARTICLE,
        ID_CONVERSATION: conversationId,
      };

      // Send the message via Socket.IO
      if (socketRef.current) {
        socketRef.current.emit("chatMessage", newMessage); // Emit the message using socketRef

        // Do not add to the messages until we confirm it was sent correctly or received from server
        setChatMessage(""); // Clear the chat message input

        const formData = new FormData();
        formData.append("MESSAGE", chatMessage);
        formData.append("ID_BUYER", user.id_user);
        // formData.append("ID_SELLER", product.seller.ID_UTILISATEUR);
        formData.append("ID_ARTICLE", product.ID_ARTICLE);
        formData.append("ID_CONVERSATION", conversationId);

        try {
          const response = await fetchApi("/message/send", {
            method: "POST",
            body: formData,
          });

          if (response.statusCode === 200) {
            const { MESSAGE, DATE_ENVOYE } = response.result;

            // Ensure the message is correctly added with server timestamp
            setMessages((prevMessages) =>
              prevMessages.concat({
                text: MESSAGE,
                sent: true,
                date: DATE_ENVOYE, // Use the server's actual date
                ID_UTILISATEUR: user.id_user,
                ID_ARTICLE: product.ID_ARTICLE,
                ID_CONVERSATION: conversationId,
              })
            );
          } else {
            console.error("Error sending message:", response.message);
          }
        } catch (error) {
          console.error("Network or server error:", error);
        }
      } else {
        console.error("Socket.IO is not connected.");
      }
    }
  };

  const fetchMessages = async (conversationId) => {
    try {
      const response = await fetchApi(
        `/message/conversation/${conversationId}`
      );

      if (response.statusCode === 200) {
        const formattedMessages = response.result.map((msg) => {
          return {
            text: msg.MESSAGE,
            sent: msg.conversation?.ID_BUYER === user.id_user, // Vérifier si l'utilisateur a envoyé le message
            date: msg.DATE_ENVOYE,
            received: msg.conversation?.ID_BUYER !== user.id_user,
          };
        });
        setMessages(formattedMessages); // Mettre à jour l'historique des messages
      } else {
        console.error(
          "Erreur lors de la récupération des messages:",
          response.message
        );
      }
    } catch (error) {
      console.error("Erreur réseau ou serveur:", error);
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
            className="w-full max-h-[200px] object-contain mb-4 rounded-lg"
          />
          <div className="flex justify-center gap-2 mb-4">
            {[product.IMAGES_1, product.IMAGES_2, product.IMAGES_3].map(
              (image, index) =>
                image && (
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
          href={`https://wa.me/${
            user ? "257" + user.telephone : ""
          }?text=Bonjour, je suis intéressé par votre produit.`}
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
            <div className="flex-1 overflow-y-auto mb-4">
              {messages.map((message, index) => {
                const isSent = message.sent; // "sent" est vrai si le message a été envoyé par l'utilisateur
                const isReceived = message.received; // "received" est vrai si le message a été reçu
                console.log(message);

                return (
                  <div
                    key={index}
                    className={`mb-2 flex ${
                      isSent ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`inline-block p-2 rounded-lg max-w-[80%] ${
                        isSent
                          ? "bg-teal-100 text-teal-800" // Message envoyé par l'utilisateur
                          : isReceived
                          ? "bg-blue-100 text-blue-800" // Message reçu
                          : "bg-gray-100 text-gray-800" // Autres messages
                      }`}
                    >
                      <span className="text-sm">{message.text}</span>
                      <br />
                      <span className="text-xs text-gray-500">
                        {new Date(message.date).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
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
