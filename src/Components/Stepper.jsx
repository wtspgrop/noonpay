import React, { useEffect, useState, useRef } from "react";

const Stepper = ({ steps, currentStep }) => {
  const [newStep, setNewStep] = useState([]);
  const stepRef = useRef();

  const updateStep = (stepNumber, steps) => {
    const newSteps = [...steps];
    let count = 0;
    while (count < newSteps.length) {
      // current step
      if (count === stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: true,
          selected: true,
          completed: true,
        };
        count++;
      }
      // step completed
      else if (count < stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: true,
          completed: true,
        };
        count++;
      } else {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: false,
          completed: false,
        };
        count++;
      }
    }
    return newSteps;
  };

  useEffect(() => {
    // create object
    const stepsState = steps.map((step, index) =>
      Object.assign(
        {},
        {
          description: step,
          completed: false,
          highlighted: index === 0 ? true : false,
          selected: index === 0 ? true : false,
        },
      ),
    );
    stepRef.current = stepsState;
    const current = updateStep(currentStep - 1, stepRef.current);
    setNewStep(current);
  }, [steps, currentStep]);

  const displaySteps = newStep.map((step, index) => {
    return (
      <div
        key={index}
        className={
          index !== newStep.length - 1
            ? "w-full flex items-center"
            : "flex items-center"
        }
      >
        <div className="relative flex flex-col items-center text-teal-600">
          <div
            className={`rounded-full transition duration-500 ease-in-out border-2 border-gray-300 h-8 w-8 flex items-center justify-center py-3 ${
              step.selected
                ? "bg-red-600 text-white font-bold border border-red-600"
                : ""
            }`}
          >
            {/* Display number */}
            {step.completed ? (
              <span className="text-white font-bold text-2xl">&#10003;</span>
            ) : (
              index + 1
            )}
          </div>
          <div
            className={`absolute top-[35px] text-center w-45 text-xs font-medium uppercase ${
              step.highlighted ? "text-gray-900" : "text-gray-900"
            }`}
          >
            {/* Display description */}
            {step.description}
          </div>
        </div>
        <div
          className={`flex-auto border-t-4 transition duration-500 ease-in-out ${
            step.completed ? "border-red-600" : "border-gray-300"
          }`}
        >
          {/* Display line */}
        </div>
      </div>
    );
  });

  return (
    <div
      className="mx-4 p-4 flex justify-between items-center"
      style={{
        marginTop: "-40px", // Adjust the top space
        marginBottom: "20px", // Adjust the bottom space
      }}
    >
      {displaySteps}
    </div>
  );
};

export default Stepper;
