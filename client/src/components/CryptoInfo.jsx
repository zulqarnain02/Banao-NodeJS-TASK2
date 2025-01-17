import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CryptoInfo({ crypto }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchCryptoDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${crypto.id}`
        );
        setDetails(response.data);
      } catch (error) {
        console.error("Error fetching cryptocurrency details:", error);
      }
    };

    fetchCryptoDetails();
  }, [crypto]);

  if (!details) {
    return <p>Loading details...</p>;
  }

  return (
    <div className="p-4 bg-gray-50 rounded shadow-md">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-6">
        {details.name} ({details.symbol.toUpperCase()})
      </h2>
      <p className="text-lg leading-relaxed text-gray-700">
        The current price of <strong>{details.name}</strong> is{" "}
        <span className="text-green-600 font-bold">
          ${details.market_data.current_price.usd.toLocaleString()}
        </span>
        , with a market cap of{" "}
        <span className="text-blue-600 font-bold">
          ${details.market_data.market_cap.usd.toLocaleString()}
        </span>
        . Over the past 24 hours, it reached a high of{" "}
        <span className="text-red-600 font-bold">
          ${details.market_data.high_24h.usd.toLocaleString()}
        </span>{" "}
        and a low of{" "}
        <span className="text-blue-600 font-bold">
          ${details.market_data.low_24h.usd.toLocaleString()}
        </span>
        . <br />
        <br />
        <span className="italic">
          {details.description.en
            ? details.description.en.slice(0, 200)
            : "No description available."}
        </span>
      </p>
    </div>
  );
}
