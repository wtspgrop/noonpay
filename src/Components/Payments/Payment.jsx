import React from "react";
import Card from "react-credit-cards";
import validator from "validator";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "./utilis";
import "react-credit-cards/es/styles-compiled.css";

export default function Payment({ state, setState, error }) {
  const handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      setState({ ...state, issuer: issuer });
    }
  };

  const handleInputFocus = (e) => {
    setState({ ...state, focus: e.target.name });
  };

  const handleInputChange = (e) => {
    if (e.target.name === "number") {
      e.target.value = formatCreditCardNumber(e.target.value);
    } else if (e.target.name === "expiry") {
      e.target.value = formatExpirationDate(e.target.value);
    } else if (e.target.name === "cvc") {
      e.target.value = formatCVC(e.target.value);
    }
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <div
      id="PaymentForm"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: "20px", // Added top padding
        marginTop: "-20px", // Adjusted negative margin
      }}
    >
      {/* طرق الدفع text */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          width: "100%",
          position: "absolute",
          top: "90px", // Adjust this value for vertical positioning
        }}
      >
        <p style={{ fontWeight: "bold", textAlign: "right", margin: 10 }}>
          :طرق الدفع{" "}
        </p>
      </div>

      {/* بطاقة ائتمان text and Card Logos on the same line */}
      <div
        style={{
          display: "flex",
          width: "100%",
          position: "absolute",
          top: "130px", // Adjust this value for spacing between the texts
        }}
      >
        {/* Card Logo on the left */}
        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "20px" }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/cards.png`} // Path to the cards.png
            alt="Accepted Cards"
            style={{ maxWidth: "300px", height: "auto", marginRight: "10px" }} // Set a smaller size for the image
          />
        </div>
        {/* بطاقة ائتمان text on the right */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <p style={{ fontWeight: "bold", textAlign: "right", margin: 10 }}>
            بطاقة ائتمان
          </p>
        </div>
      </div>

      {/* Credit Card Form */}
      <div
        style={{ marginLeft: "20px", marginRight: "20px", marginTop: "30px" }}
      >
        <Card
          number={state.number}
          name={state.name}
          expiry={state.expiry}
          cvc={state.cvc}
          focused={state.focus}
          callback={handleCallback}
        />
      </div>

      <div className="has-feedback amx-form-entry-container amx-cp-btn-holder">
        <input
          type="tel"
          name="number"
          className="ng-pristine ng-untouched ng-empty"
          placeholder="0000 0000 0000 0000"
          pattern="[\d| ]{16,22}"
          required
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        {(error && state.number <= 0) ||
        (error && !validator.isCreditCard(state.number)) ? (
          <span className="amx-label-asterisk">أدخل رقم بطاقة صالح</span>
        ) : (
          ""
        )}
      </div>

      <div className="has-feedback amx-form-entry-container ">
        <input
          type="text"
          name="name"
          className="ng-pristine ng-untouched ng-empty"
          placeholder="الاسم على البطاقة"
          required
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        {error && state.name <= 0 ? (
          <span className="amx-label-asterisk">الحقل غير صالح</span>
        ) : (
          ""
        )}
      </div>

      <div className="flex gap-5 w-full">
        <div className="mt-5 amx-form-entry-container">
          <input
            type="tel"
            name="expiry"
            className="ng-pristine ng-untouched ng-empty"
            placeholder="MM/YY"
            pattern="\d\d/\d\d"
            required
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          {error && state.expiry <= 0 ? (
            <span className="amx-label-asterisk">
              تاريخ انتهاء البطاقة غير صالح{" "}
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="mt-5 amx-form-entry-container">
          <input
            type="tel"
            name="cvc"
            className="ng-pristine ng-untouched ng-empty"
            placeholder="CVC"
            pattern="\d{3,4}"
            required
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          {error && state.cvc <= 0 ? (
            <span className="amx-label-asterisk">الحقل غير صالح</span>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
