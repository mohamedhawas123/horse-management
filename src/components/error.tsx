import React, { useState, useEffect } from "react";
import { X } from "lucide-react"; 

const FullScreenError: React.FC<{ showError: string | boolean }> = ({ showError }) => {
  const [visible, setVisible] = useState(!!showError);

  useEffect(() => {
    if (showError) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [showError]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-40 backdrop-blur-sm z-50 transition-opacity animate-fadeIn">
      <div className="relative bg-gradient-to-br from-red-600 to-red-500 text-white text-xl font-bold px-10 py-6 rounded-2xl shadow-2xl max-w-md w-full text-center">
      
        <button
          className="absolute top-3 right-3 text-white bg-red-700 hover:bg-red-800 p-2 rounded-full transition duration-300"
          onClick={() => setVisible(false)}
        >
          <X size={24} />
        </button>
        
        <p>{typeof showError === "string" ? showError : "An error occurred! Please try again."}</p>
      </div>
    </div>
  );
};

export default FullScreenError;
