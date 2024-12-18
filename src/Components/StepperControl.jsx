import React from "react";

const StepperControl = ({ handleClick, currentStep, steps }) => {
  return (
    <div
      className="container flex justify-around mt-0 mb-2"
      style={{ marginTop: "-20px" }}
    >
      {/* Back button */}
      <button
        onClick={() => handleClick("back")}
        className={`amx-cp-btn amx-mr-secondary ${
          currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        style={{ marginTop: "-40px" }} // Adjust margin as needed
      >
        Back
      </button>
      {/* Next/Confirm button */}
      <button
        onClick={() => handleClick("next")}
        className="amx-cp-btn"
        style={{ marginTop: "-40px" }} // Adjust margin as needed
      >
        {currentStep === steps.length - 1 ? "Confirm" : "Next"}
      </button>
    </div>
  );
};

export default StepperControl;
