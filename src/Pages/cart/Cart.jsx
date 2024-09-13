import { useState } from "react";

const Cart = () => {
  const [items, setItems] = useState([
    { id: 1, name: "Pi Pizza Oven", price: 449.99, quantity: 1 },
    { id: 2, name: "Grill Ultimate Bundle", price: 639.99, quantity: 1 },
    { id: 3, name: "Starters (4 pack)", price: 0.0, quantity: 1 },
    { id: 4, name: "Charcoal Grill Pack", price: 0.0, quantity: 1 },
  ]);

  const handleQuantityChange = (id, change) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      )
    );
  };

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.07; // Exemple: 7% de taxe
  const grandTotal = subtotal + tax;

  return (
    <div className="p-4 sm:p-6 bg-gray-100 shadow-lg rounded-lg max-w-4xl mx-auto mt-10 border border-gray-200">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-800">
        Your Cart ({items.length} items)
      </h1>
      <table className="w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-3 px-2 sm:px-4 text-left text-sm sm:text-base">
              Item
            </th>
            <th className="py-3 px-2 sm:px-4 text-right text-sm sm:text-base">
              Price
            </th>
            <th className="py-3 px-2 sm:px-4 text-right text-sm sm:text-base">
              Quantity
            </th>
            <th className="py-3 px-2 sm:px-4 text-right text-sm sm:text-base">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-50">
              <td className="py-4 px-2 sm:px-4 text-gray-800 text-sm sm:text-base">
                {item.name}
              </td>
              <td className="py-4 px-2 sm:px-4 text-right text-gray-600 text-sm sm:text-base">
                ${item.price.toFixed(2)}
              </td>
              <td className="py-4 px-2 sm:px-4 text-right">
                <div className="flex justify-end items-center space-x-1 sm:space-x-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, -1)}
                    className="px-2 py-1 sm:px-3 sm:py-1.5 bg-gray-300 text-gray-800 border border-gray-400 rounded hover:bg-gray-400"
                  >
                    -
                  </button>
                  <span className="text-gray-700 text-sm sm:text-base">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(item.id, 1)}
                    className="px-2 py-1 sm:px-3 sm:py-1.5 bg-gray-300 text-gray-800 border border-gray-400 rounded hover:bg-gray-400"
                  >
                    +
                  </button>
                </div>
              </td>
              <td className="py-4 px-2 sm:px-4 text-right text-gray-700 text-sm sm:text-base">
                ${(item.price * item.quantity).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="border-t pt-6 mt-6">
        <div className="flex justify-between text-gray-800 text-lg sm:text-xl font-semibold">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-800 text-lg sm:text-xl font-semibold mt-1">
          <span>Sales Tax (7%):</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-900 text-xl sm:text-2xl font-bold mt-2">
          <span>Grand Total:</span>
          <span>${grandTotal.toFixed(2)}</span>
        </div>
      </div>
      <button className="mt-8 w-full py-2 sm:py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Check out
      </button>
    </div>
  );
};

export default Cart;
