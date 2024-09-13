import React, { useState } from "react";

function RightCard() {
  const [activeTab, setActiveTab] = useState("Electricity Bill");
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState(""); // Par exemple, pour le montant dans plusieurs menus

  const renderContent = () => {
    switch (activeTab) {
      case "Electricity Bill":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex items-center">
              <label className="flex-grow mr-2">
                <span className="block text-sm font-medium text-gray-700">
                  Meter Number
                </span>
                <input
                  type="text"
                  placeholder="Enter your meter number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                />
              </label>
            </div>
            <div className="flex items-center">
              <label className="flex-grow mr-2">
                <span className="block text-sm font-medium text-gray-700">
                  Amount
                </span>
                <input
                  type="text"
                  placeholder="Enter the amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                />
              </label>
            </div>
          </div>
        );

      case "Internet Data":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex items-center">
              <label className="flex-grow mr-2">
                <span className="block text-sm font-medium text-gray-700">
                  Phone Number
                </span>
                <input
                  type="text"
                  placeholder="Enter your phone number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                />
              </label>
            </div>
            <div className="flex items-center">
              <label className="flex-grow mr-2">
                <span className="block text-sm font-medium text-gray-700">
                  Data Plan
                </span>
                <select
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                >
                  <option value="">Select a plan</option>
                  <option value="5GB">5GB</option>
                  <option value="10GB">10GB</option>
                  <option value="Unlimited">Unlimited</option>
                </select>
              </label>
            </div>
          </div>
        );

      case "Flight":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex items-center">
              <label className="flex-grow mr-2">
                <span className="block text-sm font-medium text-gray-700">
                  Booking Reference
                </span>
                <input
                  type="text"
                  placeholder="Enter your booking reference"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                />
              </label>
            </div>
            <div className="flex items-center">
              <label className="flex-grow mr-2">
                <span className="block text-sm font-medium text-gray-700">
                  Flight Date
                </span>
                <input
                  type="date"
                  value={amount} // Using "amount" for date
                  onChange={(e) => setAmount(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                />
              </label>
            </div>
          </div>
        );

      case "Top Up":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex items-center">
              <label className="flex-grow mr-2">
                <span className="block text-sm font-medium text-gray-700">
                  Phone Number
                </span>
                <input
                  type="text"
                  placeholder="Enter your phone number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                />
              </label>
            </div>
            <div className="flex items-center">
              <label className="flex-grow mr-2">
                <span className="block text-sm font-medium text-gray-700">
                  Top Up Amount
                </span>
                <input
                  type="text"
                  placeholder="Enter the top up amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                />
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-2 bg-white shadow-md rounded-md">
      {/* Navigation Tabs */}
      <div className="flex justify-between mb-4 text-lg font-semibold text-gray-800">
        <div
          className={`hover:text-gray-600 cursor-pointer ${
            activeTab === "Electricity Bill" ? "text-teal-500" : ""
          }`}
          onClick={() => setActiveTab("Electricity Bill")}
        >
          Electricity Bill
        </div>
        <div
          className={`hover:text-gray-600 cursor-pointer ${
            activeTab === "Internet Data" ? "text-teal-500" : ""
          }`}
          onClick={() => setActiveTab("Internet Data")}
        >
          Internet Data
        </div>
        <div
          className={`hover:text-gray-600 cursor-pointer ${
            activeTab === "Flight" ? "text-teal-500" : ""
          }`}
          onClick={() => setActiveTab("Flight")}
        >
          Flight
        </div>
        <div
          className={`hover:text-gray-600 cursor-pointer ${
            activeTab === "Top Up" ? "text-teal-500" : ""
          }`}
          onClick={() => setActiveTab("Top Up")}
        >
          Top Up
        </div>
      </div>

      {/* Form Fields */}
      {renderContent()}

      {/* Submit Button */}
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600">
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default RightCard;
