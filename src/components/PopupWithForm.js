import React from "react";

function PopupWithForm({
  name,
  title,
  isOpen,
  onClose,
  onSubmit,
  btnText = "Сохранить",
  children,
}) {
  return (
    <div
      className={`popup popup_type_${name} 
    ${isOpen ? `popup_opened` : ""}`}
    >
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form
          onSubmit={onSubmit}
          className="popup__form"
          action="#"
          method="get"
          name={name}
        >
          {children}
          <button className="popup__btn" type="submit">
            {btnText}
          </button>
        </form>
        <button
          className="popup__close-btn"
          type="reset"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
