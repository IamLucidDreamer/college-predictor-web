import React from "react";
import Updates from "../layout/Updates";
import Predictor from "../predictor";
import NeetIndex from "../predictor/neet";

const HomePage = () => {
  return (
    <div className="text-4x">
      <div className="flex justify-between items-start gap-6 m-2 lg:m-6">
        <div className="w-full lg:w-3/4">
          <NeetIndex />
        </div>
        <Updates />
      </div>
    </div>
  );
};

export default HomePage;
