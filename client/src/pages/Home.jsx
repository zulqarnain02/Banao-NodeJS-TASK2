import React from "react";
// import Background from "../components/Background";
// import CryptoDetail from "../components/CryptoDetail";
import CryptoDashboard from "../components/CryptoDashboard";
import SetAlert from "../components/SetAlert";




const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 relative">
      <CryptoDashboard/>
      {/* Button with absolute positioning at the top-right */}
      <SetAlert/>
    </div>
  );
};

export default Home;
