import React from "react";

function InfoTooltip({ isOpen, onClose, registerInfo, registerStatus }) {
  return (
    <div
      className={`popup popup_type_reg-status ${isOpen ? `popup_opened` : ""}`}
    >
      <div className="popup__container">
        <div
          className={`popup__status ${
            registerStatus ? `popup__status_type_ok` : `popup__status_type_err`
          }`}
        ></div>
        <h2 className="popup__status-title">{registerInfo}</h2>
        <button className="popup__close-btn" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
