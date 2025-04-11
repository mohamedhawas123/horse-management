import React from "react";
import { BarLoader } from "react-spinners";

const FullScreenLoader: React.FC<{ loading: boolean }> = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
      <BarLoader color="#ffffff" width={150} />
    </div>
  );
};

export default FullScreenLoader;
