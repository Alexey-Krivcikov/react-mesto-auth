import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Login from "./Login";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup ";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import CurrentUserContext from "../contexts/CurrentUserContext";

function App() {
  // хуки состояния
  const [isEditProfilePopupOpen, SetEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, SetAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, SetEditAvatarPopupOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(null);

  const [currentUser, SetCurrentUser] = React.useState({});

  function handleEditProfileClick() {
    SetEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    SetAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    SetEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    SetEditProfilePopupOpen(false);
    SetAddPlacePopupOpen(false);
    SetEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((newCard) => {
        setCards(cards.filter((c) => (c._id === card._id ? "" : newCard)));
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(userData) {
    api
      .setUserInfo(userData)
      .then((newUserData) => {
        SetCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(userAvatar) {
    api
      .setAvatar(userAvatar)
      .then((newUserAvatar) => {
        SetCurrentUser(newUserAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(cardData) {
    api
      .addNewCard(cardData)
      .then((newCardData) => {
        setCards([newCardData, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userInfo, cards]) => {
        setCards(cards);
        SetCurrentUser(userInfo);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Login></Login>
      {/* <Routes>
        <Route>

        </Route>
        <Route>

        </Route> */}
      {/* <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        cards={cards}
      /> */}
      {/* </Routes> */}

      <Footer />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlaceSubmit={handleAddPlaceSubmit}
      />

      <PopupWithForm
        name="delete"
        title="Вы уверены?"
        btnText="Да"
      ></PopupWithForm>

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        name="avatar"
        title="Обновить аватар"
      />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default App;
