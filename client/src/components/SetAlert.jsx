import React, { useState } from "react";
import axios from "../api/axios";

const SetAlert = () => {
  const [email, setEmail] = useState("");
  const [cryptoId, setCryptoId] = useState("");
  const [priceThreshold, setPriceThreshold] = useState("");

  const handleSetAlert = async () => {
    try {
      await axios.post("/set-alert", { email, cryptoId, priceThreshold });
      alert("Alert criteria set successfully!");
    } catch (error) {
      console.error("Error setting alert:", error);
      alert("Failed to set alert. Please try again.");
    }
  };

  return (
    <div className="p-9 bg-white rounded-lg shadow-lg border border-gray-200 m-8">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        Set Price Alert
      </h2>
      <div className="space-y-6">
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Your Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Crypto ID</label>
          <input
            type="text"
            placeholder="e.g., bitcoin"
            value={cryptoId}
            onChange={(e) => setCryptoId(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Price Threshold</label>
          <input
            type="number"
            placeholder="e.g., 50000"
            value={priceThreshold}
            onChange={(e) => setPriceThreshold(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleSetAlert}
          className="w-3/4 p-4 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all mx-auto block"
        >
          Set Alert
        </button>
      </div>
    </div>
  );
};

export default SetAlert;
