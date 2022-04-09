import React from 'react';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import ImagePopup from '../ImagePopup/ImagePopup';


function App() {
    const[isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const[isAddPlacePopupOpen, setisAddPlacePopupOpen] =React.useState(false);
    const[isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = React.useState(false);
    const[selectedCard, setSelectedCard] = React.useState(null);


    function closeAllPopups() {
        setEditProfilePopupOpen(false);
        setisAddPlacePopupOpen(false);
        setisEditAvatarPopupOpen(false);
        setSelectedCard(null);
    }

    function handleEditAvatarClick() {
        setisEditAvatarPopupOpen(!isEditAvatarPopupOpen)
    }
        
    function handleEditProfileClick() {
        setEditProfilePopupOpen(!isEditProfilePopupOpen);
    }
    
    function handleAddPlaceClick() {
        setisAddPlacePopupOpen(!isAddPlacePopupOpen)
    }

    function handleCardClick(item) {
        console.log('hhhhh')
        setSelectedCard(item)
    }

    

  return (<>

    <div className="page">
        <Header/>
        <Main 
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}/>
        <Footer/>
    </div>
    <PopupWithForm buttonText={'Сохранить'} name='edit-profile' title='Редактировать профиль' opened={isEditProfilePopupOpen} onClose={closeAllPopups}>
        <input className="popup__input popup__input_type_name" type="text" name="name" placeholder="Введите имя" required minLength="2" maxLength="40" id="input_name" />
        <span id="input_name-error" className="popup__error"></span>
        <input className="popup__input popup__input_type_profession" type="text" name="profession" placeholder="Введите род деятельности" required minLength="2" maxLength="200" id="input_profession" />
        <span id="input_profession-error" className="popup__error"></span>

    </PopupWithForm>

    <PopupWithForm buttonText={'Сохранить'} name='add-element' title='Новое место' opened={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <input className="popup__input popup__input_type_title" type="text" name="name" placeholder="Название" required minLength="2" maxLength="30" id="input_title" />
        <span id="input_title-error" className="popup__error"></span>
        <input className="popup__input popup__input_type_link" type="url" name="description" placeholder="Ссылка на картинку" required id="input_link" />
        <span id="input_link-error" className="popup__error"></span>
    </PopupWithForm>

    <PopupWithForm buttonText={'Да'} name='delete-confirm' title='Вы уверены?'>
        <button className="popup__button popup__button_delete">Да</button>
    </PopupWithForm>
    
    <PopupWithForm buttonText={'Сохранить'} name='edit-avatar' title='Обновить аватар' opened={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <input className="popup__input popup__input_type_avatar" type="src" name="avatar" placeholder="Ссылка на картинку" required minLength="2" maxLength="200" id="input_avatar" />
        <span id="input_avatar-error" className="popup__error"></span>
    </PopupWithForm>


    <ImagePopup 
        opened={!!selectedCard}
        card={selectedCard}
        onClose={closeAllPopups}/>
</>);
}

export default App;
