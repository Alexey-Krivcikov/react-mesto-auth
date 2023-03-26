import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleSetName(e) {
    setName(e.target.value);
  }
  function handleSetLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlaceSubmit({
      name,
      link,
    });
  }

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="card-add"
      title="Новое место"
    >
      <input
        onChange={handleSetName}
        value={name}
        className="popup__input popup__input_type_card-name"
        placeholder="Название"
        id="card-name"
        name="name"
        type="text"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="popup__input-err card-name-error"></span>
      <input
        onChange={handleSetLink}
        value={link}
        className="popup__input popup__input_type_card-link"
        placeholder="Ссылка на картинку"
        id="card-link"
        name="link"
        type="url"
        required
      />
      <span className="popup__input-err card-link-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
