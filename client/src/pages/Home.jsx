import React from "react";
import Background from "../components/Background";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("token"); // Remove token from storage
    navigate("/login"); // Use navigate to go to login page
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 relative">
      <Background />
      Hello world
      {/* Button with absolute positioning at the top-right */}
      <button
        onClick={handleLogout}
        className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-700 absolute top-4 right-4"
      >
        Sign out
      </button>
    </div>
  );
};

export default Home;
